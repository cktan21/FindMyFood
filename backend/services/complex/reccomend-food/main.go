package main

import (
    "github.com/gin-gonic/gin"
    "net/http"
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

    // Define another route for testing
    router.GET("/ping", func(c *gin.Context) {
        c.JSON(http.StatusOK, gin.H{
            "message": "pong",
        })
    })

    // Run the server on port 8080
    router.Run(":8080") // http://localhost:8080/
}
