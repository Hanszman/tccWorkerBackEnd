// Importando Bibliotecas
const fs = require('fs');

// Importando Models
const empresaModel = require('../models/EmpresaModel');

// Importando Funções
const formatoData = require('./GeralController').formatoData;
const indControleAcesso = require('./GeralController').indControleAcesso;
const indContratacao = require('./GeralController').indContratacao;
const indStatus = require('./GeralController').indStatus;

// Funções do Controller
const empresaRead = async (request, response) => {
    var id_usuario = request.query.id_usuario;
    var dsc_nome = request.query.dsc_nome;
    if (id_usuario !== undefined) {
        var querySelect = await empresaModel.selectEmpresa(undefined, id_usuario, dsc_nome);
        var result = querySelect;
        for(let i = 0; i < result.length; i++){
            result[i]['dat_fundacao'] = formatoData(result[i]['dat_fundacao']);
            result[i]['dat_contratacao'] = formatoData(result[i]['dat_contratacao']);
            result[i]['ind_controle_acesso'] = indControleAcesso(result[i]['ind_controle_acesso']);
            result[i]['ind_contratacao'] = indContratacao(result[i]['ind_contratacao']);
            result[i]['ind_status'] = indStatus(result[i]['ind_status']);
        }
        response.status(200).json({error: false, data: result});
    }
    else
       response.status(200).json({error: false, message: 'Usuário indefinido!'});
};

const empresaDetail = async (request, response) => {
    var id_empresa = request.params.id;
    if (id_empresa !== undefined) {
        var querySelect = await empresaModel.selectEmpresa(id_empresa);
        var result = querySelect;
        for (let i = 0; i < result.length; i++) {
            if (request.query.isForm)
                result[i]['dat_fundacao'] = formatoData(result[i]['dat_fundacao'], true);
            else
                result[i]['dat_fundacao'] = formatoData(result[i]['dat_fundacao']);
        }
        response.status(200).json({error: false, data: result});
    }
    else
        response.status(200).json({error: false, message: 'Empresa indefinida!'});
};

const empresaCreate = async (request, response) => {
    var result = new Object();
    var dados = request.body;
    if (dados.dados_arq_foto !== undefined && dados.arq_foto !== undefined) {
        let bitmap = new Buffer.from(dados.dados_arq_foto.imagem_base64, 'base64');
        let dataAtual = new Date().toLocaleString().replace(/\//g, '').replace(/:/g, '').replace(/-/g, '').replace(/ /g, '');
        let nomeImagemCaminho = './files/img/' + dataAtual + dados.dados_arq_foto.nome_arquivo;
        fs.writeFileSync(nomeImagemCaminho, bitmap);
        dados.caminho_arq_foto = nomeImagemCaminho;
    }
    var queryInsert = await empresaModel.insertEmpresa(dados);
    if (queryInsert.length > 0) {
        result['sucesso'] = true;
        result['mensagem'] = 'Empresa cadastrada com sucesso!';
    }
    else {
        result['sucesso'] = false;
        result['mensagem'] = 'Erro ao cadastrar empresa!';
    }
    response.status(200).json({error: false, data: result});
};

const empresaUpdate = async (request, response) => {
    var result = new Object();
    var id_empresa = request.params.id;
    var dados = request.body;
    if (dados.old_arq_foto !== undefined)
        dados.caminho_arq_foto = dados.old_arq_foto;
    else if (dados.dados_arq_foto !== undefined && dados.arq_foto !== undefined) {
        let bitmap = new Buffer.from(dados.dados_arq_foto.imagem_base64, 'base64');
        let dataAtual = new Date().toLocaleString().replace(/\//g, '').replace(/:/g, '').replace(/-/g, '').replace(/ /g, '');
        let nomeImagemCaminho = './files/img/' + dataAtual + dados.dados_arq_foto.nome_arquivo;
        fs.writeFileSync(nomeImagemCaminho, bitmap);
        dados.caminho_arq_foto = nomeImagemCaminho;
    }
    else
        dados.caminho_arq_foto = null;
    var queryUpdate = await empresaModel.updateEmpresa(id_empresa, dados);
    if (queryUpdate > 0) {
        result['sucesso'] = true;
        result['mensagem'] = 'Empresa editada com sucesso!';
    }
    else {
        result['sucesso'] = false;
        result['mensagem'] = 'Erro ao editar empresa!';
    }
    response.status(200).json({error: false, data: result});
};

const empresaDelete = async (request, response) => {
    var result = new Object();
    var id_empresa = request.params.id;
    var queryDelete = await empresaModel.deleteEmpresa(id_empresa);
    if (typeof(queryDelete) == 'number') {
        result['sucesso'] = true;
        result['mensagem'] = 'Empresa deletada com sucesso!';
    }
    else {
        result['sucesso'] = false;
        result['mensagem'] = 'Erro ao deletar empresa!';
    }
    response.status(200).json({error: false, data: result});
};

// Exportando Funções
module.exports = {
    empresaRead,
    empresaDetail,
    empresaCreate,
    empresaUpdate,
    empresaDelete
};