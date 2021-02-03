// Importando Models
const projetoFornecedorModel = require('../models/ProjetoFornecedorModel');

// Importando Funções
const formatoData = require('./GeralController').formatoData;
const formatoCNPJ = require('./GeralController').formatoCNPJ;
const configuraPaginacao = require('./GeralController').configuraPaginacao;
const aplicaPaginacao = require('./GeralController').aplicaPaginacao;

// Funções do Controller
const projetoFornecedorRead = async (request, response) => {
    var result;
    var querySelect = await projetoFornecedorModel.selectProjetoFornecedor(request.params.id, undefined, undefined, request.query);
    for (let i = 0; i < querySelect.length; i++) {
        if (request.query.isForm) {
            if (!querySelect[i]['id_setor_projeto'])
                querySelect[i]['id_setor_projeto'] = undefined;
            querySelect[i]['dat_inicio_projeto'] = formatoData(querySelect[i]['dat_inicio_projeto'], true);
            querySelect[i]['dat_fim_projeto'] = formatoData(querySelect[i]['dat_fim_projeto'], true);
        }
        else {
            querySelect[i]['dat_inicio_projeto'] = formatoData(querySelect[i]['dat_inicio_projeto']);
            querySelect[i]['dat_fim_projeto'] = formatoData(querySelect[i]['dat_fim_projeto']);
            querySelect[i]['dsc_cnpj_fornecedor'] = formatoCNPJ(querySelect[i]['dsc_cnpj_fornecedor']);
        }
    }
    if (request.params.id)
        result = querySelect;
    else {
        var paginacao = configuraPaginacao(request.query.pagina, request.query.paginacao);
        result = aplicaPaginacao(paginacao, querySelect);
    }
    response.status(200).json({error: false, data: result});
};

const projetoFornecedorCreate = async (request, response) => {
    var result = new Object();
    var dados = request.body;
    var querySelect = await projetoFornecedorModel.selectProjetoFornecedor(undefined, dados.id_projeto, dados.id_fornecedor);
    if (querySelect.length == 0) {
        var queryInsert = await projetoFornecedorModel.insertProjetoFornecedor(dados);
        if (queryInsert.length > 0) {
            result['sucesso'] = true;
            result['mensagem'] = 'Projeto vinculado ao fornecedor com sucesso!';
        }
        else {
            result['sucesso'] = false;
            result['mensagem'] = 'Erro ao vincular projeto ao fornecedor!';
        }        
    }
    else {
        result['sucesso'] = false;
        result['mensagem'] = 'Vínculo entre projeto e fornecedor já existe!';
    }
    response.status(200).json({error: false, data: result});
};

const projetoFornecedorDelete = async (request, response) => {
    var result = new Object();
    var id_projeto_fornecedor = request.params.id;
    var queryDelete = await projetoFornecedorModel.deleteProjetoFornecedor(id_projeto_fornecedor);
    if (typeof(queryDelete) == 'number') {
        result['sucesso'] = true;
        result['mensagem'] = 'Projeto desvinculado de fornecedor com sucesso!';
    }
    else {
        result['sucesso'] = false;
        result['mensagem'] = 'Erro ao desvincular projeto de fornecedor!';
    }
    response.status(200).json({error: false, data: result});
};

// Exportando Funções
module.exports = {
    projetoFornecedorRead,
    projetoFornecedorCreate,
    projetoFornecedorDelete
};