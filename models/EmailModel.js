// Importando Conexão com o Banco de Dados
const knex = require('../database/conexao');

// Funções do Model
const selectEmail = async (id_email, parametros) => {
    let query = knex('email')
    .where(1, '=', 1);
    if (id_email)
        query.andWhere('id_email', '=', id_email);
    if (parametros) {
        if (parametros.id_usuario)
            query.andWhere('id_usuario', '=', parametros.id_usuario);
        if (parametros.id_fornecedor)
            query.andWhere('id_fornecedor', '=', parametros.id_fornecedor);
        if (parametros.id_cliente)
            query.andWhere('id_cliente', '=', parametros.id_cliente);
        if (parametros.id_empresa)
            query.andWhere('id_empresa', '=', parametros.id_empresa);
        if (parametros.dsc_email)
            query.andWhere('dsc_email', 'like', '%' + parametros.dsc_email + '%');
        if(parametros.ordenarPor){
            if(parametros.direcao)
                query.orderBy(parametros.ordenarPor, parametros.direcao);
            else
                query.orderBy(parametros.ordenarPor, "asc");
        }
    }
    let result = await query;
    return result;
};

const insertEmail = async (dados) => {
    let query = knex('email')
    .insert({
        id_usuario: dados.id_usuario,
        id_fornecedor: dados.id_fornecedor,
        id_cliente: dados.id_cliente,
        id_empresa: dados.id_empresa,
        dsc_email: dados.dsc_email
    }).returning('id_email');
    let result = await query;
    return result;
};

const updateEmail = async (id, dados) => {
    let query = knex('email')
    .update({
        id_usuario: dados.id_usuario,
        id_fornecedor: dados.id_fornecedor,
        id_cliente: dados.id_cliente,
        id_empresa: dados.id_empresa,
        dsc_email: dados.dsc_email
    }).where('id_email', '=', id)
    let result = await query;
    return result;
};

const deleteEmail = async (id) => {
    try {
        let query = knex('email')
        .delete()
        .where('id_email', '=', id);
        let result = await query;
        return result;
    }
    catch (erro) {
        return 'Erro: ' + erro;
    }
};

// Exportando Funções
module.exports = {
    selectEmail,
    insertEmail,
    updateEmail,
    deleteEmail
}