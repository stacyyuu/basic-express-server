const express = require('express');

const { Artist, Genre } = require('../models/index');

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
  const artist = await Artist.findOne({ 
    where: { id: id },
    include: Genre, 
  });
  if (artist === null) {
    next();
  } else {
    const rawArtist = {
      id: artist.id,
      name: artist.name,
      single: artist.single,
      genres: artist.Genres.map((genre) => genre.name),
    };
    res.json(rawArtist);
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
  const { name, single } = req.body;
  const artist = await Artist.create({
    name,
    single,
  });
  const genres = req.body.genres ?? [];
  for (const name of genres) {
    await artist.createGenre({ name });
  }

  res.json(artist);
}

async function updateArtist(req, res, next) {
  const id = req.params.id;
  let artist = await Artist.findOne({ where: { id: id } });
  if (artist == null) {
    next();
  } else {
    const name = req.body.name ?? artist.name;
    const single = req.body.single ?? artist.single;
    let updatedArtist = {
      name,
      single,
    };

    artist = await artist.update(updatedArtist);

    res.json(artist);
  }
}

module.exports = {
  artistRoutes,
};
