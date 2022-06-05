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
