type Is = <T>(a: T, ...rest: [T, ...T[]]) => boolean

const is: Is = (a, ...rest) => {
  return rest.every((_) => _ === a)
}

// Compare a string and a string
is('string', 'otherstring') // false

// Compare a boolean and a boolean
is(true, false) // false

// Compare a number and a number
is(42, 42) // true

// Comparing two different types should give a compile-time error
// @ts-ignore-error TS2345: Argument of type '"foo"' is not assignable to parameter of type 'number'.
is(10, 'foo')

// [Hard] I should be able to pass any number of arguments
is([1], [1, 2], [1, 2, 3]) // false
