// Importando Models
const fornecedorModel = require('../models/FornecedorModel');

// Importando Funções
const configuraPaginacao = require('./GeralController').configuraPaginacao;
const aplicaPaginacao = require('./GeralController').aplicaPaginacao;

// Funções do Controller
const fornecedorRead = async (request, response) => {
    var result;
    var querySelect = await fornecedorModel.selectFornecedor(request.params.id, request.query);
    if (request.params.id)
        result = querySelect;
    else {
        var paginacao = configuraPaginacao(request.query.pagina, request.query.paginacao);
        result = aplicaPaginacao(paginacao, querySelect);
    }
    response.status(200).json({error: false, data: result});
};

// Exportando Funções
module.exports = {
    fornecedorRead
};