// Importando Models
const empresaModel = require('../models/EmpresaModel');

// Funções do Controller
const empresaRead = async (request, response) => {
    var id_usuario = request.query.id_usuario;
    if (id_usuario !== undefined) {
        empresaModel.selectEmpresas(id_usuario, function(erro, retorno) {
            var result = JSON.parse(JSON.stringify(retorno));
            response.status(200).json({error: false, data: result});
        });
    }  
};

// Exportando Funções
module.exports = {
    empresaRead
};