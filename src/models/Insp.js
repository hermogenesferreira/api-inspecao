const { Sequelize } = require('sequelize');

const conn = require('../config/database');
const Cabecalho = require('./Cabecalho');
const Estabelecimento = require('./Estabelecimento');
const Resposta = require('./Resposta');
const User = require('./User');

const Insp = conn.define('insp', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  motivo: {
    type: Sequelize.STRING,
    notNull: false,
  },
  obs: {
    type: Sequelize.TEXT,
    notNull: false,
  },
  estabelecimentoId: {
    type: Sequelize.INTEGER,
  },
  roteiroId: {
    type: Sequelize.INTEGER,
    notNull: false,
  },
});
User.hasMany(Insp);
Insp.belongsTo(User);
Insp.sync();
module.exports = Insp;
