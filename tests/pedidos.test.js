// tests/pedidos.test.js
const request = require('supertest');
const express = require('express');
const pedidosRoutes = require('../routes/pedidos');

// Cria uma instância isolada do app para teste
const app = express();
app.use(express.json());
app.use('/pedidos', pedidosRoutes);

describe('Endpoints de Pedidos', () => {
  let codigoPedido;

  test('✔ Criar pedido com sucesso (201)', async () => {
    const res = await request(app)
      .post('/pedidos')
      .send({
        itens: [{ produto: 'Livro', quantidade: 2 }],
        valor: 100,
        email: 'cliente@email.com'
      });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('codigo');
    codigoPedido = res.body.codigo;
  });

  test('✔ Valor inválido (400)', async () => {
    const res = await request(app)
      .post('/pedidos')
      .send({ itens: [{ produto: 'Livro', quantidade: 2 }], valor: -10, email: 'cliente@email.com' });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('erro');
  });

  test('✔ Pedido sem itens (400)', async () => {
    const res = await request(app)
      .post('/pedidos')
      .send({ itens: [], valor: 50, email: 'cliente@email.com' });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('erro');
  });

  test('✔ Email inválido (400)', async () => {
    const res = await request(app)
      .post('/pedidos')
      .send({ itens: [{ produto: 'Livro', quantidade: 2 }], valor: 50, email: 'errado' });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('erro');
  });

  test('✔ Buscar pedido existente (200)', async () => {
    // Cria um pedido para garantir que existe
    const createRes = await request(app)
      .post('/pedidos')
      .send({ itens: [{ produto: 'Livro', quantidade: 1 }], valor: 30, email: 'busca@email.com' });
    const codigo = createRes.body.codigo;
    const res = await request(app).get(`/pedidos/${codigo}`);
    expect(res.status).toBe(200);
    expect(res.body.codigo).toBe(codigo);
  });

  test('✔ Buscar pedido inexistente (404)', async () => {
    const res = await request(app).get('/pedidos/99999');
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('erro');
  });

  test('✔ Atualizar status com sucesso (200)', async () => {
    // Cria um pedido para atualizar
    const createRes = await request(app)
      .post('/pedidos')
      .send({ itens: [{ produto: 'Livro', quantidade: 1 }], valor: 30, email: 'status@email.com' });
    const codigo = createRes.body.codigo;
    const res = await request(app)
      .patch(`/pedidos/${codigo}/status`)
      .send({ status: 'aprovado' });
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('aprovado');
  });

  test('✔ Impedir cancelamento de pedido aprovado (400)', async () => {
    // Cria e aprova um pedido
    const createRes = await request(app)
      .post('/pedidos')
      .send({ itens: [{ produto: 'Livro', quantidade: 1 }], valor: 30, email: 'cancelar@email.com' });
    const codigo = createRes.body.codigo;
    await request(app)
      .patch(`/pedidos/${codigo}/status`)
      .send({ status: 'aprovado' });
    // Tenta cancelar
    const res = await request(app)
      .patch(`/pedidos/${codigo}/status`)
      .send({ status: 'cancelado' });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('erro');
  });
});
