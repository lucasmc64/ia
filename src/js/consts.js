//\\//\\//\\//\\//\\//\\//\\\\//\\//\\//\\//\\//\\//\\\\//\\//\\//\\//\\//\\//\\
// Terrains

const hyruleTerrains = new Map([
  ["g", { cost: 10, label: "Grama", color: "#92d050" }],
  ["s", { cost: 20, label: "Areia", color: "#c4bc96" }],
  ["f", { cost: 100, label: "Floresta", color: "#00b050" }],
  ["m", { cost: 150, label: "Montanha", color: "#948a54" }],
  ["w", { cost: 180, label: "Água", color: "#548dd4" }],
]);

const dungeonTerrains = new Map([
  ["p", { cost: 10, label: "Caminho", color: "#e1e1e1" }],
  ["w", { cost: null, label: "Parede", color: "#b7b7b7" }],
]);

//\\//\\//\\//\\//\\//\\//\\\\//\\//\\//\\//\\//\\//\\\\//\\//\\//\\//\\//\\//\\
// Images

const dungeonDoorImage = new Image();
const lostWoodsDoorImage = new Image();
const masterSwordImage = new Image();
const pendantOfPowerImage = new Image();
const pendantOfCourageImage = new Image();
const pendantOfWisdomImage = new Image();

dungeonDoorImage.src = "";
lostWoodsDoorImage.src = "";
masterSwordImage.src = "";
pendantOfPowerImage.src = "";
pendantOfCourageImage.src = "";
pendantOfWisdomImage.src = "";

//\\//\\//\\//\\//\\//\\//\\\\//\\//\\//\\//\\//\\//\\\\//\\//\\//\\//\\//\\//\\
// Locales

const hyruleLocales = new Map([
  ["powerDungeon", { x: 5, y: 32, image: dungeonDoorImage }],
  ["courageDungeon", { x: 39, y: 17, image: dungeonDoorImage }],
  ["wisdomDungeon", { x: 24, y: 1, image: dungeonDoorImage }],
  ["lostWoods", { x: 6, y: 5, image: lostWoodsDoorImage }],
  ["masterSword", { x: 2, y: 1, image: masterSwordImage }],
]);

const powerDungeonLocales = new Map([
  ["exit", { x: 14, y: 26, image: dungeonDoorImage }],
  ["pendantOfPower", { x: 13, y: 3, image: pendantOfPowerImage }],
]);

const courageDungeonLocales = new Map([
  ["exit", { x: 13, y: 25, image: dungeonDoorImage }],
  ["pendantOfCourage", { x: 13, y: 2, image: pendantOfCourageImage }],
]);

const wisdomDungeonLocales = new Map([
  ["exit", { x: 14, y: 25, image: dungeonDoorImage }],
  ["pendantOfWisdom", { x: 15, y: 19, image: pendantOfWisdomImage }],
]);

//\\//\\//\\//\\//\\//\\//\\\\//\\//\\//\\//\\//\\//\\\\//\\//\\//\\//\\//\\//\\
// Maps

