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

const selectAtividadeFuncionarioEtapa = async (id_empresa, id_usuario_empresa, id_etapa) => {
    let query = knex({ a: 'atividade' })
    .countDistinct('a.id_atividade as quantidade')
    .select(knex.raw("concat(u.dsc_nome, ' ', u.dsc_sobrenome) as dsc_nome_completo"), 'e.dsc_etapa', 'ue.id_usuario_empresa', 'e.id_etapa', 'e.ind_sequencia')
    .leftJoin({ aue: "atividade_usuario_empresa" }, "aue.id_atividade", "=", "a.id_atividade")
    .leftJoin({ ue: "usuario_empresa" }, "ue.id_usuario_empresa", "=", "aue.id_usuario_empresa")
    .leftJoin({ u: "usuario" }, "u.id_usuario", "=", "ue.id_usuario")
    .leftJoin({ e: "etapa" }, "e.id_etapa", "=", "a.id_etapa")
    .where(1, '=', 1)
    .andWhere('ue.id_empresa', '=', id_empresa)
    .andWhere('ue.id_usuario_empresa', '=', id_usuario_empresa)
    .andWhere('e.id_etapa', '=', id_etapa)
    .groupBy('ue.id_usuario_empresa')
    .groupBy('e.id_etapa')
    .orderBy('ue.id_usuario_empresa', 'asc')
    .orderBy('e.ind_sequencia', 'asc')
    let result = await query;
    return result;
};

const selectAtividadeSetorEtapa = async (id_empresa, id_setor, id_etapa) => {
    let query = knex({ a: 'atividade' })
    .countDistinct('a.id_atividade as quantidade')
    .select('s.dsc_setor', 'e.dsc_etapa', 's.id_setor', 'e.id_etapa', 'e.ind_sequencia')
    .leftJoin({ q: "quadro" }, "q.id_quadro", "=", "a.id_quadro")
    .leftJoin({ p: "projeto" }, "p.id_projeto", "=", "q.id_projeto")
    .leftJoin({ s: "setor" }, "s.id_setor", "=", "p.id_setor")
    .leftJoin({ e: "etapa" }, "e.id_etapa", "=", "a.id_etapa")
    .where(1, '=', 1)
    .andWhere('s.id_empresa', '=', id_empresa)
    .andWhere('s.id_setor', '=', id_setor)
    .andWhere('e.id_etapa', '=', id_etapa)
    .groupBy('s.id_setor')
    .groupBy('e.id_etapa')
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