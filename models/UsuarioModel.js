// Importando Conexão com o Banco de Dados
const db = require('../database/conexao');

// Exportando a Classe do Model
module.exports = class UsuarioModel {
    static selectUsuarios(callback) {
        return db.query("SELECT * FROM usuario",
        callback);
    }

    static selectUsuariosWhereLogin(dsc_login, callback) {
        return db.query("SELECT id_usuario FROM usuario WHERE dsc_login = ?",
        [dsc_login],
        callback);
    }

    static insertUsuario(dados, callback) {
        return db.query("INSERT INTO usuario (dsc_nome, dsc_sobrenome, dsc_email, dsc_login, dsc_senha) VALUES (?, ?, ?, ?, ?)",
        [dados.dsc_nome, dados.dsc_sobrenome, dados.dsc_email, dados.dsc_login, dados.dsc_senha],
        callback);
    }

    static authSenhaLogin(login, callback) {
        return db.query("SELECT id_usuario, dsc_nome, dsc_senha FROM usuario WHERE dsc_login = ?",
        [login],
        callback);
    }
}