// Importando Models
const telefoneModel = require('../models/TelefoneModel');

// Importando Funções
const configuraPaginacao = require('./GeralController').configuraPaginacao;
const aplicaPaginacao = require('./GeralController').aplicaPaginacao;

// Funções do Controller
const telefoneRead = async (request, response) => {
    var querySelect = await telefoneModel.selectTelefone(request.params.id, request.query);
    var paginacao = configuraPaginacao(request.query.pagina, request.query.paginacao);
    var result = aplicaPaginacao(paginacao, querySelect);
    response.status(200).json({error: false, data: result});
};

// Exportando Funções
module.exports = {
    telefoneRead
};