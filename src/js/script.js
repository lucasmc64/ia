import Link from "./classes/Link.js";
import { tileSize, defaultBackgroundColor } from "./consts.js";
import {
  hyrule,
  powerDungeon,
  courageDungeon,
  wisdomDungeon,
  limbo,
  biggestMapSize,
} from "./regions.js";

const canvas = window.document.getElementById("map");
const context = canvas.getContext("2d");

const link = new Link(24, 27, limbo);

function openLostWoods() {
  if (
    link.hasPendantOfCourage &&
    link.hasPendantOfPower &&
    link.hasPendantOfWisdom
  ) {
    hyrule.locales.get("lostWoods").image.src = "assets/open_door_128px.png";
  }
}

function updateRegionDrawing({
  region,
  currentLinkPosition,
  previousLinkPosition,
}) {
  console.log("updateRegionDrawing call");

  for (let y = 0; y < region.map.length; y++) {
    for (let x = 0; x < region.map.length; x++) {
      const key = region.map[y][x];

      context.fillStyle =
        key !== "-" ? region.terrains.get(key).color : defaultBackgroundColor;

      context.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);

      key !== "-" &&
        context.strokeRect(x * tileSize, y * tileSize, tileSize, tileSize);

      [...region.locales.entries()]
        .filter(([key, _]) => {
          return (
            (key !== "pendantOfPower" &&
              key !== "pendantOfCourage" &&
              key !== "pendantOfWisdom") ||
            (key === "pendantOfPower" && !link.hasPendantOfPower) ||
            (key === "pendantOfCourage" && !link.hasPendantOfCourage) ||
            (key === "pendantOfWisdom" && !link.hasPendantOfWisdom)
          );
        })
        .map(([_, locale]) => locale)
        .forEach((locale) => {
          const correctedX = locale.x + region.axisCorrection.x;
          const correctedY = locale.y + region.axisCorrection.y;

          if (y === correctedY) {
            context.drawImage(
              locale.image,
              correctedX * tileSize,
              correctedY * tileSize,
              tileSize,
              tileSize,
            );
          }
        });

      context.drawImage(
        link.image,
        currentLinkPosition.x * tileSize,
        currentLinkPosition.y * tileSize,
        tileSize,
        tileSize,
      );
    }
  }
}

function changeRegionDrawing({
  currentRegion,
  previousRegion,
  currentLinkPosition,
  previousLinkPosition,
}) {
  console.log("changeRegionDrawing call");
  link.canMove = false;

  const updateDrawMap = (y, stage = -9) => {
    const region = stage > 0 ? currentRegion : previousRegion;
    const linkPosition = stage > 0 ? currentLinkPosition : previousLinkPosition;

    for (let x = 0; x < currentRegion.map.length; x++) {
      const key = region.map[y][x];

      context.clearRect(x * tileSize, y * tileSize, tileSize, tileSize);

      if (key !== "-") {
        context.fillStyle = region.terrains.get(key).color;
      } else {
        context.fillStyle = defaultBackgroundColor;
      }

      const tileHeight = Math.abs((tileSize * (stage * 10)) / 100);

      context.fillRect(
        x * tileSize,
        y * tileSize + (tileSize - tileHeight) / 2,
        tileSize,
        tileHeight,
      );

      key !== "-" &&
        context.strokeRect(
          x * tileSize,
          y * tileSize + (tileSize - tileHeight) / 2,
          tileSize,
          tileHeight,
        );

      [...region.locales.entries()]
        .filter(([key, _]) => {
          return (
            (key !== "pendantOfPower" &&
              key !== "pendantOfCourage" &&
              key !== "pendantOfWisdom") ||
            (key === "pendantOfPower" && !link.hasPendantOfPower) ||
            (key === "pendantOfCourage" && !link.hasPendantOfCourage) ||
            (key === "pendantOfWisdom" && !link.hasPendantOfWisdom)
          );
        })
        .map(([_, locale]) => locale)
        .forEach((locale) => {
          const correctedX = locale.x + region.axisCorrection.x;
          const correctedY = locale.y + region.axisCorrection.y;

          if (x === correctedX && y === correctedY) {
            context.drawImage(
              locale.image,
              correctedX * tileSize,
              correctedY * tileSize + (tileSize - tileHeight) / 2,
              tileSize,
              tileHeight,
            );
          }
        });

      if (key !== "-" && x === linkPosition.x && y === linkPosition.y) {
        context.drawImage(
          link.image,
          linkPosition.x * tileSize,
          linkPosition.y * tileSize + (tileSize - tileHeight) / 2,
          tileSize,
          tileHeight,
        );
      }
    }

    if (stage < 10) {
      setTimeout(() => {
        updateDrawMap(y, stage + 1);
      }, 10);
    } else if (y === currentRegion.map.length - 1) {
      if (link.x !== linkPosition.x) link.x = linkPosition.x;
      if (link.y !== linkPosition.y) link.y = linkPosition.y;

      link.canMove = true;
    }
  };

  for (let y = 0; y < currentRegion.map.length; y++) {
    setTimeout(() => {
      updateDrawMap(y);
    }, 50 * y);
  }
}

