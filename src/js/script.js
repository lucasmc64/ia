const hyruleTerrains = new Map([
  ["grass", { cost: 10, label: "Grama", color: "#92d050" }],
  ["sand", { cost: 20, label: "Areia", color: "#c4bc96" }],
  ["forest", { cost: 100, label: "Floresta", color: "#00b050" }],
  ["mountain", { cost: 150, label: "Montanha", color: "#948a54" }],
  ["water", { cost: 180, label: "Água", color: "#548dd4" }],
]);

const dungeonTerrains = new Map([
  ["path", { cost: 10, label: "Caminho", color: "#e1e1e1" }],
  ["wall", { cost: null, label: "Parede", color: "#b7b7b7" }],
]);

terrains.get("grass");

const hyruleMap = [42][42];
