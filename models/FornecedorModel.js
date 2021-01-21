// Importando Conexão com o Banco de Dados
const knex = require('../database/conexao');

// Funções do Model
const selectFornecedor = async (id_fornecedor, parametros) => {
    let query = knex('fornecedor')
    .where(1, '=', 1);
    if (id_fornecedor)
        query.andWhere('id_fornecedor', '=', id_fornecedor);
    if (parametros) {
        if (parametros.id_empresa)
            query.andWhere('id_empresa', '=', parametros.id_empresa);
        if (parametros.dsc_nome)
            query.andWhere('dsc_nome', 'like', '%' + parametros.dsc_nome + '%');
        if (parametros.dsc_cnpj)
            query.andWhere('dsc_cnpj', 'like', '%' + parametros.dsc_cnpj + '%');
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

const insertFornecedor = async (dados) => {
    let query = knex('fornecedor')
    .insert({
        dsc_nome: dados.dsc_nome,
        dsc_cnpj: dados.dsc_cnpj,
        id_empresa: dados.id_empresa_logada
    }).returning('id_fornecedor');
    let result = await query;
    return result;
};

const updateFornecedor = async (id, dados) => {
    let query = knex('fornecedor')
    .update({
        dsc_nome: dados.dsc_nome,
        dsc_cnpj: dados.dsc_cnpj,
        id_empresa: dados.id_empresa_logada
    }).where('id_fornecedor', '=', id)
    let result = await query;
    return result;
};

const deleteFornecedor = async (id) => {
    try {
        // TODO: fazer todos os deletes necessários
        let query = knex('fornecedor')
        .delete()
        .where('id_fornecedor', '=', id);
        let result = await query;
        return result;
    }
    catch (erro) {
        return 'Erro: ' + erro;
    }
};

// Exportando Funções
module.exports = {
    selectFornecedor,
    insertFornecedor,
    updateFornecedor,
    deleteFornecedor
}