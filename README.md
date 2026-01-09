# Evil coder

Discover the purpose of the mystery function.

## Setup

1. Clone this repository
2. Run `npm ci` to install the dependencies
3. Run `npm test` to ensure everything is set up

## Exercise

- Form pairs or small groups
- One person should read the requirements described in `verification/README.md`
- Until the requirements have been met:
  - The other member(s) of the team update the implementation to get the test suite passing
  - The first person then adds a new failing test case to the `cases` array in `exercise/src/index.test.ts`
- The _only_ communication is through adding failing test cases or making them pass
- Once you're confident the requirements have been met, run the property-based verification suite

## Scripts

- `npm run build`: Create a pure JS version in `exercise/lib/index.js`
  - This might be helpful if you want to try out the code elsewhere
- `npm run lint`: Apply the static code checks
  - `npm run format`: Re-format the code with Prettier
  - `npm run lint:fix`: Auto-fix as many issues as possible
- `npm test`: Run the tests in all workspaces
- `npm run typecheck`: Check types with TypeScript
- `npm run verify`: Run some property-based tests to find edge cases
