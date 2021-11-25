let a = 1234n               // bigint
const b = 5678n             // 5678n
var c = a + b               // bigint
let d = a < 1235            // boolean
// let e = 88.5n               // Error TS1353: A bigint literal must be an integer.
let f: bigint = 100n        // bigint
let g: 100n = 100n          // 100n
// let h: bigint = 100         // Error TS2322: Type '100' is not assignable
                            // to type 'bigint'.

export {};