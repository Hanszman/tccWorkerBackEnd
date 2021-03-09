// Importando Bibliotecas
const express = require('express');
const router = express.Router();

// Importando Controllers
const login = require('../controllers/LoginController');
const usuario = require('../controllers/UsuarioController');
const empresa = require('../controllers/EmpresaController');
const cliente = require('../controllers/ClienteController');
const fornecedor = require('../controllers/FornecedorController');
const setor = require('../controllers/SetorController');
const projeto = require('../controllers/ProjetoController');
const quadro = require('../controllers/QuadroController');
const atividade = require('../controllers/AtividadeController');
const etapa = require('../controllers/EtapaController');
const telefone = require('../controllers/TelefoneController');
const endereco = require('../controllers/EnderecoController');
const email = require('../controllers/EmailController');
const usuario_empresa = require('../controllers/UsuarioEmpresaController');
const atividade_usuario_empresa = require('../controllers/AtividadeUsuarioEmpresaController');
const projeto_usuario_empresa = require('../controllers/ProjetoUsuarioEmpresaController');
const projeto_cliente = require('../controllers/ProjetoClienteController');
const projeto_fornecedor = require('../controllers/ProjetoFornecedorController');
const chart = require('../controllers/ChartController');

// Rotas

// GET
router.get('/', (request, response) => response.json({mensagem: 'Digite alguma rota da API!'}));
router.get('/usuario/read/', usuario.usuarioRead);
router.get('/usuario/read/:id', usuario.usuarioRead);
router.get('/empresa/read/', empresa.empresaRead);
router.get('/empresa/read/:id', empresa.empresaDetail);
router.get('/cliente/read/', cliente.clienteRead);
router.get('/cliente/read/:id', cliente.clienteRead);
router.get('/fornecedor/read/', fornecedor.fornecedorRead);
router.get('/fornecedor/read/:id', fornecedor.fornecedorRead);
router.get('/setor/read/', setor.setorRead);
router.get('/setor/read/:id', setor.setorRead);
router.get('/projeto/read/', projeto.projetoRead);
router.get('/projeto/read/:id', projeto.projetoRead);
router.get('/quadro/read/', quadro.quadroRead);
router.get('/quadro/read/:id', quadro.quadroRead);
router.get('/atividade/read/', atividade.atividadeRead);
router.get('/atividade/read/:id', atividade.atividadeRead);
router.get('/etapa/read/', etapa.etapaRead);
router.get('/etapa/read/:id', etapa.etapaRead);
router.get('/telefone/read/', telefone.telefoneRead);
router.get('/telefone/read/:id', telefone.telefoneRead);
router.get('/endereco/read/', endereco.enderecoRead);
router.get('/endereco/read/:id', endereco.enderecoRead);
router.get('/email/read/', email.emailRead);
router.get('/email/read/:id', email.emailRead);
router.get('/usuario_empresa/read/', usuario.usuarioRead);
router.get('/usuario_empresa/read/:id', usuario.usuarioRead);
router.get('/atividade_usuario_empresa/read/', atividade_usuario_empresa.atividadeUsuarioEmpresaRead);
router.get('/atividade_usuario_empresa/read/:id', atividade_usuario_empresa.atividadeUsuarioEmpresaRead);
router.get('/projeto_usuario_empresa/read/', projeto_usuario_empresa.projetoUsuarioEmpresaRead);
router.get('/projeto_usuario_empresa/read/:id', projeto_usuario_empresa.projetoUsuarioEmpresaRead);
router.get('/projeto_cliente/read/', projeto_cliente.projetoClienteRead);
router.get('/projeto_cliente/read/:id', projeto_cliente.projetoClienteRead);
router.get('/projeto_fornecedor/read/', projeto_fornecedor.projetoFornecedorRead);
router.get('/projeto_fornecedor/read/:id', projeto_fornecedor.projetoFornecedorRead);
router.get('/chart/atividade_etapa/', chart.atividadeEtapaChart);
router.get('/chart/atividade_prioridade_etapa/', chart.atividadePrioridadeEtapaChart);
router.get('/chart/atividade_cliente_etapa/', chart.atividadeClienteEtapaChart);
router.get('/chart/atividade_fornecedor_etapa/', chart.atividadeFornecedorEtapaChart);
router.get('/chart/atividade_funcionario_etapa/', chart.atividadeFuncionarioEtapaChart);
router.get('/chart/atividade_setor_etapa/', chart.atividadeSetorEtapaChart);
router.get('/chart/atividade_projeto_etapa/', chart.atividadeProjetoEtapaChart);
router.get('/chart/projeto_cliente/', chart.projetoClienteChart);
router.get('/chart/projeto_fornecedor/', chart.projetoFornecedorChart);
router.get('/chart/projeto_funcionario/', chart.projetoFuncionarioChart);
router.get('/chart/projeto_setor/', chart.projetoSetorChart);

