class Link {
  #x;
  #y;
  // #position;

  #image;

  #hasPendantOfCourage;
  #hasPendantOfPower;
  #hasPendantOfWisdom;

  #region;

  #observers;

  #canMove;

  #path;

  constructor(x, y, region) {
    if (!x && !y && !region)
      throw new Error(
        "Nem todos os parâmetros obrigatórios foram especificados.",
      );

    this.#x = x;
    this.#y = y;
    //this.#position = { x, y };

    this.#image = new Image();
    this.#image.src = "assets/link_128px.png";

    this.#hasPendantOfCourage = false;
    this.#hasPendantOfPower = false;
    this.#hasPendantOfWisdom = false;

    this.#region = region;

    this.#observers = new Map();

    this.#canMove = false;
    this.#path = [];
  }

  set x(x) {
    this.#x = x;
  }

  get x() {
    return this.#x;
  }

  set y(y) {
    this.#y = y;
  }

  get y() {
    return this.#y;
  }

  set position({ x, y }) {
    this.#x = x;
    this.#y = y;

    if (
      [...this.#region.locales.values()].some(
        (position) =>
          position.x + this.#region.axisCorrection.x === x &&
          position.y + this.#region.axisCorrection.y === y,
      )
    ) {
      [...this.#region.locales.entries()].forEach(([locale, position]) => {
        if (
          position.x + this.#region.axisCorrection.x === x &&
          position.y + this.#region.axisCorrection.y === y
        ) {
          this.notify(locale, null);
        }
      });
    } else {
      this.notify("linkPositionChange", {
        currentLinkPosition: { x, y },
        region: this.#region,
      });
    }
  }

  // get position() {
  //   return this.#position;
  // }

  get image() {
    return this.#image;
  }

  set hasPendantOfCourage(hasPendantOfCourage) {
    this.#hasPendantOfCourage = hasPendantOfCourage;
  }

  get hasPendantOfCourage() {
    return this.#hasPendantOfCourage;
  }

  set hasPendantOfPower(hasPendantOfPower) {
    this.#hasPendantOfPower = hasPendantOfPower;
  }

  get hasPendantOfPower() {
    return this.#hasPendantOfPower;
  }

  set hasPendantOfWisdom(hasPendantOfWisdom) {
    this.#hasPendantOfWisdom = hasPendantOfWisdom;
  }

  get hasPendantOfWisdom() {
    return this.#hasPendantOfWisdom;
  }

  set region({ region, linkPosition = null }) {
    this.notify("regionChange", {
      currentRegion: region,
      previousRegion: this.#region,
      currentLinkPosition: linkPosition ?? { x: this.#x, y: this.#y },
      previousLinkPosition: { x: this.#x, y: this.#y },
    });

    this.#region = region;
  }

  get region() {
    return this.#region;
  }

  set canMove(boolean) {
    this.#canMove = boolean;
    this.notify("movementPermissionChange", boolean);
  }

  get canMove() {
    return this.#canMove;
  }

  set path(path) {
    this.#path = path;
    this.notify("pathUpdated", null);
  }

  get path() {
    return this.#path;
  }

  subscribe(eventType, fn) {
    if (this.#observers.has(eventType))
      this.#observers.set(eventType, [...this.#observers.get(eventType), fn]);
    else this.#observers.set(eventType, [fn]);
  }

  unsubscribe(eventType, fnToRemove) {
    if (this.#observers.has(eventType)) {
      if (this.#observers.get(eventType).length > 1) {
        this.#observers.set(
          eventType,
          this.#observers.get(eventType).filter((fn) => {
            return fn !== fnToRemove;
          }),
        );
      } else {
        this.#observers.delete(eventType);
      }
    }
  }

  notify(eventType, data) {
    if (this.#observers.has(eventType)) {
      this.#observers.get(eventType).forEach((fn) => {
        fn(data);
      });
    }
  }
}

export default Link;
