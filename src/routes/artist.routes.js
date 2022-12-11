const express = require('express');

const { Artist } = require('../models/index');

const artistRoutes = express();

// RESTful Route Declarations
artistRoutes.get('/artist', getArtists); // Retrieve All
artistRoutes.get('/artist/:id', getArtist); // Retrieve One
artistRoutes.post('/artist', createArtist); // Create
artistRoutes.put('/artist/:id', updateArtist); // Update
artistRoutes.delete('/artist/:id', deleteArtist); // Delete

async function getArtists(_, res) {
  const allArtist = await Artist.findAll();
  res.json(allArtist);
}

async function getArtist(req, res, next) {
  const id = req.params.id;
  const artist = await Artist.findOne({ where: { id: id } });
  if (artist === null) {
    next();
  } else {
    res.json(artist);
  }
}

async function deleteArtist(req, res, next) {
  const id = req.params.id;
  const artist = await Artist.findOne({ where: { id: id } });
  if (artist === null) {
    next();
  } else {
    await artist.destroy();
    res.json({});
  }
}

async function createArtist(req, res) {
  const { name, genre, single } = req.body;
  const artist = await Artist.create({
    name,
    genre,
    single
  });
  res.json(artist);
}

async function updateArtist(req, res, next) {
  const id = req.params.id;
  let artist = await Artist.findOne({ where: { id: id } });
  if (artist == null) {
    next();
  } else {
    const name = req.body.name ?? artist.name;
    const genre = req.body.genre ?? artist.genre;
    const single = req.body.single ?? artist.single;
    let updatedArtist = {
      name,
      genre,
      single
    };

    artist = await artist.update(updatedArtist);

    res.json(artist);
  }
}

module.exports = {
  artistRoutes,
};