function call<T extends unknown[], R>(
  f: (...args: T) => R,
  ...args: T
): R {
  return f(...args)
}

function fill(length: number, value: string): string[] {
  return Array.from({length}, () => value)
}

call(fill, 10, 'a') // evaluates to an array of 10 'a's

// @ts-expect-error TS2554: Expected 3 arguments; got 2.
let b = call(fill, 10)
// @ts-expect-error TS2554: Expected 3 arguments; got 4.
let c = call(fill, 10, 'a', 'z')

export {};
