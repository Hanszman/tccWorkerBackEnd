// Importando Conexão com o Banco de Dados
const knex = require('../database/conexao');

// Funções do Model
const selectUsuarioEmpresa = async (id_usuario, id_empresa) => {
    var result = new Object();
    let boolUE = false;
    let boolU = false;
    let resultBool = false;
    
    let queryUE = knex('usuario_empresa')
    .where(1, '=', 1)
    .andWhere('id_usuario', '=', id_usuario)
    .andWhere('id_empresa', '=', id_empresa);
    let resultQueryUE = await queryUE;
    
    let queryU = knex('usuario')
    .where(1, '=', 1)
    .andWhere('id_usuario', '=', id_usuario);
    let resultQueryU = await queryU;

    if (resultQueryUE.length == 0)
        boolUE = true;
    else
        result['mensagem'] = 'Este usuário já é um funcionário vinculado a esta empresa!';

    if (resultQueryU.length > 0)
        boolU = true;
    else
        result['mensagem'] = 'Este usuário não existe no sistema!';

    if (boolUE && boolU)
        resultBool = true;
    
    result['boolean'] = resultBool;
    return result;
};

const insertUsuarioEmpresa = async (dados) => {
    let query = knex('usuario_empresa')
    .insert({
        id_usuario: dados.id_usuario,
        id_empresa: dados.id_empresa,
        ind_controle_acesso: dados.ind_controle_acesso,
        dsc_cargo: dados.dsc_cargo,
        ind_contratacao: dados.ind_contratacao,
        ind_status: dados.ind_status,
        dat_contratacao: dados.dat_contratacao,
        id_setor: dados.id_setor
    }).returning('id_usuario_empresa');
    let result = await query;
    return result;
};

const updateUsuarioEmpresa = async (id, dados) => {
    let query = knex('usuario_empresa')
    .update({
        id_usuario: dados.id_usuario,
        id_empresa: dados.id_empresa,
        ind_controle_acesso: dados.ind_controle_acesso,
        dsc_cargo: dados.dsc_cargo,
        ind_contratacao: dados.ind_contratacao,
        ind_status: dados.ind_status,
        dat_contratacao: dados.dat_contratacao,
        id_setor: dados.id_setor
    }).where('id_usuario_empresa', '=', id)
    let result = await query;
    return result;
};

const deleteUsuarioEmpresa = async (id) => {
    try {
        await knex('projeto_usuario_empresa')
        .delete()
        .where('id_usuario_empresa', '=', id);

        await knex('atividade_usuario_empresa')
        .delete()
        .where('id_usuario_empresa', '=', id);

        let query = knex('usuario_empresa')
        .delete()
        .where('id_usuario_empresa', '=', id);
        let result = await query;
        return result;
    }
    catch (erro) {
        return 'Erro: ' + erro;
    }
};

// Exportando Funções
module.exports = {
    selectUsuarioEmpresa,
    insertUsuarioEmpresa,
    updateUsuarioEmpresa,
    deleteUsuarioEmpresa
}