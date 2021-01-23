// Importando Models
const enderecoModel = require('../models/EnderecoModel');

// Importando Funções
const configuraPaginacao = require('./GeralController').configuraPaginacao;
const aplicaPaginacao = require('./GeralController').aplicaPaginacao;

// Funções do Controller
const enderecoRead = async (request, response) => {
    var result;
    var querySelect = await enderecoModel.selectEndereco(request.params.id, request.query);
    if (request.params.id)
        result = querySelect;
    else {
        var paginacao = configuraPaginacao(request.query.pagina, request.query.paginacao);
        result = aplicaPaginacao(paginacao, querySelect);
    }
    response.status(200).json({error: false, data: result});
};

const enderecoCreate = async (request, response) => {

};

const enderecoUpdate = async (request, response) => {

};

const enderecoDelete = async (request, response) => {

};

// Exportando Funções
module.exports = {
    enderecoRead,
    enderecoCreate,
    enderecoUpdate,
    enderecoDelete
};