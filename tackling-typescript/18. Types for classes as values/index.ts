class Point {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

function createPoint(
  PointClass: new (x: number, y: number) => Point, // (A)
  x: number, y: number
) {
  return new PointClass(x, y);
}

function createPoint1(
  PointClass: {new (x: number, y: number): Point},
  x: number, y: number
) {
  return new PointClass(x, y);
}

function parseObject(jsonObjectStr: string) {
  // %inferred-type: any
  const parsed = JSON.parse(jsonObjectStr);
  return parsed as Point;
}

interface Name {
  name: "string"
};

interface Age {
  age: number
};

type Person = Name & Age;


// %inferred-type: Point
const point = createPoint(Point, 3, 6);


export { };
