const { DataTypes } = require('sequelize');

function makeGenre(sequelize) {
  return sequelize.define('Genre', {
    genre: DataTypes.STRING,
  });
}

module.exports = { makeGenre };