package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/oauth2"
)

var (
	asgardeoConfig *oauth2.Config
	// In a real app, these would be in environment variables
	clientID     = os.Getenv("ASGARDEO_CLIENT_ID")
	clientSecret = os.Getenv("ASGARDEO_CLIENT_SECRET")
	redirectURL  = "http://localhost:8080/callback"
	discoveryURL = os.Getenv("ASGARDEO_DISCOVERY_URL") // e.g., https://api.asgardeo.io/t/<org>/oauth2/token
)

func init() {
	asgardeoConfig = &oauth2.Config{
		ClientID:     clientID,
		ClientSecret: clientSecret,
		RedirectURL:  redirectURL,
		Endpoint: oauth2.Endpoint{
			AuthURL:  "https://api.asgardeo.io/t/your-org/oauth2/authorize", 
			TokenURL: "https://api.asgardeo.io/t/your-org/oauth2/token",
		},
		Scopes: []string{"openid", "profile", "email"},
	}
}

func main() {
	r := gin.Default()

	// Health check
	r.GET("/health", func(c *gin.Context) {
		c.JSON(200, gin.H{"status": "UP", "service": "vendor-auth-service"})
	})

	// 1. Redirect to Asgardeo Login
	r.GET("/login", func(c *gin.Context) {
		url := asgardeoConfig.AuthCodeURL("random-state-string")
		c.Redirect(http.StatusTemporaryRedirect, url)
	})

	// 2. Callback from Asgardeo
	r.GET("/callback", func(c *gin.Context) {
		code := c.Query("code")
		if code == "" {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Code missing"})
			return
		}

		// Exchange code for token
		token, err := asgardeoConfig.Exchange(context.Background(), code)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("Token exchange failed: %v", err)})
			return
		}

		// 3. Validate ID Token (JWT)
		idToken := token.Extra("id_token").(string)
		claims, err := validateJWT(idToken)
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid JWT"})
			return
		}

		c.JSON(200, gin.H{
			"message": "Login Successful",
			"vendor":  claims["sub"],
			"email":   claims["email"],
			"token":   idToken,
		})
	})

	fmt.Println("Vendor Auth Service starting on :8080...")
	r.Run(":8080")
}

func validateJWT(tokenString string) (jwt.MapClaims, error) {
	// For WSO2 Asgardeo, you should ideally fetch the JWKS from discovery URL
	// and validate against the public key. Here's the boilerplate for parsing.
	token, _, err := new(jwt.Parser).ParseUnverified(tokenString, jwt.MapClaims{})
	if err != nil {
		return nil, err
	}

	if claims, ok := token.Claims.(jwt.MapClaims); ok {
		return claims, nil
	}

	return nil, fmt.Errorf("invalid claims")
}
