// Importando Models
const usuarioModel = require('../models/UsuarioModel');

// Funções do Controller
const usuarioRead = async (request, response) => {
    usuarioModel.selectUsuarios(function(erro, retorno) {
        console.log(retorno);
    });
    var result = new Object();
    result['tabela'] = 'Usuário';
    response.status(200).json({error: false, data: result});
};

const usuarioCreate = async (request, response) => {
    var dados = request.body;
    usuarioModel.insertUsuario(dados, function(erro, retorno) {
        var result = new Object();
        var jsonRetorno = JSON.parse(JSON.stringify(retorno));
        console.log(jsonRetorno);
        response.status(200).json({error: false, data: result});
    });
};

// Exportando Funções
module.exports = {
    usuarioRead
};