const usuarioRead = async (request, response) => {
    var result = new Object();
    result['tabela'] = 'Usuário'
    response.status(200).json({error: false, data: result});
};

module.exports = {
    usuarioRead
};