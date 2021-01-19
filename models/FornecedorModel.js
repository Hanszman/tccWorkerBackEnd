// Importando Conexão com o Banco de Dados
const knex = require('../database/conexao');

// Funções do Model
const selectFornecedor = async (id_fornecedor, parametros) => {
    let query = knex('fornecedor')
    .where(1, '=', 1);
    if (id_fornecedor)
        query.andWhere('id_fornecedor', '=', id_fornecedor);
    if (parametros) {
        if (parametros.id_empresa)
            query.andWhere('id_empresa', '=', parametros.id_empresa);
        if (parametros.dsc_nome)
            query.andWhere('dsc_nome', 'like', '%' + parametros.dsc_nome + '%');
        if (parametros.ind_cnpj)
            query.andWhere('ind_cnpj', 'like', '%' + parametros.ind_cnpj + '%');
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
    selectFornecedor
}