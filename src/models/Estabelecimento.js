const { Sequelize } = require('sequelize');

const conn = require('../config/database');
const Agendamento = require('./Agendamento');
const Insp = require('./Insp');
const Inspecao = require('./Insp');
const Pergunta = require('./Pergunta');
const Resposta = require('./Resposta');

const Estabelecimento = conn.define('estabelecimento', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  razaoSocial: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  nomeFantasia: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  cnpj: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  inscricaoEstadual: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  cnae: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  telefone: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  rua: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  bairro: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  cidade: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  uf: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  alvaraLocalizacao: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  alvaraSanitario: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  funcionarios: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  cpfResponsavel: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});
Estabelecimento.hasMany(Agendamento);
Agendamento.belongsTo(Estabelecimento);
Estabelecimento.hasMany(Insp);
Insp.belongsTo(Estabelecimento);

Estabelecimento.sync();

module.exports = Estabelecimento;
