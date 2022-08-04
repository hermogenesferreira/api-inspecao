const { Sequelize } = require('sequelize');

const conn = require('../config/database');
const Cabecalho = require('./Cabecalho');
const Resposta = require('./Resposta');

const Pergunta = conn.define('perguntas', {
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
    type: Sequelize.TEXT,
    allowNull: false,
  },
  cabecalhoId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});
Pergunta.hasMany(Resposta);
Resposta.belongsTo(Pergunta);
Pergunta.sync();

module.exports = Pergunta;
