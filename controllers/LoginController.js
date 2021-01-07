// Importando Bibliotecas
const bcrypt = require('bcryptjs');

// Importando Models
const usuarioModel = require('../models/UsuarioModel');

// Funções do Controller
const loginAuth = async (request, response) => {
    var result = new Object();
    var dados = request.body;
    var queryLogin = await usuarioModel.authSenhaLogin(dados.dsc_login);
    if (queryLogin.length == 1) {
        if (bcrypt.compareSync(dados.dsc_senha, queryLogin[0]['dsc_senha'])) {
            result['sucesso'] = true;
            result['id_usuario'] = queryLogin[0]['id_usuario'];
            result['dsc_nome'] = queryLogin[0]['dsc_nome'];
        }
        else {
            result['sucesso'] = false;
            result['mensagem'] = 'Senha incorreta!';
        }
    }
    else {
        result['sucesso'] = false;
        result['mensagem'] = 'Usuário não existe!';
    }
    response.status(200).json({error: false, data: result});
};

// Exportando Funções
module.exports = {
    loginAuth
};