// Importando Conexão com o Banco de Dados
const knex = require('../database/conexao');

// Funções do Model
const selectEndereco = async (id_endereco, parametros) => {
    let query = knex('endereco')
    .where(1, '=', 1);
    if (id_endereco)
        query.andWhere('id_endereco', '=', id_endereco);
    if (parametros) {
        if (parametros.id_usuario)
            query.andWhere('id_usuario', '=', parametros.id_usuario);
        if (parametros.id_fornecedor)
            query.andWhere('id_fornecedor', '=', parametros.id_fornecedor);
        if (parametros.id_cliente)
            query.andWhere('id_cliente', '=', parametros.id_cliente);
        if (parametros.id_empresa)
            query.andWhere('id_empresa', '=', parametros.id_empresa);
        if (parametros.dsc_logradouro)
            query.andWhere('dsc_logradouro', 'like', '%' + parametros.dsc_logradouro + '%');
        if (parametros.dsc_numero)
            query.andWhere('dsc_numero', 'like', '%' + parametros.dsc_numero + '%');
        if (parametros.dsc_bairro)
            query.andWhere('dsc_bairro', 'like', '%' + parametros.dsc_bairro + '%');
        if (parametros.dsc_cidade)
            query.andWhere('dsc_cidade', 'like', '%' + parametros.dsc_cidade + '%');
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

// Exportando Funções
module.exports = {
    selectEndereco
}