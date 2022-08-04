const Sequelize = require('sequelize');
import  'dotenv/config';

const conn = new Sequelize(`${process.env.DB_NAME}`,
`${process.env.DB_USER}`,
`${process.env.DB_PASSWORD}`,
  {
    host:`${process.env.DB_HOST}`,
    dialect: `${process.env.DB_DIALECT}`,
  },
);

conn.authenticate().then(function(){
  console.log('conectado ao banco de dados');
}).catch(function(){
  console.log('Erro ao conectar ao banco de dados');
});

module.exports = conn;
