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
  hyrule,
  powerDungeon,
  courageDungeon,
  wisdomDungeon,
  biggestSize,
} from "./maps.js";

const canvas = window.document.getElementById("map");
const context = canvas.getContext("2d");

const app = new App();
const link = new Link(24, 27);

function openLostWoods() {
  if (
    link.hasPendantOfCourage &&
    link.hasPendantOfPower &&
    link.hasPendantOfWisdom) {
      hyruleLocales.get("lostWoods").image.src = "assets/open_door_128px.png";
  }
}

function drawSprites() {
  console.log("Drawing other stuff!");

  if (app.currentMap.map == hyrule.map) {
    hyruleLocales.forEach((locale) => {
      context.drawImage(
        locale.image,
        (locale.x + app.currentMap.axisCorrection.x) * tileSize,
        (locale.y + app.currentMap.axisCorrection.y) * tileSize,
        tileSize,
        tileSize,
      );
    });
  } else if (app.currentMap.map == powerDungeon.map) {
    powerDungeonLocales.forEach((locale) => {
      context.drawImage(
        locale.image,
        (locale.x + app.currentMap.axisCorrection.x) * tileSize,
        (locale.y + app.currentMap.axisCorrection.y) * tileSize,
        tileSize,
        tileSize,
      );
    });
  } else if (app.currentMap.map == courageDungeon.map) {
    courageDungeonLocales.forEach((locale) => {
      context.drawImage(
        locale.image,
        (locale.x + app.currentMap.axisCorrection.x) * tileSize,
        (locale.y + app.currentMap.axisCorrection.y) * tileSize,
        tileSize,
        tileSize,
      );
    });
  } else if (app.currentMap.map == wisdomDungeon.map) {
    wisdomDungeonLocales.forEach((locale) => {
      context.drawImage(
        locale.image,
        (locale.x + app.currentMap.axisCorrection.x) * tileSize,
        (locale.y + app.currentMap.axisCorrection.y) * tileSize,
        tileSize,
        tileSize,
      );
    });
  }

  console.log("Drawing Link!");
  context.drawImage(
    link.image,
    (link.x + app.currentMap.axisCorrection.x) * tileSize,
    (link.y + app.currentMap.axisCorrection.y) * tileSize,
    tileSize,
    tileSize,
  );
}

