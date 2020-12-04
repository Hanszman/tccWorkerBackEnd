// Importando Bibliotecas
const bcrypt = require('bcryptjs');

// Importando Models
// const...

// Funções do Controller
const loginAuth = async (request, response) => {
    var dados = request.body;
    console.log(dados.dsc_senha);
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync('teste', salt);
    console.log(hash);
    console.log(bcrypt.compareSync('teste', '$2a$10$UZXZSGxL/JQncOVFT1bNtOfd0nPHFFbPTYtyuVkPLEHJYBveD6d/G')); // Irá retornar true.
    console.log(bcrypt.compareSync('asdasdasd', '$2a$10$UZXZSGxL/JQncOVFT1bNtOfd0nPHFFbPTYtyuVkPLEHJYBveD6d/G')); // Irá retornar false.
    // Instruções:
    // const bcrypt = require('bcryptjs');
    // const password = '123';
    // const salt = bcrypt.genSaltSync(10);
    // const hash = bcrypt.hashSync(password, salt); // Guarde o `hash` na sua base de dados...
    // const db_password = db.password; // Imagine que veio da base de dados.
    // bcrypt.compareSync('123', db_password); // Irá retornar true.
    // bcrypt.compareSync('456', db_password); // Irá retornar false.
    var result = new Object();
    result['mensagem'] = 'login';
    response.status(200).json({error: false, data: result});
};

// Exportando Funções
module.exports = {
    loginAuth
};