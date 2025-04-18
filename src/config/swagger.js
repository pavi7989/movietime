const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const Movie = require("../models/Movie");

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Movies APP",
            description: "API Documentation for the Movie Application",
            version: "1.0.0",
        },
        servers: [{ url: "https://movietime-production-9d8e.up.railway.app" }],
        components: {
            schemas: {
                User: {
                    type: "object",
                    required: ["email", "username", "password", "reEnterPassword"],
                    properties: {
                        id: { type: "integer", readOnly: true },                        
                        email: { type: "string" },
                        username: { type: "string" },
                        password: { type: "string" },
                        reEnterPassword: {type: "string"}
                    }
                },
                // Movie Schema
                Movie: {
                    type: "object",
                    required: ["name", "description", "rating", "genres"],
                    properties: {
                        id: { type: "integer", readOnly: true },
                        name: { type: "string" },
                        description: { type: "string" },
                        rating: { type: "number" },
                        genres: { type: "string" },
                        trailer: { type: "string" },
                        wishlisted: { type: "boolean" },
                        imagePath: { type: "string" },
                    }
                },
                // Profile Schema
                Profile: {
                    type: "object",
                    required: ["name", "email", "phone", "address", "bio"],
                    properties: {
                        id: { type: "integer", readOnly: true },
                        name: { type: "string" },
                        email: { type: "string" },
                        phone: { type: "string" },
                        address: { type: "string" },
                        bio: { type: "string" },
                        profileImage: { type: "string" },
                    }
                }
            }
        }
    },
    apis: ["./src/routes/authRoutes.js",
        "./src/routes/movieRoutes.js", // Explicitly include movie routes
        "./src/routes/profileRoutes.js" // Explicitly include profile routes
        ]
};

const setupSwagger = (app) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(swaggerOptions)));
    console.log("✅ Swagger API Docs available at: https://movietime-production-9d8e.up.railway.app/api-docs");
};

module.exports = setupSwagger;
