# desafio-backend-core

-   `npm run compile`: Executa a limpeza dos arquivos e diretorios.
-   `npm run debug-test`: Executa os testes unitários com o DEBUG ativo.
-   `npm run test`: Executa os testes unitários.
-   `npm run debug-dev`: Executa os testes unitários e espera por alterações com o DEBUG ativo.
-   `npm run dev`: Executa os testes unitários e espera por alterçãoes.
-   `npm run prod`: Executa o código com NODE_ENV=production.
-   `npm run coverage`: Executa os testes unitários e retorna a cobertura dos códigos através do [nyc](https://github.com/istanbuljs/nyc/)
-   `npm run release`: Inicia uma nova release de versão incrementando o **patch**, [git flow](https://github.com/nvie/gitflow/) release start.
-   `npm run release:minor`: Inicia uma nova release de versão incrementando o **minor**, [git flow](https://github.com/nvie/gitflow/) release start.
-   `npm run release:major`: Inicia uma nova release de versão incrementando o **major**, [git flow](https://github.com/nvie/gitflow/) release start.
-   `npm run release:finish`: Finaliza a release, ou seja, realiza o [git flow](https://github.com/nvie/gitflow/) release finish.

## Environments

-   NODE_ENV: `development`, `test`

## Bootstrap

```
$> git clone https://github.com/salespaulo/desafio-backend.git
$> cd desafio-backend/libs/desafio-backend-core
$> npm install
$> mkdir .data
$> touch .data/database.sqlite
$> npx sequelize db:migrate --debug
```

### Running Dev

```
$> cd desafio-backend-core
$> npm run dev
# OR
$> npm run debug-dev
```

### Running Tests

```
$> cd desafio-backend-core
$> npm run test
# OR
$> npm run debug-test
```
