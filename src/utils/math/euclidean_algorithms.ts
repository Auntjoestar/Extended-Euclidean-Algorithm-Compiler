import type { STgcfrRes } from "../../types/STgcfrRes";
import type { Row } from "../../types/Row";

export function gcf(num1: number, num2: number): number {
  while (num2 != 0) {
    const mod = num1 % num2;
    num1 = num2;
    num2 = mod;
  }

  return num1;
}

export function* STgcfr(num1: number, num2: number): Generator<Row, STgcfrRes> {
  if (num2 === 0) {
    yield { a: num1, b: num2, q: null, r: null, s: 1, t: 0 };
    return { gcf: num1, s: 1, t: 0 };
  }

  const r = num1 % num2;
  const q = Math.floor(num1 / num2);

  const prev = yield* STgcfr(num2, r);

  const s = prev.t;
  const t = prev.s - prev.t * q;

  const row: Row = { a: num1, b: num2, q, s, r, t };
  yield row;

  return {
    gcf: prev.gcf,
    s,
    t,
  };
}
