import Link from "./classes/Link.js";
import { tileSize, defaultBackgroundColor, linkSpeed } from "./consts.js";
import {
  hyrule,
  powerDungeon,
  courageDungeon,
  wisdomDungeon,
  limbo,
  endLand,
  biggestMapSize,
} from "./regions.js";

const canvas = window.document.getElementById("map");
const context = canvas.getContext("2d");

const costsSection = window.document.getElementById("costsSection");
const costPath = window.document.getElementById("costPath");
const costHeuristic = window.document.getElementById("costHeuristic");
const totalCost = window.document.getElementById("totalCost");

const link = new Link(0, 0, limbo);

//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
// Função responsável por calcular a heurística de uma dada posição em relação a outra

function calculateHeuristics(position1, position2) {
  return Math.sqrt(
    Math.pow(position2.x - position1.x, 2) +
      Math.pow(position2.y - position1.y, 2),
  );
}

//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
// Função responsável por verificar se duas posições são iguais

function positionWasExplored(movement, { x, y }) {
  const isSamePosition = x === movement.position.x && y === movement.position.y;

  return movement.parent === null
    ? isSamePosition
    : !isSamePosition
    ? positionWasExplored(movement.parent, { x, y })
    : true;
}

//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
// Função responsável por

function checkIfIsAValidPosition(position, region, path) {
  if (
    !(
      position.y >= region.axisCorrection.y &&
      position.y < region.map.length - region.axisCorrection.y &&
      position.x >= region.axisCorrection.x &&
      position.x < region.map[0].length - region.axisCorrection.x
    )
  )
    return false;

  if (region.terrains.get(region.map[position.y][position.x]).cost === null)
    return false;

  return path.every((movement) => !positionWasExplored(movement, position));
}

//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
// Função responsável por

function generateBestPath(
  goalPosition,
  path = [],
  deadPath = [],
  currentRegion,
  currentLinkPosition,
) {
  const parent = path.length !== 0 ? path[0] : null;

  const currentPosition = parent
    ? { ...parent.position }
    : { ...currentLinkPosition };

  if (
    currentPosition.x === goalPosition.x &&
    currentPosition.y === goalPosition.y
  ) {
    return parent;
  }

  let newPath = [],
    newDeadPath = [];

  if (parent) {
    const possibleMovements = [
      { x: currentPosition.x - 1, y: currentPosition.y },
      { x: currentPosition.x + 1, y: currentPosition.y },
      { x: currentPosition.x, y: currentPosition.y + 1 },
      { x: currentPosition.x, y: currentPosition.y - 1 },
    ]
      .filter((position) =>
        checkIfIsAValidPosition(position, currentRegion, [
          ...path,
          ...deadPath,
        ]),
      )
      .map((possiblePosition) => {
        return {
          position: { ...possiblePosition },
          heuristic: calculateHeuristics(possiblePosition, goalPosition),
          cost:
            parent.cost +
            currentRegion.terrains.get(
              currentRegion.map[possiblePosition.y][possiblePosition.x],
            ).cost,
          parent,
        };
      });

    if (possibleMovements.length === 0) {
      newDeadPath = [...deadPath, path[0]];
    } else {
      newDeadPath = [...deadPath];
    }

    newPath = [...path.slice(1), ...possibleMovements].sort(
      (possibleMovement1, possibleMovement2) => {
        const totalCost1 = possibleMovement1.heuristic + possibleMovement1.cost;
        const totalCost2 = possibleMovement2.heuristic + possibleMovement2.cost;

        if (totalCost1 !== totalCost2) {
          return totalCost1 - totalCost2;
        } else if (possibleMovement1.position.x !== possibleMovement2.x) {
          return possibleMovement1.position.x - possibleMovement2.position.x;
        } else if (possibleMovement1.position.y !== possibleMovement2.y) {
          return possibleMovement1.position.y - possibleMovement2.position.y;
        }
      },
    );
  } else {
    newPath = [
      {
        position: { ...currentPosition },
        cost: Number(costsSection.dataset.costPath),
        heuristic: calculateHeuristics(currentPosition, goalPosition),
        parent: null,
      },
    ];
  }

  return generateBestPath(
    goalPosition,
    newPath,
    newDeadPath,
    currentRegion,
    currentLinkPosition,
  );
}

