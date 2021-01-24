// Importando Models
const enderecoModel = require('../models/EnderecoModel');

// Importando Funções
const configuraPaginacao = require('./GeralController').configuraPaginacao;
const aplicaPaginacao = require('./GeralController').aplicaPaginacao;

// Funções do Controller
const enderecoRead = async (request, response) => {
    var result;
    var querySelect = await enderecoModel.selectEndereco(request.params.id, request.query);
    for (let i = 0; i < querySelect.length; i++) {
        if (!request.query.isForm) {
            switch(querySelect[i]['dsc_uf']){
                case 'F':
                    querySelect[i]['dsc_uf'] = 'Fixo';
                    break;
                case 'M':
                    querySelect[i]['dsc_uf'] = 'Celular';
                    break;
                case 'C':
                    querySelect[i]['dsc_uf'] = 'Casa';
                    break;
                case 'T':
                    querySelect[i]['dsc_uf'] = 'Trabalho';
                    break;
                case 'O':
                    querySelect[i]['dsc_uf'] = 'Outro';
                    break;
            }
        }
    }
    if (request.params.id)
        result = querySelect;
    else {
        var paginacao = configuraPaginacao(request.query.pagina, request.query.paginacao);
        result = aplicaPaginacao(paginacao, querySelect);
    }
    response.status(200).json({error: false, data: result});
};

const enderecoCreate = async (request, response) => {
    var result = new Object();
    var dados = request.body;
    var queryInsert = await enderecoModel.insertEndereco(dados);
    if (queryInsert.length > 0) {
        result['sucesso'] = true;
        result['mensagem'] = 'Endereço cadastrado com sucesso!';
    }
    else {
        result['sucesso'] = false;
        result['mensagem'] = 'Erro ao cadastrar endereço!';
    }
    response.status(200).json({error: false, data: result});
};

const enderecoUpdate = async (request, response) => {
    var result = new Object();
    var id_endereco = request.params.id;
    var dados = request.body;
    var queryUpdate = await enderecoModel.updateEndereco(id_endereco, dados);
    if (queryUpdate > 0) {
        result['sucesso'] = true;
        result['mensagem'] = 'Endereço editado com sucesso!';
    }
    else {
        result['sucesso'] = false;
        result['mensagem'] = 'Erro ao editar endereço!';
    }
    response.status(200).json({error: false, data: result});
};

const enderecoDelete = async (request, response) => {
    var result = new Object();
    var id_endereco = request.params.id;
    var queryDelete = await enderecoModel.deleteEndereco(id_endereco);
    if (typeof(queryDelete) == 'number') {
        result['sucesso'] = true;
        result['mensagem'] = 'Endereço deletado com sucesso!';
    }
    else {
        result['sucesso'] = false;
        result['mensagem'] = 'Erro ao deletar endereço!';
    }
    response.status(200).json({error: false, data: result});
};

// Exportando Funções
module.exports = {
    enderecoRead,
    enderecoCreate,
    enderecoUpdate,
    enderecoDelete
};