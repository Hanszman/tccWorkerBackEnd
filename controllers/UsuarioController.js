// Importando Bibliotecas
const bcrypt = require('bcryptjs');
const fs = require('fs');

// Importando Models
const usuarioModel = require('../models/UsuarioModel');

// Importando Funções
const formatoData = require('./GeralController').formatoData;
const formatoCPF = require('./GeralController').formatoCPF;
const indControleAcesso = require('./GeralController').indControleAcesso;
const indContratacao = require('./GeralController').indContratacao;
const indStatus = require('./GeralController').indStatus;
const configuraPaginacao = require('./GeralController').configuraPaginacao;
const aplicaPaginacao = require('./GeralController').aplicaPaginacao;

// Funções do Controller
const usuarioRead = async (request, response) => {
    var result;
    var querySelect = await usuarioModel.selectUsuario(request.params.id, request.query);
    for (let i = 0; i < querySelect.length; i++) {
        querySelect[i]['dsc_confirm_senha'] = querySelect[i]['dsc_senha'];
        if (!querySelect[i]['dsc_nome_completo'])
            querySelect[i]['dsc_nome_completo'] = querySelect[i]['dsc_nome'];
        if (request.query.isForm)
            querySelect[i]['dat_nascimento'] = formatoData(querySelect[i]['dat_nascimento'], true);
        else {
            querySelect[i]['dsc_cpf'] = formatoCPF(querySelect[i]['dsc_cpf']);
            querySelect[i]['dat_nascimento'] = formatoData(querySelect[i]['dat_nascimento']);
            querySelect[i]['ind_controle_acesso'] = indControleAcesso(querySelect[i]['ind_controle_acesso']);
            querySelect[i]['ind_contratacao'] = indContratacao(querySelect[i]['ind_contratacao']);
            querySelect[i]['ind_status'] = indStatus(querySelect[i]['ind_status']);
        }
    }
    if (request.params.id)
        result = querySelect;
    else {
        var paginacao = configuraPaginacao(request.query.pagina, request.query.paginacao);
        result = aplicaPaginacao(paginacao, querySelect);
    }
    response.status(200).json({error: false, data: result});
};

const usuarioCreate = async (request, response) => {
    var result = new Object();
    var dados = request.body;
    const password = dados.dsc_senha;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    dados.dsc_senha = hash;
    var querySelect = await usuarioModel.selectUsuario(undefined, undefined, dados.dsc_login);
    if (querySelect.length == 0) {
        var queryInsert = await usuarioModel.insertUsuario(dados);
        if (queryInsert.length > 0) {
            result['sucesso'] = true;
            result['mensagem'] = 'Usuário cadastrado com sucesso!';
        }
        else {
            result['sucesso'] = false;
            result['mensagem'] = 'Erro ao cadastrar usuário!';
        }
    }
    else {
        result['sucesso'] = false;
        result['mensagem'] = 'Usuário com este login já existe!';
    }
    response.status(200).json({error: false, data: result});
};

const usuarioUpdate = async (request, response) => {
    var result = new Object();
    var id_usuario = request.params.id;
    var dados = request.body;
    var querySelect = await usuarioModel.selectUsuario(id_usuario);
    var old_dsc_senha = querySelect[0]['dsc_senha'];
    if (dados.dsc_confirm_senha == dados.dsc_senha) {
        if (dados.dsc_senha !== old_dsc_senha) {
            const password = dados.dsc_senha;
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);
            dados.dsc_senha = hash;
        }   
        if (dados.old_arq_foto)
            dados.caminho_arq_foto = dados.old_arq_foto;
        else if (dados.dados_arq_foto && dados.arq_foto) {
            let bitmap = new Buffer.from(dados.dados_arq_foto.imagem_base64, 'base64');
            let dataAtual = new Date().toLocaleString().replace(/\//g, '').replace(/:/g, '').replace(/-/g, '').replace(/ /g, '');
            let nomeImagemCaminho = './files/img/' + dataAtual + dados.dados_arq_foto.nome_arquivo;
            fs.writeFileSync(nomeImagemCaminho, bitmap);
            dados.caminho_arq_foto = nomeImagemCaminho;
        }
        else
            dados.caminho_arq_foto = null;
        var queryUpdate = await usuarioModel.updateUsuario(id_usuario, dados);
        if (queryUpdate > 0) {
            result['sucesso'] = true;
            result['mensagem'] = 'Usuário editado com sucesso!';
        }
        else {
            result['sucesso'] = false;
            result['mensagem'] = 'Erro ao editar usuário!';
        }
    }
    else {
        result['sucesso'] = false;
        result['mensagem'] = 'Senhas não conferem!';
    }
    response.status(200).json({error: false, data: result});
};

const usuarioDelete = async (request, response) => {
    var result = new Object();
    var id_usuario = request.params.id;
    var queryDelete = await usuarioModel.deleteUsuario(id_usuario);
    if (typeof(queryDelete) == 'number') {
        result['sucesso'] = true;
        result['mensagem'] = 'Usuário deletado com sucesso!';
    }
    else {
        result['sucesso'] = false;
        result['mensagem'] = 'Erro ao deletar usuário!';
    }
    response.status(200).json({error: false, data: result});
};

// Exportando Funções
module.exports = {
    usuarioRead,
    usuarioCreate,
    usuarioUpdate,
    usuarioDelete
};