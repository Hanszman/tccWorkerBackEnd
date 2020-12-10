// Importando Bibliotecas
const bcrypt = require('bcryptjs');

// Importando Models
const usuarioModel = require('../models/UsuarioModel');

// Funções do Controller
const loginAuth = async (request, response) => {
    var dados = request.body;
    usuarioModel.authSenhaLogin(dados.dsc_login, function(erro, retorno) {
        var result = new Object();
        var jsonRetorno = JSON.parse(JSON.stringify(retorno));
        if (jsonRetorno.length == 1) {
            if (bcrypt.compareSync(dados.dsc_senha, jsonRetorno[0]['dsc_senha'])) {
                result['sucesso'] = true;
                result['id_usuario'] = jsonRetorno[0]['id_usuario'];
                result['dsc_nome'] = jsonRetorno[0]['dsc_nome'];
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
    });
};

// Exportando Funções
module.exports = {
    loginAuth
};