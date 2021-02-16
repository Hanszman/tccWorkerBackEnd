// Importando Conexão com o Banco de Dados
const knex = require('../database/conexao');

// Funções do Model
const selectEtapaEmpresa = async (id_empresa) => {
    let query = knex({ e: 'etapa' })
    .select('e.*')
    .leftJoin({ em: "empresa" }, "em.id_empresa", "=", "e.id_empresa")
    .where(1, '=', 1)
    .andWhere('e.id_empresa', '=', id_empresa)
    .orderBy('e.ind_sequencia', 'asc');
    let result = await query;
    return result;
};

const selectAtividadeEtapa = async () => {

};

const selectAtividadePrioridadeEtapa = async () => {

};

const selectAtividadeClienteEtapa = async () => {

};

const selectAtividadeFornecedorEtapa = async () => {

};

const selectAtividadeFuncionarioEtapa = async () => {

};

const selectAtividadeSetorEtapa = async () => {

};

const selectAtividadeProjetoEtapa = async () => {

};

const selectProjetoCliente = async () => {

};

const selectProjetoFornecedor = async () => {

};

const selectProjetoFuncionario = async () => {

};

const selectProjetoSetor = async () => {

};

// Exportando Funções
module.exports = {
    selectEtapaEmpresa,
    selectAtividadeEtapa,
    selectAtividadePrioridadeEtapa,
    selectAtividadeClienteEtapa,
    selectAtividadeFornecedorEtapa,
    selectAtividadeFuncionarioEtapa,
    selectAtividadeSetorEtapa,
    selectAtividadeProjetoEtapa,
    selectProjetoCliente,
    selectProjetoFornecedor,
    selectProjetoFuncionario,
    selectProjetoSetor
};