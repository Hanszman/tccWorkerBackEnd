// Importando Models
const empresaModel = require('../models/EmpresaModel');

// Importando Funções
const formatDate = require('./GeralController').formatDate;

// Funções do Controller
const empresaRead = async (request, response) => {
    var id_usuario = request.query.id_usuario;
    var dsc_nome = request.query.dsc_nome;
    if (id_usuario !== undefined) {
        empresaModel.selectEmpresas(id_usuario, dsc_nome, function(erro, retorno) {
            var result = JSON.parse(JSON.stringify(retorno));
            for(let i = 0; i < result.length; i++) {
                result[i]['dat_fundacao'] = formatDate(result[i]['dat_fundacao']);
                result[i]['dat_contratacao'] = formatDate(result[i]['dat_contratacao']);
            }
            response.status(200).json({error: false, data: result});
        });
    }  
};

// Exportando Funções
module.exports = {
    empresaRead
};