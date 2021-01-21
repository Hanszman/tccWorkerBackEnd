// Importando Conexão com o Banco de Dados
const knex = require('../database/conexao');

// Funções do Model
const selectEmpresa = async (id_empresa, id_usuario, dsc_nome) => {
    let query = knex({ e: 'empresa' })
    .select('e.*')
    .countDistinct('ue.id_usuario as qtd_usuario')
    .join({ ue: "usuario_empresa" }, "ue.id_empresa", "=", "e.id_empresa")
    .where(1, '=', 1)
    .groupBy('e.id_empresa');
    if (id_empresa)
        query.andWhere('e.id_empresa', '=', id_empresa);
    if (id_usuario) {
        query.select('ue2.*');
        query.join({ ue2: "usuario_empresa" }, "ue2.id_empresa", "=", "e.id_empresa");
        query.andWhere('ue2.id_usuario', '=', id_usuario);
    }
    if (dsc_nome)
        query.andWhere('e.dsc_nome', 'like', '%' + dsc_nome + '%');
    let result = await query;
    return result;
};

const insertEmpresa = async (dados) => {
    let queryEmpresa = knex('empresa')
    .insert({
        dsc_nome: dados.dsc_nome,
        dsc_cnpj: dados.dsc_cnpj,
        dat_fundacao: dados.dat_fundacao,
        arq_foto: dados.caminho_arq_foto
    }).returning('id_empresa');
    let resultIdEmpresa = await queryEmpresa;

    let queryUsuarioEmpresa = knex('usuario_empresa')
    .insert({
        id_usuario: dados.id_usuario_logado,
        id_empresa: resultIdEmpresa
    }).returning('id_empresa');
    let resultUsuarioEmpresa = await queryUsuarioEmpresa;
    return resultUsuarioEmpresa;
};

const updateEmpresa = async (id, dados) => {
    let query = knex('empresa')
    .update({
        dsc_nome: dados.dsc_nome,
        dsc_cnpj: dados.dsc_cnpj,
        dat_fundacao: dados.dat_fundacao,
        arq_foto: dados.caminho_arq_foto
    }).where('id_empresa', '=', id)
    let result = await query;
    return result;
};

const deleteEmpresa = async (id) => {
    try {
        // TODO: fazer todos os deletes necessários
        await knex('usuario_empresa')
        .delete()
        .where('id_empresa', '=', id);

        let query = knex('empresa')
        .delete()
        .where('id_empresa', '=', id);
        let result = await query;
        return result;
    }
    catch (erro) {
        return 'Erro: ' + erro;
    }
};

// Exportando Funções
module.exports = {
    selectEmpresa,
    insertEmpresa,
    updateEmpresa,
    deleteEmpresa
}