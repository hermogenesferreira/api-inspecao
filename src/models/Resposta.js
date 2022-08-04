const { Sequelize } = require('sequelize');

const conn = require('../config/database');
const Estabelecimento = require('./Estabelecimento');
const Insp = require('./Insp');
const Pergunta = require('./Pergunta');
const Roteiro = require('./Roteiro');

const Resposta = conn.define('respostas', {
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
  inspId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  perguntaId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});
Resposta.Insp = Insp.hasMany(Resposta);
Resposta.belongsTo(Insp);

Resposta.sync();
module.exports = Resposta;
