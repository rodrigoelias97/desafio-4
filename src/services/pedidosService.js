// src/services/pedidosService.js
const {
  criarPedido: criarPedidoModel,
  listarPedidos: listarPedidosModel,
  buscarPedidoPorCodigo: buscarPedidoPorCodigoModel,
  atualizarStatusPedido: atualizarStatusPedidoModel
} = require('../models/pedidosModel');

function validarPedido(dados) {
  const erros = [];
  if (!dados.itens || !Array.isArray(dados.itens) || dados.itens.length === 0) {
    erros.push('Pedido deve conter ao menos um item');
  }
  if (typeof dados.valor !== 'number' || dados.valor <= 0) {
    erros.push('Valor inválido');
  }
  if (!dados.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(dados.email)) {
    erros.push('Email inválido');
  }
  return { valido: erros.length === 0, erros };
}

function criarPedido(dados) {
  const validacao = validarPedido(dados);
  if (!validacao.valido) {
    return { erro: 'Dados inválidos', detalhes: validacao.erros };
  }
  return criarPedidoModel(dados);
}

function listarPedidos() {
  return listarPedidosModel();
}

function buscarPedido(codigo) {
  const pedido = buscarPedidoPorCodigoModel(codigo);
  if (!pedido) return { erro: 'Pedido não encontrado' };
  return pedido;
}

function atualizarStatus(codigo, status) {
  const pedido = buscarPedidoPorCodigoModel(codigo);
  if (!pedido) return { erro: 'Pedido não encontrado' };
  if (pedido.status === 'aprovado' && status === 'cancelado') {
    return { erro: 'Não é possível cancelar um pedido aprovado' };
  }
  return atualizarStatusPedidoModel(codigo, status);
}

module.exports = {
  criarPedido,
  listarPedidos,
  buscarPedido,
  atualizarStatus
};
