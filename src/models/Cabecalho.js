const { Sequelize } = require('sequelize');

const conn = require('../config/database');
const Pergunta = require('./Pergunta');
const Resposta = require('./Resposta');

const Cabecalho = conn.define('cabecalhos', {
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
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  roteiroId: {
    type: Sequelize.INTEGER,
    notNull: false,
  },
});
Cabecalho.hasMany(Pergunta);

Cabecalho.sync();

module.exports = Cabecalho;
