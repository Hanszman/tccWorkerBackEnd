// Importando Conexão com o Banco de Dados
const knex = require('../database/conexao');

// Funções do Model
const selectProjeto = async (id_projeto, parametros) => {
    let query = knex({ p: 'projeto' })
    .select('p.*', 's.dsc_setor')
    .leftJoin({ s: "setor" }, "s.id_setor", "=", "p.id_setor")
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
        if (parametros.id_setor)
            query.andWhere('s.id_setor', '=', parametros.id_setor);
        if (parametros.dsc_setor)
            query.andWhere('s.dsc_setor', 'like', '%' + parametros.dsc_setor + '%');
        if (parametros.ordenarPor) {
            if (parametros.direcao)
                query.orderBy(parametros.ordenarPor, parametros.direcao);
            else
                query.orderBy(parametros.ordenarPor, "asc");
        }
        else
            query.orderBy('p.dsc_nome', 'asc');
    }
    else
        query.orderBy('p.dsc_nome', 'asc');
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
        // TODO: fazer todos os deletes necessários (OK)
        // (projeto_fornecedor, projeto_cliente, projeto_usuario_empresa, quadro, atividade, atividade_usuario_empresa)
        let vetorQuadro = [];
        let queryQuadro = await knex('quadro').where('id_projeto', '=', id);
        for (let i = 0; i < queryQuadro.length; i++)
            vetorQuadro.push(queryQuadro[i]['id_quadro']);
        
        let vetorAtividade = [];
        let queryAtividade = await knex('atividade').where('id_quadro', 'IN', vetorQuadro);
        for (let i = 0; i < queryAtividade.length; i++)
            vetorAtividade.push(queryAtividade[i]['id_atividade']);

        await knex('atividade_usuario_empresa')
        .delete()
        .where('id_atividade', 'IN', vetorAtividade);

        await knex('atividade')
        .delete()
        .where('id_quadro', 'IN', vetorQuadro);
        
        await knex('quadro')
        .delete()
        .where('id_projeto', '=', id);
        
        await knex('projeto_fornecedor')
        .delete()
        .where('id_projeto', '=', id);

        await knex('projeto_cliente')
        .delete()
        .where('id_projeto', '=', id);

        await knex('projeto_usuario_empresa')
        .delete()
        .where('id_projeto', '=', id);
        
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