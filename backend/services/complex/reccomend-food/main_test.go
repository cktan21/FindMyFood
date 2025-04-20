package main

import (
    "bytes"
    "encoding/json"
    "net/http"
    "net/http/httptest"
    "testing"
	"io/ioutil"
	"fmt"

    "github.com/gin-gonic/gin"
)

// Helper function to create a mock server for external APIs
func createMockServer() *httptest.Server {
    return httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        switch r.URL.Path {
        case "/orders":
            w.WriteHeader(http.StatusOK)
            w.Write([]byte(`{"user_id": "123", "orders": ["Pizza", "Burger"]}`))
        case "/all":
            w.WriteHeader(http.StatusOK)
            w.Write([]byte(`["Pizza", "Burger", "Pasta"]`))
        case "/recommendation/123":
            w.WriteHeader(http.StatusOK)
            w.Write([]byte(`{"recommended": "Sushi"}`))
        case "/reccomend":
            w.WriteHeader(http.StatusOK)
            w.Write([]byte(`{"response": "You should try Sushi!"}`))
        default:
            w.WriteHeader(http.StatusNotFound)
            w.Write([]byte(`{"error": "Not Found"}`))
        }
    }))
}

// Test the /chatgpt/:id endpoint
func TestChatGPTHandler(t *testing.T) {
    // Create a mock server for external APIs
    mockServer := createMockServer()
    defer mockServer.Close()

    // Replace API URLs with the mock server's URL
    orderAPIURL := mockServer.URL + "/orders"
    menuAPIURL := mockServer.URL + "/all"
    recommendationAPIURL := mockServer.URL + "/recommendation/123"
    fastAPIURL := mockServer.URL + "/reccomend"

    // Set up the Gin router
    router := gin.Default()

    router.POST("/chatgpt/:id", func(c *gin.Context) {
        id := c.Param("id")
        if id == "" {
            c.JSON(http.StatusBadRequest, gin.H{"error": "Missing ID parameter"})
            return
        }

        // Create channels to receive results from Goroutines
        orderHistoryChan := make(chan interface{})
        menuChan := make(chan interface{})
        recommendationChan := make(chan interface{})
        errorChan := make(chan error, 3)

        // Fetch order history in a Goroutine
        go func(id string) {
            data, err := fetchAPIData(fmt.Sprintf("%s?uid=%s", orderAPIURL, id))
            if err != nil {
                errorChan <- err
                return
            }

            parsedData, parseErr := parseDynamicData(data)
            if parseErr != nil {
                errorChan <- fmt.Errorf("failed to parse order history data: %w", parseErr)
                return
            }

            orderHistoryChan <- parsedData
        }(id)

        // Fetch menu data in a Goroutine
        go func() {
            data, err := fetchAPIData(menuAPIURL)
            if err != nil {
                errorChan <- err
                return
            }

            parsedData, parseErr := parseDynamicData(data)
            if parseErr != nil {
                errorChan <- fmt.Errorf("failed to parse menu data: %w", parseErr)
                return
            }

            menuChan <- parsedData
        }()

        // Fetch recommendation data in a Goroutine
        go func(id string) {
            data, err := fetchAPIData(fmt.Sprintf("%s/%s", recommendationAPIURL, id))
            if err != nil {
                errorChan <- err
                return
            }

            parsedData, parseErr := parseDynamicData(data)
            if parseErr != nil {
                errorChan <- fmt.Errorf("failed to parse recommendation data: %w", parseErr)
                return
            }

            recommendationChan <- parsedData
        }(id)

        // Collect results or handle errors
        var orderHistoryData, menuData, recommendationData interface{}
        for range 3 {
            select {
            case err := <-errorChan:
                c.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("Failed to fetch data: %v", err)})
                return
            case orderHistoryData = <-orderHistoryChan:
            case menuData = <-menuChan:
            case recommendationData = <-recommendationChan:
            }
        }

        // Prepare request data
        requestData := map[string]interface{}{
            "foodHistory":    orderHistoryData,
            "menulisting":    menuData,
            "recommendation": recommendationData,
        }

        requestBody, err := json.Marshal(requestData)
        if err != nil {
            c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create request body"})
            return
        }

        // Call the FastAPI endpoint
        resp, err := http.Post(fastAPIURL, "application/json", bytes.NewBuffer(requestBody))
        if err != nil {
            c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
            return
        }
        defer resp.Body.Close()

        body, readErr := ioutil.ReadAll(resp.Body)
        if readErr != nil {
            c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to read response"})
            return
        }

        var responseData map[string]interface{}
        jsonErr := json.Unmarshal(body, &responseData)
        if jsonErr != nil {
            c.JSON(http.StatusInternalServerError, gin.H{"error": "Invalid JSON response"})
            return
        }

        c.JSON(http.StatusOK, responseData)
    })

    // Create a test request
    reqBody := bytes.NewBuffer(nil)
    req, err := http.NewRequest("POST", "/chatgpt/123", reqBody)
    if err != nil {
        t.Fatalf("Failed to create test request: %v", err)
    }

    // Record the response
    recorder := httptest.NewRecorder()
    router.ServeHTTP(recorder, req)

    // Check the response status
    if recorder.Code != http.StatusOK {
        t.Errorf("Expected status code %d, but got %d", http.StatusOK, recorder.Code)
    }

    // Parse the response body
    var responseBody map[string]interface{}
    if err := json.Unmarshal(recorder.Body.Bytes(), &responseBody); err != nil {
        t.Fatalf("Failed to parse response body: %v", err)
    }

    // Validate the response
    expectedResponse := map[string]interface{}{"response": "You should try Sushi!"}
    if !compareMaps(responseBody, expectedResponse) {
        t.Errorf("Unexpected response: got %v, want %v", responseBody, expectedResponse)
    }
}

// Helper function to compare two maps
func compareMaps(a, b map[string]interface{}) bool {
    if len(a) != len(b) {
        return false
    }
    for key, valueA := range a {
        valueB, exists := b[key]
        if !exists || valueA != valueB {
            return false
        }
    }
    return true
}