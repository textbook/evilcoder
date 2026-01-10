import cyf from "@codeyourfuture/eslint-config-standard";
import { defineConfig, globalIgnores } from "eslint/config";
import prettier from "eslint-config-prettier/flat";
import importPlugin from "eslint-plugin-import";
import tseslint from "typescript-eslint";

export default defineConfig(
	cyf.configs.standard,
	tseslint.configs.recommended,
	tseslint.configs.recommendedTypeCheckedOnly.map((config) => ({
		...config,
		files: ["**/*.ts"],
		languageOptions: {
			parserOptions: {
				projectService: true,
			},
		},
	})),
	{
		files: ["**/*.test.ts"],
		rules: {
			"@typescript-eslint/no-floating-promises": "off",
		},
	},
	{
		plugins: { import: importPlugin },
		rules: {
			"import/order": [
				"error",
				{
					alphabetize: { order: "asc" },
					groups: ["builtin", "external", "internal"],
					"newlines-between": "always",
					pathGroups: [{ pattern: "@evilcoder/*", group: "internal" }],
					pathGroupsExcludedImportTypes: ["builtin"],
				},
			],
		},
	},
	prettier,
	globalIgnores(["exercise/lib", "properties/lib"]),
);
