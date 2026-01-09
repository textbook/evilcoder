type Predicate = (input: number[], output: number[]) => boolean;

export const properties: Record<string, Predicate> = {
	["returns an array of numbers"](_, output) {
		return (
			Array.isArray(output) &&
			output.every((value) => typeof value === "number")
		);
	},
	["preserves array length"](input, output) {
		return input.length === output.length;
	},
	["returns no value less than zero"](_, output) {
		return output.every((value) => value >= 0);
	},
	["returns no value exceeding array length"](input, output) {
		return output.every((value) => value < input.length);
	},
	["returns no value exceeding the number of unique elements"](input, output) {
		return output.every((value) => value < unique(input).length);
	},
	["returns as many unique outputs as unique inputs"](input, output) {
		return unique(input).length === unique(output).length;
	},
	["returns only contiguous values"](_, output) {
		return unique(output)
			.sort()
			.every((value, index) => value === index);
	},
	["consistently maps inputs to outputs"](input, output) {
		const outputMap = createMapping(input, output);
		return Object.values(outputMap).every(
			(outputValues) => unique(outputValues ?? []).length === 1,
		);
	},
	["maps larger inputs to larger outputs"](input, output) {
		const outputMap = createMapping(input, output);
		const sortedUniqueOutputs = unique(output).sort();
		return unique(input)
			.sort()
			.map((value) => outputMap[value]?.[0] ?? null)
			.every((value, index) => value === sortedUniqueOutputs[index]);
	},
};

function createMapping(
	input: number[],
	output: number[],
): Record<number, number[] | undefined> {
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

function unique<T>(values: T[]): T[] {
	return [...new Set(values)];
}
