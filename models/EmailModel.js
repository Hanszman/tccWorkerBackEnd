// Importando Conexão com o Banco de Dados
const knex = require('../database/conexao');

// Funções do Model
const selectEmail = async (id_email, parametros) => {
    let query = knex('email')
    .where(1, '=', 1);
    if (id_email)
        query.andWhere('id_email', '=', id_email);
    if (parametros) {
        if (parametros.id_usuario)
            query.andWhere('id_usuario', '=', parametros.id_usuario);
        if (parametros.id_fornecedor)
            query.andWhere('id_fornecedor', '=', parametros.id_fornecedor);
        if (parametros.id_cliente)
            query.andWhere('id_cliente', '=', parametros.id_cliente);
        if (parametros.id_empresa)
            query.andWhere('id_empresa', '=', parametros.id_empresa);
        if (parametros.dsc_email)
            query.andWhere('dsc_email', 'like', '%' + parametros.dsc_email + '%');
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

const insertEmail = async (dados) => {

};

const updateEmail = async (id, dados) => {

};

const deleteEmail = async (id) => {

};

// Exportando Funções
module.exports = {
    selectEmail,
    insertEmail,
    updateEmail,
    deleteEmail
}