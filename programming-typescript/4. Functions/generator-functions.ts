function* createFibonacciGenerator() {
  let a = 0
  let b = 1
  while (true) {
    yield a;
      [a, b] = [b, a + b]
  }
}

// %inferred-type: Generator<number, void, unknown  >
let fibonacciGenerator = createFibonacciGenerator()

export {};
