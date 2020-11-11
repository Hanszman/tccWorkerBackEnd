// Importando Conexão com o Banco de Dados
const db = require('../database/conexao');

// Exportando a Classe do Model
module.exports = class UsuarioModel {
    static selectUsuarios(callback) {
        return db.query("SELECT * FROM usuario", callback);
    }
}