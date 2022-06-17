import {
  hyruleMap,
  powerDungeonMap,
  courageDungeonMap,
  wisdomDungeonMap,
} from "./consts.js";

const biggestSize = [
  ...new Set([
    hyruleMap.length,
    hyruleMap[0].length,
    powerDungeonMap.length,
    powerDungeonMap[0].length,
    courageDungeonMap.length,
    courageDungeonMap[0].length,
    wisdomDungeonMap.length,
    wisdomDungeonMap[0].length,
  ]),
].reduce((previousValue, currentValue) => {
  return previousValue > currentValue ? previousValue : currentValue;
}, 0);

function mapPadding(map) {
  // { map, padding: {x, y} }

  let newMap = [...map];
  const axisCorrection = { x: 0, y: 0 };

  if (newMap[0].length !== biggestSize) {
    axisCorrection.x = (biggestSize - newMap.length) / 2;

    newMap = newMap.map((line) =>
      line
        .padStart(newMap[0].length + axisCorrection.x, "-")
        .padEnd(biggestSize, "-"),
    );
  }

  if (newMap.length !== biggestSize) {
    const quantityOfNewLines = biggestSize - newMap.length;
    const newLine = "-".repeat(biggestSize);

    axisCorrection.y = quantityOfNewLines / 2;

    for (let i = 0; i < quantityOfNewLines; i++) {
      if (i < quantityOfNewLines / 2) newMap.unshift(newLine);
      else newMap.push(newLine);
    }
  }

  return { map: newMap, axisCorrection };
}

const newHyrule = mapPadding(hyruleMap);
const newPowerDungeon = mapPadding(powerDungeonMap);
const newCourageDungeon = mapPadding(courageDungeonMap);
const newWisdomDungeon = mapPadding(wisdomDungeonMap);

export {
  newHyrule as hyrule,
  newPowerDungeon as powerDungeon,
  newCourageDungeon as courageDungeon,
  newWisdomDungeon as wisdomDungeon,
  biggestSize,
};
