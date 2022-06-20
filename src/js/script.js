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

const link = new Link(0, 0, limbo);

//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
// Função responsável por calcular a heurística de uma dada posição em relação a outra

function calculateHeuristics(position1, position2) {
  return (
    Math.abs(position1.x - position2.x) + Math.abs(position1.y - position2.y)
  );
}

//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
// Função responsável por verificar se uma dada posição é válida

function checkIfIsAValidPosition(position, region) {
  return (
    position.y >= region.axisCorrection.y &&
    position.y < region.map.length - region.axisCorrection.y &&
    position.x >= region.axisCorrection.x &&
    position.x < region.map[0].length - region.axisCorrection.x
  );
}

//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
// Função responsável por

function thinkLink(currentPosition, region) {
  console.log(
    [...region.locales.values()]
      .filter(({ goal }) => goal)
      .map(({ x, y }) => ({
        x,
        y,
        heuristic: calculateHeuristics(currentPosition, { x, y }),
      })),
  );

  const goal = [...region.locales.values()]
    .filter(({ goal }) => goal)
    .map(({ x, y }) => ({ x, y }))
    .reduce((goal1, goal2) => {
      if (goal1 === null) {
        return goal2;
      } else {
        return calculateHeuristics(currentPosition, goal1) <
          calculateHeuristics(currentPosition, goal2)
          ? goal1
          : goal2;
      }
    }, null);

  const positions = [
    { x: currentPosition.x - 1, y: currentPosition.y },
    { x: currentPosition.x + 1, y: currentPosition.y },
    { x: currentPosition.x, y: currentPosition.y + 1 },
    { x: currentPosition.x, y: currentPosition.y - 1 },
  ]
    .filter((position) => checkIfIsAValidPosition(position, region))
    .map((position) => {
      return {
        position,
        heuristic: calculateHeuristics(position, goal),
        parent: currentPosition,
      };
    });

  console.log(goal, positions);
}

//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
// Função responsável por atualizar o mapa atual

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
        .filter(([key, locale]) => {
          return (
            locale.image !== null &&
            ((key !== "pendantOfPower" &&
              key !== "pendantOfCourage" &&
              key !== "pendantOfWisdom") ||
              (key === "pendantOfPower" && !link.hasPendantOfPower) ||
              (key === "pendantOfCourage" && !link.hasPendantOfCourage) ||
              (key === "pendantOfWisdom" && !link.hasPendantOfWisdom))
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

//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
// Função responsável pelas trocas entre mapas

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
        .filter(([key, locale]) => {
          return (
            locale.image !== null &&
            ((key !== "pendantOfPower" &&
              key !== "pendantOfCourage" &&
              key !== "pendantOfWisdom") ||
              (key === "pendantOfPower" && !link.hasPendantOfPower) ||
              (key === "pendantOfCourage" && !link.hasPendantOfCourage) ||
              (key === "pendantOfWisdom" && !link.hasPendantOfWisdom))
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

//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
// Função responsável por configurar o estado inicial da aplicação

function start() {
  canvas.width = biggestMapSize * tileSize;
  canvas.height = biggestMapSize * tileSize;
  context.lineWidth = 0.25;
  context.strokeStyle = "#000000";

  const { x: linkInitialX, y: linkInitialY } = hyrule.locales.get("linksHouse");

  link.x = linkInitialX;
  link.y = linkInitialY;

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

  link.subscribe("pendantCaught", () => {
    if (
      link.hasPendantOfCourage &&
      link.hasPendantOfPower &&
      link.hasPendantOfWisdom
    ) {
      hyrule.locales.get("lostWoods").image.src = "assets/open_door_128px.png";
    }
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
    thinkLink({ x: link.x, y: link.y }, link.region);
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
