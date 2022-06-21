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
// Função responsável por verificar se uma dada posição é válida

function checkIfIsAValidPosition(position, region, path) {
  return (
    position.y >= region.axisCorrection.y &&
    position.y < region.map.length - region.axisCorrection.y &&
    position.x >= region.axisCorrection.x &&
    position.x < region.map[0].length - region.axisCorrection.x &&
    path.every((movement) => !positionWasExplored(movement, position))
  );
}

//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
// Função responsável por gerar um id para o movimento

function generateId() {
  return `${Date.now()}-${Math.trunc(Math.random() * 100000000000) * 2}`;
}

//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
// Função responsável por

async function generateBestPath(goalPosition, path = []) {
  const parent = path.length !== 0 ? path[0] : null;

  const currentPosition = parent
    ? { ...parent.position }
    : { x: link.x, y: link.y };

  if (
    currentPosition.x === goalPosition.x &&
    currentPosition.y === goalPosition.y
  ) {
    return parent;
  }

  let newPath = [];

  if (parent) {
    const possibleMovements = [
      { x: currentPosition.x - 1, y: currentPosition.y },
      { x: currentPosition.x + 1, y: currentPosition.y },
      { x: currentPosition.x, y: currentPosition.y + 1 },
      { x: currentPosition.x, y: currentPosition.y - 1 },
    ]
      .filter((position) =>
        checkIfIsAValidPosition(position, link.region, path),
      )
      .map((possiblePosition) => {
        return {
          id: generateId(),
          position: { ...possiblePosition },
          heuristic: calculateHeuristics(possiblePosition, goalPosition),
          cost:
            parent.cost +
            link.region.terrains.get(
              link.region.map[possiblePosition.y][possiblePosition.x],
            ).cost,
          parent,
        };
      });

    newPath = [...link.path.slice(1), ...possibleMovements].sort(
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
        id: generateId(),
        position: { ...currentPosition },
        cost: 0,
        heuristic: calculateHeuristics(currentPosition, goalPosition),
        parent: null,
      },
    ];
  }

  return generateBestPath(goalPosition, newPath);
}

//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
// Função responsável por

async function chooseGoal() {
  const goalsPositions = [...link.region.locales.values()]
    .filter(({ goal }) => goal)
    .map(({ x, y }) => ({ x, y }));

  console.log("CALCULANDO...");

  const bestPaths = [];

  const path1 = await generateBestPath(goalsPositions[0]);
  console.log(path1);

  const path2 = await generateBestPath(goalsPositions[1]);
  console.log(path2);

  const path3 = await generateBestPath(goalsPositions[2]);
  console.log(path3);

  // for (const goalPosition of goalsPositions) {
  //   bestPaths.push(path);
  // }

  // console.log(bestPaths);
}

//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
// Função responsável por achar o pai de uma sub-árvore a partir da raiz

// function findSubTreePath(movements) {
//   if (movements[0].parent.parent === null) {
//     return movements.slice(0, -1);
//   } else {
//     return findSubTreePath([movements[0].parent, ...movements]);
//   }
// }

//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
// Função responsável por ir para o próximo movimento

// function moveLink(newPosition) {
//   // console.log("newPosition", newPosition, { x: link.x, y: link.y });
//   if (link.x !== newPosition.x || link.y !== newPosition.y) {
//     link.position = newPosition;
//   }
// }

//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
// Função responsável por ir para o próximo movimento a partir da raiz

// async function auxMoveLink(movements) {
//   if (movements.length) return false;

//   return new Promise((resolve, reject) => {
//     moveLink(movements[0].position);

//     setTimeout(() => {
//       resolve(auxMoveLink(movements.slice(1)));
//     }, 250);
//   });
// }

//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
// Função responsável por atualizar posição do link durante a busca

// async function updateLinkPosition(currentMovement, nextMovement) {
//   console.log(currentMovement.position, nextMovement.position);
//   return new Promise((resolve, reject) => {
//     if (
//       currentMovement.parent !== null &&
//       currentMovement.id !== nextMovement.parent.id
//     ) {
//       moveLink(currentMovement.parent.position);

