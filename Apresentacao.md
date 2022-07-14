# IA - Trabalho 1

## Fase 1

- [ ] Olá, Mundo!
- [ ] Tecnologias utilizadas
  - [ ] HTML5
  - [ ] CSS3
  - [ ] JavaScript (mais importante)
  - [ ] LiveServer
  - [ ] Electron
  - [ ] Node.js (indiretamente)
- [ ] Conteúdo de terceiros
  - [ ] Fonte (texto)
- [ ] Disclaimer: Moodle sendo Moodle
  - [ ] Executáveis não puderam ser carregados 

## Fase 2

### Overview

- [ ] Professor + JavaScript == :heart:? Qual o nível de detalhes?

- [ ] Estrutura do projeto

  ```markdown
  src
  +-- assets (sprites/imagens)
  +-- css (contém parte da estilização da interface)
  +-- js 
  | 	+-- classes
  | 	| 	+-- Link.js (guarda a posição, quais pingentes pegou, região atual, ...)
  | 	+-- consts.js (definição dos mapas, cores, tamanhos, sprites, ...)
  | 	+-- regions.js (parte da gambiarra pra deixar tudo bonito '3')
  | 	+-- script.js (onde toda a mágica acontece)
  +-- vendors (contém apenas a fonte)
  +-- index.html
  ```

### `index.html`

- [ ] Importação de arquivos (por que só um arquivo de JavaScript é importado?)
- [ ] Botão de play
- [ ] Canvas
- [ ] Detalhes (custos)

### `consts.js`

- [ ] *Terrains*
- [ ] *Limbo*!? *EndLand*!?!? (outra parte da gambiarra pra deixar tudo bonito :smile:) 
- [ ] *Locales*
- [ ] *Maps*
- [ ] *Regions*
- [ ] Outras constantes

### `regions.js`

- [ ] Gambiarra vs. Beleza
- [ ] Maior tamanho de mapa (`biggestMapSize`)
- [ ] “Corrigindo” mapas (`mapPadding`)
- [ ] Atualizando as *regions*

### `Link.js`

- [ ] Localização (`x`, `y` e `region`)
- [ ] Representação visual do personagem (`image`)
- [ ] Objetivos gerais (`hasPendantOfCourage`, `hasPendantOfPower` e `hasPendantOfWisdom`)
- [ ] Executando ações quando alguma propriedade for atualizada (`observers`)
- [ ] Ideias demais, organização de menos (`path` e `canMove` não são utilizados)

### `script.js`

- [ ] Importações

- [ ] Variáveis e constantes globais

- [ ] Iniciando execução ao apertar “play”

- [ ] 1. `handlePlayButtonClick`

     Escondendo botão e iniciando execução

- [ ] 2. `start`

     Configurando o estado inicial da aplicação

- [ ] 3. `openLostWoods`

- [ ] 4. `changeRegionDrawing`

- [ ] 5. `updateRegionDrawing`

- [ ] 6. `moveLink`

- [ ] 7. `thinkLink`

- [ ] 8. `unzipPath`

- [ ] 9. `generateBestPath`

- [ ] 10. `checkIfIsAValidPosition`

- [ ] 11. `positionWasExplored`

- [ ] 12. `calculateHeuristics`

## Fase 3

- [ ] Sprites autorais