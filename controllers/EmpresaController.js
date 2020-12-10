// Importando Models
const empresaModel = require('../models/EmpresaModel');

// Funções do Controller
const empresaRead = async (request, response) => {
    empresaModel.selectEmpresas(function(erro, retorno) {
        var result = new Object();
        var jsonRetorno = JSON.parse(JSON.stringify(retorno));
        for (let i = 0; i < jsonRetorno.length; i++){
            console.log(jsonRetorno[i]);
        }
        response.status(200).json({error: false, data: result});
    });
};

// Exportando Funções
module.exports = {
    empresaRead
};