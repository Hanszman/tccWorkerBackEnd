// Importando Models
const telefoneModel = require('../models/TelefoneModel');

// Importando Funções
const indTipoTelefone = require('./GeralController').indTipoTelefone;
const filtroSelect = require('./GeralController').filtroSelect;
const configuraPaginacao = require('./GeralController').configuraPaginacao;
const aplicaPaginacao = require('./GeralController').aplicaPaginacao;

// Funções do Controller
const telefoneRead = async (request, response) => {
    var result;
    var queryFiltro = [];
    var querySelect = await telefoneModel.selectTelefone(request.params.id, request.query);
    for (let i = 0; i < querySelect.length; i++) {
        if (!request.query.isForm) {
            querySelect[i]['ind_tipo'] = indTipoTelefone(querySelect[i]['ind_tipo']);
            if (filtroSelect(querySelect[i]['ind_tipo'], request.query['ind_tipo']))
                queryFiltro.push(querySelect[i]);
        }
    }
    if (request.params.id) {
        if (!request.query.isForm)
            result = queryFiltro;
        else
            result = querySelect;
    }
    else {
        var paginacao = configuraPaginacao(request.query.pagina, request.query.paginacao);
        if (!request.query.isForm)
            result = aplicaPaginacao(paginacao, queryFiltro);
        else
            result = aplicaPaginacao(paginacao, querySelect);
    }
    response.status(200).json({error: false, data: result});
};

const telefoneCreate = async (request, response) => {
    var result = new Object();
    var dados = request.body;
    var queryInsert = await telefoneModel.insertTelefone(dados);
    if (queryInsert.length > 0) {
        result['sucesso'] = true;
        result['mensagem'] = 'Telefone cadastrado com sucesso!';
    }
    else {
        result['sucesso'] = false;
        result['mensagem'] = 'Erro ao cadastrar telefone!';
    }
    response.status(200).json({error: false, data: result});
};

const telefoneUpdate = async (request, response) => {
    var result = new Object();
    var id_telefone = request.params.id;
    var dados = request.body;
    var queryUpdate = await telefoneModel.updateTelefone(id_telefone, dados);
    if (queryUpdate > 0) {
        result['sucesso'] = true;
        result['mensagem'] = 'Telefone editado com sucesso!';
    }
    else {
        result['sucesso'] = false;
        result['mensagem'] = 'Erro ao editar telefone!';
    }
    response.status(200).json({error: false, data: result});
};

const telefoneDelete = async (request, response) => {
    var result = new Object();
    var id_telefone = request.params.id;
    var queryDelete = await telefoneModel.deleteTelefone(id_telefone);
    if (typeof(queryDelete) == 'number') {
        result['sucesso'] = true;
        result['mensagem'] = 'Telefone deletado com sucesso!';
    }
    else {
        result['sucesso'] = false;
        result['mensagem'] = 'Erro ao deletar telefone!';
    }
    response.status(200).json({error: false, data: result});
};

// Exportando Funções
module.exports = {
    telefoneRead,
    telefoneCreate,
    telefoneUpdate,
    telefoneDelete
};