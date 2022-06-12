import App from "./classes/App.js";
import Link from "./classes/Link.js";
import {
  hyruleTerrains,
  dungeonTerrains,
  hyruleLocales,
  powerDungeonLocales,
  courageDungeonLocales,
  wisdomDungeonLocales,
  tileSize,
  defaultBackgroundColor,
} from "./consts.js";
import {
  hyruleMap,
  powerDungeonMap,
  courageDungeonMap,
  wisdomDungeonMap,
} from "./maps.js";

const canvas = window.document.getElementById("map");
const context = canvas.getContext("2d");

const app = new App();
const link = new Link(25, 28);

function drawMap() {
  console.log("Drawing!");

  if (!app.previousMap && !app.previousTerrains) {
    for (let y = 0; y < app.currentMap.length; y++) {
      for (let x = 0; x < app.currentMap.length; x++) {
        const key = app.currentMap[y][x];

        if (key !== "-") {
          context.fillStyle = app.currentTerrains.get(key).color;

          context.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
          context.strokeRect(x * tileSize, y * tileSize, tileSize, tileSize);
        } else {
          context.fillStyle = defaultBackgroundColor;
        }
      }
    }
  } else {
    function updateDrawMap(y, stage = -9) {
      for (let x = 0; x < app.currentMap.length; x++) {
        const key = stage > 0 ? app.currentMap[y][x] : app.previousMap[y][x];

        context.clearRect(x * tileSize, y * tileSize, tileSize, tileSize);

        if (key !== "-") {
          context.fillStyle =
            stage > 0
              ? app.currentTerrains.get(key).color
              : app.previousTerrains.get(key).color;

          context.strokeRect(
            x * tileSize,
            y * tileSize +
              (tileSize - Math.abs((tileSize * (stage * 10)) / 100)) / 2,
            tileSize,
            Math.abs((tileSize * (stage * 10)) / 100),
          );
        } else {
          context.fillStyle = defaultBackgroundColor;
        }

        context.fillRect(
          x * tileSize,
          y * tileSize +
            (tileSize - Math.abs((tileSize * (stage * 10)) / 100)) / 2,
          tileSize,
          Math.abs((tileSize * (stage * 10)) / 100),
        );
      }

      if (stage < 10) {
        setTimeout(() => {
          updateDrawMap(y, stage + 1);
        }, 10);
      } else if (y === app.currentMap.length - 1) {
        app.previousMap = null;
        app.previousTerrains = null;
      }
    }

    for (let y = 0; y < app.currentMap.length; y++) {
      setTimeout(() => {
        updateDrawMap(y);
      }, 50 * y);
    }
  }
}

function init() {
  canvas.width = 42 * tileSize;
  canvas.height = 42 * tileSize;
  context.lineWidth = 0.25;
  context.strokeStyle = "#000000";

  app.currentMap = hyruleMap;
  app.currentTerrains = hyruleTerrains;
  app.previousMap = null;
  app.previousTerrains = null;

  drawMap();
}

init();
