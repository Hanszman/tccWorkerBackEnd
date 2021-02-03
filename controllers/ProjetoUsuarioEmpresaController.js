// Importando Models
const projetoUsuarioEmpresaModel = require('../models/ProjetoUsuarioEmpresaModel');

// Importando Funções
const formatoData = require('./GeralController').formatoData;
const configuraPaginacao = require('./GeralController').configuraPaginacao;
const aplicaPaginacao = require('./GeralController').aplicaPaginacao;

// Funções do Controller
const projetoUsuarioEmpresaRead = async (request, response) => {
    var result;
    var querySelect = await projetoUsuarioEmpresaModel.selectProjetoUsuarioEmpresa(request.params.id, undefined, undefined, request.query);
    for (let i = 0; i < querySelect.length; i++) {
        if (!querySelect[i]['dsc_nome_completo_usuario_empresa'])
            querySelect[i]['dsc_nome_completo_usuario_empresa'] = querySelect[i]['dsc_nome_usuario_empresa'];
        if (request.query.isForm) {
            if (!querySelect[i]['id_setor_projeto'])
                querySelect[i]['id_setor_projeto'] = undefined;
            querySelect[i]['dat_inicio_projeto'] = formatoData(querySelect[i]['dat_inicio_projeto'], true);
            querySelect[i]['dat_fim_projeto'] = formatoData(querySelect[i]['dat_fim_projeto'], true);
        }
        else {
            querySelect[i]['dat_inicio_projeto'] = formatoData(querySelect[i]['dat_inicio_projeto']);
            querySelect[i]['dat_fim_projeto'] = formatoData(querySelect[i]['dat_fim_projeto']);
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

const projetoUsuarioEmpresaCreate = async (request, response) => {
    var result = new Object();
    var dados = request.body;
    var querySelect = await projetoUsuarioEmpresaModel.selectProjetoUsuarioEmpresa(undefined, dados.id_projeto, dados.id_usuario_empresa);
    if (querySelect.length == 0) {
        var queryInsert = await projetoUsuarioEmpresaModel.insertProjetoUsuarioEmpresa(dados);
        if (queryInsert.length > 0) {
            result['sucesso'] = true;
            result['mensagem'] = 'Projeto vinculado ao funcionário com sucesso!';
        }
        else {
            result['sucesso'] = false;
            result['mensagem'] = 'Erro ao vincular projeto ao funcionário!';
        }        
    }
    else {
        result['sucesso'] = false;
        result['mensagem'] = 'Vínculo entre projeto e funcionário já existe!';
    }
    response.status(200).json({error: false, data: result});
};

const projetoUsuarioEmpresaDelete = async (request, response) => {
    var result = new Object();
    var id_projeto_usuario_empresa = request.params.id;
    var queryDelete = await projetoUsuarioEmpresaModel.deleteProjetoUsuarioEmpresa(id_projeto_usuario_empresa);
    if (typeof(queryDelete) == 'number') {
        result['sucesso'] = true;
        result['mensagem'] = 'Projeto desvinculado de funcionário com sucesso!';
    }
    else {
        result['sucesso'] = false;
        result['mensagem'] = 'Erro ao desvincular projeto de funcionário!';
    }
    response.status(200).json({error: false, data: result});
};

// Exportando Funções
module.exports = {
    projetoUsuarioEmpresaRead,
    projetoUsuarioEmpresaCreate,
    projetoUsuarioEmpresaDelete
};