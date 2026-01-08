import assert from "node:assert/strict";
import { describe, it } from "node:test";

import fc from "fast-check";

import { mysteryFunction } from "@evilcoder/exercise";

const VERBOSITY = 2;

describe("mysteryFunction", () => {
	it("returns an array of numbers", () => {
		fc.assert(
			fc.property(shortArrayOfSmallPositiveIntegers(), (input) => {
				const output = mysteryFunction(input);
				assert.ok(Array.isArray(output));
				output.forEach((value) => assert.equal(typeof value, "number"));
			}),
			{ verbose: VERBOSITY },
		);
	});

	it("preserves array length", () => {
		fc.assert(
			fc.property(shortArrayOfSmallPositiveIntegers(), (input) => {
				const output = mysteryFunction(input);
				assert.equal(output.length, input.length);
			}),
			{ verbose: VERBOSITY },
		);
	});

	it("returns no value less than zero", () => {
		fc.assert(
			fc.property(shortArrayOfSmallPositiveIntegers(), (input) => {
				const output = mysteryFunction(input);
				output.forEach((value) => assert.ok(value >= 0));
			}),
			{ verbose: VERBOSITY },
		);
	});

	it("returns no value exceeding array length", () => {
		fc.assert(
			fc.property(shortArrayOfSmallPositiveIntegers(), (input) => {
				const output = mysteryFunction(input);
				output.forEach((value) => assert.ok(value < input.length));
			}),
			{ verbose: VERBOSITY },
		);
	});

	it("returns no value exceeding the number of unique elements", () => {
		fc.assert(
			fc.property(shortArrayOfSmallPositiveIntegers(), (input) => {
				const output = mysteryFunction(input);
				output.forEach((value) => assert.ok(value < unique(input).length));
			}),
			{ verbose: VERBOSITY },
		);
	});

	it("returns as many unique outputs as unique inputs", () => {
		fc.assert(
			fc.property(shortArrayOfSmallPositiveIntegers(), (input) => {
				const output = mysteryFunction(input);
				assert.equal(unique(output).length, unique(input).length);
			}),
			{ verbose: VERBOSITY },
		);
	});

	it("returns unique outputs if the inputs are unique", () => {
		fc.assert(
			fc.property(
				fc.uniqueArray(smallPositiveInteger(), { maxLength: 10 }),
				(input) => {
					const output = mysteryFunction(input);
					assert.equal(unique(output).length, output.length);
				},
			),
			{ verbose: VERBOSITY },
		);
	});

	it("returns only contiguous values", () => {
		fc.assert(
			fc.property(shortArrayOfSmallPositiveIntegers(), (input) => {
				const sortedUniqueOutputs = unique(mysteryFunction(input)).toSorted();
				sortedUniqueOutputs.forEach((value, index) =>
					assert.equal(value, index),
				);
			}),
			{ verbose: VERBOSITY },
		);
	});

	it("consistently maps inputs to outputs", () => {
		fc.assert(
			fc.property(shortArrayOfSmallPositiveIntegers(), (input) => {
				const outputMap = createMapping(input, mysteryFunction(input));
				Object.values(outputMap).forEach((outputValues) =>
					assert.equal(unique(outputValues).length, 1),
				);
			}),
			{ verbose: VERBOSITY },
		);
	});

	it("maps larger inputs to larger outputs", () => {
		fc.assert(
			fc.property(shortArrayOfSmallPositiveIntegers(), (input) => {
				const output = mysteryFunction(input);
				const outputMap = createMapping(input, output);
				assert.deepEqual(
					unique(input)
						.toSorted()
						.map((value) => outputMap[value][0]),
					unique(output).toSorted(),
				);
			}),
			{ verbose: VERBOSITY },
		);
	});
});

/**
 * Create an object mapping each input value to all corresponding output values.
 */
function createMapping(
	input: number[],
	output: number[],
): Record<number, number[]> {
	return input.reduce(
		(map, value, index) => {
			if (!(value in map)) {
				map[value] = [];
			}
			if (output[index] !== undefined) {
				map[value].push(output[index]);
			}
			return map;
		},
		{} as Record<number, number[]>,
	);
}

function shortArrayOfSmallPositiveIntegers(): fc.Arbitrary<number[]> {
	return fc.array(smallPositiveInteger(), { maxLength: 10 });
}

function smallPositiveInteger(): fc.Arbitrary<number> {
	return fc.integer({ min: 0, max: 9 });
}

function unique(values: number[]): number[] {
	return [...new Set(values)];
}
