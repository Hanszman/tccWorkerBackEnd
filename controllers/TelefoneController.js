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

};

const telefoneUpdate = async (request, response) => {

};

const telefoneDelete = async (request, response) => {

};

// Exportando Funções
module.exports = {
    telefoneRead,
    telefoneCreate,
    telefoneUpdate,
    telefoneDelete
};