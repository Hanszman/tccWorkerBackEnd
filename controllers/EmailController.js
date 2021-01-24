// Importando Models
const emailModel = require('../models/EmailModel');

// Importando Funções
const configuraPaginacao = require('./GeralController').configuraPaginacao;
const aplicaPaginacao = require('./GeralController').aplicaPaginacao;

// Funções do Controller
const emailRead = async (request, response) => {
    var result;
    var querySelect = await emailModel.selectEmail(request.params.id, request.query);
    if (request.params.id)
        result = querySelect;
    else {
        var paginacao = configuraPaginacao(request.query.pagina, request.query.paginacao);
        result = aplicaPaginacao(paginacao, querySelect);
    }
    response.status(200).json({error: false, data: result});
};

const emailCreate = async (request, response) => {
    var result = new Object();
    var dados = request.body;
    var queryInsert = await emailModel.insertEmail(dados);
    if (queryInsert.length > 0) {
        result['sucesso'] = true;
        result['mensagem'] = 'E-mail cadastrado com sucesso!';
    }
    else {
        result['sucesso'] = false;
        result['mensagem'] = 'Erro ao cadastrar e-mail!';
    }
    response.status(200).json({error: false, data: result});
};

const emailUpdate = async (request, response) => {
    var result = new Object();
    var id_email = request.params.id;
    var dados = request.body;
    var queryUpdate = await emailModel.updateEmail(id_email, dados);
    if (queryUpdate > 0) {
        result['sucesso'] = true;
        result['mensagem'] = 'E-mail editado com sucesso!';
    }
    else {
        result['sucesso'] = false;
        result['mensagem'] = 'Erro ao editar e-mail!';
    }
    response.status(200).json({error: false, data: result});
};

const emailDelete = async (request, response) => {
    var result = new Object();
    var id_email = request.params.id;
    var queryDelete = await emailModel.deleteEmail(id_email);
    if (typeof(queryDelete) == 'number') {
        result['sucesso'] = true;
        result['mensagem'] = 'E-mail deletado com sucesso!';
    }
    else {
        result['sucesso'] = false;
        result['mensagem'] = 'Erro ao deletar e-mail!';
    }
    response.status(200).json({error: false, data: result});
};

// Exportando Funções
module.exports = {
    emailRead,
    emailCreate,
    emailUpdate,
    emailDelete
};