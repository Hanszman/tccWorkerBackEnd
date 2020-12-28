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
router.get('/empresa/read/', empresa.empresaRead);
router.get('/empresa/read/:id', empresa.empresaDetail);
router.get('/usuario/read/', usuario.usuarioRead);

// POST
router.post('/login/', login.loginAuth);
router.post('/usuario/create/', usuario.usuarioCreate);

// PUT
// ...

// DELETE
// ...

// Exportando Router
module.exports = router;