// Importando Models
const telefoneModel = require('../models/TelefoneModel');

// Funções do Controller
const telefoneRead = async (request, response) => {
    var result = new Object();
    var querySelect = await telefoneModel.selectTelefone();
    result['data'] = querySelect;
    response.status(200).json({error: false, data: result});
};

// Exportando Funções
module.exports = {
    telefoneRead
};