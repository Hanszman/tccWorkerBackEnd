// Importando Bibliotecas
const express = require('express');
const router = express.Router();

// Importando Controllers
const empresa = require('../controllers/EmpresaController');
const usuario = require('../controllers/UsuarioController');

// Rotas
router.get('/', (request, response) => response.json({mensagem: 'Digite alguma rota da API!'}));
router.get('/empresa/', empresa.empresaRead);
router.get('/usuario/', usuario.usuarioRead);

// Exportando Router
module.exports = router;