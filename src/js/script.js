import Link from "./classes/Link.js";
import {
  hyruleTerrains,
  dungeonTerrains,
  hyruleLocales,
  powerDungeonLocales,
  courageDungeonLocales,
  wisdomDungeonLocales,
  hyruleMap,
  powerDungeonMap,
  courageDungeonMap,
  wisdomDungeonMap,
} from "./consts.js";

const divTest = window.document.getElementById("map-test");

function printMap(map, terrains, where) {
  map.forEach((line) => {
    line.split("").forEach((key) => {
      const divTerrain = window.document.createElement("div");

      divTerrain.classList.add("box");
      divTerrain.style.backgroundColor = terrains.get(key).color;

      where.appendChild(divTerrain);
    });

    where.insertAdjacentHTML("beforeend", "<br />");
  });
}

// V Com problemas V
// function printMapCanvas(map, terrains, where, sizeMap, sizeTile) {  //sizeMap -> dimensção do mapa; sizeTile -> tamanho de cada quadrado
//   var canvas = where;
//   var ctx = canvas.getContext("2d");

//   for (var y = 0; j < sizeMap; j++) {
//     for (var x = 0; x < sizeMap; x++) {
//       ctx.fillStyle = terrains.get(map[x][y]).color;
//       ctx.fillRect(x*sizeTile, y*sizeTile, sizeTile, sizeTile);
//     }
//   }

// }

printMap(
  hyruleMap,
  hyruleTerrains,
  window.document.getElementById("hyruleMap"),
);

printMap(
  powerDungeonMap,
  dungeonTerrains,
  window.document.getElementById("powerDungeonMap"),
);

printMap(
  courageDungeonMap,
  dungeonTerrains,
  window.document.getElementById("courageDungeonMap"),
);

printMap(
  wisdomDungeonMap,
  dungeonTerrains,
  window.document.getElementById("wisdomDungeonMap"),
);

// V Com problemas V
// printMapCanvas(
//   hyruleMap,
//   hyruleTerrains,
//   window.document.getElementById("hyruleMapCanvas"),
//   42,
//   11,
// );