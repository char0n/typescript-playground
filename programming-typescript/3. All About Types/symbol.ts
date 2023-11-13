// https://www.typescriptlang.org/docs/handbook/symbols.html

let a = Symbol('a')         // symbol
let b: symbol = Symbol('b') // symbol
var c = a === b             // boolean
// let d = a + 'x'             // Error TS2469: The '+' operator cannot be applied
                            // to type 'symbol'.

const e = Symbol('e')                // typeof e
const f: unique symbol = Symbol('f') // typeof f
// let g: unique symbol = Symbol('f')   // Error TS1332: A variable whose type is a
                                     // 'unique symbol' type must be 'const'.
let h = e === e             // boolean
// let i = e === f             // Error TS2367: This condition will always return
                            // 'false' since the types 'unique symbol' and
                            // 'unique symbol' have no overlap.

declare const sym1: unique symbol;

// Works - refers to a unique symbol, but its identity is tied to 'sym1'.
let sym2: typeof sym1 = sym1;

const sym3: symbol = Symbol.for('1');
const sym4: symbol = Symbol.for('1');

if (sym3 === sym4) {

}

export {};