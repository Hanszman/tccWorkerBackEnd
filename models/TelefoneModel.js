// Importando Conexão com o Banco de Dados
const knex = require('../database/conexao');

// Funções do Model
const selectTelefone = async (id_telefone, parametros) => {
    let query = knex('telefone')
    .where(1, '=', 1);
    if (id_telefone)
        query.andWhere('id_telefone', '=', id_telefone);
    if (parametros) {
        if (parametros.id_usuario)
            query.andWhere('id_usuario', '=', parametros.id_usuario);
        if (parametros.id_fornecedor)
            query.andWhere('id_fornecedor', '=', parametros.id_fornecedor);
        if (parametros.id_cliente)
            query.andWhere('id_cliente', '=', parametros.id_cliente);
        if (parametros.id_empresa)
            query.andWhere('id_empresa', '=', parametros.id_empresa);
        if (parametros.dsc_telefone)
            query.andWhere('dsc_telefone', 'like', '%' + parametros.dsc_telefone + '%');
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

const insertTelefone = async (dados) => {
    let query = knex('telefone')
    .insert({
        id_usuario: dados.id_usuario,
        id_fornecedor: dados.id_fornecedor,
        id_cliente: dados.id_cliente,
        id_empresa: dados.id_empresa,
        dsc_telefone: dados.dsc_telefone,
        ind_tipo: dados.ind_tipo
    }).returning('id_telefone');
    let result = await query;
    return result;
};

const updateTelefone = async (id, dados) => {
    let query = knex('telefone')
    .update({
        id_usuario: dados.id_usuario,
        id_fornecedor: dados.id_fornecedor,
        id_cliente: dados.id_cliente,
        id_empresa: dados.id_empresa,
        dsc_telefone: dados.dsc_telefone,
        ind_tipo: dados.ind_tipo
    }).where('id_telefone', '=', id)
    let result = await query;
    return result;
};

const deleteTelefone = async (id) => {
    try {
        let query = knex('telefone')
        .delete()
        .where('id_telefone', '=', id);
        let result = await query;
        return result;
    }
    catch (erro) {
        return 'Erro: ' + erro;
    }
};

// Exportando Funções
module.exports = {
    selectTelefone,
    insertTelefone,
    updateTelefone,
    deleteTelefone
}