const empresaRead = async (request, response) => {
    var result = new Object();
    result['tabela'] = 'Empresa'
    response.status(200).json({error: false, data: result});
};

module.exports = {
    empresaRead
};