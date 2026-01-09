import assert from "node:assert/strict";
import { describe, it } from "node:test";

import fc from "fast-check";

import { mysteryFunction } from "@evilcoder/exercise";
import { properties } from "@evilcoder/properties";

const VERBOSITY = 2;

describe("mysteryFunction", () => {
	Object.entries(properties).forEach(([description, predicate]) => {
		it(description, () => {
			fc.assert(
				fc.property(
					fc.array(fc.integer({ min: 0, max: 9 }), { maxLength: 10 }),
					(input) => {
						assert.ok(predicate(input, mysteryFunction(input)));
					},
				),
				{ verbose: VERBOSITY },
			);
		});
	});
});
