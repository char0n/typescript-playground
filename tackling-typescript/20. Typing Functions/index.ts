type RepeatType = (str: string, times: number) => string;

interface RepeatInterface {
  (str: string, times: number): string;
}

interface Incrementor1 {
  (x: number): number;
  increment: number;
}

const incrementor1: Incrementor1 = (a) => a + incrementor1.increment;
incrementor1.increment = 2;

type Incrementor2 = ((x: number) => number) & { increment: number };

const incrementor2: Incrementor2 = (a) => a + incrementor2.increment;
incrementor2.increment = 3;

// Checking if a callable value matches a function type #
type StringPredicate = (str: string) => boolean;
const pred1: StringPredicate = (str) => str.length > 0;
function pred2(str: string): boolean {
  return str.length > 0;
}
const pred2Func: StringPredicate = pred2;
function pred3(...[str]: Parameters<StringPredicate>): ReturnType<StringPredicate> {
  return str.length > 0;
}


type StringMapFunction = (str: string) => string;
const twice: StringMapFunction = (str) => str + str;

['a', 'b', 'c'].map((str) => str + str);


function trim1(str?: string): string {
  // Internal type of str:
  // %inferred-type: string | undefined
  str;

  if (str === undefined) {
    return '';
  }
  return str.trim();
}

// External type of trim1:
// %inferred-type: (str?: string | undefined) => string
trim1;
trim1('\n  abc \t');
trim1();
trim1(undefined);


function trim2(str: undefined|string): string {
  // Internal type of str:
  // %inferred-type: string | undefined
  str;

  if (str === undefined) {
    return '';
  }
  return str.trim();
}

trim2('\n  abc \t');
// @ts-expect-error: Expected 1 arguments, but got 0. (2554)
trim2();
trim2(undefined);


function trim3(str = ''): string {
  // Internal type of str:
  // %inferred-type: string
  str;

  return str.trim();
}

// External type of trim2:
// %inferred-type: (str?: string) => string
trim3;


// We can also specify both a type and a default value
function trim4(str: string = ''): string {
  return str.trim();
}

// We can use tuple types such as [string, number] for rest parameters.
// We can destructure rest parameters (not just normal parameters).
function repeat1(...[str, times]: [string, number]): string {
  return str.repeat(times);
}


// Named parameters
function padStart({ str, len, fillStr = ' ' }: { str: string, len: number, fillStr: string }) {
  return str.padStart(len, fillStr);
}

// this as a parameter
function toIsoString(this: Date): string {
  return this.toISOString();
}
// @ts-expect-error: Argument of type '"abc"' is not assignable to
// parameter of type 'Date'. (2345)
toIsoString.call('abc');

const obj = { toIsoString };
// @ts-expect-error: The 'this' context of type
// '{ toIsoString: (this: Date) => string; }' is not assignable to
// method's 'this' of type 'Date'. [...]
obj.toIsoString()


// Overloading function declarations
interface Customer {
  id: string;
  fullName: string;
}

const jane = {id: '1234', fullName: 'Jane Bond'};
const lars = {id: '5678', fullName: 'Lars Croft'};
const idToCustomer = new Map<string, Customer>([
  ['1234', jane],
  ['5678', lars],
]);

function getFullName(customerOrMap: Customer): string;
function getFullName(customerOrMap: Map<string, Customer>, id: string): string;
function getFullName(
  customerOrMap: Customer | Map<string, Customer>,
  id?: string
): string {
  if (customerOrMap instanceof Map) {
    if (id === undefined) throw new Error();
    const customer = customerOrMap.get(id);
    if (customer === undefined) {
      throw new Error('Unknown ID: ' + id);
    }
    customerOrMap = customer;
  } else {
    if (id !== undefined) throw new Error();
  }
  return customerOrMap.fullName;
}
// @ts-expect-error: Argument of type 'Map<string, Customer>' is not
// assignable to parameter of type 'Customer'. [...]
getFullName(idToCustomer);
// @ts-expect-error: Argument of type '{ id: string; fullName: string; }'
// is not assignable to parameter of type 'Map<string, Customer>'.
// [...]
getFullName(lars, '5678'); // ID not allowed


// Overloading via interfaces
interface GetFullName {
  (customerOrMap: Customer): string;
  (customerOrMap: Map<string, Customer>, id: string): string;
}
const getFullName1: GetFullName = (
  customerOrMap: Customer | Map<string, Customer>,
  id?: string
): string => {
  if (customerOrMap instanceof Map) {
    if (id === undefined) throw new Error();
    const customer = customerOrMap.get(id);
    if (customer === undefined) {
      throw new Error('Unknown ID: ' + id);
    }
    customerOrMap = customer;
  } else {
    if (id !== undefined) throw new Error();
  }
  return customerOrMap.fullName;
}

// Overloading on string parameters (event handling etc.)
function addEventListener(elem: any, type: 'click',
                          listener: (event: any) => void): void;
function addEventListener(elem: any, type: 'keypress',
                          listener: (event: any) => void): void;
function addEventListener(elem: any, type: string,  // (A)
                          listener: (event: any) => void): void {
  elem.addEventListener(type, listener); // (B)
}

// Overloading methods
class StringBuilder {
  #data = '';

  add(num: number): this;
  add(bool: boolean): this;
  add(str: string): this;
  add(value: any): this {
    this.#data += String(value);
    return this;
  }

  toString() {
    return this.#data;
  }
}
const sb = new StringBuilder();
sb
  .add('I can see ')
  .add(3)
  .add(' monkeys!')
;


// Overloading interface methods
interface ArrayConstructor {
  from<T>(arrayLike: ArrayLike<T>): T[];
  from<T, U>(
    arrayLike: ArrayLike<T>,
    mapfn: (v: T, k: number) => U,
    thisArg?: any
  ): U[];
}


// The rules for assignability
const trg1: (x: RegExp) => Object = (x: Object) => /abc/;
const trg2: () => void = () => new Date();

// @ts-expect-error: Type '(x: string) => string' is not assignable to
// type '() => string'. (2322)
const trg3: () => string = (x: string) => 'abc';
const trg4: (x: string) => string = () => 'abc';
// Why is that? The target specifies the expectations for the source: It must accept the parameter x. Which it does (but it ignores it). This permissiveness enables:
['a', 'b'].map(x => x + x)

export { };
