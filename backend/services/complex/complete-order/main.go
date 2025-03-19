package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"log"
	"sync"
	// "time"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/streadway/amqp" // RabbitMQ client library
)

func fetchAPIData(apiURL string) (interface{}, error) {
	resp, err := http.Get(apiURL)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	body, readErr := io.ReadAll(resp.Body)
	if readErr != nil {
		return nil, readErr
	}

	var responseData interface{}
	jsonErr := json.Unmarshal(body, &responseData)
	if jsonErr != nil {
		return nil, jsonErr
	}

	return responseData, nil
}

// Helper function to connect to RabbitMQ
func connectToRabbitMQ() (*amqp.Connection, error) {
    conn, err := amqp.Dial("amqp://guest:guest@rabbitmq:5672")
    if err != nil {
        return nil, fmt.Errorf("failed to connect to RabbitMQ: %v", err)
    }
    return conn, nil
}

// Helper function to publish a message to RabbitMQ
func publishToQueue(conn *amqp.Connection, queueName string, message []byte) error {
    ch, err := conn.Channel()
    if err != nil {
        return fmt.Errorf("failed to open a channel: %v", err)
    }
    defer ch.Close()

    q, err := ch.QueueDeclare(
        queueName, // Queue name
        true,     // Durable
        false,     // Delete when unused
        false,     // Exclusive
        false,     // No-wait
        nil,       // Arguments
    )
    if err != nil {
        return fmt.Errorf("failed to declare a queue: %v", err)
    }

    err = ch.Publish(
        "main",     // Exchange
        q.Name,     // Routing key
        false,      // Mandatory
        false,      // Immediate
        amqp.Publishing{
            ContentType: "application/json",
            Body:        message,
        },
    )
    if err != nil {
        return fmt.Errorf("failed to publish a message: %v", err)
    }

    return nil
}

