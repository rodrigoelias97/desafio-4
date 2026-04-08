// src/models/pedidosModel.js
// Modelo de dados em memória para pedidos

let pedidos = [];
let proximoCodigo = 1;

function criarPedido(pedido) {
  const novoPedido = { codigo: proximoCodigo++, status: 'criado', ...pedido };
  pedidos.push(novoPedido);
  return novoPedido;
}

function listarPedidos() {
  return pedidos;
}

function buscarPedidoPorCodigo(codigo) {
  return pedidos.find(p => p.codigo === parseInt(codigo, 10)) || null;
}

function atualizarStatusPedido(codigo, status) {
  const pedido = buscarPedidoPorCodigo(codigo);
  if (!pedido) return null;
  pedido.status = status;
  return pedido;
}

module.exports = {
  criarPedido,
  listarPedidos,
  buscarPedidoPorCodigo,
  atualizarStatusPedido
};
