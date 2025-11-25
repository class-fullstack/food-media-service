const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Food Ordering System API",
      version: "1.0.0",
      description:
        "API documentation for Food Ordering System with RBAC, Auth, Menu, Order, Payment.",
    },
    servers: [
      {
        url: "/api/v1",
        description: "v1 Base URL",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: [
    "./src/app/v1/routes/**/*.js", // Lấy doc từ route
    "./src/app/v1/controllers/**/*.js",
  ],
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = {
  swaggerUi,
  swaggerSpec,
};
