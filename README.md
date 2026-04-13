# API de Clientes e Pedidos - Node.js com Express

Esta é uma API REST simples para cadastro de clientes e gerenciamento de pedidos, desenvolvida em Node.js utilizando o framework Express. Os dados são armazenados apenas em memória (array), sem uso de banco de dados.

## Funcionalidades

- Cadastro de clientes com validações
- Listagem de todos os clientes
- Busca de cliente por código
- Atualização de dados do cliente (exceto código)
- Remoção de cliente
- Criação de pedidos com validações
- Busca de pedido por código
- Atualização de status do pedido

## Estrutura do Cliente

- `codigo`: Gerado automaticamente (único, incremental)
- `nome`: Obrigatório, máximo 44 caracteres
- `cpf`: Obrigatório, único, 11 dígitos com validação de dígito verificador
- `endereco`: Opcional, texto livre
- `telefone`: Opcional, formato (XX) XXXXX-XXXX
- `email`: Opcional, formato válido
- `dataCadastro`: Obrigatório, formato DD/MM/AAAA

## Estrutura do Pedido

- `codigo`: Gerado automaticamente (único, incremental)
- `status`: Gerado automaticamente com valor inicial `criado`
- `itens`: Obrigatório, array com ao menos um item
- `valor`: Obrigatório, número maior que zero
- `email`: Obrigatório, formato válido

### Estrutura de cada item do pedido

- `produto`: Nome ou descrição do produto
- `quantidade`: Quantidade solicitada

## Endpoints

- `POST /clientes` - Criar cliente
- `GET /clientes` - Listar todos os clientes
- `GET /clientes/:codigo` - Buscar cliente por código
- `PUT /clientes/:codigo` - Atualizar cliente
- `PATCH /clientes/:codigo` - Atualizar parcialmente cliente
- `DELETE /clientes/:codigo` - Remover cliente
- `POST /pedidos` - Criar pedido
- `GET /pedidos/:codigo` - Buscar pedido por código
- `PATCH /pedidos/:codigo/status` - Atualizar status do pedido

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

### Criar pedido
```bash
POST /pedidos
Content-Type: application/json

{
  "itens": [
    {
      "produto": "Notebook",
      "quantidade": 1
    },
    {
      "produto": "Mouse",
      "quantidade": 2
    }
  ],
  "valor": 4599.9,
  "email": "joao@email.com"
}
```

### Buscar pedido
```bash
GET /pedidos/1
```

### Atualizar status do pedido
```bash
PATCH /pedidos/1/status
Content-Type: application/json

{
  "status": "aprovado"
}
```

## Validações

- CPF: Deve ser válido segundo algoritmo brasileiro e único
- Nome: Máximo 44 caracteres
- Telefone: Formato brasileiro (XX) XXXXX-XXXX
- Email: Formato válido
- Data: Formato DD/MM/AAAA e data válida
- Pedido: Deve conter ao menos um item
- Valor do pedido: Deve ser um número maior que zero
- Email do pedido: Deve estar em formato válido
- Status: Um pedido aprovado não pode ser cancelado

## Estrutura do projeto

- `app.js`: Arquivo principal
- `swagger.js`: Configuração do Swagger para documentação da API
- `rest/routes/clientes.js`: Rotas da API com documentação Swagger
- `routes/pedidos.js`: Rotas de pedidos com documentação Swagger
- `src/models/clientesModel.js`: Modelo de dados do cliente
- `src/models/pedidosModel.js`: Modelo de dados do pedido
- `src/services/clientesService.js`: Lógica de negócio para clientes
- `src/services/pedidosService.js`: Lógica de negócio para pedidos
- `utils/validations.js`: Validações de dados
- `tests/clientesService.test.js`: Testes dos serviços de clientes
- `tests/pedidos.test.js`: Testes das rotas e regras de pedidos
- `tests/validations.test.js`: Testes das validações