// Importando Bibliotecas
const express = require('express');
const router = express.Router();

// Importando Controllers
const empresa = require('../controllers/EmpresaController');
const usuario = require('../controllers/UsuarioController');

// Rotas
router.get('/', (req, res) => res.json({mensagem: 'Digite alguma rota da API!'}));
router.get('/empresa/', empresa.empresaRead);
router.get('/usuario/', usuario.usuarioRead);

module.exports = router;