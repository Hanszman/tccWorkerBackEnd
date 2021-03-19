// Importando Conexão com o Banco de Dados
const knex = require('../database/conexao');

// Funções do Model
const selectEmpresa = async (id_empresa, id_usuario, dsc_nome) => {
    let query = knex({ e: 'empresa' })
    .select('e.*')
    .countDistinct('ue.id_usuario as qtd_usuario')
    .join({ ue: "usuario_empresa" }, "ue.id_empresa", "=", "e.id_empresa")
    .where(1, '=', 1)
    .groupBy('e.id_empresa');
    if (id_empresa)
        query.andWhere('e.id_empresa', '=', id_empresa);
    if (id_usuario) {
        query.select('ue2.*');
        query.join({ ue2: "usuario_empresa" }, "ue2.id_empresa", "=", "e.id_empresa");
        query.andWhere('ue2.id_usuario', '=', id_usuario);
    }
    if (dsc_nome)
        query.andWhere('e.dsc_nome', 'like', '%' + dsc_nome + '%');
    let result = await query;
    return result;
};

const insertEmpresa = async (dados) => {
    let queryEmpresa = knex('empresa')
    .insert({
        dsc_nome: dados.dsc_nome,
        dsc_cnpj: dados.dsc_cnpj,
        dat_fundacao: dados.dat_fundacao,
        arq_foto: dados.caminho_arq_foto
    }).returning('id_empresa');
    let resultIdEmpresa = await queryEmpresa;

    let queryUsuarioEmpresa = knex('usuario_empresa')
    .insert({
        id_usuario: dados.id_usuario_logado,
        id_empresa: resultIdEmpresa
    }).returning('id_empresa');
    let resultUsuarioEmpresa = await queryUsuarioEmpresa;
    return resultUsuarioEmpresa;
};

const updateEmpresa = async (id, dados) => {
    let query = knex('empresa')
    .update({
        dsc_nome: dados.dsc_nome,
        dsc_cnpj: dados.dsc_cnpj,
        dat_fundacao: dados.dat_fundacao,
        arq_foto: dados.caminho_arq_foto
    }).where('id_empresa', '=', id)
    let result = await query;
    return result;
};

const deleteEmpresa = async (id) => {
    try {
        // TODO: fazer todos os deletes necessários (todas as tabelas menos a de usuário) (OK)
        // (usuario_empresa, setor, etapa, projeto, quadro, atividade, cliente, fornecedor, telefone, email, endereco, projeto_fornecedor, projeto_cliente, projeto_usuario_empresa, atividade_usuario_empresa)
        // OBS: Lembrar de excluir tudo de todos, em mais de um nível, exemplo: telefones de fornecedor
        let vetorProjeto = [];
        let queryProjeto = await knex('projeto').where('id_empresa', '=', id);
        for (let i = 0; i < queryProjeto.length; i++)
            vetorProjeto.push(queryProjeto[i]['id_projeto']);
        
        let vetorQuadro = [];
        let queryQuadro = await knex('quadro').where('id_projeto', 'IN', vetorProjeto);
        for (let i = 0; i < queryQuadro.length; i++)
            vetorQuadro.push(queryQuadro[i]['id_quadro']);
        
        let vetorAtividade = [];
        let queryAtividade = await knex('atividade').where('id_quadro', 'IN', vetorQuadro);
        for (let i = 0; i < queryAtividade.length; i++)
            vetorAtividade.push(queryAtividade[i]['id_atividade']);

        await knex('atividade_usuario_empresa')
        .delete()
        .where('id_atividade', 'IN', vetorAtividade);

        await knex('atividade')
        .delete()
        .where('id_quadro', 'IN', vetorQuadro);
        
        await knex('quadro')
        .delete()
        .where('id_projeto', 'IN', vetorProjeto);

        await knex('projeto_cliente')
        .delete()
        .where('id_projeto', 'IN', vetorProjeto);

        await knex('projeto_fornecedor')
        .delete()
        .where('id_projeto', 'IN', vetorProjeto);

        await knex('projeto_usuario_empresa')
        .delete()
        .where('id_projeto', 'IN', vetorProjeto);

        await knex('projeto')
        .delete()
        .where('id_empresa', '=', id);

        await knex('usuario_empresa')
        .delete()
        .where('id_empresa', '=', id);

        await knex('setor')
        .delete()
        .where('id_empresa', '=', id);

        await knex('etapa')
        .delete()
        .where('id_empresa', '=', id);

        let vetorCliente = [];
        let queryCliente = await knex('cliente').where('id_empresa', '=', id);
        for (let i = 0; i < queryCliente.length; i++)
            vetorCliente.push(queryCliente[i]['id_cliente']);

        await knex('telefone')
        .delete()
        .where('id_cliente', 'IN', vetorCliente);

        await knex('email')
        .delete()
        .where('id_cliente', 'IN', vetorCliente);

        await knex('endereco')
        .delete()
        .where('id_cliente', 'IN', vetorCliente);

        await knex('cliente')
        .delete()
        .where('id_empresa', '=', id);

        let vetorFornecedor = [];
        let queryFornecedor = await knex('fornecedor').where('id_empresa', '=', id);
        for (let i = 0; i < queryFornecedor.length; i++)
            vetorFornecedor.push(queryFornecedor[i]['id_fornecedor']);

        await knex('telefone')
        .delete()
        .where('id_fornecedor', 'IN', vetorFornecedor);

        await knex('email')
        .delete()
        .where('id_fornecedor', 'IN', vetorFornecedor);

        await knex('endereco')
        .delete()
        .where('id_fornecedor', 'IN', vetorFornecedor);

        await knex('fornecedor')
        .delete()
        .where('id_empresa', '=', id);

        await knex('telefone')
        .delete()
        .where('id_empresa', '=', id);

        await knex('email')
        .delete()
        .where('id_empresa', '=', id);

        await knex('endereco')
        .delete()
        .where('id_empresa', '=', id);

        let query = knex('empresa')
        .delete()
        .where('id_empresa', '=', id);
        let result = await query;
        return result;
    }
    catch (erro) {
        return 'Erro: ' + erro;
    }
};

// Exportando Funções
module.exports = {
    selectEmpresa,
    insertEmpresa,
    updateEmpresa,
    deleteEmpresa
}