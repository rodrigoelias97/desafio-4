// Testes unitários para clientesService.js
const clientesService = require('../src/services/clientesService');
const clientesModel = require('../src/models/clientesModel');
const { validarCliente } = require('../utils/validations');

describe('clientesService', () => {
  beforeEach(() => {
    // Limpa o array de clientes antes de cada teste
    while (clientesModel.listarClientes().length > 0) {
      clientesModel.removerCliente(clientesModel.listarClientes()[0].codigo);
    }
  });

  test('criarCliente deve adicionar um cliente válido', () => {
    const dados = {
      nome: 'João',
      cpf: '12345678909',
      dataCadastro: '01/01/2024',
      telefone: '(11) 91234-5678',
      email: 'joao@email.com'
    };
    const cliente = clientesService.criarCliente(dados);
    expect(cliente).toHaveProperty('codigo');
    expect(cliente.nome).toBe('João');
  });

  test('criarCliente deve recusar CPF já cadastrado', () => {
    const dados = {
      nome: 'Maria',
      cpf: '12345678909',
      dataCadastro: '01/01/2024'
    };
    clientesService.criarCliente(dados);
    const resultado = clientesService.criarCliente(dados);
    expect(resultado).toHaveProperty('erro', 'CPF já cadastrado');
  });

  test('listarClientes deve retornar todos os clientes', () => {
    clientesService.criarCliente({ nome: 'A', cpf: '12345678909', dataCadastro: '01/01/2024' });
    clientesService.criarCliente({ nome: 'B', cpf: '98765432100', dataCadastro: '02/01/2024' });
    const lista = clientesService.listarClientes();
    expect(lista.length).toBe(2);
  });

  test('buscarCliente deve retornar cliente pelo código', () => {
    const cliente = clientesService.criarCliente({ nome: 'C', cpf: '12345678909', dataCadastro: '01/01/2024' });
    const buscado = clientesService.buscarCliente(cliente.codigo);
    expect(buscado).toEqual(cliente);
  });

  test('atualizarCliente deve alterar dados do cliente', () => {
    const cliente = clientesService.criarCliente({ nome: 'D', cpf: '12345678909', dataCadastro: '01/01/2024' });
    const atualizado = clientesService.atualizarCliente(cliente.codigo, { nome: 'Novo Nome' });
    expect(atualizado.nome).toBe('Novo Nome');
  });

  test('removerCliente deve excluir cliente', () => {
    const cliente = clientesService.criarCliente({ nome: 'E', cpf: '12345678909', dataCadastro: '01/01/2024' });
    const removido = clientesService.removerCliente(cliente.codigo);
    expect(removido).toBe(true);
    expect(clientesService.buscarCliente(cliente.codigo)).toBeNull();
  });
});
