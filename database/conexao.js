// Conexão com o Banco de Dados
const Knex = require('knex')({
    client: process.env.DB_CLIENT || 'mysql',
    connection: {
        host: process.env.DB_HOST || 'us-cdbr-east-02.cleardb.com',
        user: process.env.DB_USER || 'bff06fae24e971',
        password: process.env.DB_PASSWORD || 'e14a8362',
        database: process.env.DB_SCHEMA || 'heroku_9439eb1c84438d2',
        timezone: 'UTC'
    }
});
// Exportando Conexão
module.exports = Knex;