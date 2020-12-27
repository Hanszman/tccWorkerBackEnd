// Importando Bibliotecas
var moment = require('moment');

// Funções do Controller
const formatoData = (data) => {
    var dataFormato = moment.utc(data);
    dataFormato = moment(dataFormato).format('DD/MM/YYYY').toString();
    return dataFormato;
}

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
}

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
}

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
}

// Exportando Funções
module.exports = {
    formatoData,
    indControleAcesso,
    indContratacao,
    indStatus
};