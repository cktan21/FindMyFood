package main

import (
	// "bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	// "log"

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
        false,     // Durable
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

	// intialiose your gin instance 

	// := declare and assign a value
    server := gin.Default()

    server.GET("/", func(ctx *gin.Context) { // ctx here is your context 
        ctx.JSON(200, gin.H{ // gin.H is the respionse body
            "message": "Hello! Complete-Order is running! 🚀",
        })
    })



	server.GET("/order/:id", func(ctx *gin.Context) {
		id := ctx.Param("id")

		// fmt is format
		apiURL := fmt.Sprintf("https://personal-3mms7vqv.outsystemscloud.com/OrderMicroservice/rest/OrderService/orderhistory?userId=%s", id)
		fmt.Println("Calling Outsystems:", apiURL)

		data, err := fetchAPIData(apiURL)
		if err != nil {
			ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		ctx.JSON(http.StatusOK, data)
	})




	server.Run(":7070")
	
}




