// src/models/clientesModel.js
// Modelo de dados em memória (sem banco de dados)

let clientes = [];
let proximoCodigo = 1;

function adicionarCliente(cliente) {
  const novoCliente = { codigo: proximoCodigo++, ...cliente };
  clientes.push(novoCliente);
  return novoCliente;
}

function listarClientes() {
  return clientes;
}

function buscarClientePorCodigo(codigo) {
  return clientes.find(c => c.codigo === parseInt(codigo, 10)) || null;
}

function atualizarCliente(codigo, dadosAtualizados) {
  const index = clientes.findIndex(c => c.codigo === parseInt(codigo, 10));
  if (index === -1) return null;
  const { codigo: _, ...dados } = dadosAtualizados;
  clientes[index] = { ...clientes[index], ...dados };
  return clientes[index];
}

function removerCliente(codigo) {
  const index = clientes.findIndex(c => c.codigo === parseInt(codigo, 10));
  if (index === -1) return false;
  clientes.splice(index, 1);
  return true;
}

function cpfJaExiste(cpf, excluirCodigo = null) {
  return clientes.some(c => c.cpf === cpf && c.codigo !== excluirCodigo);
}

module.exports = {
  adicionarCliente,
  listarClientes,
  buscarClientePorCodigo,
  atualizarCliente,
  removerCliente,
  cpfJaExiste
};