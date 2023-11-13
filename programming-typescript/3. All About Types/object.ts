let a: object = {
    b: 'x'
};

// a.b;   // Error TS2339: Property 'b' does not exist on type 'object'.


let aa = {
    b: 'x'
}

let bb = {
    c: {
        d: 'f'
    }
}

aa.b;
bb.c.d;


let aaa: {b: number} = {
    b: 12
}

const aaaa = {
    b: 12
}


let cccc: {
    firstName: string
    lastName: string
} = {
    firstName: 'john',
    lastName: 'barrowman'
}

class Person {
    constructor(
        public firstName: string,   // public is shorthand for
                                    // this.firstName = firstName
        public lastName: string
    ) {}
}
cccc = new Person('matt', 'smith') // OK


let aaaaa: {b: number}

// aaaaa = {}  // Error TS2741: Property 'b' is missing in type '{}'
               // but required in type '{b: number}'.
// aaaaa = {
//     b: 1,
//     c: 2  // Error TS2322: Type '{b: number; c: number}' is not assignable
// }       // to type '{b: number}'. Object literal may only specify known
//         // properties, and 'c' does not exist in type '{b: number}'.

let obj: {
    b: number,
    c?: string,
    [key: number]: boolean // index signature
};

obj = {b: 1}
obj = {b: 1, c: undefined}
obj = {b: 1, c: 'd'}
obj = {b: 1, 10: true}
obj = {b: 1, 10: true, 20: false}
// obj = {10: true}          // Error TS2741: Property 'b' is missing in type
                        // '{10: true}'.
// obj= {b: 1, 33: 'red'}   // Error TS2741: Type 'string' is not assignable
                        // to type 'boolean'.


let airplaneSeatingAssignments: {
    [seatNumber: string]: string
} = {
    '34D': 'Boris Cherny',
    '34E': 'Bill Gates'
}

let user: { readonly firstName: string } = {
    firstName: 'Joe',
};

user.firstName;
// user.firstName = 'Jane'

let danger: {};

danger = [];
danger = 3;
danger = {};
danger = { x: 2 }
// danger = null
// danger = undefined

export {};