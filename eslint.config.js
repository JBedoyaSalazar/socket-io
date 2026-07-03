import js from "@eslint/js";
import globals from "globals";
import prettier from "eslint-config-prettier";

export default [
    {
        ignores: ["node_modules/**", "coverage/**", "dist/**"],
    },

    js.configs.recommended,

    {
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            globals: globals.node,
        },

        rules: {
            "no-unused-vars": [
                "warn",
                {
                    argsIgnorePattern: "^_",
                    varsIgnorePattern: "^_",
                },
            ],

            "prefer-const": "error",

            "no-var": "error",

            eqeqeq: ["error", "always"],

            curly: ["error", "all"],

            "object-shorthand": "error",

            "prefer-template": "error",

            "no-duplicate-imports": "error",
        },
    },

    prettier,
];