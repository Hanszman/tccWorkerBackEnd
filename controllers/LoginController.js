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

const loginAuthFB = async (request, response) => {
    var result = new Object();
    var dados = request.body;
    let urlAccessToken = process.env.ValidateTokenUrl + accessToken + '&access_token=' + process.env.APP_ID + '|' + process.env.APP_SECRET;
    let urlUserInfo = process.env.UserInfoUrl + accessToken;
    const validateResult = validacaoFB(urlAccessToken);
    if (!validateResult.data.data['is_valid']) {
        result['sucesso'] = false;
        result['mensagem'] = 'Token Inválido!';
        response.status(200).json({error: false, data: result});
        return;
    }
    const userInfo = validacaoFB(urlUserInfo);
    var querySelect = await usuarioModel.selectUsuario(undefined, undefined, userInfo.data.email);
    if (querySelect.length <= 0) {
        var dados = new Object();
        dados['dsc_nome'] = userInfo.data.first_name;
        dados['dsc_sobrenome'] = userInfo.data.last_name;
        dados['dsc_email'] = userInfo.data.email;
        dados['dsc_login'] = userInfo.data.email;
        dados['dsc_senha'] = userInfo.data.id;
        var queryInsert = await usuarioModel.insertUsuario(dados);
        if (queryInsert.length <= 0) {
            result['sucesso'] = false;
            result['mensagem'] = 'Erro criar login com facebook!';
            response.status(200).json({error: false, data: result});
            return;
        }
        result['sucesso'] = true;
        result['id_usuario'] = queryInsert[0]['id_usuario'];
        result['dsc_nome'] = queryInsert[0]['dsc_nome'];
        response.status(200).json({error: false, data: result});
        return;
    }
    result['sucesso'] = true;
    result['id_usuario'] = querySelect[0]['id_usuario'];
    result['dsc_nome'] = querySelect[0]['dsc_nome'];
    response.status(200).json({error: false, data: result});
};

const validacaoFB = async (url) => {
    http.get(url, (resp) => {
        let data = '';
        resp.on('data', (chunk) => {
            data += chunk;
        });
        resp.on('end', () => {
            var json = JSON.parse(data);
            console.log(json);
            return json;
        });
    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
};

// Exportando Funções
module.exports = {
    loginAuth,
    loginAuthFB,
    validacaoFB
};