//       setTimeout(() => {
//         resolve(updateLinkPosition(currentMovement.parent, nextMovement));
//       }, 250);
//     } else if (currentMovement.id === nextMovement.parent.id) {
//       moveLink(currentMovement.position);

//       resolve();
//     } else if (currentMovement.parent === null) {
//       // console.log(findSubTreePath([nextMovement]));
//       // resolve(auxMoveLink(findSubTreePath([nextMovement])));
//     }
//   });
// }

//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
// Função responsável por encontrar os próximos movimentos de Link

// function thinkLink() {
//   // console.log("thinkLink call");

//   const parent = link.path.length !== 0 ? link.path[0] : null;

//   const currentPosition = parent
//     ? { ...parent.position }
//     : { x: link.x, y: link.y };

//   const goalPosition = [...link.region.locales.values()]
//     .filter(({ goal }) => goal)
//     .map(({ x, y }) => ({ x, y }))
//     .reduce((goalPosition1, goalPosition2) => {
//       if (goalPosition1 === null) {
//         return goalPosition2;
//       } else {
//         return calculateHeuristics(currentPosition, goalPosition1) <
//           calculateHeuristics(currentPosition, goalPosition2)
//           ? goalPosition1
//           : goalPosition2;
//       }
//     }, null);

//   if (!goalPosition) return false; // Fim de jogo

//   if (parent) {
//     const possibleMovements = [
//       { x: currentPosition.x - 1, y: currentPosition.y },
//       { x: currentPosition.x + 1, y: currentPosition.y },
//       { x: currentPosition.x, y: currentPosition.y + 1 },
//       { x: currentPosition.x, y: currentPosition.y - 1 },
//     ]
//       .filter((position) =>
//         checkIfIsAValidPosition(position, link.region, link.path),
//       )
//       .map((possiblePosition) => {
//         return {
//           id: generateId(),
//           position: { ...possiblePosition },
//           heuristic: calculateHeuristics(possiblePosition, goalPosition),
//           cost:
//             parent.cost +
//             link.region.terrains.get(
//               link.region.map[possiblePosition.y][possiblePosition.x],
//             ).cost,
//           parent,
//         };
//       });

//     const newPath = [...link.path.slice(1), ...possibleMovements].sort(
//       (possibleMovement1, possibleMovement2) => {
//         const totalCost1 = possibleMovement1.heuristic + possibleMovement1.cost;
//         const totalCost2 = possibleMovement2.heuristic + possibleMovement2.cost;

//         if (totalCost1 !== totalCost2) {
//           return totalCost1 - totalCost2;
//         } else if (possibleMovement1.position.x !== possibleMovement2.x) {
//           return possibleMovement1.position.x - possibleMovement2.position.x;
//         } else if (possibleMovement1.position.y !== possibleMovement2.y) {
//           return possibleMovement1.position.y - possibleMovement2.position.y;
//         }
//       },
//     );

//     console.log(
//       "thinkLink has parent",
//       newPath.map((movement) => [movement.heuristic + movement.cost, movement]),
//     );

//     //link.canMove = false;
//     //updateLinkPosition(parent, newPath[0]).then(() => {
//     //  link.canMove = true;
//     //});
//     link.path = newPath;
//   } else {
//     console.log(
//       "thinkLink do not has parent",
//       [
//         {
//           id: generateId(),
//           position: { ...currentPosition },
//           cost: 0,
//           heuristic: calculateHeuristics(currentPosition, goalPosition),
//           parent: null,
//         },
//       ].map((movement) => [movement.heuristic + movement.cost, movement]),
//     );

//     link.path = [
//       {
//         id: generateId(),
//         position: { ...currentPosition },
//         cost: 0,
//         heuristic: calculateHeuristics(currentPosition, goalPosition),
//         parent: null,
//       },
//     ];
//   }
// }

//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
// Função responsável por calcular rotas

//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
// Função responsável por atualizar o mapa atual

