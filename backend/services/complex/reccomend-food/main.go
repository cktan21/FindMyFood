package main

import (
    "bytes"
    "encoding/json"
    "fmt"
    "io/ioutil"
    "net/http"

    "github.com/gin-gonic/gin"
)

func fetchAPIData(apiURL string) (interface{}, error) {
    resp, err := http.Get(apiURL)
    if err != nil {
        return nil, err
    }
    defer resp.Body.Close()

    body, readErr := ioutil.ReadAll(resp.Body)
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

func main() {
    router := gin.Default()

    router.GET("/", func(c *gin.Context) {
        c.JSON(http.StatusOK, gin.H{
            "message": "Hello, World! Gin server is running 🚀",
        })
    })

    router.GET("/order/:id", func(c *gin.Context) {
        id := c.Param("id")
        apiURL := fmt.Sprintf("http://order:6369/orders?uid=%s", id)
        fmt.Println("Calling Outsystems:", apiURL)

        data, err := fetchAPIData(apiURL)
        if err != nil {
            c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
            return
        }

        c.JSON(http.StatusOK, data)
    })

    router.GET("/reccomendation/:id", func(c *gin.Context) {
        id := c.Param("id")
        apiURL := fmt.Sprintf("http://reccomendation:4000/recommendation/%s", id)
        fmt.Println("Calling FastAPI:", apiURL)

        data, err := fetchAPIData(apiURL)
        if err != nil {
            c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
            return
        }

        c.JSON(http.StatusOK, data)
    })

    router.GET("/menu", func(c *gin.Context) {
        apiURL := "http://menu:5001/all"
        fmt.Println("Calling Flask:", apiURL)

        data, err := fetchAPIData(apiURL)
        if err != nil {
            c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
            return
        }

        c.JSON(http.StatusOK, data)
    })

    router.GET("/menu/:restaurant", func(c *gin.Context) {
        restaurant := c.Param("restaurant")
        apiURL := fmt.Sprintf("http://menu:5001/%s", restaurant)
        fmt.Println("Calling Flask:", apiURL)

        data, err := fetchAPIData(apiURL)
        if err != nil {
            c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
            return
        }

        c.JSON(http.StatusOK, data)
    })

    router.POST("/chatgpt/:id", func(c *gin.Context) {
        id := c.Param("id")
        if id == "" {
            c.JSON(http.StatusBadRequest, gin.H{"error": "Missing ID parameter"})
            return
        }

        // Create channels to receive results from Goroutines
        orderHistoryChan := make(chan map[string]interface{})
        menuChan := make(chan map[string]interface{})
        recommendationChan := make(chan map[string]interface{})
        errorChan := make(chan error, 3) // Buffered channel to collect errors

        // Fetch order history in a Goroutine
        go func() {
            data, err := fetchAPIData(fmt.Sprintf("http://order:6369/orders?uid=%s", id))
            if err != nil {
                errorChan <- err
                return
            }

            // Perform type assertion before sending to the channel
            if parsedData, ok := data.(map[string]interface{}); ok {
                orderHistoryChan <- parsedData
            } else {
                errorChan <- fmt.Errorf("unexpected JSON structure for order history: expected map[string]interface{}")
            }
        }()

        // Fetch menu data in a Goroutine
        go func() {
            data, err := fetchAPIData("http://menu:5001/all")
            if err != nil {
                errorChan <- err
                return
            }

            // Perform type assertion before sending to the channel
            if parsedData, ok := data.(map[string]interface{}); ok {
                menuChan <- parsedData
            } else {
                errorChan <- fmt.Errorf("unexpected JSON structure for menu: expected map[string]interface{}")
            }
        }()

        // Fetch recommendation data in a Goroutine
        go func() {
            data, err := fetchAPIData(fmt.Sprintf("http://reccomendation:4000/recommendation/%s", id))
            if err != nil {
                errorChan <- err
                return
            }

            // Perform type assertion before sending to the channel
            if parsedData, ok := data.(map[string]interface{}); ok {
                recommendationChan <- parsedData
            } else {
                errorChan <- fmt.Errorf("unexpected JSON structure for recommendation: expected map[string]interface{}")
            }
        }()

        // Collect results or handle errors
        var orderHistoryData, menuData, recommendationData map[string]interface{}
        for i := 0; i < 3; i++ {
			// select here "listens" ie checks for each of the cases => if any of them return true it runs (like mutiple if statements)
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
        apiURL := "http://chatgpt:3000/reccomend"
        fmt.Println("Calling FastAPI:", apiURL)

        resp, err := http.Post(apiURL, "application/json", bytes.NewBuffer(requestBody))
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

    router.Run(":8080")
}
