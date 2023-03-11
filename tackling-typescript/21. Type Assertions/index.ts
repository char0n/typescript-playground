const data: object = ['a', 'b', 'c'];

// @ts-expect-error: Property 'length' does not exist on type 'object'.
data.length; // (B)

(data as Array<string>).length;
// alternative syntax for type assertions
(<Array<string>> data).length;

interface Named {
  name: string;
}

// asserting an interface #
function getName(obj: object): string {
  if (typeof (obj as Named).name === 'string') { // (A)
    return (obj as Named).name; // (B)
  }
  return '(Unnamed)';
}

// asserting an index signature

type Dict = {[k:string]: any};

function getPropertyValue(dict: unknown, key: string): any {
  if (typeof dict === 'object' && dict !== null && key in dict) {
    // %inferred-type: object
    dict;

    // @ts-expect-error: Element implicitly has an 'any' type because
    // expression of type 'string' can't be used to index type '{}'.
    // [...]
    dict[key];

    return (dict as Dict)[key]; // (A)
  } else {
    throw new Error();
  }
}

// non-nullish assertion operator

const theName = 'Jane' as (null | undefined | string);

// @ts-expect-error: Object is possibly 'null'.
theName.length;
theName!.length; // => 4

// we know that a Map has a given key
function getLength(strMap: Map<string, string>, key: string): number {
  if (strMap.has(key)) {
    // we are sure x is not undefined:
    const value = strMap.get(key)!;
    return value.length;
  }
  return -1;
}

// we can avoid the nullish assertion operator whenever the values of a Map can’t be undefined
function getLength1(strMap: Map<string, string>, key: string): number {
  // %inferred-type: string | undefined
  const value = strMap.get(key);
  if (value === undefined) { // (A)
    return -1;
  }

  // %inferred-type: string
  value;

  return value.length;
}

// definite assignment assertions
class Point1 {
  // @ts-expect-error: Property 'x' has no initializer and is not definitely
  // assigned in the constructor.
  x: number;

  // @ts-expect-error: Property 'y' has no initializer and is not definitely
  // assigned in the constructor.
  y: number;

  constructor() {
    this.initProperties();
  }
  initProperties() {
    this.x = 0;
    this.y = 0;
  }
}

class Point2 {
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