// POST
router.post('/login/', login.loginAuth);
router.post('/login_fb/', login.loginAuthFB);
router.post('/usuario/create/', usuario.usuarioCreate);
router.post('/empresa/create/', empresa.empresaCreate);
router.post('/cliente/create/', cliente.clienteCreate);
router.post('/fornecedor/create/', fornecedor.fornecedorCreate);
router.post('/setor/create/', setor.setorCreate);
router.post('/projeto/create/', projeto.projetoCreate);
router.post('/quadro/create/', quadro.quadroCreate);
router.post('/atividade/create/', atividade.atividadeCreate);
router.post('/etapa/create/', etapa.etapaCreate);
router.post('/telefone/create/', telefone.telefoneCreate);
router.post('/endereco/create/', endereco.enderecoCreate);
router.post('/email/create/', email.emailCreate);
router.post('/usuario_empresa/create/', usuario_empresa.usuarioEmpresaCreate);
router.post('/atividade_usuario_empresa/create/', atividade_usuario_empresa.atividadeUsuarioEmpresaCreate);
router.post('/projeto_usuario_empresa/create/', projeto_usuario_empresa.projetoUsuarioEmpresaCreate);
router.post('/projeto_cliente/create/', projeto_cliente.projetoClienteCreate);
router.post('/projeto_fornecedor/create/', projeto_fornecedor.projetoFornecedorCreate);

// PUT
router.put('/usuario/update/:id', usuario.usuarioUpdate);
router.put('/empresa/update/:id', empresa.empresaUpdate);
router.put('/cliente/update/:id', cliente.clienteUpdate);
router.put('/fornecedor/update/:id', fornecedor.fornecedorUpdate);
router.put('/setor/update/:id', setor.setorUpdate);
router.put('/projeto/update/:id', projeto.projetoUpdate);
router.put('/quadro/update/:id', quadro.quadroUpdate);
router.put('/atividade/update/:id', atividade.atividadeUpdate);
router.put('/etapa/update/:id', etapa.etapaUpdate);
router.put('/telefone/update/:id', telefone.telefoneUpdate);
router.put('/endereco/update/:id', endereco.enderecoUpdate);
router.put('/email/update/:id', email.emailUpdate);
router.put('/usuario_empresa/update/:id', usuario_empresa.usuarioEmpresaUpdate);

// DELETE
router.delete('/usuario/delete/:id', usuario.usuarioDelete);
router.delete('/empresa/delete/:id', empresa.empresaDelete);
router.delete('/cliente/delete/:id', cliente.clienteDelete);
router.delete('/fornecedor/delete/:id', fornecedor.fornecedorDelete);
router.delete('/setor/delete/:id', setor.setorDelete);
router.delete('/projeto/delete/:id', projeto.projetoDelete);
router.delete('/quadro/delete/:id', quadro.quadroDelete);
router.delete('/atividade/delete/:id', atividade.atividadeDelete);
router.delete('/etapa/delete/:id', etapa.etapaDelete);
router.delete('/telefone/delete/:id', telefone.telefoneDelete);
router.delete('/endereco/delete/:id', endereco.enderecoDelete);
router.delete('/email/delete/:id', email.emailDelete);
router.delete('/usuario_empresa/delete/:id', usuario_empresa.usuarioEmpresaDelete);
router.delete('/atividade_usuario_empresa/delete/:id', atividade_usuario_empresa.atividadeUsuarioEmpresaDelete);
router.delete('/projeto_usuario_empresa/delete/:id', projeto_usuario_empresa.projetoUsuarioEmpresaDelete);
router.delete('/projeto_cliente/delete/:id', projeto_cliente.projetoClienteDelete);
router.delete('/projeto_fornecedor/delete/:id', projeto_fornecedor.projetoFornecedorDelete);

// Exportando Router
module.exports = router;