const hyruleMap = [
  "fffffffffffffffmmmmmmmmmmmmmmmmmmmmmmmmmmm",
  "fggfgfgfgggggggmmmmmmmsssssmmmmmmssssmmmmm",
  "fggfgggfgfggggggmmmmmsssssssmmmmssssssmmmm",
  "fgffgfgfgfggfggggmssssssssssssssssssssssmm",
  "fggggfgfgfggfggggmsmmsssssssmmmmssssssmmmm",
  "fgffgfgfgfgfffgggmsmmmsssssmmmmwmssssmwmmm",
  "fgffgfgggfgggggggmsmmmmmmmmmmmmwmmmmmmwmmm",
  "fgffffgfffgggggggmsmmmmmmmmmmmmwmmmmmmwmgm",
  "fggfgggggfggwggggmsssssssssssmmwmmmmmmwmgm",
  "ffffgfffgggwwwgggmsmmmmmsmmmsmmwmmmmmmwmgm",
  "fggfggggggwwwwwggmmmfffmmmfffffwggmmggwggm",
  "fggfggfggggwwwggggggggggggggggwwwwwwwwwggm",
  "fggfggfgggggwgggggggggggggggggwggfgggggfgm",
  "fggfggfggggggggggfffgggffffgggwggggggfgfgm",
  "fgggggggggggggggggggggggggggggwgfgfgffgfgm",
  "fgfffffgfffgggggggggggggggggggwggggggggggm",
  "fggggggggggggggggwwwwwwwwwwgggggmmmmmmmmmm",
  "fggggggggwggfgfggwggggggggwgggwgmssssssssm",
  "fgfggfgggwgggggggwgfggggfgwwwwwgmsmssmsssm",
  "fgfggfgggwggfgfgggggggggggwgggggmsmmmmmmmm",
  "fgfggfgggwgggggggwggggggggwgggmgmssssssssm",
  "fgfggfgggwgffffggwgfggggfgggggmgmsmmmmsmmm",
  "fggggggggwgggggggwggggggggwgmgmgmssssssssm",
  "fggggggggggffffggwwwwggwwwwgmgmgmmmssmmmmm",
  "fffffffggfffffffffggggggggwgmgmggggggggggm",
  "ffffffggfffffgfffffgfffgggwgmggggggggggggm",
  "fgfgfgggffffgggffffgfffgggwgmgggmmmmmmmmmm",
  "mgggfgggfffgggggfffgggggggwggggggggmgggggm",
  "mgggfgggffffgggffffgfgggggwggggggggmgggggm",
  "mggggggggffffgffffggfgggggwwwgwwwwgmgmmmmm",
  "mggggggggggggggggggggggggggggggggwgggggggm",
  "mmmmmmmmmggggmmmmmmmggmmmmgggggggwmmmmmmgm",
  "msssssssmggggmgggggggggggmgggggggwmmmmmmmm",
  "msmmssssmggggmggggggggfggmggwwwwwwwwmmwwmm",
  "msmmssssmggggmgfggwwggfggmggwwmwwwwwmmwwmm",
  "msssssssmggmgmggggwwggfggmggwwwwmmwwmmwwmm",
  "msssssssmggmgggggggggggggmggwwwwmmwwmmwwmm",
  "mssssssmmmmmggfgggggfffggmggwwwwwwwwmmwwmm",
  "mssssssssmmmggfgwwwggfgggmggwwwwwwwwmmwwmm",
  "mssssssssmmmggfggggggfgggmggwwwwwwwwwwwwmm",
  "msssssssssgggggggggggggggmmmwwwwwwwwwwwwmm",
  "mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm",
];

const powerDungeonMap = [
  "wwwwwwwwwwwwwwwwwwwwwwwwwwww",
  "wpppwwwwwwwwwwwwwwwwwpppwwww",
  "wpppwwwwwwwwpppwwwwwwpppwwww",
  "wwpwwwwppppppppwwwwwwpppwwww",
  "wwpwwwwpwwwwpppwwwwwwwpwwwww",
  "wwppppppwwwwwwwwwwwwwwpwwwww",
  "wwpwwwwwwwwwwwwwwwwwwwpwwwww",
  "wwpwwwwwwwwwwwwwwwwpppppppww",
  "wwpwwwwwwwwpppppwwwpppppppww",
  "wwppppppwwwpppppwwwpppppppww",
  "wwwpwwwpwwwpppppwwwpppppppww",
  "wwwpwwwpwwwwwpwwwwwwwwpwwwww",
  "wwpppwwpwwwwwpwwwwwwwwpwwwww",
  "wwpppwwpwwwwwpwwwwwwpppppwww",
  "wwpppwwpwwwwwpwwwwwwpwwwpwww",
  "wwwwwwwppppppppppppppwwwpwww",
  "wwwwwwwpwwwwwwwwwwwwpwwwpwww",
  "wwwwwwwpwwwwwwwwwwwwpwwwpwww",
  "wwwwwwwpwwwwwwwwwwppppwwpwww",
  "wwpppwwpwwpppwwwwwppppwwpwww",
  "wwpppppppppppwwwwwppppwwpwww",
  "wwpppwwpwwpppwwwwwwwwwwwpwww",
  "wwwwwwwpwwwwwwpppppppppppwww",
  "wwwwwwwpwwwwwwpwwwwwwwwwwwww",
  "wwwwwwppppwwwwpwwwwwwwwwwwww",
  "wwwwwwppppwwpppppwwwwwwwwwww",
  "wwwwwwppppwwpppppwwwwwwwwwww",
  "wwwwwwwwwwwwwwwwwwwwwwwwwwww",
];

