const { app } = require('../src/server');
const { sequelize } = require('../src/models/index');
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
  afterEach(() => sequelize.drop());

  it('Creates an artist', async () => {
    const response = await request.post('/artist').send({
      name: 'Giveon',
      single: 'For Tonight',
    });
    expect(response.status).toBe(200);
    const artist = response.body;
    expect(artist.name).toBe('Giveon');
    expect(artist.single).toBe('For Tonight');
  });

  it('Get an artist', async () => {
    const response = await request.get('/artist/3');
    expect(response.status).toBe(200);
    const artist = response.body;
    expect(artist.name).toBe('The Weeknd');
    expect(artist.single).toBe('Out of Time');
  });

  it('Gets all artist', async () => {
    const response = await request.get('/artist');
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(5);
    const artist = response.body[2];
    expect(artist.name).toBe('JVKE');
    expect(artist.single).toBe('Golden Hour');
  });

  it('Updates an artist', async () => {
    const response = await request.put('/artist/18').send({
      single: 'Say So',
    });
    expect(response.status).toBe(200);
    const artist = response.body;
    expect(artist.name).toBe('Doja Cat');
    expect(artist.single).toBe('Say So');
  });

  it('It creates an artist with genres', async () => {
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
});


describe('Show Routes', () => {
  beforeEach(() => sequelize.sync());
  afterEach(() => sequelize.drop());

  it('Creates a show', async () => {
    const response = await request.post('/show').send({
      title: 'Wednesday Addams',
      released: 2022-11-23,
      episodes: 8,
    });
    expect(response.status).toBe(200);
    const show = response.body;
    expect(show.title).toBe('Wednesday Addams');
    expect(show.released).toBe(Date.parse(2022-11-23));
    expect(show.episodes).toBe(8);
  });

  it('Get a show', async () => {
    const response = await request.get('/show/1');
    expect(response.status).toBe(200);
    const show = response.body;
    expect(show.title).toBe('Demon Slayer');
    expect(show.released).toBe('2019-04-06T07:00:00.000Z');
    expect(show.episodes).toBe(26);
  });

  it('Gets all shows', async () => {
    const response = await request.get('/show');
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(4);
    const show = response.body[1];
    expect(show.title).toBe('House of the Dragon');
    expect(show.released).toBe('2022-08-21T07:00:00.000Z');
    expect(show.episodes).toBe(10);
  });

  it('Updates a show', async () => {
    const response = await request.put('/show/3').send({
      episodes: 23,
    });
    expect(response.status).toBe(200);
    const show = response.body;
    expect(show.title).toBe('The Boys');
    expect(show.released).toBe('2019-07-26T07:00:00.000Z');
    expect(show.episodes).toBe(23);
  });
});