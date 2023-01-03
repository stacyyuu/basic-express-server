const { app } = require('../src/server');
const { sequelize } = require('../auth/models/index.js');
const supertest = require('supertest');

const request = supertest(app);

describe('Basic Auth Tests', () => {
  beforeEach(() => sequelize.sync());

  test('POST to /signup', async () => {
    const response = await request.post('/signup').send({
      username: 'stacy',
      password: 'maru430',
    });
    expect(response.status).toBe(201);
    const user = response.body;
    expect(user.username).toEqual('stacy');
  });

  test('POST to /signin', async () => {
    await request.post('/signin').send({
      username: 'stacy',
      password: 'maru430',
    });
    const response = await request.post('/signin').auth('Basic stacy:maru430');
    expect(response.status).toBe(200);
    const user = response.body;
    expect(user.username).toEqual('stacy');
  });
});
