// Importando Models
const enderecoModel = require('../models/EnderecoModel');

// Importando Funções
const configuraPaginacao = require('./GeralController').configuraPaginacao;
const aplicaPaginacao = require('./GeralController').aplicaPaginacao;

// Funções do Controller
const enderecoRead = async (request, response) => {
    var querySelect = await enderecoModel.selectEndereco(request.params.id, request.query);
    var paginacao = configuraPaginacao(request.query.pagina, request.query.paginacao);
    var result = aplicaPaginacao(paginacao, querySelect);
    response.status(200).json({error: false, data: result});
};

// Exportando Funções
module.exports = {
    enderecoRead
};