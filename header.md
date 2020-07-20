# Dev. Back-End

Sua tarefa é construir uma API e banco de dados para a aplicação VUTTR (Very Useful Tools to Remember). A aplicação é um simples repositório para gerenciar ferramentas com seus respectivos nomes, links, descrições e tags. Utilize um repositório Git (público, de preferência) para versionamento e disponibilização do código.

A aplicação deve ser construída utilizando qualquer linguagem de programação backend. Qualquer banco de dados, libraries e ferramentas de sua preferência.

Github: https://github.com/salespaulo/desafio-backend

## Rodando Servidor

```
$> git clone https://github.com/salespaulo/desafio-backend.git
$> cd desafio-backend
$> npm install
$> grunt
```

ou

```
$> git clone https://github.com/salespaulo/desafio-backend.git
$> cd desafio-backend
$> npm install
$> NODE_ENV=development node app/index
```

## Modo Desenvolvimento

```
$> npm run dev
```

### Debug

```
$> npm run debug-dev
```

## Rodando os Testes

```
$> npm run test
```

### Debug

```
$> npm run debug-test
```

## Parâmetros ou Variáveis de Ambiente

Os parâmetros podem ser setados no momento da execução do servidor, e.g. `node app/index --http-server-name=desafio-nome-servidor`.
As variáveis de amb. podem ser setadas diretamente no sistema operacional e estão representadas abaixo pelas palavras compostas por letras maíusculas.

### Gerais

-   NODE_ENV: `development` ou `test`, padrão `development`.
-   DEBUG: `desafio-backend` ou `*`, mostra todos os [debugjs](https://www.npmjs.com/package/debug).

### Servidor

-   --http-server-name || HTTP_SERVER_NAME: Nome do servidor.
-   --http-server-port || HTTP_SERVER_PORT: Porta do servidor.
-   --http-server-version || HTTP_SERVER_VERSION: Versão do servidor.

### Banco de Dados

-   --database-name || DATABASE_NAME: Nome do banco.
-   --database-user || DATABASE_USER: Usuário do banco.
-   --database-password || DATABASE_PASSWORD: Senha do banco.
-   --database-dialect || DATABASE_DIALECT: [Dialeto do Sequelize](https://sequelize.org/v5/manual/dialects.html) p/ o banco.

### Logger

-   --logger-level || LOGGER_LEVEL: Nível de Log.
