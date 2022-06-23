import {
  hyrule,
  powerDungeon,
  courageDungeon,
  wisdomDungeon,
  limbo,
  endLand,
} from "./consts.js";

//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
// Encontrando o maior tamanho de mapa (vertical ou horizontal)

const biggestMapSize = [
  ...new Set([
    hyrule.map.length,
    hyrule.map[0].length,
    powerDungeon.map.length,
    powerDungeon.map[0].length,
    courageDungeon.map.length,
    courageDungeon.map[0].length,
    wisdomDungeon.map.length,
    wisdomDungeon.map[0].length,
  ]),
].reduce((previousValue, currentValue) => {
  return previousValue > currentValue ? previousValue : currentValue;
}, 0);

//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
// Função responsável por, com base no maior tamanho de mapa encontrado,
// preencher o mapa passado como argumento, de forma que ele possua tal tamanho,
// retornando o novo mapa e a quantidade de posições corrigidas nas laterais
// horizontais e verticais

function mapPadding(map) {
  let newMap = [...map];
  const axisCorrection = { x: 0, y: 0 };

  // Padding horizontal
  const mapWidth = newMap[0]?.length ?? 0;

  if (mapWidth !== biggestMapSize) {
    axisCorrection.x = (biggestMapSize - mapWidth) / 2;

    newMap = newMap.map((line) =>
      line
        .padStart(mapWidth + axisCorrection.x, "-")
        .padEnd(biggestMapSize, "-"),
    );
  }

  // Padding vertical
  const mapHeight = newMap.length;

  if (mapHeight !== biggestMapSize) {
    const quantityOfNewLines = biggestMapSize - mapHeight;
    const newLine = "-".repeat(biggestMapSize);

    axisCorrection.y = quantityOfNewLines / 2;

    for (let i = 0; i < quantityOfNewLines; i++) {
      if (i < quantityOfNewLines / 2) newMap.unshift(newLine);
      else newMap.push(newLine);
    }
  }

  return { map: newMap, axisCorrection };
}

//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
// Regiões atualizadas

const newHyrule = { ...hyrule, ...mapPadding(hyrule.map) };
const newPowerDungeon = { ...powerDungeon, ...mapPadding(powerDungeon.map) };
const newCourageDungeon = {
  ...courageDungeon,
  ...mapPadding(courageDungeon.map),
};
const newWisdomDungeon = { ...wisdomDungeon, ...mapPadding(wisdomDungeon.map) };
const newLimbo = {
  ...limbo,
  ...mapPadding(limbo.map),
};
const newEndLand = {
  ...endLand,
  ...mapPadding(endLand.map),
};

//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
// Exportações

export {
  newHyrule as hyrule,
  newPowerDungeon as powerDungeon,
  newCourageDungeon as courageDungeon,
  newWisdomDungeon as wisdomDungeon,
  newLimbo as limbo,
  newEndLand as endLand,
  biggestMapSize,
};
