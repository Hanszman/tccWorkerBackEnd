// Importando Models
const chartModel = require('../models/ChartModel');
const etapaModel = require('../models/EtapaModel');
const clienteModel = require('../models/ClienteModel');
const fornecedorModel = require('../models/FornecedorModel');
const usuarioModel = require('../models/UsuarioModel');
const setorModel = require('../models/SetorModel');
const projetoModel = require('../models/ProjetoModel');

// Funções do Controller
// 1-) Quantidade de Atividades por Etapa (Pizza) ***
const atividadeEtapaChart = async (request, response) => {
    var result = new Object();
    var dados = request.query;
    var tipos = ['doughnut'];
    var legendas = ['Atividades por Etapa'];
    var eixoX = [];
    var eixoY = [];
    if (dados.id_empresa) {
        var queryEtapa = await etapaModel.selectEtapa(undefined, { ordenarPor: 'ind_sequencia', id_empresa: dados.id_empresa });
        if (queryEtapa.length > 0) {
            for (let i = 0; i < queryEtapa.length; i++)
                eixoX.push(queryEtapa[i].dsc_etapa);
        }
        if (queryEtapa.length > 0) {
            for (let i = 0; i < queryEtapa.length; i++) {
                var queryChart = await chartModel.selectAtividadeEtapa(dados.id_empresa, queryEtapa[i].id_etapa); // dados.id_usuario_empresa
                if (queryChart.length > 0)
                    eixoY.push(queryChart[0].quantidade);
                else
                    eixoY.push(0);
            }
        }
    }
    result['tipos'] = tipos;
    result['legendas'] = legendas;
    result['eixoX'] = eixoX;
    result['eixoY'] = eixoY;
    response.status(200).json({error: false, data: result});
};

// 2-) Quantidade de Atividades por Prioridade e por Etapa (Barra Stacked) ***
const atividadePrioridadeEtapaChart = async (request, response) => {
    var result = new Object();
    var dados = request.query;
    var tipos = [];
    var legendas = [];
    var prioridades = ['B', 'N', 'A', 'U'];
    var eixoX = ['Baixa', 'Normal', 'Alta', 'Urgente'];
    var eixoY = [];
    if (dados.id_empresa) {
        var queryEtapa = await etapaModel.selectEtapa(undefined, { ordenarPor: 'ind_sequencia', id_empresa: dados.id_empresa });
        if (queryEtapa.length > 0) {
            for (let i = 0; i < queryEtapa.length; i++) {
                legendas.push(queryEtapa[i].dsc_etapa);
                tipos.push('bar');
            }
        }
        if (queryEtapa.length > 0) {
            for (let i = 0; i < queryEtapa.length; i++) {
                var valoresY = [];
                for (let j = 0; j < prioridades.length; j++) {
                    var queryChart = await chartModel.selectAtividadePrioridadeEtapa(dados.id_empresa, prioridades[j], queryEtapa[i].id_etapa);
                    if (queryChart.length > 0)
                        valoresY.push(queryChart[0].quantidade);
                    else
                        valoresY.push(0);
                }
                eixoY.push(valoresY);
            }
        }
    }
    result['tipos'] = tipos;
    result['legendas'] = legendas;
    result['eixoX'] = eixoX;
    result['eixoY'] = eixoY;
    response.status(200).json({error: false, data: result});
};

// 3-) Quantidade de Atividades por Cliente e por Etapa (Barra Stacked)
const atividadeClienteEtapaChart = async (request, response) => {
    var result = new Object();
    var dados = request.query;
    var tipos = [];
    var legendas = [];
    var eixoX = [];
    var eixoY = [];
    if (dados.id_empresa) {
        var queryEtapa = await etapaModel.selectEtapa(undefined, { ordenarPor: 'ind_sequencia', id_empresa: dados.id_empresa });
        if (queryEtapa.length > 0) {
            for (let i = 0; i < queryEtapa.length; i++) {
                legendas.push(queryEtapa[i].dsc_etapa);
                tipos.push('bar');
            }
        }
        var queryCliente = await clienteModel.selectCliente(undefined, { ordenarPor: 'dsc_nome', id_empresa: dados.id_empresa });
        if (queryCliente.length > 0) {
            for (let i = 0; i < queryCliente.length; i++)
                eixoX.push(queryCliente[i].dsc_nome);
        }
        if (queryEtapa.length > 0 && queryCliente.length > 0) {
            for (let i = 0; i < queryEtapa.length; i++) {
                var valoresY = [];
                for (let j = 0; j < queryCliente.length; j++) {
                    var queryChart = await chartModel.selectAtividadeClienteEtapa(dados.id_empresa, queryCliente[j].id_cliente, queryEtapa[i].id_etapa);
                    if (queryChart.length > 0)
                        valoresY.push(queryChart[0].quantidade);
                    else
                        valoresY.push(0);
                }
                eixoY.push(valoresY);
            }
        }
    }
    result['tipos'] = tipos;
    result['legendas'] = legendas;
    result['eixoX'] = eixoX;
    result['eixoY'] = eixoY;
    response.status(200).json({error: false, data: result});
};

