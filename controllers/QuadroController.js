// Importando Models
const quadroModel = require('../models/QuadroModel');

// Importando Funções
const formatoData = require('./GeralController').formatoData;
const configuraPaginacao = require('./GeralController').configuraPaginacao;
const aplicaPaginacao = require('./GeralController').aplicaPaginacao;

// Funções do Controller
const quadroRead = async (request, response) => {
    var result;
    var querySelect = await quadroModel.selectQuadro(request.params.id, request.query);
    for (let i = 0; i < querySelect.length; i++) {
        if (request.query.isForm) {
            if (querySelect[i]['id_projeto'] == null)
                querySelect[i]['id_projeto'] = undefined;
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

const quadroCreate = async (request, response) => {
    var result = new Object();
    var dados = request.body;
    var queryInsert = await quadroModel.insertQuadro(dados);
    if (queryInsert.length > 0) {
        result['sucesso'] = true;
        result['mensagem'] = 'Quadro cadastrado com sucesso!';
    }
    else {
        result['sucesso'] = false;
        result['mensagem'] = 'Erro ao cadastrar quadro!';
    }
    response.status(200).json({error: false, data: result});
};

const quadroUpdate = async (request, response) => {
    var result = new Object();
    var id_quadro = request.params.id;
    var dados = request.body;
    var queryUpdate = await quadroModel.updateQuadro(id_quadro, dados);
    if (queryUpdate > 0) {
        result['sucesso'] = true;
        result['mensagem'] = 'Quadro editado com sucesso!';
    }
    else {
        result['sucesso'] = false;
        result['mensagem'] = 'Erro ao editar quadro!';
    }
    response.status(200).json({error: false, data: result});
};

const quadroDelete = async (request, response) => {
    var result = new Object();
    var id_quadro = request.params.id;
    var queryDelete = await quadroModel.deleteQuadro(id_quadro);
    if (typeof(queryDelete) == 'number') {
        result['sucesso'] = true;
        result['mensagem'] = 'Quadro deletado com sucesso!';
    }
    else {
        result['sucesso'] = false;
        result['mensagem'] = 'Erro ao deletar quadro!';
    }
    response.status(200).json({error: false, data: result});
};

// Exportando Funções
module.exports = {
    quadroRead,
    quadroCreate,
    quadroUpdate,
    quadroDelete
};