// narrowing via if and type guards
function getScore(value: number|string): number {
  if (typeof value === 'number') { // (A)
    // %inferred-type: number
    value;
    return value;
  }
  if (typeof value === 'string') { // (B)
    // %inferred-type: string
    value;
    return value.length;
  }
  throw new Error('Unsupported value: ' + value);
}

// narrowing via switch and a type guard
function getScoreSwitch(value: number|string): number {
  switch (typeof value) {
    case 'number':
      // %inferred-type: number
      value;
      return value;
    case 'string':
      // %inferred-type: string
      value;
      return value.length;
    default:
      throw new Error('Unsupported value: ' + value);
  }
}

// the type unknown
function parseStringLiteral(stringLiteral: string): string {
  const result: unknown = JSON.parse(stringLiteral);
  if (typeof result === 'string') { // (A)
    return result;
  }
  throw new Error('Not a string literal: ' + stringLiteral);
}

// narrowing via built-in type guards

// strict equality (===)
function func(value: unknown) {
  if (value === 'abc') {
    // %inferred-type: "abc"
    value;
  }
}

interface Book {
  title: null | string;
  isbn: string;
}

function getTitle(book: Book) {
  if (book.title === null) {
    // %inferred-type: null
    book.title;
    return '(Untitled)';
  } else {
    // %inferred-type: string
    book.title;
    return book.title;
  }
}

// typeof, instanceof, Array.isArray
function func1(value: Function|Date|number[]) {
  if (typeof value === 'function') {
    // %inferred-type: Function
    value;
  }

  if (value instanceof Date) {
    // %inferred-type: Date
    value;
  }

  if (Array.isArray(value)) {
    // %inferred-type: number[]
    value;
  }
}

// checking for distinct properties via the operator in
type FirstOrSecond =
  | {first: string}
  | {second: string};

function func2(firstOrSecond: FirstOrSecond) {
  if ('second' in firstOrSecond) {
    // %inferred-type: { second: string; }
    firstOrSecond;
  }
}

function func3(firstOrSecond: FirstOrSecond) {
  // @ts-expect-error: Property 'second' does not exist on
  // type 'FirstOrSecond'. [...]
  if (firstOrSecond.second !== undefined) {
    // ···
  }
}

// the operator in doesn’t narrow non-union types
function func4(obj: object) {
  if ('name' in obj) {
    // %inferred-type: object
    obj;

    // @ts-expect-error: Property 'name' does not exist on type 'object'.
    obj.name;
  }
}

// checking the value of a shared property (discriminated unions)
type Teacher = { kind: 'Teacher', teacherId: string };
type Student = { kind: 'Student', studentId: string };
type Attendee = Teacher | Student;

function getId(attendee: Attendee) {
  switch (attendee.kind) {
    case 'Teacher':
      // %inferred-type: { kind: "Teacher"; teacherId: string; }
      attendee;
      return attendee.teacherId;
    case 'Student':
      // %inferred-type: { kind: "Student"; studentId: string; }
      attendee;
      return attendee.studentId;
    default:
      throw new Error();
  }
}

function getId1(attendee: Attendee) {
  if (attendee.kind === 'Teacher') {
    // %inferred-type: { kind: "Teacher"; teacherId: string; }
    attendee;
    return attendee.teacherId;
  } else if (attendee.kind === 'Student') {
    // %inferred-type: { kind: "Student"; studentId: string; }
    attendee;
    return attendee.studentId;
  } else {
    throw new Error();
  }
}

// narrowing dotted names
type MyType = {
  prop?: number | string,
};
function func5(arg: MyType) {
  if (typeof arg.prop === 'string') {
    // %inferred-type: string
    arg.prop; // (A)

    [].forEach((x) => {
      // %inferred-type: string | number | undefined
      arg.prop; // callbacks may be executed much later (think of asynchronous code), which is why TypeScript undoes narrowing inside callbacks.
    });

    // %inferred-type: string
    arg.prop;

    arg = {};

    // %inferred-type: string | number | undefined
    arg.prop; // the preceding assignment also undid narrowing.
  }
}

// narrowing Array element types
const mixedValues: ReadonlyArray<undefined|null|number> = [1, undefined, 2, null];

// NonNullable<Union> (line A) is a utility type that removes the types undefined and null from union type Union.
function isNotNullish<T>(value: T): value is NonNullable<T> { // (A)
  return value !== undefined && value !== null;
}

if (mixedValues.every(isNotNullish)) {
  // %inferred-type: readonly (number | null | undefined)[]
  mixedValues; // (A)
}

// the Array method .filter() produces Arrays with narrower types
// %inferred-type: (number | null | undefined)[]
const mixedValues1 = [1, undefined, 2, null];

// %inferred-type: number[]
const numbers = mixedValues1.filter(isNotNullish);

// alas, we must use a type guard function directly – an arrow function with a type guard is not enough:
// %inferred-type: (number | null | undefined)[]
const stillMixed1 = mixedValues1.filter(
  x => x !== undefined && x !== null);

// %inferred-type: (number | null | undefined)[]
const stillMixed2 = mixedValues1.filter(
  x => typeof x === 'number');

// user-defined type guards
function isFunction(value: unknown): value is Function {
  return typeof value === 'function';
}
// %inferred-type: (value: unknown) => value is Function
isFunction;

function func6(arg: unknown) {
  if (isFunction(arg)) {
    // %inferred-type: Function
    arg; // type is narrowed
  }
}

// alas, we have to use the type any for the parameter value because the type unknown does not let us make the function call in line A
function isFunction1(value: any): value is Function {
  try {
    value(); // (A)
    return true;
  } catch {
    return false;
  }
}
isFunction1;

function func7(arg: unknown) {
  if (isFunction1(arg)) {
    // %inferred-type: Function
    arg; // type is narrowed
  }
}



export { }
