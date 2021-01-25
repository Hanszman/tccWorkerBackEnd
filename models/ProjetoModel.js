// Importando Conexão com o Banco de Dados
const knex = require('../database/conexao');

// Funções do Model
const selectProjeto = async (id_projeto, parametros) => {
    let query = knex({ p: 'projeto' })
    .join({ s: "setor" }, "s.id_setor", "=", "p.id_setor")
    .where(1, '=', 1);
    if (id_projeto)
        query.andWhere('p.id_projeto', '=', id_projeto);
    if (parametros) {
        if (parametros.id_empresa)
            query.andWhere('p.id_empresa', '=', parametros.id_empresa);
        if (parametros.dsc_nome)
            query.andWhere('p.dsc_nome', 'like', '%' + parametros.dsc_nome + '%');
        if (parametros.dsc_descricao)
            query.andWhere('p.dsc_descricao', 'like', '%' + parametros.dsc_descricao + '%');
        if (parametros.dat_inicio)
            query.andWhere('p.dat_inicio', 'like', '%' + parametros.dat_inicio + '%');
        if (parametros.dat_fim)
            query.andWhere('p.dat_fim', 'like', '%' + parametros.dat_fim + '%');
        if (parametros.dsc_setor)
            query.andWhere('s.dsc_setor', 'like', '%' + parametros.dsc_setor + '%');
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

const insertProjeto = async (dados) => {
    let query = knex('projeto')
    .insert({
        dsc_nome: dados.dsc_nome,
        dsc_descricao: dados.dsc_descricao,
        dat_inicio: dados.dat_inicio,
        dat_fim: dados.dat_fim,
        id_setor: dados.id_setor,
        id_empresa: dados.id_empresa_logada
    }).returning('id_projeto');
    let result = await query;
    return result;
};

const updateProjeto = async (id, dados) => {
    let query = knex('projeto')
    .update({
        dsc_nome: dados.dsc_nome,
        dsc_descricao: dados.dsc_descricao,
        dat_inicio: dados.dat_inicio,
        dat_fim: dados.dat_fim,
        id_setor: dados.id_setor,
        id_empresa: dados.id_empresa_logada
    }).where('id_projeto', '=', id)
    let result = await query;
    return result;
};

const deleteProjeto = async (id) => {
    try {
        // TODO: fazer todos os deletes necessários
        let query = knex('projeto')
        .delete()
        .where('id_projeto', '=', id);
        let result = await query;
        return result;
    }
    catch (erro) {
        return 'Erro: ' + erro;
    }
};

// Exportando Funções
module.exports = {
    selectProjeto,
    insertProjeto,
    updateProjeto,
    deleteProjeto
}