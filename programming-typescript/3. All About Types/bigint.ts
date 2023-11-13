let a = 1234n               // bigint
const b = 5678n             // 5678n
var c = a + b               // bigint
let d = a < 1235            // boolean
// let e = 88.5n               // TS1353: A bigint literal must be an integer.
let f: bigint = 100n        // bigint
let g: 100n = 100n          // 100n
// @ts-expect-error TS2322: Type number is not assignable to type bigint
let h: bigint = 100

export {};
