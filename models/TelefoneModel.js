// Importando Conexão com o Banco de Dados
const knex = require('../database/conexao');

// Funções do Model
const selectTelefone = async (id_empresa, id_usuario, id_fornecedor, id_cliente) => {
    let query = knex('telefone');
    if (id_empresa)
        query.where('id_empresa', '=', id_empresa);
    if (id_usuario)
        query.where('id_usuario', '=', id_usuario);
    if (id_fornecedor)
        query.where('id_fornecedor', '=', id_fornecedor);
    if (id_cliente)
        query.where('id_cliente', '=', id_cliente);
    let result = await query;
    return result;
};

// Exportando Funções
module.exports = {
    selectTelefone
}