import cyf from "@codeyourfuture/eslint-config-standard";
import { defineConfig, globalIgnores } from "eslint/config";
import prettier from "eslint-config-prettier/flat";
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
	prettier,
	globalIgnores(["exercise/lib"]),
);