function drawMap() {
  console.log("Drawing!");

  if (!app.previousMap && !app.previousTerrains) {
    for (let y = 0; y < app.currentMap.map.length; y++) {
      for (let x = 0; x < app.currentMap.map.length; x++) {
        const key = app.currentMap.map[y][x];

        context.fillStyle =
          key !== "-"
            ? app.currentTerrains.get(key).color
            : defaultBackgroundColor;

        context.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);

        key !== "-" &&
          context.strokeRect(x * tileSize, y * tileSize, tileSize, tileSize);
      }
    }

    drawSprites();

    window.requestAnimationFrame(drawMap);
  } else {
    function updateDrawMap(y, stage = -9) {
      for (let x = 0; x < app.currentMap.map.length; x++) {
        const key =
          stage > 0 ? app.currentMap.map[y][x] : app.previousMap.map[y][x];

        context.clearRect(x * tileSize, y * tileSize, tileSize, tileSize);

        if (key !== "-") {
          context.fillStyle =
            stage > 0
              ? app.currentTerrains.get(key).color
              : app.previousTerrains.get(key).color;
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

        key !== "-" &&
          context.strokeRect(
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
      } else if (y === app.currentMap.map.length - 1) {
        app.previousMap = null;
        app.previousTerrains = null;
        drawMap();
      }
    }

    for (let y = 0; y < app.currentMap.map.length; y++) {
      setTimeout(() => {
        updateDrawMap(y);
      }, 50 * y);
    }
  }
}

function checkPosition() {
  if (app.currentMap.map == hyrule.map) {
    if (
      link.x == hyruleLocales.get("powerDungeon").x &&
      link.y == hyruleLocales.get("powerDungeon").y &&
      !link.hasPendantOfPower
    ) {
      app.currentMap = powerDungeon;
      app.currentTerrains = dungeonTerrains;
      app.previousMap = hyrule;
      app.previousTerrains = hyruleTerrains;
      link.x = powerDungeonLocales.get("exit").x;
      link.y = powerDungeonLocales.get("exit").y;
    } else if (
      link.x == hyruleLocales.get("courageDungeon").x &&
      link.y == hyruleLocales.get("courageDungeon").y &&
      !link.hasPendantOfCourage
    ) {
      app.currentMap = courageDungeon;
      app.currentTerrains = dungeonTerrains;
      app.previousMap = hyrule;
      app.previousTerrains = hyruleTerrains;
      link.x = courageDungeonLocales.get("exit").x;
      link.y = courageDungeonLocales.get("exit").y;
    } else if (
      link.x == hyruleLocales.get("wisdomDungeon").x &&
      link.y == hyruleLocales.get("wisdomDungeon").y &&
      !link.hasPendantOfWisdom
    ) {
      app.currentMap = wisdomDungeon;
      app.currentTerrains = dungeonTerrains;
      app.previousMap = hyrule;
      app.previousTerrains = hyruleTerrains;
      link.x = wisdomDungeonLocales.get("exit").x;
      link.y = wisdomDungeonLocales.get("exit").y;
    }
  }

  if (app.currentMap == powerDungeon) {
    if (
      link.x == powerDungeonLocales.get("exit").x &&
      link.y == powerDungeonLocales.get("exit").y &&
      link.hasPendantOfPower) {
        app.currentMap = hyrule;
        app.currentTerrains = hyruleTerrains;
        app.previousMap = powerDungeon;
        app.previousTerrains = dungeonTerrains;
        link.x = hyruleLocales.get("powerDungeon").x;
        link.y = hyruleLocales.get("powerDungeon").y;
    } else if (
      link.x == powerDungeonLocales.get("pendantOfPower").x &&
      link.y == powerDungeonLocales.get("pendantOfPower").y
    ) {
      link.hasPendantOfPower = true;
      openLostWoods();
    }
  }

  if (app.currentMap == courageDungeon) {
    if (
      link.x == courageDungeonLocales.get("exit").x &&
      link.y == courageDungeonLocales.get("exit").y &&
      link.hasPendantOfCourage) {
        app.currentMap = hyrule;
        app.currentTerrains = hyruleTerrains;
        app.previousMap = courageDungeon;
        app.previousTerrains = dungeonTerrains;
        link.x = hyruleLocales.get("courageDungeon").x;
        link.y = hyruleLocales.get("courageDungeon").y;
    } else if (
      link.x == courageDungeonLocales.get("pendantOfCourage").x &&
      link.y == courageDungeonLocales.get("pendantOfCourage").y
    ) {
      link.hasPendantOfCourage = true;
      openLostWoods();
    }
  }

  if (app.currentMap == wisdomDungeon) {
    if (
      link.x == wisdomDungeonLocales.get("exit").x &&
      link.y == wisdomDungeonLocales.get("exit").y &&
      link.hasPendantOfWisdom) {
        app.currentMap = hyrule;
        app.currentTerrains = hyruleTerrains;
        app.previousMap = wisdomDungeon;
        app.previousTerrains = dungeonTerrains;
        link.x = hyruleLocales.get("wisdomDungeon").x;
        link.y = hyruleLocales.get("wisdomDungeon").y;
    } else if (
      link.x == wisdomDungeonLocales.get("pendantOfWisdom").x &&
      link.y == wisdomDungeonLocales.get("pendantOfWisdom").y
    ) {
      link.hasPendantOfWisdom = true;
      openLostWoods();
    }
  }
}

// função de teste
function andaPower() {
  if (app.currentMap == hyrule) {
    link.x = hyruleLocales.get("powerDungeon").x;
    link.y = hyruleLocales.get("powerDungeon").y;
    checkPosition();
  }
}
// função de teste
function andaCourage() {
  if (app.currentMap == hyrule) {
    link.x = hyruleLocales.get("courageDungeon").x;
    link.y = hyruleLocales.get("courageDungeon").y;
    checkPosition();
  }
}
// função de teste
function andaWisdom() {
  if (app.currentMap == hyrule) {
    link.x = hyruleLocales.get("wisdomDungeon").x;
    link.y = hyruleLocales.get("wisdomDungeon").y;
    checkPosition();
  }
}
// função de teste
function andaHyrule() {
  if (app.currentMap == powerDungeon) {
    link.x = powerDungeonLocales.get("exit").x;
    link.y = powerDungeonLocales.get("exit").y;
    checkPosition();
  } else if (app.currentMap == courageDungeon) {
    link.x = courageDungeonLocales.get("exit").x;
    link.y = courageDungeonLocales.get("exit").y;
    checkPosition();
  } else if (app.currentMap == wisdomDungeon) {
    link.x = wisdomDungeonLocales.get("exit").x;
    link.y = wisdomDungeonLocales.get("exit").y;
    checkPosition();
  }
}
// função de teste
function pegaPoder() {
  if (app.currentMap == powerDungeon) {
    link.x = powerDungeonLocales.get("pendantOfPower").x;
    link.y = powerDungeonLocales.get("pendantOfPower").y;
    checkPosition();
  }
}
// função de teste
function pegaCoragem() {
  if (app.currentMap == courageDungeon) {
    link.x = courageDungeonLocales.get("pendantOfCourage").x;
    link.y = courageDungeonLocales.get("pendantOfCourage").y;
    checkPosition();
  }
}
// função de teste
function pegaSabedoria() {
  if (app.currentMap == wisdomDungeon) {
    link.x = wisdomDungeonLocales.get("pendantOfWisdom").x;
    link.y = wisdomDungeonLocales.get("pendantOfWisdom").y;
    checkPosition();
  }
}
// botões de teste
const button1 = window.document.getElementById("button1");
button1.addEventListener("click", andaPower);
const button2 = window.document.getElementById("button2");
button2.addEventListener("click", andaCourage);
const button3 = window.document.getElementById("button3");
button3.addEventListener("click", andaWisdom);
const button4 = window.document.getElementById("button4");
button4.addEventListener("click", andaHyrule);
const button5 = window.document.getElementById("button5");
button5.addEventListener("click", pegaPoder);
const button6 = window.document.getElementById("button6");
button6.addEventListener("click", pegaCoragem);
const button7 = window.document.getElementById("button7");
button7.addEventListener("click", pegaSabedoria);

function init() {
  canvas.width = biggestSize * tileSize;
  canvas.height = biggestSize * tileSize;
  context.lineWidth = 0.25;
  context.strokeStyle = "#000000";

  app.currentMap = hyrule;
  app.currentTerrains = hyruleTerrains;
  app.previousMap = null;
  app.previousTerrains = null;

  drawMap();
}

init();

// function teste() {
//   app.currentMap = courageDungeon.map;
//   app.currentTerrains = dungeonTerrains;
//   app.previousMap = hyrule.map;
//   app.previousTerrains = hyruleTerrains;
// }

// teste();
