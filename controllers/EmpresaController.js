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
       response.status(500).json({error: true, message: 'Usuário indefinido!'});
};

const empresaDetail = async (request, response) => {
    var id_empresa = request.params.id;
    if (id_empresa !== undefined) {
        var querySelect = await empresaModel.selectEmpresa(id_empresa);
        var result = querySelect;
        for(let i = 0; i < result.length; i++)
            result[i]['dat_fundacao'] = formatoData(result[i]['dat_fundacao']);
        response.status(200).json({error: false, data: result});
    }
    else
        response.status(500).json({error: true, message: 'Empresa indefinida!'});
};

// Exportando Funções
module.exports = {
    empresaRead,
    empresaDetail
};