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
  biggestSize,
} from "./maps.js";

const canvas = window.document.getElementById("map");
const context = canvas.getContext("2d");

const app = new App();
// const link = new Link(25, 28);

function drawMap() {
  console.log("Drawing!");

  if (!app.previousMap && !app.previousTerrains) {
    for (let y = 0; y < app.currentMap.length; y++) {
      for (let x = 0; x < app.currentMap.length; x++) {
        const key = app.currentMap[y][x];

        context.fillStyle =
          key !== "-"
            ? app.currentTerrains.get(key).color
            : defaultBackgroundColor;

        context.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);

        key !== "-" &&
          context.strokeRect(x * tileSize, y * tileSize, tileSize, tileSize);
      }
    }

    window.requestAnimationFrame(drawMap);
  } else {
    function updateDrawMap(y, stage = -9) {
      for (let x = 0; x < app.currentMap.length; x++) {
        const key = stage > 0 ? app.currentMap[y][x] : app.previousMap[y][x];

        context.clearRect(x * tileSize, y * tileSize, tileSize, tileSize);

        // TODO: `fillRect` deve ser executado antes de `strokeRect`
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
  canvas.width = biggestSize * tileSize;
  canvas.height = biggestSize * tileSize;
  context.lineWidth = 0.25;
  context.strokeStyle = "#000000";

  app.currentMap = hyruleMap;
  app.currentTerrains = hyruleTerrains;
  app.previousMap = null;
  app.previousTerrains = null;

  drawMap();
}

init();

function teste() {
  app.currentMap = courageDungeonMap;
  app.currentTerrains = dungeonTerrains;
  app.previousMap = hyruleMap;
  app.previousTerrains = hyruleTerrains;
}

teste();
