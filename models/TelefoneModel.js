// Importando Conexão com o Banco de Dados
const knex = require('../database/conexao');

// Funções do Model
const selectTelefone = async () => {
    let query = knex('telefone');
    let result = await query;
    return result;
};

// Exportando Funções
module.exports = {
    selectTelefone
}