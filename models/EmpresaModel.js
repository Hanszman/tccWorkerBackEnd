// Importando Conexão com o Banco de Dados
const knex = require('../database/conexao');

// Funções do Model
const selectEmpresa = async (id_usuario, dsc_nome) => {
    let query = knex('empresa')
    .join('usuario_empresa', function(){
        this.on('usuario_empresa.id_empresa', '=', 'empresa.id_empresa')
    })
    .where('usuario_empresa.id_usuario', '=', id_usuario)
    .andWhere('empresa.dsc_nome', 'like', dsc_nome);
    let result = await query;
    return result;
};

const selectEmpresaID = async (id_empresa) => {
    let query = knex('empresa')
    .select('empresa.*')
    .countDistinct('usuario_empresa.id_usuario as qtd_usuario')
    .join('usuario_empresa', function(){
        this.on('usuario_empresa.id_empresa', '=', 'empresa.id_empresa')
    })
    .where('empresa.id_empresa', '=', id_empresa)
    .groupBy('empresa.id_empresa');
    let result = await query;
    return result;
};

// Exportando Funções
module.exports = {
    selectEmpresa,
    selectEmpresaID
}