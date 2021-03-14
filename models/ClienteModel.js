// Importando Conexão com o Banco de Dados
const knex = require('../database/conexao');

// Funções do Model
const selectCliente = async (id_cliente, parametros) => {
    let query = knex('cliente')
    .where(1, '=', 1);
    if (id_cliente)
        query.andWhere('id_cliente', '=', id_cliente);
    if (parametros) {
        if (parametros.id_empresa)
            query.andWhere('id_empresa', '=', parametros.id_empresa);
        if (parametros.dsc_nome)
            query.andWhere('dsc_nome', 'like', '%' + parametros.dsc_nome + '%');
        if (parametros.dsc_cnpj)
            query.andWhere('dsc_cnpj', 'like', '%' + parametros.dsc_cnpj + '%');
        if (parametros.ordenarPor) {
            if (parametros.direcao)
                query.orderBy(parametros.ordenarPor, parametros.direcao);
            else
                query.orderBy(parametros.ordenarPor, "asc");
        }
        else
            query.orderBy('dsc_nome', 'asc');
    }
    else
        query.orderBy('dsc_nome', 'asc');
    let result = await query;
    return result;
};

const insertCliente = async (dados) => {
    let query = knex('cliente')
    .insert({
        dsc_nome: dados.dsc_nome,
        dsc_cnpj: dados.dsc_cnpj,
        id_empresa: dados.id_empresa_logada
    }).returning('id_cliente');
    let result = await query;
    return result;
};

const updateCliente = async (id, dados) => {
    let query = knex('cliente')
    .update({
        dsc_nome: dados.dsc_nome,
        dsc_cnpj: dados.dsc_cnpj,
        id_empresa: dados.id_empresa_logada
    }).where('id_cliente', '=', id)
    let result = await query;
    return result;
};

const deleteCliente = async (id) => {
    try {
        // TODO: fazer todos os deletes necessários (OK)
        // (projeto_cliente, telefone, email, endereco)
        await knex('projeto_cliente')
        .delete()
        .where('id_cliente', '=', id);

        await knex('telefone')
        .delete()
        .where('id_cliente', '=', id);

        await knex('email')
        .delete()
        .where('id_cliente', '=', id);

        await knex('endereco')
        .delete()
        .where('id_cliente', '=', id);

        let query = knex('cliente')
        .delete()
        .where('id_cliente', '=', id);
        let result = await query;
        return result;
    }
    catch (erro) {
        return 'Erro: ' + erro;
    }
};

// Exportando Funções
module.exports = {
    selectCliente,
    insertCliente,
    updateCliente,
    deleteCliente
}