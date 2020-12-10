// Importando Bibliotecas
const bcrypt = require('bcryptjs');

// Importando Models
const usuarioModel = require('../models/UsuarioModel');

// Funções do Controller
const usuarioRead = async (request, response) => {
    usuarioModel.selectUsuarios(function(erro, retorno) {
        console.log(retorno);
    });
    var result = new Object();
    result['tabela'] = 'Usuário';
    response.status(200).json({error: false, data: result});
};

const usuarioCreate = async (request, response) => {
    var dados = request.body;
    const password = dados.dsc_senha;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    dados.dsc_senha = hash;
    usuarioModel.selectUsuariosWhereLogin(dados.dsc_login, function(erro, validacao) {
        var result = new Object();
        var jsonValidacao = JSON.parse(JSON.stringify(validacao));
        if (jsonValidacao.length == 0) {
            usuarioModel.insertUsuario(dados, function(erro, retorno) {
                var jsonRetorno = JSON.parse(JSON.stringify(retorno));
                result['sucesso'] = true;
                result['mensagem'] = 'Usuário inserido com sucesso!';
                result['id_usuario'] = jsonRetorno['insertId'];
                response.status(200).json({error: false, data: result});
            });
        }
        else {
            result['sucesso'] = false;
            result['mensagem'] = 'Usuário com este login já existe!';
            response.status(200).json({error: false, data: result});
        }
    });
};

// Exportando Funções
module.exports = {
    usuarioRead,
    usuarioCreate
};