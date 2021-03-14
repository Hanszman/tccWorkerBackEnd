// Importando Conexão com o Banco de Dados
const knex = require('../database/conexao');

// Funções do Model
const selectAtividade = async (id_atividade, parametros) => {
    let query = knex({ a: 'atividade' })
    .select('a.*', 'e.dsc_etapa', 'e.ind_sequencia', 'q.dsc_nome as dsc_quadro', 'p.id_projeto', 'p.dsc_nome as dsc_projeto')
    .leftJoin({ e: "etapa" }, "e.id_etapa", "=", "a.id_etapa")
    .leftJoin({ q: "quadro" }, "q.id_quadro", "=", "a.id_quadro")
    .leftJoin({ p: "projeto" }, "p.id_projeto", "=", "q.id_projeto")
    .where(1, '=', 1);
    if (id_atividade)
        query.andWhere('a.id_atividade', '=', id_atividade);
    if (parametros) {
        if (parametros.id_empresa)
            query.andWhere('p.id_empresa', '=', parametros.id_empresa);
        if (parametros.dsc_nome)
            query.andWhere('a.dsc_nome', 'like', '%' + parametros.dsc_nome + '%');
        if (parametros.dsc_descricao)
            query.andWhere('a.dsc_descricao', 'like', '%' + parametros.dsc_descricao + '%');
        if (parametros.dat_inicio)
            query.andWhere('a.dat_inicio', 'like', '%' + parametros.dat_inicio + '%');
        if (parametros.dat_fim)
            query.andWhere('a.dat_fim', 'like', '%' + parametros.dat_fim + '%');
        if (parametros.id_etapa)
            query.andWhere('e.id_etapa', '=', parametros.id_etapa);
        if (parametros.dsc_etapa)
            query.andWhere('e.dsc_etapa', 'like', '%' + parametros.dsc_etapa + '%');
        if (parametros.ind_sequencia)
            query.andWhere('e.ind_sequencia', 'like', '%' + parametros.ind_sequencia + '%');
        if (parametros.id_quadro)
            query.andWhere('q.id_quadro', '=', parametros.id_quadro);
        if (parametros.dsc_quadro)
            query.andWhere('q.dsc_nome', 'like', '%' + parametros.dsc_quadro + '%');
        if (parametros.id_projeto)
            query.andWhere('p.id_projeto', '=', parametros.id_projeto);
        if (parametros.dsc_projeto)
            query.andWhere('p.dsc_nome', 'like', '%' + parametros.dsc_projeto + '%');
        if (parametros.ordenarPor) {
            if (parametros.direcao)
                query.orderBy(parametros.ordenarPor, parametros.direcao);
            else
                query.orderBy(parametros.ordenarPor, "asc");
        }
        else
            query.orderBy('a.dsc_nome', 'asc');
    }
    else
        query.orderBy('a.dsc_nome', 'asc');
    let result = await query;
    return result;
};

const insertAtividade = async (dados) => {
    let query = knex('atividade')
    .insert({
        dsc_nome: dados.dsc_nome,
        dsc_descricao: dados.dsc_descricao,
        dat_inicio: dados.dat_inicio,
        dat_fim: dados.dat_fim,
        id_quadro: dados.id_quadro,
        id_etapa: dados.id_etapa,
        ind_prioridade: dados.ind_prioridade
    }).returning('id_atividade');
    let result = await query;
    return result;
};

const updateAtividade = async (id, dados) => {
    let query = knex('atividade')
    .update({
        dsc_nome: dados.dsc_nome,
        dsc_descricao: dados.dsc_descricao,
        dat_inicio: dados.dat_inicio,
        dat_fim: dados.dat_fim,
        id_quadro: dados.id_quadro,
        id_etapa: dados.id_etapa,
        ind_prioridade: dados.ind_prioridade
    }).where('id_atividade', '=', id)
    let result = await query;
    return result;
};

const deleteAtividade = async (id) => {
    try {
        // TODO: fazer todos os deletes necessários (OK)
        // (atividade_usuario_empresa)
        await knex('atividade_usuario_empresa')
        .delete()
        .where('id_atividade', '=', id);

        let query = knex('atividade')
        .delete()
        .where('id_atividade', '=', id);
        let result = await query;
        return result;
    }
    catch (erro) {
        return 'Erro: ' + erro;
    }
};

// Exportando Funções
module.exports = {
    selectAtividade,
    insertAtividade,
    updateAtividade,
    deleteAtividade
}