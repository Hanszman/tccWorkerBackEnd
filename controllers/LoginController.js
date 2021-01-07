// Importando Bibliotecas
const bcrypt = require('bcryptjs');

// Importando Models
const usuarioModel = require('../models/UsuarioModel');

// Funções do Controller
const loginAuth = async (request, response) => {
    var result = new Object();
    var dados = request.body;
    var querySelect = await usuarioModel.selectUsuario(undefined, undefined, dados.dsc_login);
    if (querySelect.length == 1) {
        if (bcrypt.compareSync(dados.dsc_senha, querySelect[0]['dsc_senha'])) {
            result['sucesso'] = true;
            result['id_usuario'] = querySelect[0]['id_usuario'];
            result['dsc_nome'] = querySelect[0]['dsc_nome'];
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