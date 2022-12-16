const { DataTypes } = require('sequelize');

function makeGenre(sequelize) {
  return sequelize.define('Genre', {
    name: DataTypes.STRING,
  });
}

module.exports = { makeGenre };