// routes/pedidos.js
const express = require('express');
const router = express.Router();
const pedidosService = require('../src/services/pedidosService');

router.post('/', (req, res) => {
  const resultado = pedidosService.criarPedido(req.body);
  if (resultado.erro) {
    return res.status(400).json(resultado);
  }
  res.status(201).json(resultado);
});

router.get('/:codigo', (req, res) => {
  const resultado = pedidosService.buscarPedido(req.params.codigo);
  if (resultado.erro) {
    return res.status(404).json(resultado);
  }
  res.json(resultado);
});

router.patch('/:codigo/status', (req, res) => {
  const { status } = req.body;
  const resultado = pedidosService.atualizarStatus(req.params.codigo, status);
  if (resultado.erro) {
    return res.status(400).json(resultado);
  }
  res.json(resultado);
});

module.exports = router;
