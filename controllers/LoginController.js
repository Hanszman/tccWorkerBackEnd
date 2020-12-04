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
                result['mensagem'] = 'Login realizado com sucesso!';
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

// No Cadastro:
// const password = '123';
// const salt = bcrypt.genSaltSync(10);
// const hash = bcrypt.hashSync(password, salt);
// Guarde o `hash` na sua base de dados...

// Exportando Funções
module.exports = {
    loginAuth
};