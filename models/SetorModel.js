// Importando Conexão com o Banco de Dados
const knex = require('../database/conexao');

// Funções do Model
const selectSetor = async (id_setor, parametros) => {
    let query = knex('setor')
    .where(1, '=', 1);
    if (id_setor)
        query.andWhere('id_setor', '=', id_setor);
    if (parametros) {
        if (parametros.id_empresa)
            query.andWhere('id_empresa', '=', parametros.id_empresa);
        if (parametros.dsc_setor)
            query.andWhere('dsc_setor', 'like', '%' + parametros.dsc_setor + '%');
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

const insertSetor = async (dados) => {

};

const updateSetor = async (id, dados) => {

};

const deleteSetor = async (id) => {

};

// Exportando Funções
module.exports = {
    selectSetor,
    insertSetor,
    updateSetor,
    deleteSetor
}