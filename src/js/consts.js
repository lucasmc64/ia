//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
// Terrenos

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

const limboTerrains = new Map([
  ["n", { cost: null, label: "Limbo", color: "#ffffff" }],
]);

const endLandTerrains = new Map([
  ["x", { cost: null, label: "Fim", color: "#000000" }],
]);

//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
// Imagens

const dungeonDoorImage = new Image();
const lostWoodsDoorImage = new Image();
const masterSwordImage = new Image();
const pendantOfPowerImage = new Image();
const pendantOfCourageImage = new Image();
const pendantOfWisdomImage = new Image();

dungeonDoorImage.src = "assets/dungeon_door_128px.png";
lostWoodsDoorImage.src = "assets/locked_door_128px.png";
masterSwordImage.src = "assets/sword_128px.png";
pendantOfPowerImage.src = "assets/power_128px.png";
pendantOfCourageImage.src = "assets/courage_128px.png";
pendantOfWisdomImage.src = "assets/wisdom_128px.png";

//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
// Locais (itens e passagens)

const hyruleLocales = new Map([
  ["powerDungeon", { x: 5, y: 32, image: dungeonDoorImage, goal: true }],
  ["courageDungeon", { x: 39, y: 17, image: dungeonDoorImage, goal: true }],
  ["wisdomDungeon", { x: 24, y: 1, image: dungeonDoorImage, goal: true }],
  ["lostWoods", { x: 6, y: 5, image: lostWoodsDoorImage, goal: false }],
  ["masterSword", { x: 2, y: 1, image: masterSwordImage, goal: false }],
  ["linksHouse", { x: 24, y: 27, image: null, goal: false }],
]);

const powerDungeonLocales = new Map([
  ["exitPowerDungeon", { x: 14, y: 26, image: dungeonDoorImage, goal: false }],
  ["pendantOfPower", { x: 13, y: 3, image: pendantOfPowerImage, goal: true }],
]);

const courageDungeonLocales = new Map([
  [
    "exitCourageDungeon",
    { x: 13, y: 25, image: dungeonDoorImage, goal: false },
  ],
  [
    "pendantOfCourage",
    { x: 13, y: 2, image: pendantOfCourageImage, goal: true },
  ],
]);

const wisdomDungeonLocales = new Map([
  ["exitWisdomDungeon", { x: 14, y: 25, image: dungeonDoorImage, goal: false }],
  [
    "pendantOfWisdom",
    { x: 15, y: 19, image: pendantOfWisdomImage, goal: true },
  ],
]);

//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
// Mapas

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

const endLandMap = [
  "-xxxxxx--xx-------xx--xxxxxx----",
  "-xxxxxx--xxx------xx--xxxxxxxx--",
  "-xx------xxxx-----xx--xx-----xx-",
  "-xx------xx-xx----xx--xx------xx",
  "-xxxxx---xx--xx---xx--xx------xx",
  "-xxxxx---xx---xx--xx--xx------xx",
  "-xx------xx----xx-xx--xx------xx",
  "-xx------xx-----xxxx--xx-----xx-",
  "-xxxxxx--xx------xxx--xxxxxxxx--",
  "-xxxxxx--xx-------xx--xxxxxx----",
];

//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
// Regiões

const hyrule = {
  map: [...hyruleMap],
  terrains: new Map(hyruleTerrains),
  locales: new Map(hyruleLocales),
};

const powerDungeon = {
  map: [...powerDungeonMap],
  terrains: new Map(dungeonTerrains),
  locales: new Map(powerDungeonLocales),
};

const courageDungeon = {
  map: [...courageDungeonMap],
  terrains: new Map(dungeonTerrains),
  locales: new Map(courageDungeonLocales),
};

const wisdomDungeon = {
  map: [...wisdomDungeonMap],
  terrains: new Map(dungeonTerrains),
  locales: new Map(wisdomDungeonLocales),
};

const limbo = {
  map: [],
  terrains: new Map(limboTerrains),
  locales: new Map(),
};

const endLand = {
  map: [...endLandMap],
  terrains: new Map(endLandTerrains),
  locales: new Map(),
};

//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
// Outras constantes

const tileSize = 20;
const defaultBackgroundColor = "#ffffff";
const linkSpeed = 250;

//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
// Exportações

export {
  hyrule,
  powerDungeon,
  courageDungeon,
  wisdomDungeon,
  limbo,
  endLand,
  tileSize,
  defaultBackgroundColor,
  linkSpeed,
};
