let i: 3 = 3
// @ts-expect-error TS2322: Type '4' is
i = 4

let j = [1, 2, 3]
j.push(4)
// @ts-expect-error TS2345: Argument of type '"5"' is not assignable to parameter of type 'number'.
j.push('5')

// @ts-expect-error TS2322: Type '4' is not assignable to type 'never'.
let k: never = 4

let l: unknown = 4
// @ts-expect-error TS2571: Object is of type 'unknown'.
let m = l * 2

export {};


