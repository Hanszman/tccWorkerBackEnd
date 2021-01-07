// Importando Conexão com o Banco de Dados
const knex = require('../database/conexao');

// Funções do Model
const selectUsuario = async (dsc_login) => {
    let query = knex('usuario')
    if (dsc_login)
        query.where('dsc_login', '=', dsc_login);
    let result = await query;
    return result;
};

const insertUsuario = async (dados) => {
    let query = knex('usuario')
    .insert({
        dsc_nome: dados.dsc_nome,
        dsc_sobrenome: dados.dsc_sobrenome,
        dsc_email: dados.dsc_email,
        dsc_login: dados.dsc_login,
        dsc_senha: dados.dsc_senha
    }).returning('id_usuario');
    let result = await query;
    return result;
};

// Exportando Funções
module.exports = {
    selectUsuario,
    insertUsuario
}