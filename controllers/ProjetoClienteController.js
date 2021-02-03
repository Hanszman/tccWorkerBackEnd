// Importando Models
const projetoClienteModel = require('../models/ProjetoClienteModel');

// Importando Funções
const formatoData = require('./GeralController').formatoData;
const formatoCNPJ = require('./GeralController').formatoCNPJ;
const configuraPaginacao = require('./GeralController').configuraPaginacao;
const aplicaPaginacao = require('./GeralController').aplicaPaginacao;

// Funções do Controller
const projetoClienteRead = async (request, response) => {
    var result;
    var querySelect = await projetoClienteModel.selectProjetoCliente(request.params.id, undefined, undefined, request.query);
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
            querySelect[i]['dsc_cnpj_cliente'] = formatoCNPJ(querySelect[i]['dsc_cnpj_cliente']);
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

const projetoClienteCreate = async (request, response) => {
    var result = new Object();
    var dados = request.body;
    var querySelect = await projetoClienteModel.selectProjetoCliente(undefined, dados.id_projeto, dados.id_cliente);
    console.log(querySelect.length);
    if (querySelect.length == 0) {
        var queryInsert = await projetoClienteModel.insertProjetoCliente(dados);
        if (queryInsert.length > 0) {
            result['sucesso'] = true;
            result['mensagem'] = 'Projeto vinculado ao cliente com sucesso!';
        }
        else {
            result['sucesso'] = false;
            result['mensagem'] = 'Erro ao vincular projeto ao cliente!';
        }        
    }
    else {
        result['sucesso'] = false;
        result['mensagem'] = 'Vínculo de projeto e cliente já existe!';
    }
    response.status(200).json({error: false, data: result});
};

const projetoClienteDelete = async (request, response) => {
    var result = new Object();
    var id_projeto_cliente = request.params.id;
    var queryDelete = await projetoClienteModel.deleteProjetoCliente(id_projeto_cliente);
    if (typeof(queryDelete) == 'number') {
        result['sucesso'] = true;
        result['mensagem'] = 'Projeto desvinculado de cliente com sucesso!';
    }
    else {
        result['sucesso'] = false;
        result['mensagem'] = 'Erro ao desvincular projeto de cliente!';
    }
    response.status(200).json({error: false, data: result});
};

// Exportando Funções
module.exports = {
    projetoClienteRead,
    projetoClienteCreate,
    projetoClienteDelete
};