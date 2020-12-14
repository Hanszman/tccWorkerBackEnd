// Importando Models
const empresaModel = require('../models/EmpresaModel');

// Funções do Controller
const empresaRead = async (request, response) => {
    empresaModel.selectEmpresas(function(erro, retorno) {
        var result = JSON.parse(JSON.stringify(retorno));
        response.status(200).json({error: false, data: result});
    });
};

// Exportando Funções
module.exports = {
    empresaRead
};