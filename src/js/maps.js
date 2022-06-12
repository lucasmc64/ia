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
});

function mapPadding(map) {
  let newMap = [...map];

  if (newMap[0].length !== biggestSize) {
    newMap = newMap.map((line) =>
      line
        .padStart(newMap[0].length + (biggestSize - newMap.length) / 2, "-")
        .padEnd(biggestSize, "-"),
    );
  }

  if (newMap.length !== biggestSize) {
    const quantityOfNewLines = biggestSize - newMap.length;
    const newLine = "-".repeat(biggestSize);

    for (let i = 0; i < quantityOfNewLines; i++) {
      if (i < quantityOfNewLines / 2) newMap.unshift(newLine);
      else newMap.push(newLine);
    }
  }

  return newMap;
}

const newHyruleMap = mapPadding(hyruleMap);
const newPowerDungeonMap = mapPadding(powerDungeonMap);
const newCourageDungeonMap = mapPadding(courageDungeonMap);
const newWisdomDungeonMap = mapPadding(wisdomDungeonMap);

export {
  newHyruleMap as hyruleMap,
  newPowerDungeonMap as powerDungeonMap,
  newCourageDungeonMap as courageDungeonMap,
  newWisdomDungeonMap as wisdomDungeonMap,
};
