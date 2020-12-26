// Importando Conexão com o Banco de Dados
const db = require('../database/conexao');

// Exportando a Classe do Model
module.exports = class EmpresaModel {
    static selectEmpresas(id_usuario, dsc_nome, callback) {
        return db.query("SELECT * FROM empresa e JOIN usuario_empresa ue ON ue.id_empresa = e.id_empresa WHERE ue.id_usuario = ? AND e.dsc_nome like ?",
        [id_usuario, dsc_nome],
        callback);
    }
}