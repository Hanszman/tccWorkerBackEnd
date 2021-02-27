// Importando Conexão com o Banco de Dados
const knex = require('../database/conexao');

// Funções do Model
const selectSetor = async (id_setor, parametros) => {
    let query = knex('setor')
    .where(1, '=', 1);
    if (id_setor)
        query.andWhere('id_setor', '=', id_setor);
    if (parametros) {
        if (parametros.id_empresa)
            query.andWhere('id_empresa', '=', parametros.id_empresa);
        if (parametros.dsc_setor)
            query.andWhere('dsc_setor', 'like', '%' + parametros.dsc_setor + '%');
        if (parametros.ordenarPor) {
            if (parametros.direcao)
                query.orderBy(parametros.ordenarPor, parametros.direcao);
            else
                query.orderBy(parametros.ordenarPor, "asc");
        }
        else
            query.orderBy('dsc_setor', 'asc');
    }
    else
        query.orderBy('dsc_setor', 'asc');
    let result = await query;
    return result;
};

const insertSetor = async (dados) => {
    let query = knex('setor')
    .insert({
        dsc_setor: dados.dsc_setor,
        id_empresa: dados.id_empresa_logada
    }).returning('id_setor');
    let result = await query;
    return result;
};

const updateSetor = async (id, dados) => {
    let query = knex('setor')
    .update({
        dsc_setor: dados.dsc_setor,
        id_empresa: dados.id_empresa_logada
    }).where('id_setor', '=', id)
    let result = await query;
    return result;
};

const deleteSetor = async (id) => {
    try {
        // TODO: fazer todos os deletes necessários
        let query = knex('setor')
        .delete()
        .where('id_setor', '=', id);
        let result = await query;
        return result;
    }
    catch (erro) {
        return 'Erro: ' + erro;
    }
};

// Exportando Funções
module.exports = {
    selectSetor,
    insertSetor,
    updateSetor,
    deleteSetor
}