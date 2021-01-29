-- heroku_9439eb1c84438d2.empresa definition

CREATE TABLE `empresa` (
  `id_empresa` int(11) NOT NULL AUTO_INCREMENT,
  `dsc_nome` varchar(100) NOT NULL,
  `dsc_cnpj` varchar(20) DEFAULT NULL,
  `dat_fundacao` date DEFAULT NULL,
  `arq_foto` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`id_empresa`)
) ENGINE=InnoDB AUTO_INCREMENT=291 DEFAULT CHARSET=utf8;


-- heroku_9439eb1c84438d2.usuario definition

CREATE TABLE `usuario` (
  `id_usuario` int(11) NOT NULL AUTO_INCREMENT,
  `dsc_nome` varchar(100) NOT NULL,
  `dsc_sobrenome` varchar(200) DEFAULT NULL,
  `dsc_cpf` varchar(20) DEFAULT NULL,
  `dsc_rg` varchar(15) DEFAULT NULL,
  `dat_nascimento` date DEFAULT NULL,
  `dsc_login` varchar(50) NOT NULL,
  `dsc_senha` varchar(100) NOT NULL,
  `dsc_email` varchar(100) NOT NULL,
  `arq_foto` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=utf8;


-- heroku_9439eb1c84438d2.cliente definition

CREATE TABLE `cliente` (
  `id_cliente` int(11) NOT NULL AUTO_INCREMENT,
  `dsc_nome` varchar(100) NOT NULL,
  `dsc_cnpj` varchar(20) DEFAULT NULL,
  `id_empresa` int(11) NOT NULL,
  PRIMARY KEY (`id_cliente`),
  KEY `cliente_FK` (`id_empresa`),
  CONSTRAINT `cliente_FK` FOREIGN KEY (`id_empresa`) REFERENCES `empresa` (`id_empresa`)
) ENGINE=InnoDB AUTO_INCREMENT=161 DEFAULT CHARSET=utf8;


-- heroku_9439eb1c84438d2.etapa definition

CREATE TABLE `etapa` (
  `id_etapa` int(11) NOT NULL AUTO_INCREMENT,
  `dsc_etapa` varchar(100) NOT NULL,
  `id_empresa` int(11) NOT NULL,
  `ind_sequencia` int(11) NOT NULL,
  PRIMARY KEY (`id_etapa`),
  KEY `etapa_FK` (`id_empresa`),
  CONSTRAINT `etapa_FK` FOREIGN KEY (`id_empresa`) REFERENCES `empresa` (`id_empresa`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8;


-- heroku_9439eb1c84438d2.fornecedor definition

CREATE TABLE `fornecedor` (
  `id_fornecedor` int(11) NOT NULL AUTO_INCREMENT,
  `dsc_nome` varchar(100) NOT NULL,
  `dsc_cnpj` varchar(20) DEFAULT NULL,
  `id_empresa` int(11) NOT NULL,
  PRIMARY KEY (`id_fornecedor`),
  KEY `fornecedor_FK` (`id_empresa`),
  CONSTRAINT `fornecedor_FK` FOREIGN KEY (`id_empresa`) REFERENCES `empresa` (`id_empresa`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;


-- heroku_9439eb1c84438d2.setor definition

CREATE TABLE `setor` (
  `id_setor` int(11) NOT NULL AUTO_INCREMENT,
  `dsc_setor` varchar(150) NOT NULL,
  `id_empresa` int(11) NOT NULL,
  PRIMARY KEY (`id_setor`),
  KEY `setor_FK` (`id_empresa`),
  CONSTRAINT `setor_FK` FOREIGN KEY (`id_empresa`) REFERENCES `empresa` (`id_empresa`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;


-- heroku_9439eb1c84438d2.telefone definition

CREATE TABLE `telefone` (
  `id_telefone` int(11) NOT NULL AUTO_INCREMENT,
  `id_usuario` int(11) DEFAULT NULL,
  `id_fornecedor` int(11) DEFAULT NULL,
  `id_cliente` int(11) DEFAULT NULL,
  `id_empresa` int(11) DEFAULT NULL,
  `dsc_telefone` varchar(20) NOT NULL,
  `ind_tipo` char(1) NOT NULL DEFAULT 'F',
  PRIMARY KEY (`id_telefone`),
  KEY `telefone_FK` (`id_usuario`),
  KEY `telefone_FK_1` (`id_fornecedor`),
  KEY `telefone_FK_2` (`id_cliente`),
  KEY `telefone_FK_3` (`id_empresa`),
  CONSTRAINT `telefone_FK` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`),
  CONSTRAINT `telefone_FK_1` FOREIGN KEY (`id_fornecedor`) REFERENCES `fornecedor` (`id_fornecedor`),
  CONSTRAINT `telefone_FK_2` FOREIGN KEY (`id_cliente`) REFERENCES `cliente` (`id_cliente`),
  CONSTRAINT `telefone_FK_3` FOREIGN KEY (`id_empresa`) REFERENCES `empresa` (`id_empresa`)
) ENGINE=InnoDB AUTO_INCREMENT=81 DEFAULT CHARSET=utf8;


-- heroku_9439eb1c84438d2.usuario_empresa definition

CREATE TABLE `usuario_empresa` (
  `id_usuario_empresa` int(11) NOT NULL AUTO_INCREMENT,
  `id_usuario` int(11) NOT NULL,
  `id_empresa` int(11) NOT NULL,
  `ind_controle_acesso` char(1) NOT NULL DEFAULT 'C' COMMENT 'C (Comum), A (Administrador), G (Gerente)',
  `dsc_cargo` varchar(150) NOT NULL DEFAULT 'Fundador',
  `ind_contratacao` char(1) NOT NULL DEFAULT 'C' COMMENT 'C (Carteira Assinada), E (Estágio), M (MEI)',
  `ind_status` char(1) NOT NULL DEFAULT 'A' COMMENT 'A (Ativo), D (Desativado)',
  `dat_contratacao` date DEFAULT NULL,
  `id_setor` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_usuario_empresa`),
  KEY `usuario_empresa_FK` (`id_empresa`),
  KEY `usuario_empresa_FK_1` (`id_usuario`),
  KEY `usuario_empresa_FK_2` (`id_setor`),
  CONSTRAINT `usuario_empresa_FK` FOREIGN KEY (`id_empresa`) REFERENCES `empresa` (`id_empresa`),
  CONSTRAINT `usuario_empresa_FK_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`),
  CONSTRAINT `usuario_empresa_FK_2` FOREIGN KEY (`id_setor`) REFERENCES `setor` (`id_setor`)
) ENGINE=InnoDB AUTO_INCREMENT=251 DEFAULT CHARSET=utf8;


-- heroku_9439eb1c84438d2.email definition

CREATE TABLE `email` (
  `id_email` int(11) NOT NULL AUTO_INCREMENT,
  `id_usuario` int(11) DEFAULT NULL,
  `id_fornecedor` int(11) DEFAULT NULL,
  `id_cliente` int(11) DEFAULT NULL,
  `id_empresa` int(11) DEFAULT NULL,
  `dsc_email` varchar(100) NOT NULL,
  PRIMARY KEY (`id_email`),
  KEY `email_FK` (`id_usuario`),
  KEY `email_FK_1` (`id_fornecedor`),
  KEY `email_FK_2` (`id_cliente`),
  KEY `email_FK_3` (`id_empresa`),
  CONSTRAINT `email_FK` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`),
  CONSTRAINT `email_FK_1` FOREIGN KEY (`id_fornecedor`) REFERENCES `fornecedor` (`id_fornecedor`),
  CONSTRAINT `email_FK_2` FOREIGN KEY (`id_cliente`) REFERENCES `cliente` (`id_cliente`),
  CONSTRAINT `email_FK_3` FOREIGN KEY (`id_empresa`) REFERENCES `empresa` (`id_empresa`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;


-- heroku_9439eb1c84438d2.endereco definition

CREATE TABLE `endereco` (
  `id_endereco` int(11) NOT NULL AUTO_INCREMENT,
  `id_usuario` int(11) DEFAULT NULL,
  `id_fornecedor` int(11) DEFAULT NULL,
  `id_cliente` int(11) DEFAULT NULL,
  `id_empresa` int(11) DEFAULT NULL,
  `dsc_logradouro` varchar(150) NOT NULL,
  `dsc_numero` varchar(10) NOT NULL,
  `dsc_bairro` varchar(100) DEFAULT NULL,
  `dsc_cidade` varchar(100) DEFAULT NULL,
  `dsc_uf` varchar(2) DEFAULT NULL,
  PRIMARY KEY (`id_endereco`),
  KEY `endereco_FK` (`id_usuario`),
  KEY `endereco_FK_1` (`id_fornecedor`),
  KEY `endereco_FK_2` (`id_cliente`),
  KEY `endereco_FK_3` (`id_empresa`),
  CONSTRAINT `endereco_FK` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`),
  CONSTRAINT `endereco_FK_1` FOREIGN KEY (`id_fornecedor`) REFERENCES `fornecedor` (`id_fornecedor`),
  CONSTRAINT `endereco_FK_2` FOREIGN KEY (`id_cliente`) REFERENCES `cliente` (`id_cliente`),
  CONSTRAINT `endereco_FK_3` FOREIGN KEY (`id_empresa`) REFERENCES `empresa` (`id_empresa`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8;


-- heroku_9439eb1c84438d2.projeto definition

CREATE TABLE `projeto` (
  `id_projeto` int(11) NOT NULL AUTO_INCREMENT,
  `dsc_nome` varchar(150) NOT NULL,
  `dsc_descricao` varchar(500) DEFAULT NULL,
  `dat_inicio` date DEFAULT NULL,
  `dat_fim` date DEFAULT NULL,
  `id_setor` int(11) DEFAULT NULL,
  `id_empresa` int(11) NOT NULL,
  PRIMARY KEY (`id_projeto`),
  KEY `projeto_FK` (`id_setor`),
  KEY `projeto_FK_1` (`id_empresa`),
  CONSTRAINT `projeto_FK` FOREIGN KEY (`id_setor`) REFERENCES `setor` (`id_setor`),
  CONSTRAINT `projeto_FK_1` FOREIGN KEY (`id_empresa`) REFERENCES `empresa` (`id_empresa`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8;


-- heroku_9439eb1c84438d2.projeto_cliente definition

CREATE TABLE `projeto_cliente` (
  `id_projeto_cliente` int(11) NOT NULL AUTO_INCREMENT,
  `id_projeto` int(11) NOT NULL,
  `id_cliente` int(11) NOT NULL,
  PRIMARY KEY (`id_projeto_cliente`),
  KEY `projeto_cliente_FK` (`id_projeto`),
  KEY `projeto_cliente_FK_1` (`id_cliente`),
  CONSTRAINT `projeto_cliente_FK` FOREIGN KEY (`id_projeto`) REFERENCES `projeto` (`id_projeto`),
  CONSTRAINT `projeto_cliente_FK_1` FOREIGN KEY (`id_cliente`) REFERENCES `cliente` (`id_cliente`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- heroku_9439eb1c84438d2.projeto_fornecedor definition

CREATE TABLE `projeto_fornecedor` (
  `id_projeto_fornecedor` int(11) NOT NULL AUTO_INCREMENT,
  `id_projeto` int(11) NOT NULL,
  `id_fornecedor` int(11) NOT NULL,
  PRIMARY KEY (`id_projeto_fornecedor`),
  KEY `projeto_fornecedor_FK` (`id_projeto`),
  KEY `projeto_fornecedor_FK_1` (`id_fornecedor`),
  CONSTRAINT `projeto_fornecedor_FK` FOREIGN KEY (`id_projeto`) REFERENCES `projeto` (`id_projeto`),
  CONSTRAINT `projeto_fornecedor_FK_1` FOREIGN KEY (`id_fornecedor`) REFERENCES `fornecedor` (`id_fornecedor`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- heroku_9439eb1c84438d2.projeto_usuario_empresa definition

CREATE TABLE `projeto_usuario_empresa` (
  `id_projeto_usuario_empresa` int(11) NOT NULL AUTO_INCREMENT,
  `id_projeto` int(11) NOT NULL,
  `id_usuario_empresa` int(11) NOT NULL,
  PRIMARY KEY (`id_projeto_usuario_empresa`),
  KEY `projeto_usuario_empresa_FK` (`id_projeto`),
  KEY `projeto_usuario_empresa_FK_1` (`id_usuario_empresa`),
  CONSTRAINT `projeto_usuario_empresa_FK` FOREIGN KEY (`id_projeto`) REFERENCES `projeto` (`id_projeto`),
  CONSTRAINT `projeto_usuario_empresa_FK_1` FOREIGN KEY (`id_usuario_empresa`) REFERENCES `usuario_empresa` (`id_usuario_empresa`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- heroku_9439eb1c84438d2.quadro definition

CREATE TABLE `quadro` (
  `id_quadro` int(11) NOT NULL AUTO_INCREMENT,
  `id_projeto` int(11) NOT NULL,
  `dsc_nome` varchar(150) NOT NULL,
  `dsc_descricao` varchar(500) DEFAULT NULL,
  `dat_inicio` date DEFAULT NULL,
  `dat_fim` date DEFAULT NULL,
  PRIMARY KEY (`id_quadro`),
  KEY `sprint_FK` (`id_projeto`),
  CONSTRAINT `sprint_FK` FOREIGN KEY (`id_projeto`) REFERENCES `projeto` (`id_projeto`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8;


-- heroku_9439eb1c84438d2.atividade definition

CREATE TABLE `atividade` (
  `id_atividade` int(11) NOT NULL AUTO_INCREMENT,
  `dsc_nome` varchar(200) NOT NULL,
  `dsc_descricao` varchar(700) DEFAULT NULL,
  `dat_inicio` date DEFAULT NULL,
  `dat_fim` date DEFAULT NULL,
  `id_quadro` int(11) NOT NULL,
  `id_etapa` int(11) NOT NULL,
  PRIMARY KEY (`id_atividade`),
  KEY `atividade_FK_1` (`id_quadro`),
  KEY `atividade_FK_2` (`id_etapa`),
  CONSTRAINT `atividade_FK_1` FOREIGN KEY (`id_quadro`) REFERENCES `quadro` (`id_quadro`),
  CONSTRAINT `atividade_FK_2` FOREIGN KEY (`id_etapa`) REFERENCES `etapa` (`id_etapa`)
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=utf8;


-- heroku_9439eb1c84438d2.atividade_usuario_empresa definition

CREATE TABLE `atividade_usuario_empresa` (
  `id_atividade_usuario_empresa` int(11) NOT NULL AUTO_INCREMENT,
  `id_atividade` int(11) NOT NULL,
  `id_usuario_empresa` int(11) NOT NULL,
  PRIMARY KEY (`id_atividade_usuario_empresa`),
  KEY `atividade_usuario_empresa_FK` (`id_atividade`),
  KEY `atividade_usuario_empresa_FK_1` (`id_usuario_empresa`),
  CONSTRAINT `atividade_usuario_empresa_FK` FOREIGN KEY (`id_atividade`) REFERENCES `atividade` (`id_atividade`),
  CONSTRAINT `atividade_usuario_empresa_FK_1` FOREIGN KEY (`id_usuario_empresa`) REFERENCES `usuario_empresa` (`id_usuario_empresa`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;