//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\

function unzipPath(path) {
  let currentMovement = path;
  const formattedPath = [];

  while (currentMovement !== null) {
    formattedPath.unshift(currentMovement);
    currentMovement = currentMovement.parent;
  }

  return formattedPath;
}

//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
// Função responsável por

function thinkLink(currentRegion, currentLinkPosition) {
  const goals = [...currentRegion.locales.values()]
    .filter(({ goal }) => goal)
    .map(({ x, y }) =>
      generateBestPath(
        {
          x: x + currentRegion.axisCorrection.x,
          y: y + currentRegion.axisCorrection.y,
        },
        [],
        [],
        currentRegion,
        currentLinkPosition,
      ),
    );

  if (goals.length !== 0) {
    return unzipPath(
      goals.reduce((goal1, goal2) => {
        return goal1.cost > goal2.cost ? goal2 : goal1;
      }, goals[0]),
    );
  } else {
    return [];
  }
}

//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
// Função responsável por

function moveLink(nextMovements = []) {
  if (nextMovements.length === 0) return false;

  const currentMovement = nextMovements[0];

  costsSection.dataset.costPath = currentMovement.cost;
  costPath.textContent = currentMovement.cost;

  const currentCostHeuristic = Number(costsSection.dataset.costHeuristic);
  const updatedCostHeuristic = currentCostHeuristic + currentMovement.heuristic;
  costsSection.dataset.costHeuristic = updatedCostHeuristic;
  costHeuristic.textContent = updatedCostHeuristic.toFixed(2);

  totalCost.textContent = (currentMovement.cost + currentCostHeuristic).toFixed(
    2,
  );

  if (currentMovement.cost !== 0) {
    link.position = currentMovement.position;

    setTimeout(() => {
      moveLink(nextMovements.slice(1));
    }, linkSpeed);
  } else {
    moveLink(nextMovements.slice(1));
  }
}

//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
// Função responsável por atualizar o mapa atual

function updateRegionDrawing({
  region,
  currentLinkPosition,
  animationEndHandlers = [],
}) {
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

  animationEndHandlers.forEach((animationEndHandler) => animationEndHandler());
}

//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
// Função responsável pelas trocas entre mapas

function changeRegionDrawing({
  currentRegion,
  previousRegion,
  currentLinkPosition,
  previousLinkPosition,
  animationEndHandlers,
}) {
  if (link.canMove) {
    link.canMove = false;
  }

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
      if (link.x !== linkPosition.x || link.y !== linkPosition.y) {
        link.position = linkPosition;
      }

      link.canMove = true;

      animationEndHandlers.forEach((animationEndHandler) =>
        animationEndHandler(),
      );
    }
  };

  for (let y = 0; y < currentRegion.map.length; y++) {
    setTimeout(() => {
      updateDrawMap(y);
    }, 50 * y);
  }
}

//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
// Função responsável por, visualmente, mostrar que Lost Woods é o novo objetivo

function openLostWoods() {
  if (
    !(
      link.hasPendantOfCourage &&
      link.hasPendantOfPower &&
      link.hasPendantOfWisdom
    )
  )
    return false;

  hyrule.locales.get("lostWoods").image.src = "assets/open_door_128px.png";
  hyrule.locales.set("linksHouse", {
    ...hyrule.locales.get("linksHouse"),
    goal: true,
  });
}

//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
// Função responsável por configurar o estado inicial da aplicação

