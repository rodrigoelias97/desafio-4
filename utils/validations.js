// utils/validations.js
// Arquivo responsável pelas validações manuais dos dados do cliente

/**
 * Valida se o CPF é válido usando o algoritmo de dígito verificador brasileiro
 * @param {string} cpf - CPF a ser validado (11 dígitos)
 * @returns {boolean} - True se válido, false caso contrário
 */
function validarCPF(cpf) {
  // Remove caracteres não numéricos
  cpf = cpf.replace(/\D/g, '');

  // Verifica se tem 11 dígitos
  if (cpf.length !== 11) return false;

  // Verifica se todos os dígitos são iguais (CPF inválido)
  if (/^(\d)\1+$/.test(cpf)) return false;

  // Calcula o primeiro dígito verificador
  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += parseInt(cpf[i]) * (10 - i);
  }
  let resto = (soma * 10) % 11;
  let digito1 = resto === 10 ? 0 : resto;

  // Calcula o segundo dígito verificador
  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += parseInt(cpf[i]) * (11 - i);
  }
  resto = (soma * 10) % 11;
  let digito2 = resto === 10 ? 0 : resto;

  // Verifica se os dígitos calculados batem com os informados
  return digito1 === parseInt(cpf[9]) && digito2 === parseInt(cpf[10]);
}

/**
 * Valida se o telefone segue o formato brasileiro (XX) XXXXX-XXXX
 * @param {string} telefone - Telefone a ser validado
 * @returns {boolean} - True se válido, false caso contrário
 */
function validarTelefone(telefone) {
  const regex = /^\(\d{2}\) \d{5}-\d{4}$/;
  return regex.test(telefone);
}

/**
 * Valida se o email tem formato válido
 * @param {string} email - Email a ser validado
 * @returns {boolean} - True se válido, false caso contrário
 */
function validarEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

/**
 * Valida se a data está no formato DD/MM/AAAA e é uma data válida
 * @param {string} data - Data a ser validada
 * @returns {boolean} - True se válida, false caso contrário
 */
function validarData(data) {
  const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
  const match = data.match(regex);
  if (!match) return false;

  const dia = parseInt(match[1], 10);
  const mes = parseInt(match[2], 10);
  const ano = parseInt(match[3], 10);

  // Verifica se o mês é válido
  if (mes < 1 || mes > 12) return false;

  // Verifica se o dia é válido para o mês
  const diasNoMes = [31, (ano % 4 === 0 && ano % 100 !== 0) || ano % 400 === 0 ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (dia < 1 || dia > diasNoMes[mes - 1]) return false;

  return true;
}

/**
 * Valida os dados do cliente
 * @param {object} cliente - Objeto cliente a ser validado
 * @param {boolean} isUpdate - Se é atualização (não valida campos obrigatórios se não fornecidos)
 * @returns {object} - { valido: boolean, erros: array }
 */
function validarCliente(cliente, isUpdate = false) {
  const erros = [];

  // Validações obrigatórias (sempre, exceto em update se não fornecido)
  if (!isUpdate || cliente.nome !== undefined) {
    if (!cliente.nome || typeof cliente.nome !== 'string') {
      erros.push('Nome é obrigatório');
    } else if (cliente.nome.length > 44) {
      erros.push('Nome não pode ultrapassar 44 caracteres');
    }
  }

  if (!isUpdate || cliente.cpf !== undefined) {
    if (!cliente.cpf || typeof cliente.cpf !== 'string') {
      erros.push('CPF é obrigatório');
    } else if (!validarCPF(cliente.cpf)) {
      erros.push('CPF inválido');
    }
  }

  if (!isUpdate || cliente.dataCadastro !== undefined) {
    if (!cliente.dataCadastro || typeof cliente.dataCadastro !== 'string') {
      erros.push('Data de cadastro é obrigatória');
    } else if (!validarData(cliente.dataCadastro)) {
      erros.push('Data de cadastro deve estar no formato DD/MM/AAAA e ser válida');
    }
  }

  // Validações opcionais
  if (cliente.telefone && !validarTelefone(cliente.telefone)) {
    erros.push('Telefone deve seguir o formato (XX) XXXXX-XXXX');
  }

  if (cliente.email && !validarEmail(cliente.email)) {
    erros.push('Email deve ter formato válido');
  }

  return {
    valido: erros.length === 0,
    erros
  };
}

module.exports = {
  validarCPF,
  validarTelefone,
  validarEmail,
  validarData,
  validarCliente
};