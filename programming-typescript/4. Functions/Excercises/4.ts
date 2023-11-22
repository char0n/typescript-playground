function call<T extends [unknown, string, ...unknown[]], R>(
  f: (...args: T) => R,
  ...args: T
): R {
  return f(...args)
}

function fillString(length: number, value: string): string[] {
  return Array.from({length}, () => value)
}

function fillString2(length: number, value1: string, value2: string): string[] {
  return Array.from({length}, () => value1 + value2)
}

function fillNumber(length: number, value: number): number[] {
  return Array.from({length}, () => value)
}

call(fillString, 10, 'a');
call(fillString2, 10, 'a', 'b');
// @ts-expect-error TS2345
call(fillNumber, 10, 1);

export {};
