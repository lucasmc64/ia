class Link {
  #x;
  #y;

  #hasPendantOfCourage;
  #hasPendantOfPower;
  #hasPendantOfWisdom;

  constructor(x = 0, y = 0) {
    this.#x = x;
    this.#y = y;

    this.#hasPendantOfCourage = false;
    this.#hasPendantOfPower = false;
    this.#hasPendantOfWisdom = false;
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
}

export default Link;
