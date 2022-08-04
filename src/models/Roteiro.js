const { Sequelize } = require('sequelize');

const conn = require('../config/database');
const Cabecalho = require('./Cabecalho');
const Insp = require('./Insp');
const Pergunta = require('./Pergunta');
const Resposta = require('./Resposta');

const Roteiro = conn.define('roteiros', {
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
  categoriaId: {
    type: Sequelize.INTEGER,
    notNull: false,
  },
});
Roteiro.hasMany(Insp);
Insp.belongsTo(Roteiro);
Cabecalho.Roteiro = Roteiro.hasMany(Cabecalho);
Cabecalho.Pergunta = Cabecalho.hasMany(Pergunta);
Cabecalho.belongsTo(Roteiro);
Pergunta.belongsTo(Cabecalho);
Roteiro.sync();

module.exports = Roteiro;
