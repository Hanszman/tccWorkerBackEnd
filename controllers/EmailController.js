// Importando Models
const emailModel = require('../models/EmailModel');

// Importando Funções
const configuraPaginacao = require('./GeralController').configuraPaginacao;
const aplicaPaginacao = require('./GeralController').aplicaPaginacao;

// Funções do Controller
const emailRead = async (request, response) => {
    var querySelect = await emailModel.selectEmail(request.params.id, request.query);
    var paginacao = configuraPaginacao(request.query.pagina, request.query.paginacao);
    var result = aplicaPaginacao(paginacao, querySelect);
    response.status(200).json({error: false, data: result});
};

// Exportando Funções
module.exports = {
    emailRead
};