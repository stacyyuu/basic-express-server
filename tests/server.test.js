const { app } = require('../src/server');
const { sequelize } = require('../src/models');
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

describe('Artist Routes', () => {
  beforeEach(() => sequelize.sync());

  test('Creates an artist', async () => {
    const response = await request.post('/artist').send({
      name: 'Giveon',
      single: 'For Tonight',
    });
    const response2 = await request.post('/artist').send({
      name: 'JVKE',
      single: 'Golden Hour',
    });
    const response3 = await request.post('/artist').send({
      name: 'The Weeknd',
      single: 'Out of Time',
    });
  const response4 = await request.post('/artist').send({
      name: 'Doja Cat',
      single: 'Meow',
    });

    expect(response.status).toBe(200);
    expect(response2.status).toBe(200);
    expect(response3.status).toBe(200);
    expect(response4.status).toBe(200);
    const artist = response.body;
    expect(artist.name).toEqual('Giveon');
    expect(artist.single).toEqual('For Tonight');
  });

  test('Get an artist', async () => {
    const response = await request.get('/artist/3');
    expect(response.status).toBe(200);
    const artist = response.body;
    expect(artist.name).toEqual('The Weeknd');
    expect(artist.single).toEqual('Out of Time');
  });

  test('Gets all artist', async () => {
    const response = await request.get('/artist');
    expect(response.status).toBe(200);
    expect(response.body.length).toEqual(4);
    const artist = response.body[1];
    expect(artist.name).toEqual('JVKE');
    expect(artist.single).toEqual('Golden Hour');
  });

  test('Updates an artist', async () => {
    const response = await request.put('/artist/4').send({
      single: 'Say So',
    });
    expect(response.status).toBe(200);
    const artist = response.body;
    expect(artist.name).toEqual('Doja Cat');
    expect(artist.single).toEqual('Say So');
  });

  test('It creates an artist with genres', async () => {
    const response = await request.post('/artist').send({
      name: 'Majid Jordan',
      single: 'Gave Your Love Away',
      genres: ['R&B', 'Soul', 'Alternate R&B'],
    });

    expect(response.status).toBe(200);
    const id = response.body.id;
    const artist = await request.get(`/artist/${id}`);
    expect(artist.status).toBe(200);
    expect(artist.body.genres).toEqual(['R&B', 'Soul', 'Alternate R&B']);
  });

  test('Deletes a single artist', async () => {
    await request.delete('/artist/1');
    const response = await request.get('/artist');
    expect(response.body[0].name).toEqual('JVKE');
    expect(response.body[0].single).toEqual('Golden Hour');
  });
});



describe('Show Routes', () => {
  beforeEach(() => sequelize.sync());

  test('Creates a show', async () => {
    const response = await request.post('/show').send({
      title: 'Wednesday Addams',
      released: '2022-11-23',
      episodes: 8,
    });
    const response2 = await request.post('/show').send({
      title: 'Demon Slayer',
      released: '2019-04-06',
      episodes: 26,
    });
    const response3 = await request.post('/show').send({
      title: 'House of the Dragon',
      released: '2022-08-21',
      episodes: 10,
    });
    const response4 = await request.post('/show').send({
      title: 'The Boys',
      released: '2019-07-26',
      episodes: 24,
    });
    expect(response.status).toBe(200);
    expect(response2.status).toBe(200);
    expect(response3.status).toBe(200);
    expect(response4.status).toBe(200);
    const show = response.body;
    expect(show.title).toEqual('Wednesday Addams');
    expect(show.released).toEqual('2022-11-23');
    expect(show.episodes).toEqual(8);
  });

  test('Get a show', async () => {
    const response = await request.get('/show/2');
    expect(response.status).toBe(200);
    const show = response.body;
    expect(show.title).toEqual('Demon Slayer');
    expect(show.released).toEqual('2019-04-06');
    expect(show.episodes).toEqual(26);
  });

  test('Gets all shows', async () => {
    const response = await request.get('/show');
    expect(response.status).toBe(200);
    expect(response.body.length).toEqual(4);
    const show = response.body[2];
    expect(show.title).toEqual('House of the Dragon');
    expect(show.released).toEqual('2022-08-21');
    expect(show.episodes).toEqual(10);
  });

  test('Updates a show', async () => {
    const response = await request.put('/show/4').send({
      episodes: 23,
    });
    expect(response.status).toBe(200);
    const show = response.body;
    expect(show.title).toEqual('The Boys');
    expect(show.released).toEqual('2019-07-26');
    expect(show.episodes).toEqual(23);
  });

  test('Deletes a single show', async () => {
    await request.delete('/show/1');
    let response = await request.get('/show');
    expect(response.body[0].title).toEqual('Demon Slayer');
    expect(response.body[0].released).toEqual('2019-04-06');
    expect(response.body[0].episodes).toEqual(26);
  });
});
