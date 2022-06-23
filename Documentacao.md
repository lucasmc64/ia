# Instruções e direcionamentos

## Executável

O arquivo compactado (.zip) contém um portable para Windows (_the-link-trials-win.exe_), e um appImage para Linux (_the-link-trials-linux_) pelos quais é possível executar o programa.

Caso seja do interesse do professor, existem outras formas de executar o programa:

### Usando o live-server:

O live-server permite executar o código do programa pelo navegador.

#### Instalação:

Pré-requisitos:
- npm
- node.js

Execute o seguinte comando num terminal (modo admin):

`npm install -g live-server`

#### Execução

Para executar, com o terminal aberto no diretório dos arquivos:

`live-server`

#### [Documentação](https://github.com/tapio/live-server)


- opção pra electron...
- opção pra electron-builder...

---

## Edição do mapa

- É possível editar os mapas no arquivo 'consts.js' (caminho: 'src/js'). O código do program também tem a capacidade de lidar com mapas de dimensões maiores que as definidas na orientação do trabalho.

- Os mapas estão guardados nos seguintes arrays:
    - *hyruleMap*;
    - *powerDungeonMap*;
    - *courageDungeonMap*;
    - *wisdomDungeonMap*;

- Cada quadrado de terreno é representado por um **char**, por exemplo: **"g"** representa o terreno **Grama**. E os possíveis valores são aqueles guardados nos mapeamentos:
    - *hyruleTerrains*;
    - *dungeonTerrains*;