function updateRegionDrawing({ region, currentLinkPosition }) {
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
  hyrule.locales.set("lostWoods", {
    ...hyrule.locales.get("lostWoods"),
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

  link.position = { x: linkInitialX, y: linkInitialY };

  // link.subscribe("linkPositionChange", (props) => {
  //   console.log("linkPositionChange", { x: link.x, y: link.y });
  //   updateRegionDrawing(props);

  //   if (link.canMove) {
  //     setTimeout(() => {
  //       // thinkLink();
  //     }, 500);
  //   }
  // });

  link.subscribe("regionChange", changeRegionDrawing);

  // const formateUpdateRegionDrawingData = (region, localeKey) => {
  //   const { x, y } = region.locales.get(localeKey);

  //   return {
  //     region,
  //     currentLinkPosition: {
  //       x: x + region.axisCorrection.x,
  //       y: y + region.axisCorrection.y,
  //     },
  //   };
  // };

  // link.subscribe("powerDungeon", () => {
  //   if (link.hasPendantOfPower) {
  //     hyrule.locales.set("powerDungeon", {
  //       ...hyrule.locales.get("powerDungeon"),
  //       goal: false,
  //     });

  //     updateRegionDrawing(
  //       formateUpdateRegionDrawingData(hyrule, "powerDungeon"),
  //     );
  //   } else {
  //     const exitPowerDungeon = powerDungeon.locales.get("exitPowerDungeon");

  //     link.region = {
  //       region: powerDungeon,
  //       linkPosition: {
  //         x: exitPowerDungeon.x + powerDungeon.axisCorrection.x,
  //         y: exitPowerDungeon.y + powerDungeon.axisCorrection.y,
  //       },
  //     };
  //   }
  // });

  // link.subscribe("courageDungeon", () => {
  //   if (link.hasPendantOfCourage) {
  //     hyrule.locales.set("courageDungeon", {
  //       ...hyrule.locales.get("courageDungeon"),
  //       goal: false,
  //     });

  //     updateRegionDrawing(
  //       formateUpdateRegionDrawingData(hyrule, "courageDungeon"),
  //     );
  //   } else {
  //     const exitCourageDungeon =
  //       courageDungeon.locales.get("exitCourageDungeon");

  //     link.region = {
  //       region: courageDungeon,
  //       linkPosition: {
  //         x: exitCourageDungeon.x + courageDungeon.axisCorrection.x,
  //         y: exitCourageDungeon.y + courageDungeon.axisCorrection.y,
  //       },
  //     };
  //   }
  // });

  // link.subscribe("wisdomDungeon", () => {
  //   if (link.hasPendantOfWisdom) {
  //     hyrule.locales.set("wisdomDungeon", {
  //       ...hyrule.locales.get("wisdomDungeon"),
  //       goal: false,
  //     });

  //     updateRegionDrawing(
  //       formateUpdateRegionDrawingData(hyrule, "wisdomDungeon"),
  //     );
  //   } else {
  //     const exitWisdomDungeon = wisdomDungeon.locales.get("exitWisdomDungeon");

  //     link.region = {
  //       region: wisdomDungeon,
  //       linkPosition: {
  //         x: exitWisdomDungeon.x + wisdomDungeon.axisCorrection.x,
  //         y: exitWisdomDungeon.y + wisdomDungeon.axisCorrection.y,
  //       },
  //     };
  //   }
  // });

  // link.subscribe("exitPowerDungeon", () => {
  //   if (!link.hasPendantOfPower) {
  //     updateRegionDrawing(
  //       formateUpdateRegionDrawingData(powerDungeon, "exitPowerDungeon"),
  //     );

  //     return false;
  //   }

  //   const powerDungeonLocation = hyrule.locales.get("powerDungeon");

  //   link.region = {
  //     region: hyrule,
  //     linkPosition: {
  //       x: powerDungeonLocation.x + hyrule.axisCorrection.x,
  //       y: powerDungeonLocation.y + hyrule.axisCorrection.y,
  //     },
  //   };
  // });

  // link.subscribe("exitCourageDungeon", () => {
  //   if (!link.hasPendantOfCourage) {
  //     updateRegionDrawing(
  //       formateUpdateRegionDrawingData(courageDungeon, "exitCourageDungeon"),
  //     );

  //     return false;
  //   }

  //   const courageDungeonLocation = hyrule.locales.get("courageDungeon");

  //   link.region = {
  //     region: hyrule,
  //     linkPosition: {
  //       x: courageDungeonLocation.x + hyrule.axisCorrection.x,
  //       y: courageDungeonLocation.y + hyrule.axisCorrection.y,
  //     },
  //   };
  // });

  // link.subscribe("exitWisdomDungeon", () => {
  //   if (!link.hasPendantOfWisdom) {
  //     updateRegionDrawing(
  //       formateUpdateRegionDrawingData(wisdomDungeon, "exitWisdomDungeon"),
  //     );

  //     return false;
  //   }

  //   const wisdomDungeonLocation = hyrule.locales.get("wisdomDungeon");

  //   link.region = {
  //     region: hyrule,
  //     linkPosition: {
  //       x: wisdomDungeonLocation.x + hyrule.axisCorrection.x,
  //       y: wisdomDungeonLocation.y + hyrule.axisCorrection.y,
  //     },
  //   };
  // });

  // link.subscribe("pendantOfPower", () => {
  //   link.hasPendantOfPower = true;

  //   powerDungeon.locales.set("pendantOfPower", {
  //     ...powerDungeon.locales.get("pendantOfPower"),
  //     goal: false,
  //   });
  //   powerDungeon.locales.set("exitPowerDungeon", {
  //     ...powerDungeon.locales.get("exitPowerDungeon"),
  //     goal: true,
  //   });

  //   openLostWoods();

  //   updateRegionDrawing(
  //     formateUpdateRegionDrawingData(powerDungeon, "pendantOfPower"),
  //   );
  // });

  // link.subscribe("pendantOfCourage", () => {
  //   link.hasPendantOfCourage = true;

  //   courageDungeon.locales.set("pendantOfCourage", {
  //     ...courageDungeon.locales.get("pendantOfCourage"),
  //     goal: false,
  //   });
  //   courageDungeon.locales.set("exitCourageDungeon", {
  //     ...courageDungeon.locales.get("exitCourageDungeon"),
  //     goal: true,
  //   });

  //   openLostWoods();

  //   updateRegionDrawing(
  //     formateUpdateRegionDrawingData(courageDungeon, "pendantOfCourage"),
  //   );
  // });

  // link.subscribe("pendantOfWisdom", () => {
  //   link.hasPendantOfWisdom = true;

  //   wisdomDungeon.locales.set("pendantOfWisdom", {
  //     ...wisdomDungeon.locales.get("pendantOfWisdom"),
  //     goal: false,
  //   });
  //   wisdomDungeon.locales.set("exitWisdomDungeon", {
  //     ...wisdomDungeon.locales.get("exitWisdomDungeon"),
  //     goal: true,
  //   });

  //   openLostWoods();

  //   updateRegionDrawing(
  //     formateUpdateRegionDrawingData(wisdomDungeon, "pendantOfWisdom"),
  //   );
  // });

  // link.subscribe("pathUpdated", () => {
  //   console.log("pathUpdated");

  //   if (!link.path.length) return false; // Fim de jogo

  //   const nextMovement = link.path[0];

  //   if (
  //     link.x !== nextMovement.position.x ||
  //     link.y !== nextMovement.position.y
  //   ) {
  //     link.position = nextMovement.position;
  //   } else {
  //     // thinkLink();
  //   }
  // });

  // link.subscribe("linksHouse", () => {
  //   console.log("linksHouse", {
  //     region: link.region,
  //     currentLinkPosition: { x: link.x, y: link.y },
  //   });
  //   updateRegionDrawing({
  //     region: link.region,
  //     currentLinkPosition: { x: link.x, y: link.y },
  //   });
  //   //thinkLink();
  // });

  // link.subscribe("movementPermissionChange", () => {
  //   if (link.canMove) {
  //     setTimeout(() => {
  //       // thinkLink();
  //     }, 500);
  //   }
  // });

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
  chooseGoal();
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
