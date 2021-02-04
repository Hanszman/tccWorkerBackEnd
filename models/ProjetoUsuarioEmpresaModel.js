// Importando Conexão com o Banco de Dados
const knex = require('../database/conexao');

// Funções do Model
const selectProjetoUsuarioEmpresa = async (id_projeto_usuario_empresa, id_projeto, id_usuario_empresa, parametros) => {
    let query = knex({ pue: 'projeto_usuario_empresa' })
    .select('pue.*',
            'p.dsc_nome as dsc_nome_projeto',
            'p.dsc_descricao as dsc_descricao_projeto',
            'p.dat_inicio as dat_inicio_projeto',
            'p.dat_fim as dat_fim_projeto',
            'p.id_setor as id_setor_projeto',
            's.dsc_setor as dsc_setor_projeto',
            'p.id_empresa as id_empresa_projeto',
            knex.raw("concat(u.dsc_nome, ' ', u.dsc_sobrenome) as dsc_nome_completo_usuario_empresa"),
            'u.dsc_nome as dsc_nome_usuario_empresa',
            'u.dsc_login as dsc_login_usuario_empresa',
            'ue.dsc_cargo as dsc_cargo_usuario_empresa',
            'u.id_usuario')
    .leftJoin({p: "projeto"}, "p.id_projeto", "=", "pue.id_projeto")
    .leftJoin({ue: "usuario_empresa"}, "ue.id_usuario_empresa", "=", "pue.id_usuario_empresa")
    .leftJoin({s: "setor"}, "s.id_setor", "=", "p.id_setor")
    .leftJoin({u: "usuario"}, "u.id_usuario", "=", "ue.id_usuario")
    .where(1, '=', 1);
    if (id_projeto_usuario_empresa)
        query.andWhere('pue.id_projeto_usuario_empresa', '=', id_projeto_usuario_empresa);
    if (id_projeto)
        query.andWhere('pue.id_projeto', '=', id_projeto);
    if (id_usuario_empresa)
        query.andWhere('pue.id_usuario_empresa', '=', id_usuario_empresa);
    if (parametros) {
        if (parametros.id_projeto)
            query.andWhere('pue.id_projeto', '=', parametros.id_projeto);
        if (parametros.id_usuario_empresa)
            query.andWhere('pue.id_usuario_empresa', '=', parametros.id_usuario_empresa);
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
        if (parametros.dsc_nome_completo_usuario_empresa)
            query.andWhere(knex.raw("concat(u.dsc_nome, ' ', u.dsc_sobrenome)"), 'like', '%' + parametros.dsc_nome_completo_usuario_empresa + '%')
        if (parametros.dsc_nome_usuario_empresa)
            query.andWhere('u.dsc_nome', 'like', '%' + parametros.dsc_nome_usuario_empresa + '%')
        if (parametros.dsc_login_usuario_empresa)
            query.andWhere('u.dsc_login', 'like', '%' + parametros.dsc_login_usuario_empresa + '%')
        if (parametros.dsc_cargo_usuario_empresa)
            query.andWhere('ue.dsc_cargo', 'like', '%' + parametros.dsc_cargo_usuario_empresa + '%')
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

const insertProjetoUsuarioEmpresa = async (dados) => {
    let query = knex('projeto_usuario_empresa')
    .insert({
        id_projeto: dados.id_projeto,
        id_usuario_empresa: dados.id_usuario_empresa
    }).returning('id_projeto_usuario_empresa');
    let result = await query;
    return result;
};

const deleteProjetoUsuarioEmpresa = async (id) => {
    try {
        let query = knex('projeto_usuario_empresa')
        .delete()
        .where('id_projeto_usuario_empresa', '=', id);
        let result = await query;
        return result;
    }
    catch (erro) {
        return 'Erro: ' + erro;
    }
};

// Exportando Funções
module.exports = {
    selectProjetoUsuarioEmpresa,
    insertProjetoUsuarioEmpresa,
    deleteProjetoUsuarioEmpresa
}