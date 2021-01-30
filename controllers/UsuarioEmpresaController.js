// Importando Models
const usuarioEmpresaModel = require('../models/UsuarioEmpresaModel');

// Funções do Controller
const usuarioEmpresaCreate = async (request, response) => {
    var result = new Object();
    var dados = request.body;
    var querySelect = await usuarioEmpresaModel.selectUsuarioEmpresa(dados.id_usuario, dados.id_empresa);
    if (querySelect['boolean']) {
        var queryInsert = await usuarioEmpresaModel.insertUsuarioEmpresa(dados);
        if (queryInsert.length > 0) {
            result['sucesso'] = true;
            result['mensagem'] = 'Funcionário vinculado à empresa com sucesso!';
        }
        else {
            result['sucesso'] = false;
            result['mensagem'] = 'Erro ao vincular funcionário à empresa!';
        }
    }
    else {
        result['sucesso'] = false;
        result['mensagem'] = querySelect['mensagem'];
    }
    response.status(200).json({error: false, data: result});
};

const usuarioEmpresaUpdate = async (request, response) => {
    var result = new Object();
    var id_usuario_empresa = request.params.id;
    var dados = request.body;
    var queryUpdate = await usuarioEmpresaModel.updateUsuarioEmpresa(id_usuario_empresa, dados);
    if (queryUpdate > 0) {
        result['sucesso'] = true;
        result['mensagem'] = 'Configurações de funcionário editadas com sucesso!';
    }
    else {
        result['sucesso'] = false;
        result['mensagem'] = 'Erro ao editar configurações de funcionário!';
    }
    response.status(200).json({error: false, data: result});
};

const usuarioEmpresaDelete = async (request, response) => {
    var result = new Object();
    var id_usuario_empresa = request.params.id;
    var queryDelete = await usuarioEmpresaModel.deleteUsuarioEmpresa(id_usuario_empresa);
    if (typeof(queryDelete) == 'number') {
        result['sucesso'] = true;
        result['mensagem'] = 'Funcionário desvinculado da empresa com sucesso!';
    }
    else {
        result['sucesso'] = false;
        result['mensagem'] = 'Erro ao desvincular funcionário da empresa!';
    }
    response.status(200).json({error: false, data: result});
};

// Exportando Funções
module.exports = {
    usuarioEmpresaCreate,
    usuarioEmpresaUpdate,
    usuarioEmpresaDelete
};