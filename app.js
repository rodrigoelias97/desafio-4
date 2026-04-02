// app.js
// Arquivo principal da API REST para cadastro de clientes

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsing do JSON no body das requisições
app.use(express.json());

// Importa as rotas de clientes (estrutura REST organizada)
const clientesRoutes = require('./rest/routes/clientes');

// Configura o Swagger UI em /api-docs
const setupSwagger = require('./swagger');
setupSwagger(app);

// Define o prefixo para as rotas de clientes
app.use('/clientes', clientesRoutes);

// Rota raiz para verificar se a API está funcionando
app.get('/', (req, res) => {
  res.json({
    mensagem: 'API de Clientes - Node.js com Express',
    endpoints: {
      'POST /clientes': 'Criar cliente',
      'GET /clientes': 'Listar todos os clientes',
      'GET /clientes/:codigo': 'Buscar cliente por código',
      'PUT /clientes/:codigo': 'Atualizar cliente',
      'PATCH /clientes/:codigo': 'Atualizar parcialmente cliente',
      'DELETE /clientes/:codigo': 'Remover cliente'
    }
  });
});

// Middleware para tratamento de rotas não encontradas
app.use((req, res) => {
  res.status(404).json({ erro: 'Rota não encontrada' });
});

// Middleware para tratamento de erros
app.use((error, req, res, next) => {
  console.error(error.stack);
  res.status(500).json({ erro: 'Erro interno do servidor' });
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Acesse: http://localhost:${PORT}`);
});