package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"log"

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
    conn, err := amqp.Dial("amqp://guest:guest@rabbitmq:5672/")
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
	server.POST("/done/:id", func(ctx *gin.Context) {

		//Outsystems Portion
		// Takes queue id
		id := ctx.Param("id")

		// updates outsystems complete order endpt
		outsysURL := fmt.Sprintf("https://personal-3mms7vqv.outsystemscloud.com/OrderMicroservice/rest/OrderService/order/complete?RecieptNo=%s", id)

		// this is go version of console.log || print()
		fmt.Println("Calling Outsystems:", outsysURL)
		
		// Create a new PUT request with no payload
		req, err := http.NewRequest("PUT", outsysURL, nil) // No payload, so body is nil
		if err != nil {
			ctx.JSON(http.StatusInternalServerError, gin.H{"error": "failed to create PUT request"})
			return
		}
		defer req.Body.Close()

		ctx.JSON(http.StatusOK, data)

		// Read the request body
		body, err := io.ReadAll(ctx.Request.Body)
		if err != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{"error": "failed to read request body"})
			return
		}

		// Queue Portion
        // Declare the map and parse the JSON & Validates the Json
        var QueueData map[string]interface{}
        if err := json.Unmarshal(body, &QueueData); err != nil { //Unmarshall turns the json bytes into a go object and directly input it into the QueueData string
            ctx.JSON(http.StatusBadRequest, gin.H{"error": "invalid JSON payload"})
            return
        }

		// Adds the key 'action' into the request data
		QueueData["action"] = "add"

		//Turns back into json bytes
		toQueue, err := json.Marshal(QueueData)
		if err != nil {
			log.Fatalf("Failed to bytify rabbitMQ JSON: %v", err)
		}

		// Create queue url
		queueURL := "http://queue:8008/dump"
		fmt.Println("Calling FastAPI:", queueURL)

		resp, err := http.Post(queueURL, "application/json", bytes.NewBuffer(toQueue))
		if err != nil {
			ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		defer resp.Body.Close()

		
        ctx.JSON(http.StatusAccepted, gin.H{
            "message": "Order request has been queued for processing.",
        })

		//RAbbitMQ Portion here
        // Connect to RabbitMQ
        conn, err := connectToRabbitMQ()
        if err != nil {
            ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
            return
        }
        defer conn.Close()

		// Create empty map called RabbitMQData
		RabbitMQData := make(map[string]interface{})

		// Adds key:value pairs
		RabbitMQData["message"] = fmt.Sprintf("Your order %s has been successfully completed", id) //%s NOT to a variable but to string and points to whatever is after , so in this case id
		RabbitMQData["id"] = id

		//Error handling
		toRabbitMQ, err := json.Marshal(RabbitMQData)
		if err != nil {
			log.Fatalf("Failed to bytify rabbitMQ JSON: %v", err)
		}

        // Publish the message to RabbitMQ
        err = publishToQueue(conn, "notifications", toRabbitMQ)
        if err != nil {
            ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
            return
        }

    })



	log.Println("Starting server on :7070")
    if err := server.Run(":7070"); err != nil { // strings two sentances into one 
        log.Fatalf("Failed to start server: %v", err)
    }
	
}




