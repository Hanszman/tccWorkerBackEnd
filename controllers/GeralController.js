// Importando Bibliotecas
const moment = require('moment');

// Cosntantes
const acentos = {"â":"a","Â":"A","à":"a","À":"A","á":"a","Á":"A","ã":"a","Ã":"A","ê":"e","Ê":"E","è":"e","È":"E","é":"e","É":"E","î":"i","Î":"I","ì":"i","Ì":"I","í":"i","Í":"I","õ":"o","Õ":"O","ô":"o","Ô":"O","ò":"o","Ò":"O","ó":"o","Ó":"O","ü":"u","Ü":"U","û":"u","Û":"U","ú":"u","Ú":"U","ù":"u","Ù":"U","ç":"c","Ç":"C"};

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
    if(data) {
        dataFormato = moment.utc(data);
        if (dbFormat)
            dataFormato = moment(dataFormato).format('YYYY-MM-DD').toString();
        else
            dataFormato = moment(dataFormato).format('DD/MM/YYYY').toString();
    }
    return dataFormato;
};

const formatoCPF = (cpf) => {
    if (cpf)
        return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g,"\$1.\$2.\$3\-\$4");
    else
        return cpf;
};

const formatoCNPJ = (cnpj) => {
    if (cnpj)
        return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g,"\$1.\$2.\$3\/\$4\-\$5");
    else
        return cnpj;
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
    }
    return result;
};

const indStatus = (indicador) => {
    var result;
    switch (indicador) {
        case 'A':
            result = 'Ativo';
            break;
        case 'D':
            result = 'Desativado';
            break;
    }
    return result;
};

const indTipoTelefone = (indicador) => {
    var result;
    switch(indicador){
        case 'F':
            result = 'Fixo';
            break;
        case 'C':
            result = 'Celular';
            break;
        case 'R':
            result = 'Residencial';
            break;
        case 'T':
            result = 'Trabalho';
            break;
        case 'O':
            result = 'Outro';
            break;
    }
    return result;
};

const filtroSelect = (dado, filtro) => {
    if (filtro && dado) {
        if (removeAcentos(dado.toString().toLowerCase()).includes(removeAcentos(filtro.toLowerCase())))
            return true;
        else
            return false;
    }
    else
        return true;
};

const removeAcentos = (string) => { 
    return string.replace(/[\W\[\] ]/g, function (char) {
        return acentos[char]||char;
    });
};

// Exportando Funções
module.exports = {
    configuraPaginacao,
    aplicaPaginacao,
    formatoData,
    formatoCPF,
    formatoCNPJ,
    indControleAcesso,
    indContratacao,
    indStatus,
    indTipoTelefone,
    filtroSelect
};