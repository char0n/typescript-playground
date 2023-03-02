// Each Array element has the type `string`:
const myStringArray: string[] = ['fee', 'fi', 'fo', 'fum'];

// Each Array element has the type `string`:
const myStringArray1: Array<string> = ['fee', 'fi', 'fo', 'fum'];

// tuple
const yes: [string, number, boolean] = ['test', 1, true];

interface StringArray {
  [index: number]: string;
}

const stringArray: StringArray = ['a', 'b', 'c'];

interface FirstNamesAndLastName {
  [index: number]: string;
  lastName: string;
}

const ducks: FirstNamesAndLastName = {
  0: 'Huey',
  1: 'Dewey',
  2: 'Louie',
  lastName: 'Duck',
};

// %inferred-type: (string | number)[]
const arr = [123, 'abc'];

function func(p: [number, number]) {
  return p;
}
// %inferred-type: number[]
const pair1 = [1, 2];

// @ts-expect-error: Argument of type 'number[]' is not assignable to
// parameter of type '[number, number]'. [...]
func(pair1);

// %inferred-type: readonly ["igneous", "metamorphic", "sedimentary"]
const rockCategories = ['igneous', 'metamorphic', 'sedimentary'] as const;

// %inferred-type: readonly [1, 2, 3, 4]
const numbers1 = [1, 2, 3, 4] as const;
// %inferred-type: number[]
const numbers2 = [1, 2, 3, 4];

// %inferred-type: readonly [true, "abc"]
const booleanAndString1 = [true, 'abc'] as const;
// %inferred-type: (string | boolean)[]
const booleanAndString2 = [true, 'abc'];

let arr1 = [1, 2] as const;
// @ts-expect-error: Cannot assign to '1' because it is a read-only
// property. (2540)
arr1[1] = 3;


// never out of bounds
const messages1: string[] = ['Hello'];

// %inferred-type: string
const message = messages1[3]; // (A)


// tuples
const tmessages: [string] = ['Hello'];

// @ts-expect-error: Tuple type '[string]' of length '1' has no element
// at index '1'. (2493)
const messages = tmessages[1];

export { };
