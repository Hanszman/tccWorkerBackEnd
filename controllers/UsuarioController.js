// Importando Bibliotecas
const bcrypt = require('bcryptjs');

// Importando Models
const usuarioModel = require('../models/UsuarioModel');

// Importando Funções
const configuraPaginacao = require('./GeralController').configuraPaginacao;
const aplicaPaginacao = require('./GeralController').aplicaPaginacao;

// Funções do Controller
const usuarioRead = async (request, response) => {
    var result;
    var querySelect = await usuarioModel.selectUsuario(request.params.id, request.query);
    if (request.params.id)
        result = querySelect;
    else {
        var paginacao = configuraPaginacao(request.query.pagina, request.query.paginacao);
        result = aplicaPaginacao(paginacao, querySelect);
    }
    response.status(200).json({error: false, data: result});
};

const usuarioCreate = async (request, response) => {
    var result = new Object();
    var dados = request.body;
    const password = dados.dsc_senha;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    dados.dsc_senha = hash;
    var querySelect = await usuarioModel.selectUsuario(undefined, undefined, dados.dsc_login);
    if (querySelect.length == 0) {
        var queryInsert = await usuarioModel.insertUsuario(dados);
        if (queryInsert.length > 0) {
            result['sucesso'] = true;
            result['mensagem'] = 'Usuário cadastrado com sucesso!';
        }
        else {
            result['sucesso'] = false;
            result['mensagem'] = 'Erro ao cadastrar usuário!';
        }
    }
    else {
        result['sucesso'] = false;
        result['mensagem'] = 'Usuário com este login já existe!';
    }
    response.status(200).json({error: false, data: result});
};

// Exportando Funções
module.exports = {
    usuarioRead,
    usuarioCreate
};