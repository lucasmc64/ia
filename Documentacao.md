# Instruções e direcionamentos

## Executável

O arquivo compactado (.zip) contém um portable para Windows (_the-link-trials-win.exe_), e um appImage para Linux (_the-link-trials-linux_) pelos quais é possível executar o programa.

Caso seja do interesse do professor, existem outras formas de executar o programa:

### Usando live-server:

O live-server é um servidor de desenvolvimento com capacidade de recarregamento em tempo real.
Ele permite executar o código do programa pelo navegador.

#### Instalação:

Pré-requisitos:
- npm
- node.js

Execute o seguinte comando num terminal (modo admin):

`npm install -g live-server`

#### Execução:

Para executar, com o terminal aberto no diretório dos arquivos, execute:

`live-server`

Isso abrirá o diretório numa aba no navegador. Pode-se executar o programa ao clicar no diretório **src/**.

#### [Documentação live-server](https://github.com/tapio/live-server)

### Usando electron e electron-builder:

O electron é um framework voltado para a construção de aplicativos desktop usando JS, HTML e CSS.
O electron-builder é uma solução para empacotar e construir aplicativos Electron prontos para distribuição.

#### Instalação:

Pré-requisitos:
- npm
- node.js

No arquivo *package.json*, ambos estão incluídos como dependências.
Para intalá-los basta executar o seguinte comando num terminal aberto no diretório do código fonte:

`npm install`

#### Execução:

O arquivo *package.json* contém scripts para uso do electron e do electron-builder:

- Para executar o programa imediatamente com o electron, use o comando:

`npm run start` 


- Para gerar um executável com o electron-builder, use o comando:

`npm run dist`

O executável será gerado com base no Sistema Operacional utilizado, e estará guardado no diretório **build/**.


#### [Documentação electron](https://www.electronjs.org/docs/latest)
#### [Documentação electron-builder](https://www.electron.build/)

---

## Edição do mapa

É possível editar os mapas no arquivo **consts.js** (caminho: **src/js**). O código do program também tem a capacidade de lidar com mapas de dimensões maiores que as definidas na orientação do trabalho.

Os mapas estão guardados nos seguintes arrays:
- *hyruleMap*;
- *powerDungeonMap*;
- *courageDungeonMap*;
- *wisdomDungeonMap*;

Cada quadrado de terreno é representado por um **char**, por exemplo: **"g"** representa o terreno **Grama**. E os possíveis valores para terrenos são aqueles guardados nos mapeamentos:
- *hyruleTerrains*;
- *dungeonTerrains*;

