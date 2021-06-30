const supertest = require('supertest');
const app = require('../index');

describe('ShortURLController', () => {
  test('Espero que volte algo na listagem da API', async () => {
    const list = await supertest(app).get("/");

    const resConverted = JSON.parse(JSON.stringify(list.body.data));

    expect(resConverted.length).toBeGreaterThan(0);
  })
})