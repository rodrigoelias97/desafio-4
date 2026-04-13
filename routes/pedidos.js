// routes/pedidos.js
const express = require('express');
const router = express.Router();
const pedidosService = require('../src/services/pedidosService');

/**
 * @swagger
 * /pedidos:
 *   post:
 *     summary: Criar um pedido
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - itens
 *               - valor
 *               - email
 *             properties:
 *               itens:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     produto:
 *                       type: string
 *                     quantidade:
 *                       type: integer
 *               valor:
 *                 type: number
 *               email:
 *                 type: string
 *                 format: email
 *     responses:
 *       201:
 *         description: Pedido criado
 *       400:
 *         description: Dados inválidos
 */
router.post('/', (req, res) => {
  const resultado = pedidosService.criarPedido(req.body);
  if (resultado.erro) {
    return res.status(400).json(resultado);
  }
  res.status(201).json(resultado);
});

/**
 * @swagger
 * /pedidos/{codigo}:
 *   get:
 *     summary: Buscar pedido por código
 *     parameters:
 *       - in: path
 *         name: codigo
 *         schema:
 *           type: integer
 *         required: true
 *         description: Código do pedido
 *     responses:
 *       200:
 *         description: Pedido encontrado
 *       404:
 *         description: Pedido não encontrado
 */
router.get('/:codigo', (req, res) => {
  const resultado = pedidosService.buscarPedido(req.params.codigo);
  if (resultado.erro) {
    return res.status(404).json(resultado);
  }
  res.json(resultado);
});

/**
 * @swagger
 * /pedidos/{codigo}/status:
 *   patch:
 *     summary: Atualizar status do pedido
 *     parameters:
 *       - in: path
 *         name: codigo
 *         schema:
 *           type: integer
 *         required: true
 *         description: Código do pedido
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 example: aprovado
 *     responses:
 *       200:
 *         description: Status do pedido atualizado
 *       400:
 *         description: Pedido inválido ou transição não permitida
 *       404:
 *         description: Pedido não encontrado
 */
router.patch('/:codigo/status', (req, res) => {
  const { status } = req.body;
  const resultado = pedidosService.atualizarStatus(req.params.codigo, status);
  if (resultado.erro) {
    return res.status(400).json(resultado);
  }
  res.json(resultado);
});

module.exports = router;
