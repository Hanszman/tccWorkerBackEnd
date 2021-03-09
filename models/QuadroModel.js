// Importando Conexão com o Banco de Dados
const knex = require('../database/conexao');

// Funções do Model
const selectQuadro = async (id_quadro, parametros) => {
    let query = knex({ q: 'quadro' })
    .select('q.*', 'p.dsc_nome as dsc_projeto')
    .leftJoin({ p: "projeto" }, "p.id_projeto", "=", "q.id_projeto")
    .where(1, '=', 1);
    if (id_quadro)
        query.andWhere('q.id_quadro', '=', id_quadro);
    if (parametros) {
        if (parametros.id_empresa)
            query.andWhere('p.id_empresa', '=', parametros.id_empresa);
        if (parametros.dsc_nome)
            query.andWhere('q.dsc_nome', 'like', '%' + parametros.dsc_nome + '%');
        if (parametros.dsc_descricao)
            query.andWhere('q.dsc_descricao', 'like', '%' + parametros.dsc_descricao + '%');
        if (parametros.dat_inicio)
            query.andWhere('q.dat_inicio', 'like', '%' + parametros.dat_inicio + '%');
        if (parametros.dat_fim)
            query.andWhere('q.dat_fim', 'like', '%' + parametros.dat_fim + '%');
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
            query.orderBy('q.dsc_nome', 'asc');
    }
    else
        query.orderBy('q.dsc_nome', 'asc');
    let result = await query;
    return result;
};

const insertQuadro = async (dados) => {
    let query = knex('quadro')
    .insert({
        dsc_nome: dados.dsc_nome,
        dsc_descricao: dados.dsc_descricao,
        dat_inicio: dados.dat_inicio,
        dat_fim: dados.dat_fim,
        id_projeto: dados.id_projeto
    }).returning('id_quadro');
    let result = await query;
    return result;
};

const updateQuadro = async (id, dados) => {
    let query = knex('quadro')
    .update({
        dsc_nome: dados.dsc_nome,
        dsc_descricao: dados.dsc_descricao,
        dat_inicio: dados.dat_inicio,
        dat_fim: dados.dat_fim,
        id_projeto: dados.id_projeto
    }).where('id_quadro', '=', id)
    let result = await query;
    return result;
};

const deleteQuadro = async (id) => {
    try {
        // TODO: fazer todos os deletes necessários
        // (atividade, atividade_usuario_empresa)
        let query = knex('quadro')
        .delete()
        .where('id_quadro', '=', id);
        let result = await query;
        return result;
    }
    catch (erro) {
        return 'Erro: ' + erro;
    }
};

// Exportando Funções
module.exports = {
    selectQuadro,
    insertQuadro,
    updateQuadro,
    deleteQuadro
}