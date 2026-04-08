// Testes unitários para validations.js
const { validarCPF, validarTelefone, validarEmail, validarData, validarCliente } = require('../utils/validations');

describe('Validações utilitárias', () => {
  test('validarCPF deve aceitar CPF válido', () => {
    expect(validarCPF('12345678909')).toBe(true);
  });
  test('validarCPF deve recusar CPF inválido', () => {
    expect(validarCPF('11111111111')).toBe(false);
    expect(validarCPF('123')).toBe(false);
  });
  test('validarTelefone deve aceitar formato correto', () => {
    expect(validarTelefone('(11) 91234-5678')).toBe(true);
  });
  test('validarTelefone deve recusar formato incorreto', () => {
    expect(validarTelefone('11912345678')).toBe(false);
  });
  test('validarEmail deve aceitar email válido', () => {
    expect(validarEmail('teste@email.com')).toBe(true);
  });
  test('validarEmail deve recusar email inválido', () => {
    expect(validarEmail('teste@email')).toBe(false);
  });
  test('validarData deve aceitar data válida', () => {
    expect(validarData('01/01/2024')).toBe(true);
  });
  test('validarData deve recusar data inválida', () => {
    expect(validarData('32/01/2024')).toBe(false);
    expect(validarData('01/13/2024')).toBe(false);
  });
  test('validarCliente deve validar corretamente um cliente válido', () => {
    const cliente = { nome: 'Teste', cpf: '12345678909', dataCadastro: '01/01/2024', telefone: '(11) 91234-5678', email: 'teste@email.com' };
    const resultado = validarCliente(cliente);
    expect(resultado.valido).toBe(true);
    expect(resultado.erros.length).toBe(0);
  });
  test('validarCliente deve retornar erros para cliente inválido', () => {
    const cliente = { nome: '', cpf: '123', dataCadastro: '32/01/2024', telefone: '123', email: 'errado' };
    const resultado = validarCliente(cliente);
    expect(resultado.valido).toBe(false);
    expect(resultado.erros.length).toBeGreaterThan(0);
  });
});
