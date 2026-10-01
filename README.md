# Instituto Mãos Dadas

Site institucional de uma organização social, desenvolvido como front-end estático. O projeto apresenta a instituição e seus projetos, oferece um formulário de cadastro demonstrativo e navega entre páginas sem recarregar toda a estrutura comum.

## Funcionalidades

- Navegação SPA entre Início, Projetos e Cadastro, com suporte aos botões Voltar e Avançar do navegador.
- Cartões de projetos gerados a partir de dados JavaScript e de um elemento HTML `<template>`.
- Validação do formulário com mensagens por campo e feedback acessível.
- Histórico local de cadastros validados, contendo apenas perfil de participação e data/hora.

> O formulário é demonstrativo: os dados não são enviados a um servidor. Nome, e-mail, nascimento e endereço não são persistidos.

## Tecnologias

- HTML5 para as páginas, formulário e template dos cartões.
- CSS3 para layout e estados visuais.
- JavaScript puro com ES Modules (`import`/`export`).
- Vite para servidor de desenvolvimento e build multipágina de produção.
- APIs nativas do navegador: Fetch, History API, DOMParser e Local Storage.

O Vite é a única dependência de desenvolvimento. Não são usadas bibliotecas de interface ou runtime adicionais.

## Estrutura do projeto

```text
projeto_1/
├── index.html
├── css/
│   └── style.css
├── html/
│   ├── inicio.html
│   ├── projetos.html
│   └── cadastro.html
├── imagens/
│   ├── facebook.png
│   ├── img1.jpg
│   └── instagram.png
├── js/
│   ├── script.js
│   └── modules/
│       ├── projects.js
│       ├── router.js
│       ├── signup.js
│       └── storage.js
├── package.json
├── vite.config.js
├── CHANGELOG.md
└── README.md
```

`script.js` inicializa os módulos. `router.js` trata navegação; `projects.js` renderiza os cartões; `signup.js` cuida do formulário; e `storage.js` concentra a persistência local.

## Pré-requisitos

- Navegador moderno com suporte a JavaScript ES Modules.
- Node.js 18 ou superior e npm.

## Instalação e execução

Na pasta raiz do projeto, instale a dependência de desenvolvimento:

```powershell
npm.cmd install
```

Inicie o servidor do Vite:

```powershell
npm.cmd run dev
```

Abra o endereço local informado pelo Vite, normalmente <http://localhost:5173/html/inicio.html>. Para encerrar o servidor, pressione `Ctrl+C`.

No PowerShell deste ambiente, use `npm.cmd`: a política de execução bloqueia o atalho `npm.ps1`.

## Build

Gere a versão de produção com:

```powershell
npm.cmd run build
```

O Vite compila as três páginas e seus módulos, processa os recursos referenciados e grava os arquivos otimizados em `dist/`. Para testar a build localmente:

```powershell
npm.cmd run preview
```

O diretório `dist/` pode ser publicado em um servidor estático.

## Testes

Não há framework ou comando de testes automatizados configurado. Para uma verificação manual:

1. Navegue entre as páginas pelo menu e confira Voltar/Avançar.
2. Abra Projetos e confirme que os três cartões são renderizados.
3. Envie o cadastro vazio e com e-mail inválido; confira as mensagens e os campos destacados.
4. Preencha dados fictícios válidos, envie e recarregue a página; confira a restauração do perfil e do resumo local.
5. Em DevTools, confira a chave `instituto-maos-dadas:signup-history` no Local Storage. Ela deve conter apenas perfil e data/hora.

## Dados locais

O histórico é armazenado por origem do navegador em `localStorage`, com a chave `instituto-maos-dadas:signup-history`. São mantidos no máximo dez registros. Esses dados permanecem no navegador até serem removidos pelo usuário ou pelas ferramentas do navegador; não são sincronizados entre dispositivos.

## Git e versões

O projeto usa branches locais `main`, `develop` e `feature/...`. Consulte [CHANGELOG.md](CHANGELOG.md) para a versão `v0.1.0` e a política SemVer adotada. O repositório não depende de um remoto para executar a aplicação.

## Deploy no GitHub Pages

O workflow [deploy.yml](.github/workflows/deploy.yml) executa `npm ci`, gera a build com `npm run build` e publica o diretório `dist/` no GitHub Pages. Ele é acionado por tags de release no formato `v*` ou manualmente pela aba **Actions**.

Para ativar a publicação:

1. Crie um repositório no GitHub e conecte-o como remoto (`git remote add origin <URL-do-repositório>`).
2. Envie para o GitHub o commit que contém o workflow e a configuração do Vite. O workflow precisa existir no commit apontado pela tag de release.
3. Nas configurações do repositório, em **Pages**, selecione **GitHub Actions** como origem de publicação.
4. Após integrar a versão de produção em `main`, crie e envie uma nova tag SemVer, por exemplo `v0.2.0`. A tag existente `v0.1.0` aponta para o baseline anterior à configuração do Vite.
5. Acompanhe a execução em **Actions**; quando terminar, a URL publicada aparece no ambiente `github-pages` do workflow.

O `index.html` da raiz redireciona para a página inicial organizada em `html/`. O repositório ainda não possui remoto configurado, portanto o workflow está preparado localmente, mas nenhum deploy foi executado. A configuração `base: "./"` permite servir as páginas e seus assets também em um caminho de projeto do GitHub Pages.
