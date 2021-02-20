// Importando Models
const chartModel = require('../models/ChartModel');
const etapaModel = require('../models/EtapaModel');
const setorModel = require('../models/SetorModel');

// Funções do Controller
// 1-) Quantidade de Atividades por Etapa (Pizza) ***
const atividadeEtapaChart = async (request, response) => {
    var result = new Object();
    response.status(200).json({error: false, data: result});
};

// 2-) Quantidade de Atividades por Prioridade e por Etapa (Barra Stacked) ***
const atividadePrioridadeEtapaChart = async (request, response) => {
    var result = new Object();
    response.status(200).json({error: false, data: result});
};

// 3-) Quantidade de Atividades por Cliente e por Etapa (Barra Stacked)
const atividadeClienteEtapaChart = async (request, response) => {
    var result = new Object();
    response.status(200).json({error: false, data: result});
};

// 4-) Quantidade de Atividades por Fornecedor e por Etapa (Barra Stacked)
const atividadeFornecedorEtapaChart = async (request, response) => {
    var result = new Object();
    response.status(200).json({error: false, data: result});
};

// 5-) Quantidade de Atividades por Funcionário e por Etapa (Barra Horizontal Stacked) ***
const atividadeFuncionarioEtapaChart = async (request, response) => {
    var result = new Object();
    response.status(200).json({error: false, data: result});
};

// 6-) Quantidade de Atividades por Setor e por Etapa (Barra Stacked) ***
const atividadeSetorEtapaChart = async (request, response) => {
    var result = new Object();
    var dados = request.query;
    var tipos = [];
    var legendas = [];
    var eixoX = [];
    if (dados.id_empresa) {
        var queryEtapa = await etapaModel.selectEtapa(undefined, { ordenarPor: 'ind_sequencia', id_empresa: dados.id_empresa });
        if (queryEtapa.length > 0) {
            for (let i = 0; i < queryEtapa.length; i++) {
                legendas.push(queryEtapa[i].dsc_etapa);
                tipos.push('bar');
            }
        }
        var querySetor = await setorModel.selectSetor(undefined, { id_empresa: dados.id_empresa });
        if (querySetor.length > 0) {
            for (let i = 0; i < querySetor.length; i++)
                eixoX.push(querySetor[i].dsc_setor);
        }
    }
    result['tipos'] = tipos;
    result['legendas'] = legendas;
    result['eixoX'] = eixoX;
    result['eixoY'] = [];
    response.status(200).json({error: false, data: result});
};

// 7-) Quantidade de Atividades por Projeto e por Etapa (Barra Stacked)
const atividadeProjetoEtapaChart = async (request, response) => {
    var result = new Object();
    response.status(200).json({error: false, data: result});
};

// 8-) Quantidade de Projetos por Cliente (Pizza)
const projetoClienteChart = async (request, response) => {
    var result = new Object();
    response.status(200).json({error: false, data: result});
};

// 9-) Quantidade de Projetos por Fornecedor (Pizza)
const projetoFornecedorChart = async (request, response) => {
    var result = new Object();
    response.status(200).json({error: false, data: result});
};

// 10-) Quantidade de Projetos por Funcionário (Pizza)
const projetoFuncionarioChart = async (request, response) => {
    var result = new Object();
    response.status(200).json({error: false, data: result});
};

// 11-) Quantidade de Projetos por Setor (Pizza)
const projetoSetorChart = async (request, response) => {
    var result = new Object();
    response.status(200).json({error: false, data: result});
};

// Exportando Funções
module.exports = {
    atividadeEtapaChart,
    atividadePrioridadeEtapaChart,
    atividadeClienteEtapaChart,
    atividadeFornecedorEtapaChart,
    atividadeFuncionarioEtapaChart,
    atividadeSetorEtapaChart,
    atividadeProjetoEtapaChart,
    projetoClienteChart,
    projetoFornecedorChart,
    projetoFuncionarioChart,
    projetoSetorChart
};