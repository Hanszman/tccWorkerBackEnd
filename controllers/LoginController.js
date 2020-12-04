// Importando Bibliotecas
const bcrypt = require('bcryptjs');

// Importando Models
const usuarioModel = require('../models/UsuarioModel');

// Funções do Controller
const loginAuth = async (request, response) => {
    var dados = request.body;
    usuarioModel.authSenhaLogin(dados.dsc_login, function(erro, retorno) {
        var jsonRetorno = JSON.parse(JSON.stringify(retorno));
        if (jsonRetorno.length == 1) {
            if (bcrypt.compareSync(dados.dsc_senha, jsonRetorno[0]['dsc_senha']))
                console.log('OK');
            else 
                console.log('Senha incorreta!');
        }
        else {
            console.log('Usuário não existe!');
        }
        var resposta = new Object();
        resposta.dados = retorno;
        response.json(resposta);
    });
};

// Exportando Funções
module.exports = {
    loginAuth
};