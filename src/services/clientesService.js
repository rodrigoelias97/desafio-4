// src/services/clientesService.js
// Lógica de negócio e regras de validação para clientes

const {
  adicionarCliente: adicionarClienteModel,
  listarClientes: listarClientesModel,
  buscarClientePorCodigo: buscarClientePorCodigoModel,
  atualizarCliente: atualizarClienteModel,
  removerCliente: removerClienteModel,
  cpfJaExiste
} = require('../models/clientesModel');

const { validarCliente } = require('../../utils/validations');

function criarCliente(dados) {
  const validacao = validarCliente(dados);
  if (!validacao.valido) {
    return { erro: 'Dados inválidos', detalhes: validacao.erros };
  }

  if (cpfJaExiste(dados.cpf)) {
    return { erro: 'CPF já cadastrado' };
  }

  const cliente = adicionarClienteModel(dados);
  return cliente;
}

function listarClientes() {
  return listarClientesModel();
}

function buscarCliente(codigo) {
  return buscarClientePorCodigoModel(codigo);
}

function atualizarCliente(codigo, dadosAtualizados) {
  const validacao = validarCliente(dadosAtualizados, true);
  if (!validacao.valido) {
    return { erro: 'Dados inválidos', detalhes: validacao.erros };
  }

  if (dadosAtualizados.cpf && cpfJaExiste(dadosAtualizados.cpf, parseInt(codigo, 10))) {
    return { erro: 'CPF já cadastrado por outro cliente' };
  }

  const clienteAtualizado = atualizarClienteModel(codigo, dadosAtualizados);
  return clienteAtualizado;
}

function removerCliente(codigo) {
  return removerClienteModel(codigo);
}

module.exports = {
  criarCliente,
  listarClientes,
  buscarCliente,
  atualizarCliente,
  removerCliente
};