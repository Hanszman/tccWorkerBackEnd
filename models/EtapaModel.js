// Importando Conexão com o Banco de Dados
const knex = require('../database/conexao');

// Funções do Model
const selectEtapa = async (id_etapa, parametros, id_empresa, ind_sequencia) => {
    let query = knex('etapa')
    .where(1, '=', 1);
    if (id_etapa)
        query.andWhere('id_etapa', '=', id_etapa);
    if (ind_sequencia)
        query.andWhere('ind_sequencia', '=', ind_sequencia);
    if (id_empresa)
        query.andWhere('id_empresa', '=', id_empresa);
    if (parametros) {
        if (parametros.id_empresa)
            query.andWhere('id_empresa', '=', parametros.id_empresa);
        if (parametros.dsc_etapa)
            query.andWhere('dsc_etapa', 'like', '%' + parametros.dsc_etapa + '%');
        if (parametros.ind_sequencia)
            query.andWhere('ind_sequencia', 'like', '%' + parametros.ind_sequencia + '%');
        if (parametros.ordenarPor) {
            if (parametros.direcao)
                query.orderBy(parametros.ordenarPor, parametros.direcao);
            else
                query.orderBy(parametros.ordenarPor, "asc");
        }
        else
            query.orderBy('ind_sequencia', 'asc');
    }
    else
        query.orderBy('ind_sequencia', 'asc');
    let result = await query;
    return result;
};

const insertEtapa = async (dados) => {
    let query = knex('etapa')
    .insert({
        dsc_etapa: dados.dsc_etapa,
        ind_sequencia: dados.ind_sequencia,
        id_empresa: dados.id_empresa_logada
    }).returning('id_etapa');
    let result = await query;
    return result;
};

const updateEtapa = async (id, dados) => {
    let query = knex('etapa')
    .update({
        dsc_etapa: dados.dsc_etapa,
        ind_sequencia: dados.ind_sequencia,
        id_empresa: dados.id_empresa_logada
    }).where('id_etapa', '=', id)
    let result = await query;
    return result;
};

const deleteEtapa = async (id) => {
    try {
        // TODO: fazer todos os deletes necessários (OK)
        // (atividade, atividade_usuario_empresa)
        let vetorAtividade = [];
        let queryAtividade = await knex('atividade').where('id_etapa', '=', id);
        for (let i = 0; i < queryAtividade.length; i++)
            vetorAtividade.push(queryAtividade[i]['id_atividade']);
        
        await knex('atividade_usuario_empresa')
        .delete()
        .where('id_atividade', 'IN', vetorAtividade);

        await knex('atividade')
        .delete()
        .where('id_etapa', '=', id);

        let query = knex('etapa')
        .delete()
        .where('id_etapa', '=', id);
        let result = await query;
        return result;
    }
    catch (erro) {
        return 'Erro: ' + erro;
    }
};

// Exportando Funções
module.exports = {
    selectEtapa,
    insertEtapa,
    updateEtapa,
    deleteEtapa
}