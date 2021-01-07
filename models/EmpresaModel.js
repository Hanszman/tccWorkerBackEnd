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
        query.select('ue2.*')
        query.join({ ue2: "usuario_empresa" }, "ue2.id_empresa", "=", "e.id_empresa");
        query.andWhere('ue2.id_usuario', '=', id_usuario);
    }
    if (dsc_nome)
        query.andWhere('e.dsc_nome', 'like', '%' + dsc_nome + '%');
    let result = await query;
    return result;
};

// Exportando Funções
module.exports = {
    selectEmpresa
}