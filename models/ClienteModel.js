// Importando Conexão com o Banco de Dados
const knex = require('../database/conexao');

// Funções do Model
const selectCliente = async (id_cliente, parametros) => {
    let query = knex('cliente')
    .where(1, '=', 1);
    if (id_cliente)
        query.andWhere('id_cliente', '=', id_cliente);
    if (parametros) {
        if (parametros.id_empresa)
            query.andWhere('id_empresa', '=', parametros.id_empresa);
        if (parametros.dsc_nome)
            query.andWhere('dsc_nome', 'like', '%' + parametros.dsc_nome + '%');
        if (parametros.dsc_cnpj)
            query.andWhere('dsc_cnpj', 'like', '%' + parametros.dsc_cnpj + '%');
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
    selectCliente
}