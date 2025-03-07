package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	// Initialize Gin router
	router := gin.Default()

	// Define a simple GET route
	router.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "Hello, World! Gin server is running 🚀",
		})
	})

	router.GET("/retrievereccomendations/:id", func(c *gin.Context) {
		id := c.Param("id")
		apiURL := fmt.Sprintf("http://127.0.0.1:8002/recommendation/%s", id)

		fmt.Println("Calling FastAPI:", apiURL)

		resp, err := http.Get(apiURL)
		if err != nil {
			fmt.Println("Error calling FastAPI:", err)
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

	// Run the server on port 8080
	router.Run(":8080") // http://localhost:8080/
}
