const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Swagger configuration options
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'E-commerce API',
      version: '1.0.0',
      description: 'API documentation for the E-commerce application',
    },
    servers: [
      { url: 'http://localhost:5001/api', description: 'Development server' },
    ],
  },
  apis: ['./routes/*.js'],  // Location of routes to document
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = {
  swaggerUi,
  swaggerDocs,
};
