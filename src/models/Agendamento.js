const { Sequelize } = require('sequelize');
const conn = require('../config/database');
const Estabelecimento = require('./Estabelecimento');
const User = require('./User');

const Agendamento = conn.define('agendamentos', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  dataAgendamento: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  estabelecimentoId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});
User.hasMany(Agendamento);
Agendamento.belongsTo(User);
Agendamento.sync();

module.exports = Agendamento;