/*
function checkPosition() {
  if (link.region.map === hyrule.map) {
    if (
      link.x === hyrule.locales.get("powerDungeon").x &&
      link.y === hyrule.locales.get("powerDungeon").y &&
      !link.hasPendantOfPower
    ) {
      link.region = powerDungeon;

      // link.x = powerDungeon.locales.get("exit").x;
      // link.y = powerDungeon.locales.get("exit").y;
    } else if (
      link.x === hyrule.locales.get("courageDungeon").x &&
      link.y === hyrule.locales.get("courageDungeon").y &&
      !link.hasPendantOfCourage
    ) {
      link.region = courageDungeon;

      // link.x = courageDungeon.locales.get("exit").x;
      // link.y = courageDungeon.locales.get("exit").y;
    } else if (
      link.x === hyrule.locales.get("wisdomDungeon").x &&
      link.y === hyrule.locales.get("wisdomDungeon").y &&
      !link.hasPendantOfWisdom
    ) {
      link.region = wisdomDungeon;

      // link.x = wisdomDungeon.locales.get("exit").x;
      // link.y = wisdomDungeon.locales.get("exit").y;
    }
  }

  if (link.region === powerDungeon) {
    if (
      link.x === powerDungeon.locales.get("exit").x &&
      link.y === powerDungeon.locales.get("exit").y &&
      link.hasPendantOfPower
    ) {
      link.region = hyrule;

      // link.x = hyrule.locales.get("powerDungeon").x;
      // link.y = hyrule.locales.get("powerDungeon").y;
    } else if (
      link.x === powerDungeon.locales.get("pendantOfPower").x &&
      link.y === powerDungeon.locales.get("pendantOfPower").y
    ) {
      link.hasPendantOfPower = true;
      openLostWoods();
    }
  }

  if (link.region === courageDungeon) {
    if (
      link.x === courageDungeon.locales.get("exit").x &&
      link.y === courageDungeon.locales.get("exit").y &&
      link.hasPendantOfCourage
    ) {
      link.region = hyrule;

      // link.x = hyrule.locales.get("courageDungeon").x;
      // link.y = hyrule.locales.get("courageDungeon").y;
    } else if (
      link.x === courageDungeon.locales.get("pendantOfCourage").x &&
      link.y === courageDungeon.locales.get("pendantOfCourage").y
    ) {
      link.hasPendantOfCourage = true;
      openLostWoods();
    }
  }

  if (link.region === wisdomDungeon) {
    if (
      link.x === wisdomDungeon.locales.get("exit").x &&
      link.y === wisdomDungeon.locales.get("exit").y &&
      link.hasPendantOfWisdom
    ) {
      link.region = hyrule;

      // link.x = hyrule.locales.get("wisdomDungeon").x;
      // link.y = hyrule.locales.get("wisdomDungeon").y;
    } else if (
      link.x === wisdomDungeon.locales.get("pendantOfWisdom").x &&
      link.y === wisdomDungeon.locales.get("pendantOfWisdom").y
    ) {
      link.hasPendantOfWisdom = true;
      openLostWoods();
    }
  }
}

// função de teste
function andaPower() {
  if (link.region === hyrule) {
    link.x = hyrule.locales.get("powerDungeon").x;
    link.y = hyrule.locales.get("powerDungeon").y;
    checkPosition();
  }
}
// função de teste
function andaCourage() {
  if (link.region === hyrule) {
    link.x = hyrule.locales.get("courageDungeon").x;
    link.y = hyrule.locales.get("courageDungeon").y;
    checkPosition();
  }
}
// função de teste
function andaWisdom() {
  if (link.region === hyrule) {
    link.x = hyrule.locales.get("wisdomDungeon").x;
    link.y = hyrule.locales.get("wisdomDungeon").y;
    checkPosition();
  }
}
// função de teste
function andaHyrule() {
  if (link.region === powerDungeon) {
    link.x = powerDungeon.locales.get("exit").x;
    link.y = powerDungeon.locales.get("exit").y;
    checkPosition();
  } else if (link.region === courageDungeon) {
    link.x = courageDungeon.locales.get("exit").x;
    link.y = courageDungeon.locales.get("exit").y;
    checkPosition();
  } else if (link.region === wisdomDungeon) {
    link.x = wisdomDungeon.locales.get("exit").x;
    link.y = wisdomDungeon.locales.get("exit").y;
    checkPosition();
  }
}
// função de teste
function pegaPoder() {
  if (link.region === powerDungeon) {
    link.x = powerDungeon.locales.get("pendantOfPower").x;
    link.y = powerDungeon.locales.get("pendantOfPower").y;
    checkPosition();
  }
}
// função de teste
function pegaCoragem() {
  if (link.region === courageDungeon) {
    link.x = courageDungeon.locales.get("pendantOfCourage").x;
    link.y = courageDungeon.locales.get("pendantOfCourage").y;
    checkPosition();
  }
}
// função de teste
function pegaSabedoria() {
  if (link.region === wisdomDungeon) {
    link.x = wisdomDungeon.locales.get("pendantOfWisdom").x;
    link.y = wisdomDungeon.locales.get("pendantOfWisdom").y;
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
*/

