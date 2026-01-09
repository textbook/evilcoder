import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { mysteryFunction } from "./index.ts";
import { properties } from "@evilcoder/properties";

const cases: { input: number[]; expected: number[] }[] = [
	{ input: [0], expected: [0] },
];

describe("mysteryFunction", () => {
	cases.map(({ input, expected }) => {
		it(`returns ${JSON.stringify(expected)} given ${JSON.stringify(input)}`, () => {
			const output: number[] = mysteryFunction(input);
			assert.deepEqual(output, expected);
		});
	});
});

describe("test cases", () => {
	it("must exist", () => {
		assert.ok(cases.length > 0);
	});

	it("must all match properties", () => {
		cases.forEach(({ input, expected }, index) =>
			assert.ok(
				Object.entries(properties).every(([, predicate]) =>
					predicate(input, expected),
				),
				`case #${index} does not match all properties`,
			),
		);
	});
});
