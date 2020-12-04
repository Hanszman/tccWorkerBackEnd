// Importando Bibliotecas
const express = require('express');
const router = express.Router();

// Importando Controllers
const login = require('../controllers/LoginController');
const empresa = require('../controllers/EmpresaController');
const usuario = require('../controllers/UsuarioController');

// Rotas

// GET
router.get('/', (request, response) => response.json({mensagem: 'Digite alguma rota da API!'}));
router.get('/empresa/', empresa.empresaRead);
router.get('/usuario/', usuario.usuarioRead);

// POST
router.post('/login/', login.loginAuth);

// Exportando Router
module.exports = router;