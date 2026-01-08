import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { mysteryFunction } from "./index.ts";

const cases: { input: number[], expected: number[] }[] = [
  { input: [0], expected: [0] },
]

describe("mysteryFunction", () => {
  cases.map(({ input, expected }) => {
    it(`returns ${JSON.stringify(expected)} given ${JSON.stringify(input)}`, () => {
      const output: number[] = mysteryFunction(input);
      assert.deepEqual(output, expected);
    });
  });
});
