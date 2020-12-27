// Importando Bibliotecas
var moment = require('moment');

// Funções do Controller
const formatoData = (data) => {
    var dataFormato = moment.utc(data);
    dataFormato = moment(dataFormato).format('DD/MM/YYYY').toString();
    return dataFormato;
}

const controleAcesso = (indicador) => {
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

// Exportando Funções
module.exports = {
    formatoData,
    controleAcesso
};