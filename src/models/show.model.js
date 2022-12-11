const { DataTypes } = require('sequelize');

function makeShow(sequelize){
  return sequelize.define('Show', {
    title: DataTypes.STRING,
    released: DataTypes.DATE, 
    episodes: DataTypes.INTEGER
  });
}

module.exports = { makeShow };