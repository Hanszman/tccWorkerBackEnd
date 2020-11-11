// Importando Bibliotecas
const mysql = require('mysql');

// Conexão com o Banco de Dados
const conexao = mysql.createPool({
    host: 'us-cdbr-east-02.cleardb.com',
    port: 3306,
    user: 'bff06fae24e971',
    password: 'e14a8362',
    database: 'heroku_9439eb1c84438d2'
});

// Exportando Conexão
module.exports = conexao;