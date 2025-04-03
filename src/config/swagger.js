const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Movies APP",
            description: "API Documentation for the Movie Application",
            version: "1.0.0",
        },
        servers: [{ url: "http://localhost:5000" }],
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
                }
            }
        }
    },
    apis: ["./src/routes/*.js"]
};

const setupSwagger = (app) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(swaggerOptions)));
    console.log("✅ Swagger API Docs available at: http://localhost:5000/api-docs");
};

module.exports = setupSwagger;
