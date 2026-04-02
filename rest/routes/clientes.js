// rest/routes/clientes.js
// Rotas da API de clientes (REST)

const express = require('express');
const router = express.Router();
const {
  criarCliente,
  listarClientes,
  buscarCliente,
  atualizarCliente,
  removerCliente
} = require('../../src/services/clientesService');

/**
 * @swagger
 * /clientes:
 *   post:
 *     summary: Criar um cliente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               cpf:
 *                 type: string
 *               endereco:
 *                 type: string
 *               telefone:
 *                 type: string
 *               email:
 *                 type: string
 *               dataCadastro:
 *                 type: string
 *     responses:
 *       201:
 *         description: Cliente criado
 *       400:
 *         description: Dados inválidos
 */
router.post('/', (req, res) => {
  const resultado = criarCliente(req.body);
  if (resultado.erro) {
    return res.status(400).json(resultado);
  }
  res.status(201).json(resultado);
});

/**
 * @swagger
 * /clientes:
 *   get:
 *     summary: Listar todos os clientes
 *     responses:
 *       200:
 *         description: Lista de clientes retornada
 */
router.get('/', (req, res) => {
  const clientes = listarClientes();
  res.json(clientes);
});

/**
 * @swagger
 * /clientes/{codigo}:
 *   get:
 *     summary: Buscar cliente por código
 *     parameters:
 *       - in: path
 *         name: codigo
 *         schema:
 *           type: integer
 *         required: true
 *         description: Código do cliente
 *     responses:
 *       200:
 *         description: Cliente encontrado
 *       404:
 *         description: Cliente não encontrado
 */
router.get('/:codigo', (req, res) => {
  const cliente = buscarCliente(req.params.codigo);
  if (!cliente) {
    return res.status(404).json({ erro: 'Cliente não encontrado' });
  }
  res.json(cliente);
});

/**
 * @swagger
 * /clientes/{codigo}:
 *   put:
 *     summary: Atualizar cliente por código (exceto código)
 *     parameters:
 *       - in: path
 *         name: codigo
 *         schema:
 *           type: integer
 *         required: true
 *         description: Código do cliente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               cpf:
 *                 type: string
 *               endereco:
 *                 type: string
 *               telefone:
 *                 type: string
 *               email:
 *                 type: string
 *               dataCadastro:
 *                 type: string
 *     responses:
 *       200:
 *         description: Cliente atualizado
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Cliente não encontrado
 */
router.put('/:codigo', (req, res) => {
  const clienteExistente = buscarCliente(req.params.codigo);
  if (!clienteExistente) {
    return res.status(404).json({ erro: 'Cliente não encontrado' });
  }

  const resultado = atualizarCliente(req.params.codigo, req.body);
  if (resultado && resultado.erro) {
    return res.status(400).json(resultado);
  }

  res.json(resultado);
});

/**
 * @swagger
 * /clientes/{codigo}:
 *   patch:
 *     summary: Atualizar parcialmente campos do cliente
 *     parameters:
 *       - in: path
 *         name: codigo
 *         schema:
 *           type: integer
 *         required: true
 *         description: Código do cliente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               cpf:
 *                 type: string
 *               endereco:
 *                 type: string
 *               telefone:
 *                 type: string
 *               email:
 *                 type: string
 *               dataCadastro:
 *                 type: string
 *     responses:
 *       200:
 *         description: Cliente atualizado parcialmente
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Cliente não encontrado
 */
router.patch('/:codigo', (req, res) => {
  const clienteExistente = buscarCliente(req.params.codigo);
  if (!clienteExistente) {
    return res.status(404).json({ erro: 'Cliente não encontrado' });
  }

  const resultado = atualizarCliente(req.params.codigo, req.body);
  if (resultado && resultado.erro) {
    return res.status(400).json(resultado);
  }

  res.json(resultado);
});

/**
 * @swagger
 * /clientes/{codigo}:
 *   delete:
 *     summary: Remover cliente por código
 *     parameters:
 *       - in: path
 *         name: codigo
 *         schema:
 *           type: integer
 *         required: true
 *         description: Código do cliente
 *     responses:
 *       204:
 *         description: Cliente removido
 *       404:
 *         description: Cliente não encontrado
 */
router.delete('/:codigo', (req, res) => {
  const clienteExistente = buscarCliente(req.params.codigo);
  if (!clienteExistente) {
    return res.status(404).json({ erro: 'Cliente não encontrado' });
  }

  const removido = removerCliente(req.params.codigo);
  if (!removido) {
    return res.status(500).json({ erro: 'Erro ao remover cliente' });
  }

  res.status(204).send();
});

module.exports = router;