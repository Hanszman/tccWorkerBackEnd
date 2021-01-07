// Conexão com o Banco de Dados
const Knex = require('knex')({
    client: process.env.DB_CLIENT,
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_SCHEMA,
        timezone: 'UTC'
    }
});
// Exportando Conexão
module.exports = Knex;