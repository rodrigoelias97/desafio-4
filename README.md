# API de Clientes - Node.js com Express

Esta é uma API REST simples para cadastro de clientes, desenvolvida em Node.js utilizando o framework Express. Os dados são armazenados apenas em memória (array), sem uso de banco de dados.

## Funcionalidades

- Cadastro de clientes com validações
- Listagem de todos os clientes
- Busca de cliente por código
- Atualização de dados do cliente (exceto código)
- Remoção de cliente

## Estrutura do Cliente

- `codigo`: Gerado automaticamente (único, incremental)
- `nome`: Obrigatório, máximo 44 caracteres
- `cpf`: Obrigatório, único, 11 dígitos com validação de dígito verificador
- `endereco`: Opcional, texto livre
- `telefone`: Opcional, formato (XX) XXXXX-XXXX
- `email`: Opcional, formato válido
- `dataCadastro`: Obrigatório, formato DD/MM/AAAA

## Endpoints

- `POST /clientes` - Criar cliente
- `GET /clientes` - Listar todos os clientes
- `GET /clientes/:codigo` - Buscar cliente por código
- `PUT /clientes/:codigo` - Atualizar cliente
- `PATCH /clientes/:codigo` - Atualizar parcialmente cliente
- `DELETE /clientes/:codigo` - Remover cliente

## Como executar

1. Instale as dependências:
   ```
   npm install
   ```

2. Execute o servidor:
   ```
   npm start
   ```

3. A API estará disponível em `http://localhost:3000`

4. Acesse a documentação interativa da API via Swagger em `http://localhost:3000/api-docs`

## Exemplos de uso

### Criar cliente
```bash
POST /clientes
Content-Type: application/json

{
  "nome": "João Silva",
  "cpf": "12345678901",
  "endereco": "Rua das Flores, 123",
  "telefone": "(48) 99999-9999",
  "email": "joao@email.com",
  "dataCadastro": "01/04/2026"
}
```

### Listar clientes
```bash
GET /clientes
```

### Buscar cliente
```bash
GET /clientes/1
```

### Atualizar cliente
```bash
PUT /clientes/1
Content-Type: application/json

{
  "nome": "João Silva Santos",
  "telefone": "(48) 88888-8888"
}
```

### Atualizar parcialmente cliente
```bash
PATCH /clientes/1
Content-Type: application/json

{
  "telefone": "(48) 77777-7777"
}
```

### Remover cliente
```bash
DELETE /clientes/1
```

## Validações

- CPF: Deve ser válido segundo algoritmo brasileiro e único
- Nome: Máximo 44 caracteres
- Telefone: Formato brasileiro (XX) XXXXX-XXXX
- Email: Formato válido
- Data: Formato DD/MM/AAAA e data válida

## Estrutura do projeto

- `app.js`: Arquivo principal
- `swagger.js`: Configuração do Swagger para documentação da API
- `rest/routes/clientes.js`: Rotas da API com documentação Swagger
- `src/models/clientesModel.js`: Modelo de dados do cliente
- `src/services/clientesService.js`: Lógica de negócio para clientes
- `utils/validations.js`: Validações de dados
- `utils/validations.js`: Validações manuais