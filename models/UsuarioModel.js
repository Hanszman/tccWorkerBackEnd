// Importando Conexão com o Banco de Dados
const knex = require('../database/conexao');

// Funções do Model
const selectUsuarios = async () => {
    var query = await knex('usuario');
    return query;
};

const selectUsuarioWhereLogin = async (dsc_login) => {
    var query = await knex('usuario')
    .select('id_usuario')
    .where('dsc_login', '=', dsc_login);
    return query;
};

const insertUsuario = async (dados) => {
    var query = await knex('usuario')
    .insert({
        dsc_nome: dados.dsc_nome,
        dsc_sobrenome: dados.dsc_sobrenome,
        dsc_email: dados.dsc_email,
        dsc_login: dados.dsc_login,
        dsc_senha: dados.dsc_senha
    }).returning('id_usuario');
    return query;
};

const authSenhaLogin = async (login) => {
    var query = await knex('usuario')
    .select('id_usuario', 'dsc_nome', 'dsc_senha')
    .where('dsc_login', '=', login);
    return query;
};

// Exportando Funções
module.exports = {
    selectUsuarios,
    selectUsuarioWhereLogin,
    insertUsuario,
    authSenhaLogin
}