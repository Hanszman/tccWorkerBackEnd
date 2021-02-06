// Importando Conexão com o Banco de Dados
const knex = require('../database/conexao');

// Funções do Model
const selectProjetoCliente = async (id_projeto_cliente, id_projeto, id_cliente, parametros) => {
    let query = knex({ pc: 'projeto_cliente' })
    .select('pc.*',
            'p.dsc_nome as dsc_nome_projeto',
            'p.dsc_descricao as dsc_descricao_projeto',
            'p.dat_inicio as dat_inicio_projeto',
            'p.dat_fim as dat_fim_projeto',
            'p.id_setor as id_setor_projeto',
            's.dsc_setor as dsc_setor_projeto',
            'p.id_empresa as id_empresa_projeto',
            'c.dsc_nome as dsc_nome_cliente',
            'c.dsc_cnpj as dsc_cnpj_cliente')
    .leftJoin({p: "projeto"}, "p.id_projeto", "=", "pc.id_projeto")
    .leftJoin({c: "cliente"}, "c.id_cliente", "=", "pc.id_cliente")
    .leftJoin({s: "setor"}, "s.id_setor", "=", "p.id_setor")
    .where(1, '=', 1);
    if (id_projeto_cliente)
        query.andWhere('pc.id_projeto_cliente', '=', id_projeto_cliente);
    if (id_projeto)
        query.andWhere('pc.id_projeto', '=', id_projeto);
    if (id_cliente)
        query.andWhere('pc.id_cliente', '=', id_cliente);
    if (parametros) {
        if (parametros.id_projeto)
            query.andWhere('pc.id_projeto', '=', parametros.id_projeto);
        if (parametros.id_cliente)
            query.andWhere('pc.id_cliente', '=', parametros.id_cliente);
        if (parametros.dsc_nome_projeto)
            query.andWhere('p.dsc_nome', 'like', '%' + parametros.dsc_nome_projeto + '%');
        if (parametros.dsc_descricao_projeto)
            query.andWhere('p.dsc_descricao', 'like', '%' + parametros.dsc_descricao_projeto + '%');
        if (parametros.dat_inicio_projeto)
            query.andWhere('p.dat_inicio', 'like', '%' + parametros.dat_inicio_projeto + '%');
        if (parametros.dat_fim_projeto)
            query.andWhere('p.dat_fim', 'like', '%' + parametros.dat_fim_projeto + '%');
        if (parametros.dat_fim_projeto)
            query.andWhere('p.dat_fim', 'like', '%' + parametros.dat_fim_projeto + '%');
        if (parametros.id_setor_projeto)
            query.andWhere('p.id_setor', '=' + parametros.id_setor_projeto);
        if (parametros.dsc_setor_projeto)
            query.andWhere('s.dsc_setor', 'like', '%' + parametros.dsc_setor_projeto + '%');
        if (parametros.id_empresa_projeto)
            query.andWhere('p.id_empresa', '=' + parametros.id_empresa_projeto);
        if (parametros.dsc_nome_cliente)
            query.andWhere('c.dsc_nome', 'like', '%' + parametros.dsc_nome_cliente + '%');
        if (parametros.dsc_cnpj_cliente)
            query.andWhere('c.dsc_cnpj', 'like', '%' + parametros.dsc_cnpj_cliente + '%');
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

const insertProjetoCliente = async (dados) => {
    let query = knex('projeto_cliente')
    .insert({
        id_projeto: dados.id_projeto,
        id_cliente: dados.id_cliente
    }).returning('id_projeto_cliente');
    let result = await query;
    return result;
};

const deleteProjetoCliente = async (id) => {
    try {
        let query = knex('projeto_cliente')
        .delete()
        .where('id_projeto_cliente', '=', id);
        let result = await query;
        return result;
    }
    catch (erro) {
        return 'Erro: ' + erro;
    }
};

// Exportando Funções
module.exports = {
    selectProjetoCliente,
    insertProjetoCliente,
    deleteProjetoCliente
}