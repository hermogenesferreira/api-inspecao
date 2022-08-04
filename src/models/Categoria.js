const { Sequelize } = require('sequelize');

const conn = require('../config/database');
const Roteiro = require('./Roteiro');

const Categoria = conn.define('categorias', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});
Categoria.hasMany(Roteiro);
Categoria.sync();
module.exports = Categoria;
