let a = 'hello'             // string
var b = 'billy'             // string
const c = '!'               // '!'
let d = a + ' ' + b + c     // string
let e: string = 'zoom'      // string
let f: 'john' = 'john'      // 'john'
// let g: 'john' = 'zoe'       // Error TS2322: Type "zoe" is not assignable
                            // to type "john".
export {};