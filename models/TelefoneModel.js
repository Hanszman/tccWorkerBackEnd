// Importando Conexão com o Banco de Dados
const knex = require('../database/conexao');

// Funções do Model
const selectTelefone = async (id_telefone, parametros) => {
    let query = knex('telefone')
    .where(1, '=', 1);
    if (id_telefone)
        query.andWhere('id_telefone', '=', id_telefone);
    if (parametros) {
        if (parametros.id_usuario)
            query.andWhere('id_usuario', '=', parametros.id_usuario);
        if (parametros.id_fornecedor)
            query.andWhere('id_fornecedor', '=', parametros.id_fornecedor);
        if (parametros.id_cliente)
            query.andWhere('id_cliente', '=', parametros.id_cliente);
        if (parametros.id_empresa)
            query.andWhere('id_empresa', '=', parametros.id_empresa);
        if (parametros.dsc_telefone)
            query.andWhere('dsc_telefone', 'like', '%' + parametros.dsc_telefone + '%');
        if (parametros.ind_tipo)
            query.andWhere('ind_tipo', 'like', '%' + parametros.ind_tipo + '%');
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

const insertTelefone = async (dados) => {

};

const updateTelefone = async (id, dados) => {

};

const deleteTelefone = async (id) => {

};

// Exportando Funções
module.exports = {
    selectTelefone,
    insertTelefone,
    updateTelefone,
    deleteTelefone
}