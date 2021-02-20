// Importando Conexão com o Banco de Dados
const { select } = require('../database/conexao');
const knex = require('../database/conexao');

// Funções do Model
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

const selectAtividadeSetorEtapa = async (id_empresa) => {
    let query = knex({ a: 'atividade' })
    .countDistinct('a.id_atividade as quantidade')
    .select('s.dsc_setor', 'e.dsc_etapa', 's.id_setor', 'e.id_etapa', 'e.ind_sequencia')
    .leftJoin({ q: "quadro" }, "q.id_quadro", "=", "a.id_quadro")
    .leftJoin({ p: "projeto" }, "p.id_projeto", "=", "q.id_projeto")
    .leftJoin({ s: "setor" }, "s.id_setor", "=", "p.id_setor")
    .leftJoin({ e: "etapa" }, "e.id_etapa", "=", "a.id_etapa")
    .where(1, '=', 1)
    .andWhere('s.id_empresa', '=', id_empresa)
    .groupBy('s.dsc_setor')
    .groupBy('e.dsc_etapa')
    .orderBy('s.id_setor', 'asc')
    .orderBy('e.ind_sequencia', 'asc')
    let result = await query;
    return result;
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