// 4-) Quantidade de Atividades por Fornecedor e por Etapa (Barra Stacked)
const atividadeFornecedorEtapaChart = async (request, response) => {
    var result = new Object();
    var dados = request.query;
    var tipos = [];
    var legendas = [];
    var eixoX = [];
    var eixoY = [];
    if (dados.id_empresa) {
        var queryEtapa = await etapaModel.selectEtapa(undefined, { ordenarPor: 'ind_sequencia', id_empresa: dados.id_empresa });
        if (queryEtapa.length > 0) {
            for (let i = 0; i < queryEtapa.length; i++) {
                legendas.push(queryEtapa[i].dsc_etapa);
                tipos.push('bar');
            }
        }
        var queryFornecedor = await fornecedorModel.selectFornecedor(undefined, { ordenarPor: 'dsc_nome', id_empresa: dados.id_empresa });
        if (queryFornecedor.length > 0) {
            for (let i = 0; i < queryFornecedor.length; i++)
                eixoX.push(queryFornecedor[i].dsc_nome);
        }
        if (queryEtapa.length > 0 && queryFornecedor.length > 0) {
            for (let i = 0; i < queryEtapa.length; i++) {
                var valoresY = [];
                for (let j = 0; j < queryFornecedor.length; j++) {
                    var queryChart = await chartModel.selectAtividadeFornecedorEtapa(dados.id_empresa, queryFornecedor[j].id_fornecedor, queryEtapa[i].id_etapa);
                    if (queryChart.length > 0)
                        valoresY.push(queryChart[0].quantidade);
                    else
                        valoresY.push(0);
                }
                eixoY.push(valoresY);
            }
        }
    }
    result['tipos'] = tipos;
    result['legendas'] = legendas;
    result['eixoX'] = eixoX;
    result['eixoY'] = eixoY;
    response.status(200).json({error: false, data: result});
};

// 5-) Quantidade de Atividades por Funcionário e por Etapa (Barra Horizontal Stacked) ***
const atividadeFuncionarioEtapaChart = async (request, response) => {
    var result = new Object();
    var dados = request.query;
    var tipos = [];
    var legendas = [];
    var eixoX = [];
    var eixoY = [];
    if (dados.id_empresa) {
        var queryEtapa = await etapaModel.selectEtapa(undefined, { ordenarPor: 'ind_sequencia', id_empresa: dados.id_empresa });
        if (queryEtapa.length > 0) {
            for (let i = 0; i < queryEtapa.length; i++) {
                legendas.push(queryEtapa[i].dsc_etapa);
                tipos.push('horizontalBar');
            }
        }
        var queryUsuario = await usuarioModel.selectUsuario(undefined, { ordenarPor: 'dsc_nome_completo', id_empresa: dados.id_empresa });
        if (queryUsuario.length > 0) {
            for (let i = 0; i < queryUsuario.length; i++)
                eixoX.push(queryUsuario[i].dsc_nome_completo);
        }
        if (queryEtapa.length > 0 && queryUsuario.length > 0) {
            for (let i = 0; i < queryEtapa.length; i++) {
                var valoresY = [];
                for (let j = 0; j < queryUsuario.length; j++) {
                    var queryChart = await chartModel.selectAtividadeFuncionarioEtapa(dados.id_empresa, queryUsuario[j].id_usuario_empresa, queryEtapa[i].id_etapa);
                    if (queryChart.length > 0)
                        valoresY.push(queryChart[0].quantidade);
                    else
                        valoresY.push(0);
                }
                eixoY.push(valoresY);
            }
        }
    }
    result['tipos'] = tipos;
    result['legendas'] = legendas;
    result['eixoX'] = eixoX;
    result['eixoY'] = eixoY;
    response.status(200).json({error: false, data: result});
};

