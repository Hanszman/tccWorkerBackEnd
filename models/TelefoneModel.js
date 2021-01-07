// Importando Conexão com o Banco de Dados
const knex = require('../database/conexao');

// Funções do Model
const selectTelefone = async (id_telefone, parametros) => {
    let query = knex('telefone');
    if (id_telefone)
        query.where('id_telefone', '=', id_telefone);
    if (parametros.id_usuario)
        query.where('id_usuario', '=', parametros.id_usuario);
    if (parametros.id_fornecedor)
        query.where('id_fornecedor', '=', parametros.id_fornecedor);
    if (parametros.id_cliente)
        query.where('id_cliente', '=', parametros.id_cliente);
    if (parametros.id_empresa)
        query.where('id_empresa', '=', parametros.id_empresa);
    if (parametros.dsc_telefone)
        query.where('dsc_telefone', 'like', '%' + parametros.dsc_telefone + '%');
    if (parametros.ind_tipo)
        query.where('ind_tipo', 'like', '%' + parametros.ind_tipo + '%');
    if(parametros.ordenarPor){
        if(parametros.direcao)
            query.orderBy(parametros.ordenarPor, parametros.direcao);
        else
            query.orderBy(parametros.ordenarPor, "asc");
    }
    let result = await query;
    return result;
};

// Exportando Funções
module.exports = {
    selectTelefone
}