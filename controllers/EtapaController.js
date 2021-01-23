// Importando Models
const etapaModel = require('../models/EtapaModel');

// Importando Funções
const configuraPaginacao = require('./GeralController').configuraPaginacao;
const aplicaPaginacao = require('./GeralController').aplicaPaginacao;

// Funções do Controller
const etapaRead = async (request, response) => {
    var result;
    var querySelect = await etapaModel.selectEtapa(request.params.id, request.query);
    if (request.params.id)
        result = querySelect;
    else {
        var paginacao = configuraPaginacao(request.query.pagina, request.query.paginacao);
        result = aplicaPaginacao(paginacao, querySelect);
    }
    response.status(200).json({error: false, data: result});
};

const etapaCreate = async (request, response) => {
    var result = new Object();
    var dados = request.body;
    var querySelect = await etapaModel.selectEtapa(undefined, undefined, dados.id_empresa_logada, dados.ind_sequencia);
    if (querySelect.length == 0) {
        var queryInsert = await etapaModel.insertEtapa(dados);
        if (queryInsert.length > 0) {
            result['sucesso'] = true;
            result['mensagem'] = 'Etapa cadastrada com sucesso!';
        }
        else {
            result['sucesso'] = false;
            result['mensagem'] = 'Erro ao cadastrar etapa!';
        }
    }
    else {
        result['sucesso'] = false;
        result['mensagem'] = 'Etapa com esta sequência já existe!';
    }
    response.status(200).json({error: false, data: result});
};

const etapaUpdate = async (request, response) => {
    var result = new Object();
    var id_etapa = request.params.id;
    var dados = request.body;
    var querySelect = await etapaModel.selectEtapa(undefined, undefined, dados.id_empresa_logada, dados.ind_sequencia);
    if (querySelect.length == 0) {
        var queryUpdate = await etapaModel.updateEtapa(id_etapa, dados);
        if (queryUpdate > 0) {
            result['sucesso'] = true;
            result['mensagem'] = 'Etapa editada com sucesso!';
        }
        else {
            result['sucesso'] = false;
            result['mensagem'] = 'Erro ao editar etapa!';
        }
    }
    else {
        result['sucesso'] = false;
        result['mensagem'] = 'Etapa com esta sequência já existe!';
    }
    response.status(200).json({error: false, data: result});
};

const etapaDelete = async (request, response) => {
    var result = new Object();
    var id_etapa = request.params.id;
    var queryDelete = await etapaModel.deleteEtapa(id_etapa);
    if (typeof(queryDelete) == 'number') {
        result['sucesso'] = true;
        result['mensagem'] = 'Etapa deletada com sucesso!';
    }
    else {
        result['sucesso'] = false;
        result['mensagem'] = 'Erro ao deletar etapa!';
    }
    response.status(200).json({error: false, data: result});
};

// Exportando Funções
module.exports = {
    etapaRead,
    etapaCreate,
    etapaUpdate,
    etapaDelete
};