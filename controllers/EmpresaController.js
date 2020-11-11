// Importando Models
const empresaModel = require('../models/EmpresaModel');

// Funções do Controller
const empresaRead = async (request, response) => {
    var result = new Object();
    result['tabela'] = 'Empresa';
    response.status(200).json({error: false, data: result});
};

// Exportando Funções
module.exports = {
    empresaRead
};