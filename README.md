Teste

# Comandos básicos

Instalando as dependências

npm install


Abrir o cypress pelo chrome

node_modules/.bin/cypress open
ou
npx cypress open


Abrir o cypress no terminal

node_modules/.bin/cypress run
ou
npx cypress run


Para executar em um ambiente específico
OBS: AO USAR O HOST COM O VALOR LOCAL NÂO SERÁ REALIZADO O SSO DA MICROSOFT, POIS USARÁ O USUARIO DE REDE PESSOAL

- npx cypress run --env host= (local, non-prod ou prod)
- npx cypress open --env host= (local, non-prod ou prod)

# PADRÃO DE CRIACAO PAGE OBJECTS
- Criar dentro da pasta "pageObjects" uma pasta com o modulo que será automatizado, ex:
    --pageObjects
    |   - risco(folder)
        | -telarisco.page.js(file) 

# CONTEXTO BASEURL
-  Verificar a baseUrl no arquivo cypres.config.json para executar o contexto do seu produto.  

# Inicializar o repositório

- git init
- git remote add origin LINKREPOSITORIO
- git pull origin 'nome-da-branch'


# CRIAR UMA NOVA BRANCH

- git checkout develop
- git checkout -b 'nome-da-branch'

# AO FINALIZAR A FEATURE

- git pull origin develop
- git add .
- git commit -m"nome do comite"
- git push origin 'nome-da-branch'


# OBSERVAÇÕES

Se ocorrer algum erro do puppeter após executar o comando "npm install" utilize o comando "npm install npm i puppeteer --ignore-scripts puppeteer"
Instalando o Puppeteer corretamente, tente executar novamente o comando "npm install".

Se o erro persistir, remova a linha 25 do arquivo package.json, a linha 20 do arquivo package-lock.json e, no arquivo cypress.config.js, altere a const da linha 2 de "puppeteer" para "puppeteer-core e tente executar novamente o comando "npm install"
