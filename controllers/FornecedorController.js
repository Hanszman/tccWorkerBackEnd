// Importando Models
const fornecedorModel = require('../models/FornecedorModel');

// Importando Funções
const formatoCNPJ = require('./GeralController').formatoCNPJ;
const configuraPaginacao = require('./GeralController').configuraPaginacao;
const aplicaPaginacao = require('./GeralController').aplicaPaginacao;

// Funções do Controller
const fornecedorRead = async (request, response) => {
    var result;
    var querySelect = await fornecedorModel.selectFornecedor(request.params.id, request.query);
    for (let i = 0; i < querySelect.length; i++) {
        if (!request.query.isForm)
            querySelect[i]['dsc_cnpj'] = formatoCNPJ(querySelect[i]['dsc_cnpj']);
    }
    if (request.params.id)
        result = querySelect;
    else {
        var paginacao = configuraPaginacao(request.query.pagina, request.query.paginacao);
        result = aplicaPaginacao(paginacao, querySelect);
    }
    response.status(200).json({error: false, data: result});
};

const fornecedorCreate = async (request, response) => {
    var result = new Object();
    var dados = request.body;
    var queryInsert = await fornecedorModel.insertFornecedor(dados);
    if (queryInsert.length > 0) {
        result['sucesso'] = true;
        result['mensagem'] = 'Fornecedor cadastrado com sucesso!';
    }
    else {
        result['sucesso'] = false;
        result['mensagem'] = 'Erro ao cadastrar fornecedor!';
    }
    response.status(200).json({error: false, data: result});
};

const fornecedorUpdate = async (request, response) => {
    var result = new Object();
    var id_fornecedor = request.params.id;
    var dados = request.body;
    var queryUpdate = await fornecedorModel.updateFornecedor(id_fornecedor, dados);
    if (queryUpdate > 0) {
        result['sucesso'] = true;
        result['mensagem'] = 'Fornecedor editado com sucesso!';
    }
    else {
        result['sucesso'] = false;
        result['mensagem'] = 'Erro ao editar fornecedor!';
    }
    response.status(200).json({error: false, data: result});
};

const fornecedorDelete = async (request, response) => {
    var result = new Object();
    var id_fornecedor = request.params.id;
    var queryDelete = await fornecedorModel.deleteFornecedor(id_fornecedor);
    if (typeof(queryDelete) == 'number') {
        result['sucesso'] = true;
        result['mensagem'] = 'Fornecedor deletado com sucesso!';
    }
    else {
        result['sucesso'] = false;
        result['mensagem'] = 'Erro ao deletar fornecedor!';
    }
    response.status(200).json({error: false, data: result});
};

// Exportando Funções
module.exports = {
    fornecedorRead,
    fornecedorCreate,
    fornecedorUpdate,
    fornecedorDelete
};