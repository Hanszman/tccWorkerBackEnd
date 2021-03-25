// Importando Conexão com o Banco de Dados
const { select } = require('../database/conexao');
const knex = require('../database/conexao');

// Funções do Model
const selectAtividadeEtapa = async (id_empresa, id_etapa, id_usuario_empresa) => {
    let query = knex({ a: 'atividade' })
    .countDistinct('a.id_atividade as quantidade')
    .select('e.dsc_etapa', 'e.id_etapa', 'e.ind_sequencia')
    .leftJoin({ e: "etapa" }, "e.id_etapa", "=", "a.id_etapa")
    .where(1, '=', 1)
    .andWhere('e.id_empresa', '=', id_empresa)
    .andWhere('e.id_etapa', '=', id_etapa)
    .groupBy('e.id_etapa')
    .orderBy('e.ind_sequencia', 'asc')
    if (id_usuario_empresa) {
        query.leftJoin({ aue: "atividade_usuario_empresa" }, "aue.id_atividade", "=", "a.id_atividade")
        query.andWhere('aue.id_usuario_empresa', '=', id_usuario_empresa)
    }
    let result = await query;
    return result;
};

const selectAtividadePrioridadeEtapa = async (id_empresa, ind_prioridade, id_etapa, id_usuario_empresa) => {
    let query = knex({ a: 'atividade' })
    .countDistinct('a.id_atividade as quantidade')
    .select('a.ind_prioridade', 'e.dsc_etapa', 'e.id_etapa', 'e.ind_sequencia')
    .leftJoin({ e: "etapa" }, "e.id_etapa", "=", "a.id_etapa")
    .where(1, '=', 1)
    .andWhere('e.id_empresa', '=', id_empresa)
    .andWhere('a.ind_prioridade', '=', ind_prioridade)
    .andWhere('e.id_etapa', '=', id_etapa)
    .groupBy('a.ind_prioridade')
    .groupBy('e.id_etapa')
    .orderBy('a.ind_prioridade', 'asc')
    .orderBy('e.ind_sequencia', 'asc')
    if (id_usuario_empresa) {
        query.leftJoin({ aue: "atividade_usuario_empresa" }, "aue.id_atividade", "=", "a.id_atividade")
        query.andWhere('aue.id_usuario_empresa', '=', id_usuario_empresa)
    }
    let result = await query;
    return result;
};

const selectAtividadeClienteEtapa = async (id_empresa, id_cliente, id_etapa) => {
    let query = knex({ a: 'atividade' })
    .countDistinct('a.id_atividade as quantidade')
    .select('c.dsc_nome', 'e.dsc_etapa', 'c.id_cliente', 'e.id_etapa', 'e.ind_sequencia')
    .leftJoin({ q: "quadro" }, "q.id_quadro", "=", "a.id_quadro")
    .leftJoin({ p: "projeto" }, "p.id_projeto", "=", "q.id_projeto")
    .leftJoin({ pc: "projeto_cliente" }, "pc.id_projeto", "=", "p.id_projeto")
    .leftJoin({ c: "cliente" }, "c.id_cliente", "=", "pc.id_cliente")
    .leftJoin({ e: "etapa" }, "e.id_etapa", "=", "a.id_etapa")
    .where(1, '=', 1)
    .andWhere('p.id_empresa', '=', id_empresa)
    .andWhere('c.id_cliente', '=', id_cliente)
    .andWhere('e.id_etapa', '=', id_etapa)
    .groupBy('c.dsc_nome')
    .groupBy('e.id_etapa')
    .orderBy('c.id_cliente', 'asc')
    .orderBy('e.ind_sequencia', 'asc')
    let result = await query;
    return result;
};

