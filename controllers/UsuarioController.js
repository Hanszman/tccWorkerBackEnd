// Importando Bibliotecas
const bcrypt = require('bcryptjs');

// Importando Models
const usuarioModel = require('../models/UsuarioModel');

// Funções do Controller
const usuarioRead = async (request, response) => {
    var result = new Object();
    var querySelect = await usuarioModel.selectUsuario();
    result['data'] = querySelect;
    response.status(200).json({error: false, data: result});
};

const usuarioCreate = async (request, response) => {
    var result = new Object();
    var dados = request.body;
    const password = dados.dsc_senha;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    dados.dsc_senha = hash;
    var querySelect = await usuarioModel.selectUsuario(dados.dsc_login);
    if (querySelect.length == 0) {
        var queryInsert = await usuarioModel.insertUsuario(dados);
        if (queryInsert.length > 0) {
            result['sucesso'] = true;
            result['mensagem'] = 'Usuário inserido com sucesso!';
            response.status(200).json({error: false, data: result});
        }
        else {
            result['sucesso'] = false;
            result['mensagem'] = 'Erro ao inserir usuário!';
            response.status(200).json({error: false, data: result});
        }   
    }
    else {
        result['sucesso'] = false;
        result['mensagem'] = 'Usuário com este login já existe!';
        response.status(200).json({error: false, data: result});
    }
};

// Exportando Funções
module.exports = {
    usuarioRead,
    usuarioCreate
};