const { Sequelize } = require('sequelize');
const { makeArtist } = require('./artist.model');
const { makeShow } = require('./show.model');

const DATABASE_URL =
  process.env.NODE_ENV === 'test'
    ? 'sqlite::memory:'
    : process.env.DATABASE_URL;

const CONNECTION_OPTIONS =
  process.env.NODE_ENV === 'test'
    ? {}
    : {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      };

const sequelize = new Sequelize(DATABASE_URL, CONNECTION_OPTIONS);
// creates a Sequelize constructor - info that it needs is database url and connection options

const Artist = makeArtist(sequelize);
const Show = makeShow(sequelize);
// what we expect databse to look like

module.exports = {
  sequelize,
  Artist,
  Show,
};
