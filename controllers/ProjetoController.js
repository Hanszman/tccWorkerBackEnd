// Importando Models
const projetoModel = require('../models/ProjetoModel');

// Importando Funções
const formatoData = require('./GeralController').formatoData;
const configuraPaginacao = require('./GeralController').configuraPaginacao;
const aplicaPaginacao = require('./GeralController').aplicaPaginacao;

// Funções do Controller
const projetoRead = async (request, response) => {
    var result;
    var querySelect = await projetoModel.selectProjeto(request.params.id, request.query);
    for (let i = 0; i < querySelect.length; i++) {
        if (request.query.isForm){
            querySelect[i]['dat_inicio'] = formatoData(querySelect[i]['dat_inicio'], true);
            querySelect[i]['dat_fim'] = formatoData(querySelect[i]['dat_fim'], true);
        }
        else {
            querySelect[i]['dat_inicio'] = formatoData(querySelect[i]['dat_inicio']);
            querySelect[i]['dat_fim'] = formatoData(querySelect[i]['dat_fim']);
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

const projetoCreate = async (request, response) => {
    var result = new Object();
    var dados = request.body;
    var queryInsert = await projetoModel.insertProjeto(dados);
    if (queryInsert.length > 0) {
        result['sucesso'] = true;
        result['mensagem'] = 'Projeto cadastrado com sucesso!';
    }
    else {
        result['sucesso'] = false;
        result['mensagem'] = 'Erro ao cadastrar projeto!';
    }
    response.status(200).json({error: false, data: result});
};

const projetoUpdate = async (request, response) => {
    var result = new Object();
    var id_projeto = request.params.id;
    var dados = request.body;
    var queryUpdate = await projetoModel.updateProjeto(id_projeto, dados);
    if (queryUpdate > 0) {
        result['sucesso'] = true;
        result['mensagem'] = 'Projeto editado com sucesso!';
    }
    else {
        result['sucesso'] = false;
        result['mensagem'] = 'Erro ao editar projeto!';
    }
    response.status(200).json({error: false, data: result});
};

const projetoDelete = async (request, response) => {
    var result = new Object();
    var id_projeto = request.params.id;
    var queryDelete = await projetoModel.deleteProjeto(id_projeto);
    if (typeof(queryDelete) == 'number') {
        result['sucesso'] = true;
        result['mensagem'] = 'Projeto deletado com sucesso!';
    }
    else {
        result['sucesso'] = false;
        result['mensagem'] = 'Erro ao deletar projeto!';
    }
    response.status(200).json({error: false, data: result});
};

// Exportando Funções
module.exports = {
    projetoRead,
    projetoCreate,
    projetoUpdate,
    projetoDelete
};