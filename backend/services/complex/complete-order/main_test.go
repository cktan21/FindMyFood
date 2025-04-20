package main

import (
    "bytes"
    "encoding/json"
    "net/http"
    "net/http/httptest"
    "sync"
    "testing"
	"fmt"

    "github.com/gin-gonic/gin"
)

// Helper function to create a test server
func setupTestServer(orderAPIURL, queueAPIURL string) *gin.Engine {
    server := gin.Default()

    server.POST("/:oid/:action", func(ctx *gin.Context) {
        oid := ctx.Param("oid")
        action := ctx.Param("action")

        // Simulate reading the request body
        body, err := ctx.GetRawData()
        if err != nil {
            ctx.JSON(http.StatusBadRequest, gin.H{"error": "failed to read request body"})
            return
        }

        var payloadData map[string]interface{}
        if err := json.Unmarshal(body, &payloadData); err != nil {
            ctx.JSON(http.StatusBadRequest, gin.H{"error": "invalid JSON payload"})
            return
        }

        // Simulate Goroutines
        var wg sync.WaitGroup
        errChan := make(chan error, 4)

        // Simulate Goroutine 1: Update Order's Status
        wg.Add(1)
        go func() {
            defer wg.Done()
            req, err := http.NewRequest("PUT", orderAPIURL+"/"+oid+"/"+action, bytes.NewBuffer([]byte{}))
            if err != nil {
                errChan <- fmt.Errorf("failed to create PUT request: %v", err)
                return
            }
            client := &http.Client{}
            resp, err := client.Do(req)
            if err != nil {
                errChan <- fmt.Errorf("failed to send data to OrderAPI: %v", err)
                return
            }
            defer resp.Body.Close()
            if resp.StatusCode != http.StatusOK {
                errChan <- fmt.Errorf("OrderAPI returned status: %s", resp.Status)
                return
            }
        }()

        // Simulate Goroutine 2: Delete from Queue
        wg.Add(1)
        go func() {
            defer wg.Done()
            toQueue := map[string]interface{}{
                "restaurant": payloadData["restaurant"],
                "order_id":   oid,
            }
            toQueueBytes, _ := json.Marshal(toQueue)
            resp, err := http.Post(queueAPIURL, "application/json", bytes.NewBuffer(toQueueBytes))
            if err != nil {
                errChan <- fmt.Errorf("failed to send data to QueueAPI: %v", err)
                return
            }
            defer resp.Body.Close()
            if resp.StatusCode != http.StatusOK {
                errChan <- fmt.Errorf("QueueAPI returned status: %s", resp.Status)
                return
            }
        }()

        // Wait for all Goroutines to finish
        go func() {
            wg.Wait()
            close(errChan)
        }()

        // Collect errors
        for err := range errChan {
            ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
            return
        }

        ctx.JSON(http.StatusOK, gin.H{"message": "Complete Order processing completed successfully."})
    })

    return server
}

// Test for race conditions in the POST handler
func TestRaceCondition(t *testing.T) {
    // Create mock servers for OrderAPI and QueueAPI
    orderAPIServer := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        if r.Method == http.MethodPut {
            w.WriteHeader(http.StatusOK) // Simulate a successful response
        } else {
            w.WriteHeader(http.StatusBadRequest) // Simulate an error for invalid methods
        }
    }))
    defer orderAPIServer.Close()

    queueAPIServer := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        if r.Method == http.MethodPost {
            w.WriteHeader(http.StatusOK) // Simulate a successful response
        } else {
            w.WriteHeader(http.StatusBadRequest) // Simulate an error for invalid methods
        }
    }))
    defer queueAPIServer.Close()

    // Setup the test server with mock API URLs
    server := setupTestServer(orderAPIServer.URL, queueAPIServer.URL)

    // Create a test request body
    payload := map[string]interface{}{
        "restaurant": "TestRestaurant",
        "user_id":    "testuser",
        "total":      100.0,
        "message":    "TestMessage",
    }
    payloadBytes, _ := json.Marshal(payload)

    // Number of concurrent requests
    numRequests := 100
    var wg sync.WaitGroup

    // Channel to collect errors
    errChan := make(chan error, numRequests)

    for i := 0; i < numRequests; i++ {
        wg.Add(1)
        go func() {
            defer wg.Done()

            // Create a test request
            req, err := http.NewRequest("POST", "/123/completed", bytes.NewBuffer(payloadBytes))
            if err != nil {
                errChan <- fmt.Errorf("failed to create test request: %v", err)
                return
            }
            req.Header.Set("Content-Type", "application/json")

            // Record the response
            recorder := httptest.NewRecorder()
            server.ServeHTTP(recorder, req)

            // Check the response status
            if recorder.Code != http.StatusOK {
                errChan <- fmt.Errorf("unexpected status code: %d", recorder.Code)
                return
            }
        }()
    }

    // Wait for all Goroutines to finish
    go func() {
        wg.Wait()
        close(errChan)
    }()

    // Collect errors
    for err := range errChan {
        t.Errorf("Error during test: %v", err)
    }
}