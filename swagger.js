// swagger.js
// Configuração do Swagger para documentação da API

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API de Clientes',
    version: '1.0.0',
    description: 'Documentação Swagger para API de Cadastro de Clientes',
  },
  servers: [{ url: 'http://localhost:3000', description: 'Servidor local' }],
};

const options = {
  swaggerDefinition,
  apis: ['./rest/routes/*.js', './routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

function setupSwagger(app) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

module.exports = setupSwagger;
