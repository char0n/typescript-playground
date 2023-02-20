class Color {

  private kind = 'color';
  constructor(public name: string) {
  }
}

class Person {
  public name: string;
  private kind = 'person';
  constructor(name: string) {
    this.name = name;
  }
}

const person: Person = new Person('Jane');
// @ts-expect-error: TS2322: Type 'Person' is not assignable to type 'Color'. Types have separate declarations of a private property 'kind'.
const color: Color = person;

export { };
