// Importando Models
const clienteModel = require('../models/ClienteModel');

// Importando Funções
const configuraPaginacao = require('./GeralController').configuraPaginacao;
const aplicaPaginacao = require('./GeralController').aplicaPaginacao;

// Funções do Controller
const clienteRead = async (request, response) => {
    var result;
    var querySelect = await clienteModel.selectCliente(request.params.id, request.query);
    if (request.params.id)
        result = querySelect;
    else {
        var paginacao = configuraPaginacao(request.query.pagina, request.query.paginacao);
        result = aplicaPaginacao(paginacao, querySelect);
    }
    response.status(200).json({error: false, data: result});
};

const clienteCreate = async (request, response) => {
    var result = new Object();
    var dados = request.body;
    var queryInsert = await clienteModel.insertCliente(dados);
    if (queryInsert.length > 0) {
        result['sucesso'] = true;
        result['mensagem'] = 'Cliente cadastrado com sucesso!';
    }
    else {
        result['sucesso'] = false;
        result['mensagem'] = 'Erro ao cadastrar cliente!';
    }
    response.status(200).json({error: false, data: result});
};

const clienteUpdate = async (request, response) => {
    var result = new Object();
    var id_cliente = request.params.id;
    var dados = request.body;
    var queryUpdate = await clienteModel.updateCliente(id_cliente, dados);
    if (queryUpdate > 0) {
        result['sucesso'] = true;
        result['mensagem'] = 'Cliente editado com sucesso!';
    }
    else {
        result['sucesso'] = false;
        result['mensagem'] = 'Erro ao editar cliente!';
    }
    response.status(200).json({error: false, data: result});
};

const clienteDelete = async (request, response) => {
    var result = new Object();
    var id_cliente = request.params.id;
    var queryDelete = await clienteModel.deleteCliente(id_cliente);
    if (typeof(queryDelete) == 'number') {
        result['sucesso'] = true;
        result['mensagem'] = 'Cliente deletado com sucesso!';
    }
    else {
        result['sucesso'] = false;
        result['mensagem'] = 'Erro ao deletar cliente!';
    }
    response.status(200).json({error: false, data: result});
};

// Exportando Funções
module.exports = {
    clienteRead,
    clienteCreate,
    clienteUpdate,
    clienteDelete
};