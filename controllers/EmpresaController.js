// Importando Models
const empresaModel = require('../models/EmpresaModel');

// Importando Funções
const formatoData = require('./GeralController').formatoData;
const controleAcesso = require('./GeralController').controleAcesso;

// Funções do Controller
const empresaRead = async (request, response) => {
    var id_usuario = request.query.id_usuario;
    var dsc_nome = request.query.dsc_nome;
    if (id_usuario !== undefined) {
        empresaModel.selectEmpresas(id_usuario, dsc_nome, function(erro, retorno) {
            var result = JSON.parse(JSON.stringify(retorno));
            for(let i = 0; i < result.length; i++) {
                result[i]['dat_fundacao'] = formatoData(result[i]['dat_fundacao']);
                result[i]['dat_contratacao'] = formatoData(result[i]['dat_contratacao']);
                result[i]['ind_controle_acesso'] = controleAcesso(result[i]['ind_controle_acesso']);
            }
            response.status(200).json({error: false, data: result});
        });
    }  
};

// Exportando Funções
module.exports = {
    empresaRead
};