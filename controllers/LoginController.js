// Importando Models
// const...

// Funções do Controller
const loginAuth = async (request, response) => {
    var dados = request.body;
    console.log(dados);
    var result = new Object();
    result['mensagem'] = 'login';
    response.status(200).json({error: false, data: result});
};

// Exportando Funções
module.exports = {
    loginAuth
};