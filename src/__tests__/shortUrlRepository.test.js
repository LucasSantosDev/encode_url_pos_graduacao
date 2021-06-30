const shortUrlReposiroty = require('../repository/shortUrl');

describe('ShortURLRepository', () => {
  test('Espero que volte algo na listagem', async () => {
    await shortUrlReposiroty.create();

    const list = await shortUrlReposiroty.listAll();

    const resConverted = JSON.parse(JSON.stringify(list));

    expect(resConverted.length).toBeGreaterThan(0);
  })
})