// Importando Conexão com o Banco de Dados
const db = require('../database/conexao');

// Exportando a Classe do Model
module.exports = class EmpresaModel {
    static selectEmpresas(callback) {
        return db.query("SELECT * FROM empresa", callback);
    }
}