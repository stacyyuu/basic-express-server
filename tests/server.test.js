const { app } = require('../src/server');
const supertest = require('supertest');

const request = supertest(app);

describe('Person Route', () => {
  // Person Route
  // Method: GET
  // Path: /person
  // Expects a query string from the user with a “name” property
  test('When query string present, output JSON to the client with this shape: { name: "name provided" }', async () => {
    const response = await request.get('/person?name=Gandalf');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ name: 'Gandalf' });
  });

  test('When query string present with a different name, output JSON to the client with this shape: { name: "name provided" }', async () => {
    const response = await request.get('/person?name=Frodo');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ name: 'Frodo' });
  });

  test('Without a name in the query string, force a “500” error', async () => {
    const response = await request.get('/person');
    expect(response.statusCode).toBe(500);
  });
});