const selectAtividadeFornecedorEtapa = async (id_empresa, id_fornecedor, id_etapa) => {
    let query = knex({ a: 'atividade' })
    .countDistinct('a.id_atividade as quantidade')
    .select('f.dsc_nome', 'e.dsc_etapa', 'f.id_fornecedor', 'e.id_etapa', 'e.ind_sequencia')
    .leftJoin({ q: "quadro" }, "q.id_quadro", "=", "a.id_quadro")
    .leftJoin({ p: "projeto" }, "p.id_projeto", "=", "q.id_projeto")
    .leftJoin({ pf: "projeto_fornecedor" }, "pf.id_projeto", "=", "p.id_projeto")
    .leftJoin({ f: "fornecedor" }, "f.id_fornecedor", "=", "pf.id_fornecedor")
    .leftJoin({ e: "etapa" }, "e.id_etapa", "=", "a.id_etapa")
    .where(1, '=', 1)
    .andWhere('p.id_empresa', '=', id_empresa)
    .andWhere('f.id_fornecedor', '=', id_fornecedor)
    .andWhere('e.id_etapa', '=', id_etapa)
    .groupBy('f.dsc_nome')
    .groupBy('e.id_etapa')
    .orderBy('f.id_fornecedor', 'asc')
    .orderBy('e.ind_sequencia', 'asc')
    let result = await query;
    return result;
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

const selectAtividadeProjetoEtapa = async (id_empresa, id_projeto, id_etapa) => {
    let query = knex({ a: 'atividade' })
    .countDistinct('a.id_atividade as quantidade')
    .select('p.dsc_nome', 'e.dsc_etapa', 'p.id_projeto', 'e.id_etapa', 'e.ind_sequencia')
    .leftJoin({ q: "quadro" }, "q.id_quadro", "=", "a.id_quadro")
    .leftJoin({ p: "projeto" }, "p.id_projeto", "=", "q.id_projeto")
    .leftJoin({ e: "etapa" }, "e.id_etapa", "=", "a.id_etapa")
    .where(1, '=', 1)
    .andWhere('p.id_empresa', '=', id_empresa)
    .andWhere('p.id_projeto', '=', id_projeto)
    .andWhere('e.id_etapa', '=', id_etapa)
    .groupBy('p.dsc_nome')
    .groupBy('e.id_etapa')
    .orderBy('p.id_projeto', 'asc')
    .orderBy('e.ind_sequencia', 'asc')
    let result = await query;
    return result;
};

const selectProjetoCliente = async (id_empresa, id_cliente) => {
    let query = knex({ p: 'projeto' })
    .countDistinct('p.id_projeto as quantidade')
    .select('c.dsc_nome', 'c.id_cliente')
    .leftJoin({ pc: "projeto_cliente" }, "pc.id_projeto", "=", "p.id_projeto")
    .leftJoin({ c: "cliente" }, "c.id_cliente", "=", "pc.id_cliente")
    .where(1, '=', 1)
    .andWhere('p.id_empresa', '=', id_empresa)
    .andWhere('c.id_cliente', '=', id_cliente)
    .groupBy('c.id_cliente')
    .orderBy('c.dsc_nome', 'asc')
    let result = await query;
    return result;
};

const selectProjetoFornecedor = async (id_empresa, id_fornecedor) => {
    let query = knex({ p: 'projeto' })
    .countDistinct('p.id_projeto as quantidade')
    .select('f.dsc_nome', 'f.id_fornecedor')
    .leftJoin({ pf: "projeto_fornecedor" }, "pf.id_projeto", "=", "p.id_projeto")
    .leftJoin({ f: "fornecedor" }, "f.id_fornecedor", "=", "pf.id_fornecedor")
    .where(1, '=', 1)
    .andWhere('p.id_empresa', '=', id_empresa)
    .andWhere('f.id_fornecedor', '=', id_fornecedor)
    .groupBy('f.id_fornecedor')
    .orderBy('f.dsc_nome', 'asc')
    let result = await query;
    return result;
};

const selectProjetoFuncionario = async (id_empresa, id_usuario_empresa) => {
    let query = knex({ p: 'projeto' })
    .countDistinct('p.id_projeto as quantidade')
    .select(knex.raw("concat(u.dsc_nome, ' ', u.dsc_sobrenome) as dsc_nome_completo"), 'ue.id_usuario_empresa')
    .leftJoin({ pue: "projeto_usuario_empresa" }, "pue.id_projeto", "=", "p.id_projeto")
    .leftJoin({ ue: "usuario_empresa" }, "ue.id_usuario_empresa", "=", "pue.id_usuario_empresa")
    .leftJoin({ u: "usuario" }, "u.id_usuario", "=", "ue.id_usuario")
    .where(1, '=', 1)
    .andWhere('p.id_empresa', '=', id_empresa)
    .andWhere('ue.id_usuario_empresa', '=', id_usuario_empresa)
    .groupBy('ue.id_usuario_empresa')
    .orderBy('ue.id_usuario_empresa', 'asc')
    let result = await query;
    return result;
};

const selectProjetoSetor = async (id_empresa, id_setor) => {
    let query = knex({ p: 'projeto' })
    .countDistinct('p.id_projeto as quantidade')
    .select('s.dsc_setor', 's.id_setor')
    .leftJoin({ s: "setor" }, "s.id_setor", "=", "p.id_setor")
    .where(1, '=', 1)
    .andWhere('p.id_empresa', '=', id_empresa)
    .andWhere('s.id_setor', '=', id_setor)
    .groupBy('s.id_setor')
    .orderBy('s.dsc_setor', 'asc')
    let result = await query;
    return result;
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