//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
// Função responsável por configurar o estado inicial da aplicação

function start() {
  canvas.width = biggestMapSize * tileSize;
  canvas.height = biggestMapSize * tileSize;
  context.lineWidth = 0.25;
  context.strokeStyle = "#000000";

  link.subscribe("linkPositionChange", updateRegionDrawing);
  link.subscribe("regionChange", changeRegionDrawing);

  const formateUpdateRegionDrawingData = (region, localeKey) => {
    const { x, y } = region.locales.get(localeKey);

    return {
      region,
      currentLinkPosition: {
        x: x + region.axisCorrection.x,
        y: y + region.axisCorrection.y,
      },
      previousLinkPosition: null,
    };
  };

  link.subscribe("powerDungeon", () => {
    if (link.hasPendantOfPower) {
      updateRegionDrawing(
        formateUpdateRegionDrawingData(hyrule, "powerDungeon"),
      );
    } else {
      const exitPowerDungeon = powerDungeon.locales.get("exitPowerDungeon");

      link.region = {
        region: powerDungeon,
        linkPosition: {
          x: exitPowerDungeon.x + powerDungeon.axisCorrection.x,
          y: exitPowerDungeon.y + powerDungeon.axisCorrection.y,
        },
      };
    }
  });

  link.subscribe("courageDungeon", () => {
    if (link.hasPendantOfCourage) {
      updateRegionDrawing(
        formateUpdateRegionDrawingData(hyrule, "courageDungeon"),
      );
    } else {
      const exitCourageDungeon =
        courageDungeon.locales.get("exitCourageDungeon");

      link.region = {
        region: courageDungeon,
        linkPosition: {
          x: exitCourageDungeon.x + courageDungeon.axisCorrection.x,
          y: exitCourageDungeon.y + courageDungeon.axisCorrection.y,
        },
      };
    }
  });

  link.subscribe("wisdomDungeon", () => {
    if (link.hasPendantOfWisdom) {
      updateRegionDrawing(
        formateUpdateRegionDrawingData(hyrule, "wisdomDungeon"),
      );
    } else {
      const exitWisdomDungeon = wisdomDungeon.locales.get("exitWisdomDungeon");

      link.region = {
        region: wisdomDungeon,
        linkPosition: {
          x: exitWisdomDungeon.x + wisdomDungeon.axisCorrection.x,
          y: exitWisdomDungeon.y + wisdomDungeon.axisCorrection.y,
        },
      };
    }
  });

  link.subscribe("exitPowerDungeon", () => {
    if (!link.hasPendantOfPower) {
      updateRegionDrawing(
        formateUpdateRegionDrawingData(powerDungeon, "exitPowerDungeon"),
      );

      return false;
    }

    const powerDungeonLocation = hyrule.locales.get("powerDungeon");

    link.region = {
      region: hyrule,
      linkPosition: {
        x: powerDungeonLocation.x + hyrule.axisCorrection.x,
        y: powerDungeonLocation.y + hyrule.axisCorrection.y,
      },
    };
  });

  link.subscribe("exitCourageDungeon", () => {
    if (!link.hasPendantOfCourage) {
      updateRegionDrawing(
        formateUpdateRegionDrawingData(courageDungeon, "exitCourageDungeon"),
      );

      return false;
    }

    const courageDungeonLocation = hyrule.locales.get("courageDungeon");

    link.region = {
      region: hyrule,
      linkPosition: {
        x: courageDungeonLocation.x + hyrule.axisCorrection.x,
        y: courageDungeonLocation.y + hyrule.axisCorrection.y,
      },
    };
  });

  link.subscribe("exitWisdomDungeon", () => {
    if (!link.hasPendantOfWisdom) {
      updateRegionDrawing(
        formateUpdateRegionDrawingData(wisdomDungeon, "exitWisdomDungeon"),
      );

      return false;
    }

    const wisdomDungeonLocation = hyrule.locales.get("wisdomDungeon");

    link.region = {
      region: hyrule,
      linkPosition: {
        x: wisdomDungeonLocation.x + hyrule.axisCorrection.x,
        y: wisdomDungeonLocation.y + hyrule.axisCorrection.y,
      },
    };
  });

  link.subscribe("pendantOfPower", () => {
    link.hasPendantOfPower = true;

    updateRegionDrawing(
      formateUpdateRegionDrawingData(powerDungeon, "pendantOfPower"),
    );
  });

  link.subscribe("pendantOfCourage", () => {
    link.hasPendantOfCourage = true;

    updateRegionDrawing(
      formateUpdateRegionDrawingData(courageDungeon, "pendantOfCourage"),
    );
  });

  link.subscribe("pendantOfWisdom", () => {
    link.hasPendantOfWisdom = true;

    updateRegionDrawing(
      formateUpdateRegionDrawingData(wisdomDungeon, "pendantOfWisdom"),
    );
  });

  link.region = { region: hyrule };
}

//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
// Event handlers

function handlePlayButtonClick(event) {
  event.target.closest("button").dataset.hide = true;

  setTimeout(() => {
    start();
  }, 500);
}

// Testes

function handleKeydown(event) {
  if (event.key === "ArrowUp") {
    if (link.y - 1 >= link.region.axisCorrection.y) {
      link.y -= 1;
    }
  } else if (event.key === "ArrowDown") {
    if (link.y + 1 < link.region.map.length - link.region.axisCorrection.y) {
      link.y += 1;
    }
  } else if (event.key === "ArrowLeft") {
    if (link.x - 1 >= link.region.axisCorrection.x) {
      link.x -= 1;
    }
  } else if (event.key === "ArrowRight") {
    if (link.x + 1 < link.region.map[0].length - link.region.axisCorrection.x) {
      link.x += 1;
    }
  }
}

//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
// Adicionando *event listeners*

window.document
  .getElementById("play")
  .addEventListener("click", handlePlayButtonClick);
window.addEventListener("keydown", handleKeydown);
