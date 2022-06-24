# Instruções e direcionamentos

## Executável

Como o **MOODLE** limita o tamanho de arquivos, não foi possível enviar os executáveis já prontos anexos ao trabalho.
Porém, eles estão disponíveis neste [**repositório aqui**](https://github.com/lucasmc64/ia) em **Releases**.
Trata-se de um portable para Windows (_the-link-trials-win.exe_), e um _AppImage_ para Linux (_the-link-trials-linux.AppImage_) pelos quais é possível executar o programa.

Caso seja do interesse do professor, existem outras formas de executar o programa:

### Usando live-server:

O `live-server` é um servidor de desenvolvimento com capacidade de recarregamento em tempo real.
Ele permite executar o código do programa pelo navegador.

#### Instalação:

Pré-requisitos:

- NPM
- Node.JS

Execute o seguinte comando num terminal (modo **admin**):

```bash
npm install -g live-server
```

#### Execução:

Para executar, com o terminal aberto no diretório dos arquivos, execute:

```bash
live-server
```

Isso abrirá o diretório numa aba no navegador. Pode-se executar o programa ao clicar no diretório **src/**.

> Para acessar a documentação do `live-server` [CLIQUE AQUI](https://github.com/tapio/live-server)!

### Usando electron e electron-builder:

O `electron` é um _framework_ voltado para a construção de aplicativos _desktop_ usando tecnologias de desenvolvimento WEB. O `electron-builder` é uma solução para empacotar e construir aplicativos baseados em Electron prontos para distribuição.

#### Instalação:

Pré-requisitos:

- NPM
- Node.JS

No arquivo _package.json_, ambos estão incluídos como dependências.
Para intalá-los basta executar o seguinte comando num terminal aberto no diretório do código fonte:

```bash
npm install
```

#### Execução:

O arquivo _package.json_ contém scripts para uso do `electron` e do `electron-builder`:

- Para executar o programa imediatamente com o electron, use o comando:

```bash
npm run start
```

- Para gerar um executável com o electron-builder, use o comando:

```bash
npm run dist
```

O executável será gerado com base no Sistema Operacional utilizado, e estará guardado no diretório **build/**.

> Para acessar a documentação do `electron` [CLIQUE AQUI](https://www.electronjs.org/docs/latest)!

> Para acessar a documentação `electron-builder` [CLIQUE AQUI](https://www.electron.build/)!

---

## Edição do mapa

É possível editar os mapas no arquivo **consts.js** (caminho: **src/js**). O código do program também tem a capacidade de lidar com mapas de dimensões maiores que as definidas na orientação do trabalho.

Os mapas estão guardados nos seguintes arrays:

- _hyruleMap_;
- _powerDungeonMap_;
- _courageDungeonMap_;
- _wisdomDungeonMap_;

Cada quadrado de terreno é representado por um **char**, por exemplo: **"g"** representa o terreno **Grama**. E os possíveis valores para terrenos são aqueles guardados nos mapeamentos:

- _hyruleTerrains_;
- _dungeonTerrains_;
