// Importando Conexão com o Banco de Dados
const knex = require('../database/conexao');

// Funções do Model
const selectProjetoFornecedor = async (id_projeto_fornecedor, id_projeto, id_fornecedor, parametros) => {
    let query = knex({ pf: 'id_projeto_fornecedor' })
    .select('pf.*',
            'p.dsc_nome as dsc_nome_projeto',
            'p.dsc_descricao as dsc_descricao_projeto',
            'p.dat_inicio as dat_inicio_projeto',
            'p.dat_fim as dat_fim_projeto',
            'p.dat_fim as dat_fim_projeto',
            'p.id_setor as id_setor_projeto',
            's.dsc_setor as dsc_setor_projeto',
            'p.id_empresa as id_empresa_projeto',
            'f.dsc_nome as dsc_nome_fornecedor',
            'f.dsc_cnpj as dsc_cnpj_fornecedor')
    .leftJoin({p: "projeto"}, "p.id_projeto", "=", "pf.id_projeto")
    .leftJoin({f: "fornecedor"}, "f.id_fornecedor", "=", "pf.id_fornecedor")
    .leftJoin({s: "setor"}, "s.id_setor", "=", "p.id_setor")
    .where(1, '=', 1);
    if (id_projeto_fornecedor)
        query.andWhere('pf.id_projeto_fornecedor', '=', id_projeto_fornecedor);
    if (id_projeto)
        query.andWhere('pf.id_projeto', '=', id_projeto);
    if (id_fornecedor)
        query.andWhere('pf.id_fornecedor', '=', id_fornecedor);
    if (parametros) {
        if (parametros.id_projeto)
            query.andWhere('pf.id_projeto', '=', parametros.id_projeto);
        if (parametros.id_fornecedor)
            query.andWhere('pf.id_fornecedor', '=', parametros.id_fornecedor);
        if (parametros.dsc_nome_projeto)
            query.andWhere('p.dsc_nome', 'like', '%' + parametros.dsc_nome_projeto + '%');
        if (parametros.dsc_descricao_projeto)
            query.andWhere('p.dsc_descricao', 'like', '%' + parametros.dsc_descricao_projeto + '%')
        if (parametros.dat_inicio_projeto)
            query.andWhere('p.dat_inicio', 'like', '%' + parametros.dat_inicio_projeto + '%')
        if (parametros.dat_fim_projeto)
            query.andWhere('p.dat_fim', 'like', '%' + parametros.dat_fim_projeto + '%')
        if (parametros.dat_fim_projeto)
            query.andWhere('p.dat_fim', 'like', '%' + parametros.dat_fim_projeto + '%')
        if (parametros.id_setor_projeto)
            query.andWhere('p.id_setor', '=' + parametros.id_setor_projeto)
        if (parametros.dsc_setor_projeto)
            query.andWhere('s.dsc_setor', 'like', '%' + parametros.dsc_setor_projeto + '%')
        if (parametros.id_empresa_projeto)
            query.andWhere('p.id_empresa', '=' + parametros.id_empresa_projeto)
        if (parametros.dsc_nome_fornecedor)
            query.andWhere('f.dsc_nome', 'like', '%' + parametros.dsc_nome_fornecedor + '%')
        if (parametros.dsc_cnpj_fornecedor)
            query.andWhere('f.dsc_cnpj', 'like', '%' + parametros.dsc_cnpj_fornecedor + '%')
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

const insertProjetoFornecedor = async (dados) => {
    let query = knex('projeto_fornecedor')
    .insert({
        id_projeto: dados.id_projeto,
        id_fornecedor: dados.id_fornecedor
    }).returning('id_projeto_fornecedor');
    let result = await query;
    return result;
};

const deleteProjetoFornecedor = async (id) => {
    try {
        let query = knex('projeto_fornecedor')
        .delete()
        .where('id_projeto_fornecedor', '=', id);
        let result = await query;
        return result;
    }
    catch (erro) {
        return 'Erro: ' + erro;
    }
};

// Exportando Funções
module.exports = {
    selectProjetoFornecedor,
    insertProjetoFornecedor,
    deleteProjetoFornecedor
}