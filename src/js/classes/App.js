class App {
  #previousMap;
  #previousTerrains;
  #currentMap;
  #currentTerrains;

  set previousMap(map) {
    this.#previousMap = map;
  }

  get previousMap() {
    return this.#previousMap;
  }

  set previousTerrains(terrains) {
    this.#previousTerrains = terrains;
  }

  get previousTerrains() {
    return this.#previousTerrains;
  }

  set currentMap(map) {
    this.#currentMap = map;
  }

  get currentMap() {
    return this.#currentMap;
  }

  set currentTerrains(terrains) {
    this.#currentTerrains = terrains;
  }

  get currentTerrains() {
    return this.#currentTerrains;
  }
}

export default App;
