// Importando Bibliotecas
var moment = require('moment');

// Funções do Controller
const configuraPaginacao = (pagina, paginacao, padrao = 999999999) => {
    pagina = pagina ? parseInt(pagina) : 1;
    paginacao = paginacao ? parseInt(paginacao) : padrao;
    const result = {
        pagina, 
        paginacao
    }
    return result;
};

const aplicaPaginacao = (configuracao, colecao) => {
    const total = colecao.length;
    const porPagina = configuracao.paginacao;
    const paginaAtual = configuracao.pagina;
    var ultimaPagina = parseInt(total/porPagina);
    ultimaPagina = (total % porPagina > 0) ? (ultimaPagina + 1) : ultimaPagina;
    ultimaPagina = total > porPagina ? ultimaPagina : 1;
    const comeco = (paginaAtual - 1) * porPagina;
    conjuntoDados = colecao.slice(comeco, comeco + porPagina);
    const result = {
        'total': total,
        'por_pagina': porPagina,
        'pagina_atual': paginaAtual,
        'ultima_pagina': ultimaPagina,
        'de': (conjuntoDados.length !== 0) ? comeco + 1 : null,
        'ate': (conjuntoDados.length !== 0) ? comeco + conjuntoDados.length : null,
        'dados': conjuntoDados
    }
    return result;
};

const formatoData = (data, dbFormat = false) => {
    var dataFormato = null;
    if(data !== null) {
        dataFormato = moment.utc(data);
        if (dbFormat)
            dataFormato = moment(dataFormato).format('YYYY-MM-DD').toString();
        else
            dataFormato = moment(dataFormato).format('DD/MM/YYYY').toString();
    }
    return dataFormato;
};

const indControleAcesso = (indicador) => {
    var result;
    switch (indicador) {
        case 'C':
            result = 'Comum';
            break;
        case 'A':
            result = 'Administrador';
            break;
        case 'G':
            result = 'Gerente';
            break;
        default:
            result = 'Comum';
    }
    return result;
};

const indContratacao = (indicador) => {
    var result;
    switch (indicador) {
        case 'C':
            result = 'Carteira Assinada';
            break;
        case 'E':
            result = 'Estágio';
            break;
        case 'M':
            result = 'MEI';
            break;
        default:
            result = 'Carteira Assinada';
    }
    return result;
};

const indStatus = (indicador) => {
    var result;
    switch (indicador) {
        case 'A':
            result = 'Ativo';
            break;
        case 'I':
            result = 'Inativo';
            break;
        default:
            result = 'Ativo';
    }
    return result;
};

// Exportando Funções
module.exports = {
    configuraPaginacao,
    aplicaPaginacao,
    formatoData,
    indControleAcesso,
    indContratacao,
    indStatus
};