const courageDungeonMap = [
  "wwwwwwwwwwwwwwwwwwwwwwwwwwww",
  "wwpppppwwwwwpppwwwwwwwwwwwww",
  "wwppppppppwwpppwwwppppwwwwww",
  "wwpppppwwpwwpppwwwwwwpwwwwww",
  "wwwwpwwwwpwwwpwwwwwwwpwppppw",
  "wwwwpwwwwppppppppppwwppppppw",
  "wwwwpwwwwwwwwpwwwwpwwwwppppw",
  "wwpppppwwwwwwwwwwwpwwwwppppw",
  "wwpppppppppppppppppwwwwwwpww",
  "wwpppppwwwwwwwwwwwwwwwwwwpww",
  "wwwwpwwwwwwwwwppppppppwwwpww",
  "wwwwpwwwwwwwwwppppppppwwwpww",
  "wwwwpwwpppppwwppppppppwwwpww",
  "wwpppppppppppppwwwpwwwwwwpww",
  "wwwwwwwpppppwwwwwwpwwwwwwpww",
  "wwwwpwwwwpwwwwwwpppppwwwwpww",
  "wwwwpwwwwpwwwwwwppppppppppww",
  "wwwwpwwwwpppppwwpppppwwwwpww",
  "wwppppwwwpwwwpwwwwpwwwwwwpww",
  "wwpwwpwwwpwwwpwwwwpwwwwwwpww",
  "wwpwwpwwppppppppppppppppppww",
  "wwpwwwwwwwwwwwwwwwpwwwwpwwww",
  "wwppppppwwppppppppppppwpwwww",
  "wwpwwpppwwpwwpwwwwpwwwwpwwww",
  "wwpwwpppwwpwwpwwwwpwwpppppww",
  "wwpwwppppppwpppwwwppppppppww",
  "wwwwwwwwwwwwpppwwwwwwwwwwwww",
  "wwwwwwwwwwwwwwwwwwwwwwwwwwww",
];

const wisdomDungeonMap = [
  "wwwwwwwwwwwwwwwwwwwwwwwwwwww",
  "wwwwwwwwwwwwwwwwwwwwwwwwwwww",
  "wwwwwwwwwwwwwwwwwwwwwwwwwwww",
  "wwwppppppppppppppppppppppwww",
  "wwwpwwwwwwwwwwwpwwwwwwwwpwww",
  "wwwpwwwwwwwwwwwpwwwwwwwwpwww",
  "wwwpwwpppwpppwpppwpppwwwpwww",
  "wwwpwwpppppppwpppwpppwwwpwww",
  "wwwpwwpppwpppwpppwpppwwwpwww",
  "wwwpwwwwwwwpwwwpwwwpwwwwpwww",
  "wwwpwwpppwwpwwwpwwwpwppwpwww",
  "wwwppppppppppppppppppppwpwww",
  "wwwpwwpppwwpwwwwwwwpwppwpwww",
  "wwwpwwwpwwwpwwwwwwwpwwwwpwww",
  "wwwpwwpppwpppwpppwpppwwwpwww",
  "wwwpwwpppwpppppppwpppwwwpwww",
  "wwwpwwpppwpppwpppwpppwwwpwww",
  "wwwpwwwpwwwwwwwpwwwwwwwwpwww",
  "wwwpwwpppwwwwpppppwwpppwpwww",
  "wwwpwwpppwwwwpppppwwpppwpwww",
  "wwwpwwwwwwwwwwwwwwwwwpwwpwww",
  "wwwppppppppppppppppppppppwww",
  "wwwwwwpwwwwwwwpwwwwwwpwwwwww",
  "wwwwwwpwwwwwwwpwwwwwwpwwwwww",
  "wwwwpppppwwwpppppwwpppppwwww",
  "wwwwpppppwwwpppppwwpppppwwww",
  "wwwwpppppwwwpppppwwpppppwwww",
  "wwwwwwwwwwwwwwwwwwwwwwwwwwww",
];

//\\//\\//\\//\\//\\//\\//\\\\//\\//\\//\\//\\//\\//\\\\//\\//\\//\\//\\//\\//\\
// Other consts

const tileSize = 15;
const defaultBackgroundColor = "#ffffff";

//\\//\\//\\//\\//\\//\\//\\\\//\\//\\//\\//\\//\\//\\\\//\\//\\//\\//\\//\\//\\
// Exports

export {
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
  tileSize,
  defaultBackgroundColor,
};
