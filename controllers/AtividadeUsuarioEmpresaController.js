// Importando Models
const atividadeUsuarioEmpresaModel = require('../models/AtividadeUsuarioEmpresaModel');

// Importando Funções
const formatoData = require('./GeralController').formatoData;
const indPrioridade = require('./GeralController').indPrioridade;
const filtroSelect = require('./GeralController').filtroSelect;
const configuraPaginacao = require('./GeralController').configuraPaginacao;
const aplicaPaginacao = require('./GeralController').aplicaPaginacao;

// Funções do Controller
const atividadeUsuarioEmpresaRead = async (request, response) => {
    var result;
    var queryFiltro = [];
    var querySelect = await atividadeUsuarioEmpresaModel.selectAtividadeUsuarioEmpresa(request.params.id, undefined, undefined, request.query);
    for (let i = 0; i < querySelect.length; i++) {
        if (!querySelect[i]['dsc_nome_completo_usuario_empresa'])
            querySelect[i]['dsc_nome_completo_usuario_empresa'] = querySelect[i]['dsc_nome_usuario_empresa'];
        if (request.query.isForm) {
            if (!querySelect[i]['id_etapa_atividade'])
                querySelect[i]['id_etapa_atividade'] = undefined;
            if (!querySelect[i]['id_quadro_atividade'])
                querySelect[i]['id_quadro_atividade'] = undefined;
            if (!querySelect[i]['id_projeto_atividade'])
                querySelect[i]['id_projeto_atividade'] = undefined;
            querySelect[i]['dat_inicio_atividade'] = formatoData(querySelect[i]['dat_inicio_atividade'], true);
            querySelect[i]['dat_fim_atividade'] = formatoData(querySelect[i]['dat_fim_atividade'], true);
        }
        else {
            querySelect[i]['dat_inicio_atividade'] = formatoData(querySelect[i]['dat_inicio_atividade']);
            querySelect[i]['dat_fim_atividade'] = formatoData(querySelect[i]['dat_fim_atividade']);
            querySelect[i]['ind_prioridade_atividade'] = indPrioridade(querySelect[i]['ind_prioridade_atividade']);
            if (filtroSelect(querySelect[i]['ind_prioridade_atividade'], request.query['ind_prioridade_atividade']))
                queryFiltro.push(querySelect[i]);
        }
    }
    if (request.params.id) {
        if (!request.query.isForm)
            result = queryFiltro;
        else
            result = querySelect;
    }
    else {
        var paginacao = configuraPaginacao(request.query.pagina, request.query.paginacao);
        if (!request.query.isForm)
            result = aplicaPaginacao(paginacao, queryFiltro);
        else
            result = aplicaPaginacao(paginacao, querySelect);
    }
    response.status(200).json({error: false, data: result});
};

const atividadeUsuarioEmpresaCreate = async (request, response) => {
    var result = new Object();
    var dados = request.body;
    var querySelect = await atividadeUsuarioEmpresaModel.selectAtividadeUsuarioEmpresa(undefined, dados.id_atividade, dados.id_usuario_empresa);
    if (querySelect.length == 0) {
        var queryInsert = await atividadeUsuarioEmpresaModel.insertAtividadeUsuarioEmpresa(dados);
        if (queryInsert.length > 0) {
            result['sucesso'] = true;
            result['mensagem'] = 'Atividade vinculada ao funcionário com sucesso!';
        }
        else {
            result['sucesso'] = false;
            result['mensagem'] = 'Erro ao vincular atividade ao funcionário!';
        }        
    }
    else {
        result['sucesso'] = false;
        result['mensagem'] = 'Vínculo entre atividade e funcionário já existe!';
    }
    response.status(200).json({error: false, data: result});
};

const atividadeUsuarioEmpresaDelete = async (request, response) => {
    var result = new Object();
    var id_atividade_usuario_empresa = request.params.id;
    var queryDelete = await atividadeUsuarioEmpresaModel.deleteAtividadeUsuarioEmpresa(id_atividade_usuario_empresa);
    if (typeof(queryDelete) == 'number') {
        result['sucesso'] = true;
        result['mensagem'] = 'Atividade desvinculada de funcionário com sucesso!';
    }
    else {
        result['sucesso'] = false;
        result['mensagem'] = 'Erro ao desvincular atividade de funcionário!';
    }
    response.status(200).json({error: false, data: result});
};

// Exportando Funções
module.exports = {
    atividadeUsuarioEmpresaRead,
    atividadeUsuarioEmpresaCreate,
    atividadeUsuarioEmpresaDelete
};