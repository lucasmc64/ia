class Link {
  #x;
  #y;

  #image;

  #hasPendantOfCourage;
  #hasPendantOfPower;
  #hasPendantOfWisdom;

  #region;

  #observers;

  #canMove;

  constructor(x, y, region) {
    if (!x && !y && !region)
      throw new Error(
        "Nem todos os parâmetros obrigatórios foram especificados.",
      );

    this.#x = x;
    this.#y = y;

    this.#image = new Image();
    this.#image.src = "assets/link_128px.png";

    this.#hasPendantOfCourage = false;
    this.#hasPendantOfPower = false;
    this.#hasPendantOfWisdom = false;

    this.#region = region;

    this.#observers = new Map();

    this.#canMove = true;
  }

  set x(x) {
    if (
      [...this.#region.locales.values()].some(
        (position) =>
          position.x + this.#region.axisCorrection.x === x &&
          position.y + this.#region.axisCorrection.y === this.#y,
      )
    ) {
      [...this.#region.locales.entries()].forEach(([locale, position]) => {
        if (
          position.x + this.#region.axisCorrection.x === x &&
          position.y + this.#region.axisCorrection.y === this.#y
        ) {
          console.log(locale, this);
          this.notify(locale, null);
        }
      });
    } else {
      this.notify("linkPositionChange", {
        currentLinkPosition: { x, y: this.y },
        previousLinkPosition: { x: this.x, y: this.y },
        region: this.#region,
      });
    }

    this.#x = x;
  }

  get x() {
    return this.#x;
  }

  set y(y) {
    if (
      [...this.#region.locales.values()].some(
        (position) =>
          position.x + this.#region.axisCorrection.x === this.#x &&
          position.y + this.#region.axisCorrection.y === y,
      )
    ) {
      [...this.#region.locales.entries()].forEach(([locale, position]) => {
        if (
          position.x + this.#region.axisCorrection.x === this.#x &&
          position.y + this.#region.axisCorrection.y === y
        ) {
          console.log(locale, this);
          this.notify(locale, null);
        }
      });
    } else {
      this.notify("linkPositionChange", {
        currentLinkPosition: { x: this.x, y },
        previousLinkPosition: { x: this.x, y: this.y },
        region: this.#region,
      });
    }

    this.#y = y;
  }

  get y() {
    return this.#y;
  }

  get image() {
    return this.#image;
  }

  set hasPendantOfCourage(hasPendantOfCourage) {
    this.notify("pendantCaught", null);
    this.#hasPendantOfCourage = hasPendantOfCourage;
  }

  get hasPendantOfCourage() {
    return this.#hasPendantOfCourage;
  }

  set hasPendantOfPower(hasPendantOfPower) {
    this.notify("pendantCaught", null);
    this.#hasPendantOfPower = hasPendantOfPower;
  }

  get hasPendantOfPower() {
    return this.#hasPendantOfPower;
  }

  set hasPendantOfWisdom(hasPendantOfWisdom) {
    this.notify("pendantCaught", null);
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
    this.notify("movePermissionChange", boolean);
    this.#canMove = boolean;
  }

  get canMove() {
    return this.#canMove;
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
