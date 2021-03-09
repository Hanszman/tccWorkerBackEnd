// Importando Conexão com o Banco de Dados
const knex = require('../database/conexao');

// Funções do Model
const selectUsuario = async (id_usuario, parametros, dsc_login) => {
    let query = knex({ u: 'usuario' })
    .select('u.*', knex.raw("concat(u.dsc_nome, ' ', u.dsc_sobrenome) as dsc_nome_completo"))
    .where(1, '=', 1);
    if (id_usuario)
        query.andWhere('u.id_usuario', '=', id_usuario);
    if (dsc_login)
        query.andWhere('u.dsc_login', '=', dsc_login);
    if (parametros) {
        if (parametros.id_empresa) {
            query.select('ue.*', 's.id_setor', 's.dsc_setor');
            query.join({ ue: "usuario_empresa" }, "ue.id_usuario", "=", "u.id_usuario");
            query.leftJoin({ s: "setor" }, "s.id_setor", "=", "ue.id_setor");
            query.andWhere('ue.id_empresa', '=', parametros.id_empresa);
            if (parametros.dsc_cargo)
                query.andWhere('ue.dsc_cargo', 'like', '%' + parametros.dsc_cargo + '%');
            if (parametros.id_setor)
                query.andWhere('s.id_setor', '=', parametros.id_setor);
            if (parametros.dsc_setor)
                query.andWhere('s.dsc_setor', 'like', '%' + parametros.dsc_setor + '%');
        }
        if (parametros.id_usuario)
            query.andWhere('u.id_usuario', '=', parametros.id_usuario);
        if (parametros.dsc_nome)
            query.andWhere('u.dsc_nome', 'like', '%' + parametros.dsc_nome + '%');
        if (parametros.dsc_email)
            query.andWhere('u.dsc_email', 'like', '%' + parametros.dsc_email + '%');
        if (parametros.dsc_nome_completo)
            query.andWhere(knex.raw("concat(u.dsc_nome, ' ', u.dsc_sobrenome)"), 'like', '%' + parametros.dsc_nome_completo + '%');
        if (parametros.dsc_login)
            query.andWhere('u.dsc_login', 'like', '%' + parametros.dsc_login + '%');
        if (parametros.ordenarPor) {
            if (parametros.direcao)
                query.orderBy(parametros.ordenarPor, parametros.direcao);
            else
                query.orderBy(parametros.ordenarPor, "asc");
        }
        else
            query.orderBy('u.dsc_nome', 'asc');
    }
    else
        query.orderBy('u.dsc_nome', 'asc');
    let result = await query;
    return result;
};

const insertUsuario = async (dados) => {
    let query = knex('usuario')
    .insert({
        dsc_nome: dados.dsc_nome,
        dsc_sobrenome: dados.dsc_sobrenome,
        dsc_email: dados.dsc_email,
        dsc_login: dados.dsc_login,
        dsc_senha: dados.dsc_senha
    }).returning('id_usuario');
    let result = await query;
    return result;
};

const updateUsuario = async (id, dados) => {
    let query = knex('usuario')
    .update({
        dsc_nome: dados.dsc_nome,
        dsc_sobrenome: dados.dsc_sobrenome,
        dsc_email: dados.dsc_email,
        dsc_login: dados.dsc_login,
        dsc_senha: dados.dsc_senha,
        dat_nascimento: dados.dat_nascimento,
        dsc_cpf: dados.dsc_cpf,
        dsc_rg: dados.dsc_rg,
        arq_foto: dados.caminho_arq_foto
    }).where('id_usuario', '=', id)
    let result = await query;
    return result;
};

const deleteUsuario = async (id) => {
    try {
        // TODO: fazer todos os deletes necessários
        // (usuario_empresa, projeto_usuario_empresa, atividade_usuario_empresa, telefone, email, endereco)
        await knex('usuario_empresa')
        .delete()
        .where('id_usuario', '=', id);

        let query = knex('usuario')
        .delete()
        .where('id_usuario', '=', id);
        let result = await query;
        return result;
    }
    catch (erro) {
        return 'Erro: ' + erro;
    }
};

// Exportando Funções
module.exports = {
    selectUsuario,
    insertUsuario,
    updateUsuario,
    deleteUsuario
}