const { DataTypes } = require('sequelize');

function makeArtist(sequelize) {
  return sequelize.define('Artist', {
    name: DataTypes.STRING,
    single: DataTypes.STRING,
  });
}

module.exports = { makeArtist };
