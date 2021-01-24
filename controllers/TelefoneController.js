// Importando Models
const telefoneModel = require('../models/TelefoneModel');

// Importando Funções
const configuraPaginacao = require('./GeralController').configuraPaginacao;
const aplicaPaginacao = require('./GeralController').aplicaPaginacao;

// Funções do Controller
const telefoneRead = async (request, response) => {
    var result;
    var querySelect = await telefoneModel.selectTelefone(request.params.id, request.query);
    if (request.params.id)
        result = querySelect;
    else {
        var paginacao = configuraPaginacao(request.query.pagina, request.query.paginacao);
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