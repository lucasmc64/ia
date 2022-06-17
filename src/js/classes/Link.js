class Link {
  #x;
  #y;
  #image;

  #hasPendantOfCourage;
  #hasPendantOfPower;
  #hasPendantOfWisdom;

  constructor(x = 0, y = 0) {
    this.#x = x;
    this.#y = y;
    this.#image = "src/assets/link_128px.png";

    this.#hasPendantOfCourage = false;
    this.#hasPendantOfPower = false;
    this.#hasPendantOfWisdom = false;
  }

  set x(x) {
    this.#x = x;
  }

  get x() {
    return x;
  }

  set y(y) {
    this.#y = y;
  }

  get y() {
    return y;
  }

  get image() {
    return image;
  }

  set hasPendantOfCourage(hasPendantOfCourage) {
    this.#hasPendantOfCourage = hasPendantOfCourage;
  }

  get hasPendantOfCourage() {
    return hasPendantOfCourage;
  }

  set hasPendantOfPower(hasPendantOfPower) {
    this.#hasPendantOfPower = hasPendantOfPower;
  }

  get hasPendantOfPower() {
    return hasPendantOfPower;
  }

  set hasPendantOfWisdom(hasPendantOfWisdom) {
    this.#hasPendantOfWisdom = hasPendantOfWisdom;
  }

  get hasPendantOfWisdom() {
    return hasPendantOfWisdom;
  }
}

export default Link;
