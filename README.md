Rodrigo Elias
drigoelias
Disponível

Rodrigo Elias — Ontem às 20:46
Do localhost
Raquel Paredes — Ontem às 20:46
Falo pq encontrei alguns erros ao testar o cadastro de clientes atraves do swagger
Rodrigo Elias — Ontem às 20:46
Mas o nosso foco no desafio é o teste automatizado pelo script
Rodrigo Elias — Ontem às 20:46
O que seria?
Que o readme acho que consigo ajustar pelo chat gpt
Raquel Paredes — Ontem às 20:47
reportei acima. Foram alguns erros de status code.
Rodrigo Elias — Ontem às 20:47
Mas se tiver que alterar a API acredito que teria que ser alguém que tem ainda possibilidade de fazer pelo copilot
Que eu to sem limite de uso
Raquel Paredes — Ontem às 20:47
Pois é. Tenho um pouco de receio de pedir ao Copilot para fazer ajustes e não dar certo. 
POr isso me dipus a fazer em grupo
Rodrigo Elias — Ontem às 20:48
Mas os de status o @Gilson Rodrigues tinha ajustado não?!
Raquel Paredes — Ontem às 20:49
Sim sim
ficou certinho o cadastro de cliente
Rodrigo Elias — Ontem às 20:49
Aaah certo
Seria apenas então do swagger para ver se conseguia ver esses mesmos erros né
Raquel Paredes — Ontem às 20:49
Isso mesmo
Rodrigo Elias — Ontem às 20:52
Vou tentar dar uma olhada aqui nesses ajustes
Raquel Paredes — Ontem às 20:52
Rodrigo se quiser me passa o prompt que você acha que irá funcionar e eu rodo no Copilot aqui.
Rodrigo Elias — Ontem às 20:53
Vou tentar rodar a alteração pelo computador da empresa que tem a versão paga
Só não vou conseguir commitar pq fica vinculado ao meu git empresarial
Mas daí consigo mandar o arquivo aqui para só enviarmos para o git
Raquel Paredes — Ontem às 20:55
Tá certo. Se precisar que eu te ajude me fala aqui que amanhã vejo e faço.
Rodrigo Elias — Ontem às 21:12
Consegui alterar esse arquivos pra ajustar o readme, e o swagger. No arquivo pedidos.js a IA só colocou comentarios para nortear aonde levou os dados do swagger, nao mexeu em nenhum código da API.
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
... (81 linhas)

README.md
5 KB
// swagger.js
// Configuração do Swagger para documentação da API

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

swagger.js
1 KB
// routes/pedidos.js
const express = require('express');
const router = express.Router();
const pedidosService = require('../src/services/pedidosService');

/**

pedidos.js
3 KB
Ja vou deixar os arquivos aqui
mas por enquanto nao precisa fazer nada @Raquel Paredes
Amanha vejo contigo de substituirmos, vermos se roda ai também e enviarmos pro git
aqui rodou certinho
Raquel Paredes — Ontem às 21:14
Tá certo Rodrigo. Amanhã por volta das 18 h vou ficar online aí você pode me chamar que fazemos juntos aqui.
Rodrigo Elias — Ontem às 21:14
Perfeito
Raquel Paredes — Ontem às 21:15
Obrigada Rodrigo!
Rodrigo Elias — Ontem às 21:15
amanhã também eu baixo aqui no meu pc pessoal esses arquivos e testo
qualquer coisa também consigo enviar pro git por aqui
mas bom dai eu mudar contigo na tua maquina
pra conferir que ta rodando
Raquel Paredes — Ontem às 21:15
Tá certo!
Rafael Angelo da Costa — 10:40
Bom dia pessoal tudo bem?
Desculpa ausência final de semana foi mais intenso..
Então estou vendo aqui que hoje vão se reunir eu quero participar nestes ajustes, creio que o trabalho esta na linha certa, não deve ser uma coisa tão complexa para termos um norte no que fazer e entregar...
assim que logarem avisa que vou participar temos que alinhar para entregar o trabalho o quanto antes.
Gilson Rodrigues — 16:15
Boa tarde pessoal caso forem reunir hoje eu tbm entro
Raquel Paredes — 16:50
Boa tarde, pessoal! Segue a apresentação que fiz para atualizar com a parte de pedidos. Qualquer ajuste que precisar é só me falar que eu faço antes de entregar. Por volta das 18:15 estarei chegando em casa e entrarei aqui para reunião.
Tipo de arquivo em anexo: document
Desafio 4 _ Mentoria 2.0.pptx
7.78 MB
﻿
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