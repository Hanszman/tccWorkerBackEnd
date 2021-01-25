// Importando Conexão com o Banco de Dados
const knex = require('../database/conexao');

// Funções do Model
const selectEndereco = async (id_endereco, parametros) => {
    let query = knex('endereco')
    .where(1, '=', 1);
    if (id_endereco)
        query.andWhere('id_endereco', '=', id_endereco);
    if (parametros) {
        if (parametros.id_usuario)
            query.andWhere('id_usuario', '=', parametros.id_usuario);
        if (parametros.id_fornecedor)
            query.andWhere('id_fornecedor', '=', parametros.id_fornecedor);
        if (parametros.id_cliente)
            query.andWhere('id_cliente', '=', parametros.id_cliente);
        if (parametros.id_empresa)
            query.andWhere('id_empresa', '=', parametros.id_empresa);
        if (parametros.dsc_logradouro)
            query.andWhere('dsc_logradouro', 'like', '%' + parametros.dsc_logradouro + '%');
        if (parametros.dsc_numero)
            query.andWhere('dsc_numero', 'like', '%' + parametros.dsc_numero + '%');
        if (parametros.dsc_bairro)
            query.andWhere('dsc_bairro', 'like', '%' + parametros.dsc_bairro + '%');
        if (parametros.dsc_cidade)
            query.andWhere('dsc_cidade', 'like', '%' + parametros.dsc_cidade + '%');
        if (parametros.dsc_uf)
            query.andWhere('dsc_uf', 'like', '%' + parametros.dsc_uf + '%');
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

const insertEndereco = async (dados) => {
    let query = knex('endereco')
    .insert({
        id_usuario: dados.id_usuario,
        id_fornecedor: dados.id_fornecedor,
        id_cliente: dados.id_cliente,
        id_empresa: dados.id_empresa,
        dsc_logradouro: dados.dsc_logradouro,
        dsc_numero: dados.dsc_numero,
        dsc_bairro: dados.dsc_bairro,
        dsc_cidade: dados.dsc_cidade,
        dsc_uf: dados.dsc_uf
    }).returning('id_endereco');
    let result = await query;
    return result;
};

const updateEndereco = async (id, dados) => {
    let query = knex('endereco')
    .update({
        id_usuario: dados.id_usuario,
        id_fornecedor: dados.id_fornecedor,
        id_cliente: dados.id_cliente,
        id_empresa: dados.id_empresa,
        dsc_logradouro: dados.dsc_logradouro,
        dsc_numero: dados.dsc_numero,
        dsc_bairro: dados.dsc_bairro,
        dsc_cidade: dados.dsc_cidade,
        dsc_uf: dados.dsc_uf
    }).where('id_endereco', '=', id)
    let result = await query;
    return result;
};

const deleteEndereco = async (id) => {
    try {
        let query = knex('endereco')
        .delete()
        .where('id_endereco', '=', id);
        let result = await query;
        return result;
    }
    catch (erro) {
        return 'Erro: ' + erro;
    }
};

// Exportando Funções
module.exports = {
    selectEndereco,
    insertEndereco,
    updateEndereco,
    deleteEndereco
}