// 6-) Quantidade de Atividades por Setor e por Etapa (Barra Stacked) ***
const atividadeSetorEtapaChart = async (request, response) => {
    var result = new Object();
    var dados = request.query;
    var tipos = [];
    var legendas = [];
    var eixoX = [];
    var eixoY = [];
    if (dados.id_empresa) {
        var queryEtapa = await etapaModel.selectEtapa(undefined, { ordenarPor: 'ind_sequencia', id_empresa: dados.id_empresa });
        if (queryEtapa.length > 0) {
            for (let i = 0; i < queryEtapa.length; i++) {
                legendas.push(queryEtapa[i].dsc_etapa);
                tipos.push('bar');
            }
        }
        var querySetor = await setorModel.selectSetor(undefined, { ordenarPor: 'dsc_setor', id_empresa: dados.id_empresa });
        if (querySetor.length > 0) {
            for (let i = 0; i < querySetor.length; i++)
                eixoX.push(querySetor[i].dsc_setor);
        }
        if (queryEtapa.length > 0 && querySetor.length > 0) {
            for (let i = 0; i < queryEtapa.length; i++) {
                var valoresY = [];
                for (let j = 0; j < querySetor.length; j++) {
                    var queryChart = await chartModel.selectAtividadeSetorEtapa(dados.id_empresa, querySetor[j].id_setor, queryEtapa[i].id_etapa);
                    if (queryChart.length > 0)
                        valoresY.push(queryChart[0].quantidade);
                    else
                        valoresY.push(0);
                }
                eixoY.push(valoresY);
            }
        }
    }
    result['tipos'] = tipos;
    result['legendas'] = legendas;
    result['eixoX'] = eixoX;
    result['eixoY'] = eixoY;
    response.status(200).json({error: false, data: result});
};

// 7-) Quantidade de Atividades por Projeto e por Etapa (Barra Stacked)
const atividadeProjetoEtapaChart = async (request, response) => {
    var result = new Object();
    var dados = request.query;
    var tipos = [];
    var legendas = [];
    var eixoX = [];
    var eixoY = [];
    if (dados.id_empresa) {
        var queryEtapa = await etapaModel.selectEtapa(undefined, { ordenarPor: 'ind_sequencia', id_empresa: dados.id_empresa });
        if (queryEtapa.length > 0) {
            for (let i = 0; i < queryEtapa.length; i++) {
                legendas.push(queryEtapa[i].dsc_etapa);
                tipos.push('bar');
            }
        }
        var queryProjeto = await projetoModel.selectProjeto(undefined, { ordenarPor: 'dsc_nome', id_empresa: dados.id_empresa });
        if (queryProjeto.length > 0) {
            for (let i = 0; i < queryProjeto.length; i++)
                eixoX.push(queryProjeto[i].dsc_nome);
        }
        if (queryEtapa.length > 0 && queryProjeto.length > 0) {
            for (let i = 0; i < queryEtapa.length; i++) {
                var valoresY = [];
                for (let j = 0; j < queryProjeto.length; j++) {
                    var queryChart = await chartModel.selectAtividadeProjetoEtapa(dados.id_empresa, queryProjeto[j].id_projeto, queryEtapa[i].id_etapa);
                    if (queryChart.length > 0)
                        valoresY.push(queryChart[0].quantidade);
                    else
                        valoresY.push(0);
                }
                eixoY.push(valoresY);
            }
        }
    }
    result['tipos'] = tipos;
    result['legendas'] = legendas;
    result['eixoX'] = eixoX;
    result['eixoY'] = eixoY;
    response.status(200).json({error: false, data: result});
};

// 8-) Quantidade de Projetos por Cliente (Pizza)
const projetoClienteChart = async (request, response) => {
    var result = new Object();
    var dados = request.query;
    var tipos = ['doughnut'];
    var legendas = ['Projetos por Cliente'];
    var eixoX = [];
    var eixoY = [];
    if (dados.id_empresa) {
        var queryCliente = await clienteModel.selectCliente(undefined, { ordenarPor: 'dsc_nome', id_empresa: dados.id_empresa });
        if (queryCliente.length > 0) {
            for (let i = 0; i < queryCliente.length; i++)
                eixoX.push(queryCliente[i].dsc_nome);
        }
        if (queryCliente.length > 0) {
            for (let i = 0; i < queryCliente.length; i++) {
                var queryChart = await chartModel.selectProjetoCliente(dados.id_empresa, queryCliente[i].id_cliente);
                if (queryChart.length > 0)
                    eixoY.push(queryChart[0].quantidade);
                else
                    eixoY.push(0);
            }
        }
    }
    result['tipos'] = tipos;
    result['legendas'] = legendas;
    result['eixoX'] = eixoX;
    result['eixoY'] = eixoY;
    response.status(200).json({error: false, data: result});
};

