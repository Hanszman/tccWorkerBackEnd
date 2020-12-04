// Importando Conexão com o Banco de Dados
const db = require('../database/conexao');

// Exportando a Classe do Model
module.exports = class UsuarioModel {
    static selectUsuarios(callback) {
        return db.query("SELECT * FROM usuario", callback);
    }

    static authSenhaLogin(login, callback) {
        return db.query("SELECT dsc_senha FROM usuario WHERE dsc_login = ?", [login], callback);
    }
}