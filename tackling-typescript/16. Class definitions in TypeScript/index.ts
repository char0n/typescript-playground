const publicInstanceFieldKey = Symbol('publicInstanceFieldKey');
const publicPrototypeMethodKey = Symbol('publicPrototypeMethodKey');

function test(arg: typeof publicInstanceFieldKey) {

}

// @ts-expect-error: TS2345: Argument of type 'typeof publicPrototypeMethodKey' is not assignable to parameter of type 'typeof publicInstanceFieldKey'.
test(publicPrototypeMethodKey);

class PersonPrivateProperty {
  constructor(private name: string) {
  }
  sayHello() {
    return `Hello ${this.name}!`;
  }
}

class PersonPrivateField {

  #name: string;
  constructor(name: string) {
    this.#name = name;
  }
  sayHello() {
    return `Hello ${this.#name}!`;
  }
}

class Point {
  x: number = 1;
  y: number = 2;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

class Point1 {
  x!: number; // (A)
  y!: number; // (B)
  constructor() {
    this.initProperties();
  }
  initProperties() {
    this.x = 0;
    this.y = 0;
  }
}


export { };

