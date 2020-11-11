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

// Exportando Funções
module.exports = {
    usuarioRead
};