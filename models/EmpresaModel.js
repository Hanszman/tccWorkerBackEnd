// Importando Conexão com o Banco de Dados
const knex = require('../database/conexao');

// Funções do Model
const selectEmpresas = async (id_usuario, dsc_nome) => {
    var query = await knex('empresa')
    .join('usuario_empresa', function(){
        this.on('usuario_empresa.id_empresa', '=', 'empresa.id_empresa')
    })
    .where('usuario_empresa.id_usuario', '=', id_usuario)
    .andWhere('empresa.dsc_nome', 'like', dsc_nome);
    return query;
};

const selectEmpresaID = async (id_empresa) => {
    var query = await knex('empresa')
    .select('empresa.*')
    .countDistinct('usuario_empresa.id_usuario as qtd_usuario')
    .join('usuario_empresa', function(){
        this.on('usuario_empresa.id_empresa', '=', 'empresa.id_empresa')
    })
    .where('empresa.id_empresa', '=', id_empresa)
    .groupBy('empresa.id_empresa');
    return query;
};

// Exportando Funções
module.exports = {
    selectEmpresas,
    selectEmpresaID
}