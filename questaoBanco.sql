/*
1.	Construa (create) uma tabela que contenha os seguintes campos: código do departamento, nome do responsável pelo departamento, login do responsável, e-mail do responsável;
2.	Após construção da tabela, desenvolva uma Stored Procedure que faça as seguintes instruções:
 	- Cadastre (insert) o departamento (código) e os dados do seu responsável (nome, login, e-mail) na tabela criada anteriormente;
 	- Caso, já exista um cadastro para esse departamento, atualizar (update) os dados do responsável (nome, login, email);
  	- Esta procedure deverá receber os parâmetros: código do departamento, nome do responsável, login do responsável e e-mail;
*/



--1.
USE [teste]
GO

/****** Object:  Table [dbo].[tbl_departamento]    Script Date: 13/01/2021 08:56:39 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[tbl_departamento]') AND type in (N'U'))
DROP TABLE [dbo].[tbl_departamento]
GO

/****** Object:  Table [dbo].[tbl_departamento]    Script Date: 13/01/2021 08:55:22 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[tbl_departamento](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[codigo_departamento] [int] NOT NULL,
	[nome_responsavel] [varchar](100) NOT NULL,
	[login_responsavel] [varchar](50) NOT NULL,
	[email_responsavel] [varchar](50) NOT NULL
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

---------------------------------------------------------------------------------------------------------------------------------------------------------------------------

--2.
DROP PROCEDURE [dbo].[sp_inserir_departamento]
GO

/****** Object:  StoredProcedure [dbo].[sp_inserir_departamento]    Script Date: 13/01/2021 09:36:35 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[sp_inserir_departamento]
(
    @codigo_departamento int,
    @nome_responsavel Varchar(50),
    @login_responsavel Varchar(50),
    @email_responsavel Varchar(50)
)
AS
BEGIN
    IF EXISTS (SELECT 1 FROM tbl_departamento
        WHERE codigo_departamento=@codigo_departamento
    )
    BEGIN
        UPDATE tbl_departamento set nome_responsavel=@nome_responsavel, login_responsavel=@login_responsavel, email_responsavel=@email_responsavel
        WHERE codigo_departamento=@codigo_departamento
    END
ELSE
    BEGIN
        INSERT into tbl_departamento Values (@codigo_departamento,@nome_responsavel,@login_responsavel,@email_responsavel)
    END

END
GO

/*
Exemplos:
EXECUTE sp_inserir_departamento 10,'bruno novas camera santos', 'bcamera', 'bcamera@hotmail.com'
EXECUTE sp_inserir_departamento 10,'bruno novas santos', 'bruno.camera', 'bcamera@gmail.com'
EXECUTE sp_inserir_departamento 11,'marcos paulo senna', 'marcos.paulo', 'marcospaulo@hotmail.com'
*/

