// routes/clientes.js
// Arquivo responsável pelas rotas da API de clientes

const express = require('express');
const router = express.Router();
const { validarCliente } = require('../utils/validations');
const {
  adicionarCliente,
  listarClientes,
  buscarClientePorCodigo,
  atualizarCliente,
  removerCliente,
  cpfJaExiste
} = require('../data/clientes');

// POST /clientes - Criar cliente
router.post('/', (req, res) => {
  try {
    const cliente = req.body;

    // Valida os dados do cliente
    const validacao = validarCliente(cliente);
    if (!validacao.valido) {
      return res.status(400).json({
        erro: 'Dados inválidos',
        detalhes: validacao.erros
      });
    }

    // Verifica se CPF já existe
    if (cpfJaExiste(cliente.cpf)) {
      return res.status(400).json({
        erro: 'CPF já cadastrado'
      });
    }

    // Adiciona o cliente
    const novoCliente = adicionarCliente(cliente);
    res.status(201).json(novoCliente);
  } catch (error) {
    res.status(500).json({ erro: 'Erro interno do servidor' });
  }
});

// GET /clientes - Listar todos os clientes
router.get('/', (req, res) => {
  try {
    const clientes = listarClientes();
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ erro: 'Erro interno do servidor' });
  }
});

// GET /clientes/:codigo - Buscar cliente por código
router.get('/:codigo', (req, res) => {
  try {
    const { codigo } = req.params;
    const cliente = buscarClientePorCodigo(codigo);

    if (!cliente) {
      return res.status(404).json({ erro: 'Cliente não encontrado' });
    }

    res.json(cliente);
  } catch (error) {
    res.status(500).json({ erro: 'Erro interno do servidor' });
  }
});

// PUT /clientes/:codigo - Atualizar cliente (exceto código)
router.put('/:codigo', (req, res) => {
  try {
    const { codigo } = req.params;
    const dadosAtualizados = req.body;

    // Verifica se o cliente existe
    const clienteExistente = buscarClientePorCodigo(codigo);
    if (!clienteExistente) {
      return res.status(404).json({ erro: 'Cliente não encontrado' });
    }

    // Valida os dados atualizados (modo update)
    const validacao = validarCliente(dadosAtualizados, true);
    if (!validacao.valido) {
      return res.status(400).json({
        erro: 'Dados inválidos',
        detalhes: validacao.erros
      });
    }

    // Verifica se CPF já existe (excluindo o próprio cliente)
    if (dadosAtualizados.cpf && cpfJaExiste(dadosAtualizados.cpf, parseInt(codigo))) {
      return res.status(400).json({
        erro: 'CPF já cadastrado por outro cliente'
      });
    }

    // Atualiza o cliente
    const clienteAtualizado = atualizarCliente(codigo, dadosAtualizados);
    res.json(clienteAtualizado);
  } catch (error) {
    res.status(500).json({ erro: 'Erro interno do servidor' });
  }
});

// DELETE /clientes/:codigo - Remover cliente
router.delete('/:codigo', (req, res) => {
  try {
    const { codigo } = req.params;

    // Verifica se o cliente existe
    const cliente = buscarClientePorCodigo(codigo);
    if (!cliente) {
      return res.status(404).json({ erro: 'Cliente não encontrado' });
    }

    // Remove o cliente
    const removido = removerCliente(codigo);
    if (removido) {
      res.status(204).send(); // No Content
    } else {
      res.status(500).json({ erro: 'Erro ao remover cliente' });
    }
  } catch (error) {
    res.status(500).json({ erro: 'Erro interno do servidor' });
  }
});

module.exports = router;