class A {
  protected constructor() {}
}

class B extends A {} // ok
// @ts-expect-error TS2674: Constructor of class A is protected and only accessible within the class declaration.
new A()
// @ts-expect-error TS2674: Constructor of class B is protected and only accessible within the class declaration.
new B()

export {};
