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

		orderHistoryData, err := fetchAPIData(fmt.Sprintf("http://order:6369/orders?uid=%s", id))
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch order history"})
			return
		}

		menuData, err := fetchAPIData("http://menu:5001/all")
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch menu"})
			return
		}

		recommendationData, err := fetchAPIData(fmt.Sprintf("http://reccomendation:4000/recommendation/%s", id))
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch recommendation"})
			return
		}

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
