let val1: Object;
val1 = 'string';

let val2: object;
val2 = new Date();

const val3: {prop: string} = {prop: 'val'};

interface ObjectType {
  prop: boolean;
}

let obj4: ObjectType;
obj4 = {prop: true};

type ObjType1 = {
  a: boolean,
  b: number;
  c: string,
};

interface ObjType2 {
  a: boolean,
  b: number;
  c: string,
}

interface Point {
  x: number;
  y: number;
}

type PointCopy1 = {
  [Key in keyof Point]: Point[Key]; // (A)
};

interface AddsStrings {
  add(str: string): this;
};

class StringBuilder implements AddsStrings {
  result = '';
  add(str: string) {
    this.result += str;
    return this;
  }
}

interface Point {
  x: number;
  y: number;
}
const point: Point = {x: 1, y: 2}; // OK

interface StringAndNumberKeys {
  [key: string]: Object;
  [key: number]: RegExp;
}

function f(x: StringAndNumberKeys) {
  return { str: x['abc'], num: x[123] };
}

interface I1 {
  [key: string]: boolean;

  // @ts-expect-error: Property 'myProp' of type 'number' is not assignable
  // to string index type 'boolean'. (2411)
  myProp: number;
}

function f1(x: {}): Object {
  return x;
}

function f2(x: {}): { toString(): string } {
  return x;
}

interface Point {
  x: number;
  y: number;
}

function computeDistance(point: Point) { /*...*/ }

computeDistance({x: 1, y: 2});
// @ts-expect-error: TS2345: Argument of type '{ x: number; y: number; z: number; }' is not assignable to parameter of type 'Point'.
//   Object literal may only specify known properties, and 'z' does not exist in type 'Point'.
computeDistance({x: 1, y: 2, z: 3});
const object = {x: 1, y: 2, z: 3};
computeDistance(object);


interface Person {
  first: string;
  middle?: string;
  last: string;
}
function computeFullName(person: Person) { /*...*/ }

// @ts-expect-error TS2345: Argument of type '{ first: string; mdidle: string; last: string; }' is not assignable to parameter of type 'Person'.
//   Object literal may only specify known properties, but 'mdidle' does not exist in type 'Person'. Did you mean to write 'middle'?
computeFullName({first: 'Jane', mdidle: 'Cecily', last: 'Doe'});

interface HasYear {
  year: number;
}

function getAge(obj: HasYear) {
  const yearNow = new Date().getFullYear();
  return yearNow - obj.year;
}

const date = {month: 2, day: 23, year: 2023};
getAge(date);

interface Empty { }
interface OneProp {
  myProp: number;
}

// @ts-expect-error: Type '{ myProp: number; anotherProp: number; }' is not
// assignable to type 'OneProp'.
//   Object literal may only specify known properties, and
//   'anotherProp' does not exist in type 'OneProp'. (2322)
const a: OneProp = { myProp: 1, anotherProp: 2 };
const b: Empty = {myProp: 1, anotherProp: 2}; // OK

interface WithoutProperties {
  [key: string]: never;
}

const emptyObject: WithoutProperties = {};


interface Point {
  x: number;
  y: number;
}

function computeDistance1(point: Point) { /*...*/ }

// @ts-expect-error: Argument of type '{ x: number; y: number; z: number; }'
// is not assignable to parameter of type 'Point'.
//   Object literal may only specify known properties, and 'z' does not
//   exist in type 'Point'. (2345)
computeDistance1({ x: 1, y: 2, z: 3 });

const obj = { x: 1, y: 2, z: 3 };
computeDistance1(obj);

computeDistance1({ x: 1, y: 2, z: 3 } as Point);

function computeDistance2<T extends Point>(point: T) { /*...*/ }
computeDistance2({ x: 1, y: 2, z: 3 }); // OK

interface PointEtc extends Point {
  [key: string]: unknown;
}

function computeDistance3(point: PointEtc) { /*...*/ }

computeDistance3({ x: 1, y: 2, z: 3 }); // OK

interface Incrementor {
  inc(): void
}
function createIncrementor(start = 0): Incrementor {
  return {
    // @ts-expect-error: Type '{ counter: number; inc(): void; }' is not
    // assignable to type 'Incrementor'.
    //   Object literal may only specify known properties, and
    //   'counter' does not exist in type 'Incrementor'. (2322)
    counter: start,
    inc() {
      // @ts-expect-error: Property 'counter' does not exist on type
      // 'Incrementor'. (2339)
      this.counter++;
    },
  };
}

function createIncrementor2(start = 0): Incrementor {
  return {
    counter: start,
    inc() {
      // @ts-expect-error: Property 'counter' does not exist on type
      // 'Incrementor'. (2339)
      this.counter++;
    },
  } as Incrementor;
}

function createIncrementor3(start = 0): Incrementor {
  const incrementor = {
    counter: start,
    inc() {
      this.counter++;
    },
  };
  return incrementor;
}

function compareDateStrings(
  a: {dateStr: string}, b: {dateStr: string}) {
  if (a.dateStr < b.dateStr) {
    return +1;
  } else if (a.dateStr > b.dateStr) {
    return -1;
  } else {
    return 0;
  }
}

const paramA = {dateStr: 'test', test: 3};
compareDateStrings(paramA, {dateStr: 'test2'})


// %inferred-type: Object
const obj1 = new Object();

// %inferred-type: any
const obj2 = Object.create(null);

// %inferred-type: {}
const obj3 = {};

// %inferred-type: { prop: number; }
const obj44 = {prop: 123};

// %inferred-type: object
const obj5 = Reflect.getPrototypeOf({});

const testType = 3;

interface Name {
  first: string;
  middle?: string;
  last: string;
}

const john: Name = {first: 'Doe', last: 'Doe'}; // (A)
const jane: Name = {first: 'Jane', middl1e: 'Cecily', last: 'Doe'} as Name;
const obj11 = {first: 'Jane', middl1e: 'Cecily', last: 'Doe'};
const jake: Name = obj11;


interface Interf {
  prop1?: string;
  prop2: undefined | string;
}

const obj111: Interf = { prop1: undefined, prop2: undefined };
const obj222: Interf = { prop2: undefined };
// @ts-expect-error: Property 'prop2' is missing in type '{}' but required
// in type 'Interf'. (2741)
const obj333: Interf = { };


interface MyInterface {
  readonly prop: number;
}

const objX: MyInterface = {
  prop: 1,
};

// @ts-expect-error: Cannot assign to 'prop' because it is a read-only
// property. (2540)
obj.prop = 2;

export {};
