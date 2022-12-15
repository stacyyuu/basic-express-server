const express = require('express');

const { Show } = require('../models/index');

const showRoutes = express();

// RESTful Route Declarations
showRoutes.get('/show', getShows); // Retrieve All
showRoutes.get('/show/:id', getShow); // Retrieve One
showRoutes.post('/show', createShow); // Create
showRoutes.put('/show/:id', updateShow); // Update
showRoutes.delete('/show/:id', deleteShow); // Delete

async function getShows(_, res) {
  const allShow = await Show.findAll();
  res.json(allShow);
}

async function getShow(req, res, next) {
  const id = req.params.id;
  const show = await Show.findOne({ 
    where: { id: id },
  });
  if (show === null) {
    next();
  } else {
    const rawShow = {
      id: show.id,
      released: show.released,
      episodes: show.episodes,
    };

    res.json(rawShow);
  }
}

async function deleteShow(req, res, next) {
  const id = req.params.id;
  const show = await Show.findOne({ where: { id: id } });
  if (show === null) {
    next();
  } else {
    await show.destroy();
    res.json({});
  }
}

async function createShow(req, res) {
  const title = req.body.title;
  const released = Date.parse(req.body.released);
  const episodes = req.body.episodes;
  const show = await Show.create({
    title,
    released,
    episodes,
  });
  res.json(show);
}

async function updateShow(req, res, next) {
  const id = req.params.id;
  let show = await Show.findOne({ where: { id: id } });
  if (show == null) {
    next();
  } else {
    const title = req.body.title ?? artist.title;
    const released = req.body.released ?? artist.released;
    const episodes = req.body.episodes ?? artist.episodes;
    let updatedShow = {
      title,
      released,
      episodes,
    };

    show = await show.update(updatedShow);

    res.json(show);
  }
}

module.exports = {
  showRoutes,
};
