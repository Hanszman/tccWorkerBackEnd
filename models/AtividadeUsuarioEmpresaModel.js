// Importando Conexão com o Banco de Dados
const knex = require('../database/conexao');

// Funções do Model
const selectAtividadeUsuarioEmpresa = async (id_atividade_usuario_empresa, id_atividade, id_usuario_empresa, parametros) => {
    let query = knex({ aue: 'atividade_usuario_empresa' })
    .select('aue.*',
            'a.dsc_nome as dsc_nome_atividade',
            'a.dsc_descricao as dsc_descricao_atividade',
            'a.dat_inicio as dat_inicio_atividade',
            'a.dat_fim as dat_fim_atividade',
            'a.ind_prioridade as ind_prioridade_atividade',
            'e.id_etapa as id_etapa_atividade',
            'e.dsc_etapa as dsc_etapa_atividade',
            'e.ind_sequencia as ind_sequencia_etapa_atividade',
            'q.id_quadro as id_quadro_atividade',
            'q.dsc_nome as dsc_quadro_atividade',
            'p.id_projeto as id_projeto_atividade',
            'p.dsc_nome as dsc_projeto_atividade',
            'p.id_empresa as id_empresa_projeto_atividade',
            knex.raw("concat(u.dsc_nome, ' ', u.dsc_sobrenome) as dsc_nome_completo_usuario_empresa"),
            'u.dsc_nome as dsc_nome_usuario_empresa',
            'u.dsc_login as dsc_login_usuario_empresa',
            'ue.dsc_cargo as dsc_cargo_usuario_empresa',
            'u.id_usuario')
    .leftJoin({a: "atividade"}, "a.id_atividade", "=", "aue.id_atividade")
    .leftJoin({ue: "usuario_empresa"}, "ue.id_usuario_empresa", "=", "aue.id_usuario_empresa")
    .leftJoin({u: "usuario"}, "u.id_usuario", "=", "ue.id_usuario")
    .leftJoin({e: "etapa"}, "e.id_etapa", "=", "a.id_etapa")
    .leftJoin({q: "quadro"}, "q.id_quadro", "=", "a.id_quadro")
    .leftJoin({p: "projeto"}, "p.id_projeto", "=", "q.id_projeto")
    .where(1, '=', 1);
    if (id_atividade_usuario_empresa)
        query.andWhere('aue.id_atividade_usuario_empresa', '=', id_atividade_usuario_empresa);
    if (id_atividade)
        query.andWhere('aue.id_atividade', '=', id_atividade);
    if (id_usuario_empresa)
        query.andWhere('aue.id_usuario_empresa', '=', id_usuario_empresa);
    if (parametros) {
        if (parametros.id_atividade)
            query.andWhere('aue.id_atividade', '=', parametros.id_atividade);
        if (parametros.id_usuario_empresa)
            query.andWhere('aue.id_usuario_empresa', '=', parametros.id_usuario_empresa);
        if (parametros.dsc_nome_atividade)
            query.andWhere('a.dsc_nome', 'like', '%' + parametros.dsc_nome_atividade + '%');
        if (parametros.dsc_descricao_atividade)
            query.andWhere('a.dsc_descricao', 'like', '%' + parametros.dsc_descricao_atividade + '%');
        if (parametros.dat_inicio_atividade)
            query.andWhere('a.dat_inicio', 'like', '%' + parametros.dat_inicio_atividade + '%');
        if (parametros.dat_fim_atividade)
            query.andWhere('a.dat_fim', 'like', '%' + parametros.dat_fim_atividade + '%');
        if (parametros.id_etapa_atividade)
            query.andWhere('e.id_etapa', '=' + parametros.id_etapa_atividade);
        if (parametros.dsc_etapa_atividade)
            query.andWhere('e.dsc_etapa', 'like', '%' + parametros.dsc_etapa_atividade + '%');
        if (parametros.ind_sequencia_etapa_atividade)
            query.andWhere('e.ind_sequencia', 'like', '%' + parametros.ind_sequencia_etapa_atividade + '%');
        if (parametros.id_quadro_atividade)
            query.andWhere('q.id_quadro', '=' + parametros.id_quadro_atividade);
        if (parametros.dsc_quadro_atividade)
            query.andWhere('q.dsc_nome', 'like', '%' + parametros.dsc_quadro_atividade + '%');
        if (parametros.id_projeto_atividade)
            query.andWhere('p.id_projeto', '=' + parametros.id_projeto_atividade);
        if (parametros.dsc_projeto_atividade)
            query.andWhere('p.dsc_nome', 'like', '%' + parametros.dsc_projeto_atividade + '%');
        if (parametros.id_empresa_projeto_atividade)
            query.andWhere('p.id_empresa', '=' + parametros.id_empresa_projeto_atividade);
        if (parametros.dsc_nome_completo_usuario_empresa)
            query.andWhere(knex.raw("concat(u.dsc_nome, ' ', u.dsc_sobrenome)"), 'like', '%' + parametros.dsc_nome_completo_usuario_empresa + '%');
        if (parametros.dsc_nome_usuario_empresa)
            query.andWhere('u.dsc_nome', 'like', '%' + parametros.dsc_nome_usuario_empresa + '%');
        if (parametros.dsc_login_usuario_empresa)
            query.andWhere('u.dsc_login', 'like', '%' + parametros.dsc_login_usuario_empresa + '%');
        if (parametros.dsc_cargo_usuario_empresa)
            query.andWhere('ue.dsc_cargo', 'like', '%' + parametros.dsc_cargo_usuario_empresa + '%');
        if(parametros.ordenarPor){
            if(parametros.direcao)
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

const insertAtividadeUsuarioEmpresa = async (dados) => {
    let query = knex('atividade_usuario_empresa')
    .insert({
        id_atividade: dados.id_atividade,
        id_usuario_empresa: dados.id_usuario_empresa
    }).returning('id_atividade_usuario_empresa');
    let result = await query;
    return result;
};

const deleteAtividadeUsuarioEmpresa = async (id) => {
    try {
        let query = knex('atividade_usuario_empresa')
        .delete()
        .where('id_atividade_usuario_empresa', '=', id);
        let result = await query;
        return result;
    }
    catch (erro) {
        return 'Erro: ' + erro;
    }
};

// Exportando Funções
module.exports = {
    selectAtividadeUsuarioEmpresa,
    insertAtividadeUsuarioEmpresa,
    deleteAtividadeUsuarioEmpresa
}