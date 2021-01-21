// Importando Models
const setorModel = require('../models/SetorModel');

// Importando Funções
const configuraPaginacao = require('./GeralController').configuraPaginacao;
const aplicaPaginacao = require('./GeralController').aplicaPaginacao;

// Funções do Controller
const setorRead = async (request, response) => {
    var result;
    var querySelect = await setorModel.selectSetor(request.params.id, request.query);
    if (request.params.id)
        result = querySelect;
    else {
        var paginacao = configuraPaginacao(request.query.pagina, request.query.paginacao);
        result = aplicaPaginacao(paginacao, querySelect);
    }
    response.status(200).json({error: false, data: result});
};

const setorCreate = async (request, response) => {
    var result = new Object();
    var dados = request.body;
    var queryInsert = await setorModel.insertSetor(dados);
    if (queryInsert.length > 0) {
        result['sucesso'] = true;
        result['mensagem'] = 'Setor cadastrado com sucesso!';
    }
    else {
        result['sucesso'] = false;
        result['mensagem'] = 'Erro ao cadastrar setor!';
    }
    response.status(200).json({error: false, data: result});
};

const setorUpdate = async (request, response) => {
    var result = new Object();
    var id_setor = request.params.id;
    var dados = request.body;
    var queryUpdate = await setorModel.updateSetor(id_setor, dados);
    if (queryUpdate > 0) {
        result['sucesso'] = true;
        result['mensagem'] = 'Setor editado com sucesso!';
    }
    else {
        result['sucesso'] = false;
        result['mensagem'] = 'Erro ao editar setor!';
    }
    response.status(200).json({error: false, data: result});
};

const setorDelete = async (request, response) => {
    var result = new Object();
    var id_setor = request.params.id;
    var queryDelete = await setorModel.deleteSetor(id_setor);
    if (typeof(queryDelete) == 'number') {
        result['sucesso'] = true;
        result['mensagem'] = 'Setor deletado com sucesso!';
    }
    else {
        result['sucesso'] = false;
        result['mensagem'] = 'Erro ao deletar setor!';
    }
    response.status(200).json({error: false, data: result});
};

// Exportando Funções
module.exports = {
    setorRead,
    setorCreate,
    setorUpdate,
    setorDelete
};