// 9-) Quantidade de Projetos por Fornecedor (Pizza)
const projetoFornecedorChart = async (request, response) => {
    var result = new Object();
    var dados = request.query;
    var tipos = ['doughnut'];
    var legendas = ['Projetos por Fornecedor'];
    var eixoX = [];
    var eixoY = [];
    if (dados.id_empresa) {
        var queryFornecedor = await fornecedorModel.selectFornecedor(undefined, { ordenarPor: 'dsc_nome', id_empresa: dados.id_empresa });
        if (queryFornecedor.length > 0) {
            for (let i = 0; i < queryFornecedor.length; i++)
                eixoX.push(queryFornecedor[i].dsc_nome);
        }
        if (queryFornecedor.length > 0) {
            for (let i = 0; i < queryFornecedor.length; i++) {
                var queryChart = await chartModel.selectProjetoFornecedor(dados.id_empresa, queryFornecedor[i].id_fornecedor);
                if (queryChart.length > 0)
                    eixoY.push(queryChart[0].quantidade);
                else
                    eixoY.push(0);
            }
        }
    }
    result['tipos'] = tipos;
    result['legendas'] = legendas;
    result['eixoX'] = eixoX;
    result['eixoY'] = eixoY;
    response.status(200).json({error: false, data: result});
};

// 10-) Quantidade de Projetos por Funcionário (Pizza)
const projetoFuncionarioChart = async (request, response) => {
    var result = new Object();
    var dados = request.query;
    var tipos = ['doughnut'];
    var legendas = ['Projetos por Funcionário'];
    var eixoX = [];
    var eixoY = [];
    if (dados.id_empresa) {
        var queryUsuario = await usuarioModel.selectUsuario(undefined, { ordenarPor: 'dsc_nome_completo', id_empresa: dados.id_empresa });
        if (queryUsuario.length > 0) {
            for (let i = 0; i < queryUsuario.length; i++)
                eixoX.push(queryUsuario[i].dsc_nome_completo);
        }
        if (queryUsuario.length > 0) {
            for (let i = 0; i < queryUsuario.length; i++) {
                var queryChart = await chartModel.selectProjetoFuncionario(dados.id_empresa, queryUsuario[i].id_usuario_empresa);
                if (queryChart.length > 0)
                    eixoY.push(queryChart[0].quantidade);
                else
                    eixoY.push(0);
            }
        }
    }
    result['tipos'] = tipos;
    result['legendas'] = legendas;
    result['eixoX'] = eixoX;
    result['eixoY'] = eixoY;
    response.status(200).json({error: false, data: result});
};

// 11-) Quantidade de Projetos por Setor (Pizza)
const projetoSetorChart = async (request, response) => {
    var result = new Object();
    var dados = request.query;
    var tipos = ['doughnut'];
    var legendas = ['Projetos por Setor'];
    var eixoX = [];
    var eixoY = [];
    if (dados.id_empresa) {
        var querySetor = await setorModel.selectSetor(undefined, { ordenarPor: 'dsc_setor', id_empresa: dados.id_empresa });
        if (querySetor.length > 0) {
            for (let i = 0; i < querySetor.length; i++)
                eixoX.push(querySetor[i].dsc_setor);
        }
        if (querySetor.length > 0) {
            for (let i = 0; i < querySetor.length; i++) {
                var queryChart = await chartModel.selectProjetoSetor(dados.id_empresa, querySetor[i].id_setor);
                if (queryChart.length > 0)
                    eixoY.push(queryChart[0].quantidade);
                else
                    eixoY.push(0);
            }
        }
    }
    result['tipos'] = tipos;
    result['legendas'] = legendas;
    result['eixoX'] = eixoX;
    result['eixoY'] = eixoY;
    response.status(200).json({error: false, data: result});
};

// Exportando Funções
module.exports = {
    atividadeEtapaChart,
    atividadePrioridadeEtapaChart,
    atividadeClienteEtapaChart,
    atividadeFornecedorEtapaChart,
    atividadeFuncionarioEtapaChart,
    atividadeSetorEtapaChart,
    atividadeProjetoEtapaChart,
    projetoClienteChart,
    projetoFornecedorChart,
    projetoFuncionarioChart,
    projetoSetorChart
};