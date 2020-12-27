// Importando Bibliotecas
var moment = require('moment');

// Funções do Controller
const formatDate = (date) => {
    var dateFormat = moment.utc(date);
    dateFormat = moment(dateFormat).format('DD/MM/YYYY').toString();
    return dateFormat;
}

// Exportando Funções
module.exports = {
    formatDate
};