function start() {
  canvas.width = biggestMapSize * tileSize;
  canvas.height = biggestMapSize * tileSize;
  context.lineWidth = 0.25;
  context.strokeStyle = "#000000";

  const { x: linkInitialX, y: linkInitialY } = hyrule.locales.get("linksHouse");

  link.position = {
    x: linkInitialX + hyrule.axisCorrection.x,
    y: linkInitialY + hyrule.axisCorrection.y,
  };

  link.subscribe("linkPositionChange", (props) => {
    updateRegionDrawing(props);
  });

  link.subscribe(
    "regionChange",
    ({ currentRegion, currentLinkPosition, ...props }) => {
      changeRegionDrawing({
        ...props,
        currentRegion,
        currentLinkPosition,
        animationEndHandlers: [
          () => {
            setTimeout(() => {
              moveLink(thinkLink(currentRegion, currentLinkPosition));
            }, linkSpeed);
          },
        ],
      });
    },
  );

  const formatUpdateRegionDrawingData = (region, localeKey) => {
    const { x, y } = region.locales.get(localeKey);

    return {
      region,
      currentLinkPosition: {
        x: x + region.axisCorrection.x,
        y: y + region.axisCorrection.y,
      },
    };
  };

  link.subscribe("powerDungeon", () => {
    if (link.hasPendantOfPower) {
      hyrule.locales.set("powerDungeon", {
        ...hyrule.locales.get("powerDungeon"),
        goal: false,
      });

      return false;
    }

    updateRegionDrawing(formatUpdateRegionDrawingData(hyrule, "powerDungeon"));

    const exitPowerDungeon = powerDungeon.locales.get("exitPowerDungeon");

    link.region = {
      region: powerDungeon,
      linkPosition: {
        x: exitPowerDungeon.x + powerDungeon.axisCorrection.x,
        y: exitPowerDungeon.y + powerDungeon.axisCorrection.y,
      },
    };
  });

  link.subscribe("courageDungeon", () => {
    if (link.hasPendantOfCourage) {
      hyrule.locales.set("courageDungeon", {
        ...hyrule.locales.get("courageDungeon"),
        goal: false,
      });

      return false;
    }

    updateRegionDrawing(
      formatUpdateRegionDrawingData(hyrule, "courageDungeon"),
    );

    const exitCourageDungeon = courageDungeon.locales.get("exitCourageDungeon");

    link.region = {
      region: courageDungeon,
      linkPosition: {
        x: exitCourageDungeon.x + courageDungeon.axisCorrection.x,
        y: exitCourageDungeon.y + courageDungeon.axisCorrection.y,
      },
    };
  });

  link.subscribe("wisdomDungeon", () => {
    if (link.hasPendantOfWisdom) {
      hyrule.locales.set("wisdomDungeon", {
        ...hyrule.locales.get("wisdomDungeon"),
        goal: false,
      });

      return false;
    }

    updateRegionDrawing(formatUpdateRegionDrawingData(hyrule, "wisdomDungeon"));

    const exitWisdomDungeon = wisdomDungeon.locales.get("exitWisdomDungeon");

    link.region = {
      region: wisdomDungeon,
      linkPosition: {
        x: exitWisdomDungeon.x + wisdomDungeon.axisCorrection.x,
        y: exitWisdomDungeon.y + wisdomDungeon.axisCorrection.y,
      },
    };
  });

  link.subscribe("exitPowerDungeon", () => {
    if (!link.hasPendantOfPower) {
      return false;
    }

    updateRegionDrawing({
      ...formatUpdateRegionDrawingData(powerDungeon, "exitPowerDungeon"),
    });

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
      return false;
    }

    updateRegionDrawing(
      formatUpdateRegionDrawingData(courageDungeon, "exitCourageDungeon"),
    );

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
      return false;
    }

    updateRegionDrawing(
      formatUpdateRegionDrawingData(wisdomDungeon, "exitWisdomDungeon"),
    );

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
    if (link.hasPendantOfPower) return false;

    link.hasPendantOfPower = true;

    powerDungeon.locales.set("pendantOfPower", {
      ...powerDungeon.locales.get("pendantOfPower"),
      goal: false,
    });
    powerDungeon.locales.set("exitPowerDungeon", {
      ...powerDungeon.locales.get("exitPowerDungeon"),
      goal: true,
    });

    openLostWoods();

    setTimeout(() => {
      updateRegionDrawing({
        ...formatUpdateRegionDrawingData(powerDungeon, "pendantOfPower"),
        animationEndHandlers: [
          () => {
            setTimeout(() => {
              moveLink(thinkLink(powerDungeon, { x: link.x, y: link.y }));
            }, linkSpeed);
          },
        ],
      });
    }, linkSpeed);
  });

  link.subscribe("pendantOfCourage", () => {
    if (link.hasPendantOfCourage) return false;

    link.hasPendantOfCourage = true;

    courageDungeon.locales.set("pendantOfCourage", {
      ...courageDungeon.locales.get("pendantOfCourage"),
      goal: false,
    });
    courageDungeon.locales.set("exitCourageDungeon", {
      ...courageDungeon.locales.get("exitCourageDungeon"),
      goal: true,
    });

    openLostWoods();

    setTimeout(() => {
      updateRegionDrawing({
        ...formatUpdateRegionDrawingData(courageDungeon, "pendantOfCourage"),
        animationEndHandlers: [
          () => {
            setTimeout(() => {
              moveLink(thinkLink(courageDungeon, { x: link.x, y: link.y }));
            }, linkSpeed);
          },
        ],
      });
    }, linkSpeed);
  });

  link.subscribe("pendantOfWisdom", () => {
    if (link.hasPendantOfWisdom) return false;

    link.hasPendantOfWisdom = true;

    wisdomDungeon.locales.set("pendantOfWisdom", {
      ...wisdomDungeon.locales.get("pendantOfWisdom"),
      goal: false,
    });
    wisdomDungeon.locales.set("exitWisdomDungeon", {
      ...wisdomDungeon.locales.get("exitWisdomDungeon"),
      goal: true,
    });

    openLostWoods();

    setTimeout(() => {
      updateRegionDrawing({
        ...formatUpdateRegionDrawingData(wisdomDungeon, "pendantOfWisdom"),
        animationEndHandlers: [
          () => {
            setTimeout(() => {
              moveLink(thinkLink(wisdomDungeon, { x: link.x, y: link.y }));
            }, linkSpeed);
          },
        ],
      });
    }, linkSpeed);
  });

  link.subscribe("linksHouse", () => {
    if (
      !(
        link.hasPendantOfPower &&
        link.hasPendantOfCourage &&
        link.hasPendantOfWisdom
      )
    ) {
      return false;
    }

    hyrule.locales.set("linksHouse", {
      ...hyrule.locales.get("linksHouse"),
      goal: false,
    });

    hyrule.locales.set("lostWoods", {
      ...hyrule.locales.get("lostWoods"),
      goal: true,
    });

    setTimeout(() => {
      updateRegionDrawing({
        region: hyrule,
        currentLinkPosition: { x: link.x, y: link.y },
        animationEndHandlers: [
          () => {
            setTimeout(() => {
              moveLink(thinkLink(hyrule, { x: link.x, y: link.y }));
            }, linkSpeed);
          },
        ],
      });
    }, linkSpeed);
  });

  link.subscribe("lostWoods", () => {
    console.log("lostWoods");

    if (
      !(
        link.hasPendantOfPower &&
        link.hasPendantOfCourage &&
        link.hasPendantOfWisdom
      )
    ) {
      return false;
    }

    hyrule.locales.set("lostWoods", {
      ...hyrule.locales.get("lostWoods"),
      goal: false,
    });

    setTimeout(() => {
      updateRegionDrawing({
        region: hyrule,
        currentLinkPosition: { x: link.x, y: link.y },
      });

      link.region = { region: endLand };
    }, linkSpeed);
  });

  link.region = { region: hyrule };

  costsSection.classList.add("show");
}

//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
// Event handlers

function handlePlayButtonClick(event) {
  event.target.closest("button").dataset.hide = true;

  setTimeout(() => {
    start();
  }, 500);
}

//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
// Adicionando *event listeners*

window.document
  .getElementById("play")
  .addEventListener("click", handlePlayButtonClick);
