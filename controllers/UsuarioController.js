// Importando Bibliotecas
const bcrypt = require('bcryptjs');

// Importando Models
const selectUsuarios = require('../models/UsuarioModel').selectUsuarios;
const selectUsuarioWhereLogin = require('../models/UsuarioModel').selectUsuarioWhereLogin;
const insertUsuario = require('../models/UsuarioModel').insertUsuario;

// Funções do Controller
const usuarioRead = async (request, response) => {
    var result = new Object();
    var queryUsuarios = await selectUsuarios();
    result['tabela'] = queryUsuarios;
    response.status(200).json({error: false, data: result});
};

const usuarioCreate = async (request, response) => {
    var result = new Object();
    var dados = request.body;
    const password = dados.dsc_senha;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    dados.dsc_senha = hash;
    var queryUsuario = await selectUsuarioWhereLogin(dados.dsc_login);
    if (queryUsuario.length == 0) {
        var queryInsert = await insertUsuario(dados);
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