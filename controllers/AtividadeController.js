// Importando Models
const atividadeModel = require('../models/AtividadeModel');

// Importando Funções
const formatoData = require('./GeralController').formatoData;
const configuraPaginacao = require('./GeralController').configuraPaginacao;
const aplicaPaginacao = require('./GeralController').aplicaPaginacao;

// Funções do Controller
const atividadeRead = async (request, response) => {
    var result;
    var querySelect = await atividadeModel.selectAtividade(request.params.id, request.query);
    for (let i = 0; i < querySelect.length; i++) {
        if (request.query.isForm) {
            if (querySelect[i]['id_quadro'] == null)
                querySelect[i]['id_quadro'] = undefined;
            if (querySelect[i]['id_etapa'] == null)
                querySelect[i]['id_etapa'] = undefined;
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

const atividadeCreate = async (request, response) => {
    var result = new Object();
    var dados = request.body;
    var queryInsert = await atividadeModel.insertAtividade(dados);
    if (queryInsert.length > 0) {
        result['sucesso'] = true;
        result['mensagem'] = 'Atividade cadastrada com sucesso!';
    }
    else {
        result['sucesso'] = false;
        result['mensagem'] = 'Erro ao cadastrar atividade!';
    }
    response.status(200).json({error: false, data: result});
};

const atividadeUpdate = async (request, response) => {
    var result = new Object();
    var id_atividade = request.params.id;
    var dados = request.body;
    var queryUpdate = await atividadeModel.updateAtividade(id_atividade, dados);
    if (queryUpdate > 0) {
        result['sucesso'] = true;
        result['mensagem'] = 'Atividade editada com sucesso!';
    }
    else {
        result['sucesso'] = false;
        result['mensagem'] = 'Erro ao editar atividade!';
    }
    response.status(200).json({error: false, data: result});
};

const atividadeDelete = async (request, response) => {
    var result = new Object();
    var id_atividade = request.params.id;
    var queryDelete = await atividadeModel.deleteAtividade(id_atividade);
    if (typeof(queryDelete) == 'number') {
        result['sucesso'] = true;
        result['mensagem'] = 'Atividade deletada com sucesso!';
    }
    else {
        result['sucesso'] = false;
        result['mensagem'] = 'Erro ao deletar atividade!';
    }
    response.status(200).json({error: false, data: result});
};

// Exportando Funções
module.exports = {
    atividadeRead,
    atividadeCreate,
    atividadeUpdate,
    atividadeDelete
};