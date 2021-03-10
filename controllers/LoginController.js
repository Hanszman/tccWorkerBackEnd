// Importando Bibliotecas
const bcrypt = require('bcryptjs');
const axios = require('axios');

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

const loginAuthFB = async (request, response) => {
    var result = new Object();
    var accessToken = request.body['accessToken'];
    let urlAccessToken = process.env.ValidateTokenUrl + accessToken + '&access_token=' + process.env.APP_ID + '|' + process.env.APP_SECRET;
    let urlUserInfo = process.env.UserInfoUrl + accessToken;
    const validateResult = await validacaoFB(urlAccessToken);
    if (!validateResult.data.data['is_valid']) {
        result['sucesso'] = false;
        result['mensagem'] = 'Token Inválido!';
        response.status(200).json({error: true, data: result});
        return;
    }
    const userInfo = await validacaoFB(urlUserInfo);
    var querySelect = await usuarioModel.selectUsuario(undefined, undefined, userInfo.data.email);
    if (querySelect.length <= 0) {
        var dados = new Object();
        dados['dsc_nome'] = userInfo.data.first_name;
        dados['dsc_sobrenome'] = userInfo.data.last_name;
        dados['dsc_email'] = userInfo.data.email;
        dados['dsc_login'] = userInfo.data.email;
        dados['dsc_senha'] = userInfo.data.id;
        // dados['arq_foto'] = userInfo.data.picture.data.url; // Salvar imagem na pasta de arquivos
        console.log(userInfo.data);
        var queryInsert = await usuarioModel.insertUsuario(dados);
        if (queryInsert.length <= 0) {
            result['sucesso'] = false;
            result['mensagem'] = 'Erro criar login com facebook!';
            response.status(200).json({error: true, data: result});
            return;
        }
        var queryFind = await usuarioModel.selectUsuario(queryInsert[0]);
        result['sucesso'] = true;
        result['id_usuario'] = queryFind[0]['id_usuario'];
        result['dsc_nome'] = queryFind[0]['dsc_nome'];
        response.status(200).json({error: false, data: result});
        return;
    }
    result['sucesso'] = true;
    result['id_usuario'] = querySelect[0]['id_usuario'];
    result['dsc_nome'] = querySelect[0]['dsc_nome'];
    response.status(200).json({error: false, data: result});
};

const validacaoFB = async (url) => {
    return await axios.get(url);
};

// Exportando Funções
module.exports = {
    loginAuth,
    loginAuthFB,
    validacaoFB
};