func main() {

	// intialise your gin instance 
    server := gin.Default()	// := declare and assign a value

    server.GET("/", func(ctx *gin.Context) { // ctx here is your context 
		// this is what shows on webpages
        ctx.JSON(200, gin.H{ // gin.H is the respionse body
            "message": "Hello! Complete-Order is running! 🚀",
        })
    })


	// takes in a post req of the json where the user has completed his order and
	// from the frontend and updates the notifcation + queue + outsystems accordingly
	server.POST("/done/:action/:id", func(ctx *gin.Context) {
		// The id in the param refers to USER ID etc kendrick/subrah
        id := ctx.Param("id")
		// action:=ctx.Param("action")

		// Make sure the Request body is Readable
		body, err := io.ReadAll(ctx.Request.Body)
		if err != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{"error": "failed to read request body"})
			return
		}
		defer ctx.Request.Body.Close() // Ensure the body is closed after reading

		var queueData map[string]interface{}
		if err := json.Unmarshal(body, &queueData); err != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{"error": "invalid JSON payload"})
			return
		}

        // WaitGroup to synchronize Goroutines
        var wg sync.WaitGroup

        // Channel to collect errors from Goroutines
        errChan := make(chan error, 3)

        // // Goroutine 1: Update OutSystems
        // wg.Add(1)
        // go func(id string) {
        //     defer wg.Done()

        //     outsysURL := fmt.Sprintf("https://personal-3mms7vqv.outsystemscloud.com/OrderMicroservice/rest/OrderService/order/complete?RecieptNo=%s", id)
        //     fmt.Println("Calling Outsystems:", outsysURL)

        //     req, err := http.NewRequest("PUT", outsysURL, nil)
        //     if err != nil {
        //         errChan <- fmt.Errorf("failed to create PUT request: %v", err)
        //         return
        //     }

        //     client := &http.Client{Timeout: 10 * time.Second}
        //     resp, err := client.Do(req)
        //     if err != nil {
        //         errChan <- fmt.Errorf("failed to send PUT request: %v", err)
        //         return
        //     }
        //     defer resp.Body.Close()

        //     if resp.StatusCode != http.StatusOK {
        //         errChan <- fmt.Errorf("OutSystems returned status: %s", resp.Status)
        //         return
        //     }

        //     fmt.Println("OutSystems updated successfully.")
        // }()

        // Goroutine 2: Process Queue Data
        wg.Add(1)
        go func(queueData interface {}) {
            defer wg.Done()
			
			// need to assert type
			queueDataMap, ok := queueData.(map[string]interface{})
			if !ok {
				errChan <- fmt.Errorf("invalid type for queueData: expected map[string]interface{}")
				return
			}

			// add action to deletes entry from queue
            queueDataMap["action"] = "delete"

            toQueue, err := json.Marshal(queueDataMap)
            if err != nil {
                errChan <- fmt.Errorf("failed to marshal queue data: %v", err)
                return
            }

            queueURL := os.Getenv("QUEUE_URL")
            if queueURL == "" {
                queueURL = "http://queue:8008/dump"
            }

            fmt.Println("Calling QueueAPI:", queueURL)
            resp, err := http.Post(queueURL, "application/json", bytes.NewBuffer(toQueue))
            if err != nil {
                errChan <- fmt.Errorf("failed to send data to QueueAPI: %v", err)
                return
            }
            defer resp.Body.Close()

            if resp.StatusCode != http.StatusOK {
                errChan <- fmt.Errorf("QueueAPI returned status: %s", resp.Status)
                return
            }

            fmt.Println("Queue data processed successfully.")
        }(queueData)

        // Goroutine 3: Publish to RabbitMQ
        wg.Add(1)
        go func(queueData interface {}, id string) {

			queueDataMap, ok := queueData.(map[string]interface{})
			if !ok {
				errChan <- fmt.Errorf("invalid type for queueData: expected map[string]interface{}")
				return
			}
            defer wg.Done()

            conn, err := connectToRabbitMQ()
            if err != nil {
                errChan <- fmt.Errorf("failed to connect to RabbitMQ: %v", err)
                return
            }
            defer conn.Close()

            rabbitMQData := map[string]interface{}{
                "message": fmt.Sprintf("Your order of %s from %s has been successfully completed and is ready for pickup!", queueDataMap["food"], queueDataMap["restaurant"]), // the food here will appear as Grilled_Teriyaki_Chicken_Donburi yes i'm too lazy to type assert shoot me 
                "type": "notification",
				"user_id": id, //ie Kendrick
				"order_id" : queueDataMap["id"], // ie 18
            }

            toRabbitMQ, err := json.Marshal(rabbitMQData)
            if err != nil {
                errChan <- fmt.Errorf("failed to marshal RabbitMQ data: %v", err)
                return
            }

            if err := publishToQueue(conn, "notifications", toRabbitMQ); err != nil {
                errChan <- fmt.Errorf("failed to publish to RabbitMQ: %v", err)
                return
            }

            fmt.Println("Notification published to RabbitMQ successfully.")
        }(queueData, id)
		
        // // Goroutine 4: Update Credits
        // wg.Add(1)
        // go func(queueData interface {}) {
        //     defer wg.Done()
			
		// 	// need to assert type
		// 	queueDataMap, ok := queueData.(map[string]interface{})
		// 	if !ok {
		// 		errChan <- fmt.Errorf("invalid type for queueData: expected map[string]interface{}")
		// 		return
		// 	}

		// 	// deletes entry from queue
        //     queueDataMap["action"] = "delete"

        //     toQueue, err := json.Marshal(queueDataMap)
        //     if err != nil {
        //         errChan <- fmt.Errorf("failed to marshal queue data: %v", err)
        //         return
        //     }

        //     creditURL := os.Getenv("CREDIT_URL")
        //     if creditURL == "" {
        //         creditURL = "http://credit:4040/"
        //     }

        //     fmt.Println("Calling QueueAPI:", creditURL)

		// 	amt, err:=http.Get

        //     resp, err := http.Post(creditURL, "application/json", bytes.NewBuffer(toQueue))
        //     if err != nil {
        //         errChan <- fmt.Errorf("failed to send data to QueueAPI: %v", err)
        //         return
        //     }
        //     defer resp.Body.Close()

        //     if resp.StatusCode != http.StatusOK {
        //         errChan <- fmt.Errorf("QueueAPI returned status: %s", resp.Status)
        //         return
        //     }

        //     fmt.Println("Queue data processed successfully.")
        // }(queueData)
		

        // Wait for all Goroutines to finish
        go func() {
            wg.Wait()
            close(errChan)
        }()

        // Collect errors from Goroutines
        for err := range errChan {
            log.Println("Error:", err)
            ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
            return
        }

        // Return success response
        ctx.JSON(http.StatusOK, gin.H{
            "message": "Complete Order processing completed successfully.",
        })
    })

    log.Println("Starting server on :7070")
    if err := server.Run(":7070"); err != nil {
        log.Fatalf("Failed to start server: %v", err)
    }
	
}




