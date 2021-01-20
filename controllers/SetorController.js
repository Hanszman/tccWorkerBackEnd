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

};

const setorUpdate = async (request, response) => {

};

const setorDelete = async (request, response) => {

};

// Exportando Funções
module.exports = {
    setorRead,
    setorCreate,
    setorUpdate,
    setorDelete
};