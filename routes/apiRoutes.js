// Importando Bibliotecas
const express = require('express');
const router = express.Router();

// Importando Controllers
const login = require('../controllers/LoginController');
const usuario = require('../controllers/UsuarioController');
const empresa = require('../controllers/EmpresaController');
const usuario_empresa = require('../controllers/UsuarioEmpresaController');
const cliente = require('../controllers/ClienteController');
const fornecedor = require('../controllers/FornecedorController');
const setor = require('../controllers/SetorController');
const projeto = require('../controllers/ProjetoController');
const quadro = require('../controllers/QuadroController');
const atividade = require('../controllers/AtividadeController');
const subatividade = require('../controllers/SubatividadeController');
const etapa = require('../controllers/EtapaController');
const telefone = require('../controllers/TelefoneController');
const endereco = require('../controllers/EnderecoController');
const email = require('../controllers/EmailController');
const atividade_usuario_empresa = require('../controllers/AtividadeUsuarioEmpresaController');
const projeto_usuario_empresa = require('../controllers/ProjetoUsuarioEmpresaController');
const projeto_cliente = require('../controllers/ProjetoClienteController');
const projeto_fornecedor = require('../controllers/ProjetoFornecedorController');

// Rotas

// GET
router.get('/', (request, response) => response.json({mensagem: 'Digite alguma rota da API!'}));
router.get('/usuario/read/', usuario.usuarioRead);
router.get('/empresa/read/', empresa.empresaRead);
router.get('/empresa/read/:id', empresa.empresaDetail);

// POST
router.post('/login/', login.loginAuth);
router.post('/usuario/create/', usuario.usuarioCreate);

// PUT
// ...

// DELETE
// ...

// Exportando Router
module.exports = router;