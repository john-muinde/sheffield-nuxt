import globals from "globals";
import pluginJs from "@eslint/js";
import pluginVue from "eslint-plugin-vue";

/** @type {import('eslint').Linter.Config[]} */
export default [
    {
        ignores: [
            "vendor/**",
            "dist/**",
            "node_modules/**",
            "*.config.js",
            "*.config.mjs"
        ],
    },
    {
        files: ["**/*.{vue,js,mjs,cjs}"],
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node
            },
            ecmaVersion: 'latest',
            sourceType: 'module'
        }
    },
    pluginJs.configs.recommended,
    ...pluginVue.configs["flat/essential"],
    ...pluginVue.configs["flat/recommended"],
    {
        rules: {
            // ESLint core rules
            'no-unused-vars': ['warn', {
                vars: 'all',
                args: 'after-used',
                ignoreRestSiblings: false
            }],
            'no-console': 'warn',
            'no-debugger': 'warn',

            // Vue-specific rules
            'vue/max-attributes-per-line': ['warn', {
                singleline: { max: 3 },
                multiline: { max: 1 }
            }],
            'vue/html-self-closing': ['warn', {
                html: {
                    void: 'always',
                    normal: 'never',
                    component: 'always'
                }
            }],
            'vue/require-default-prop': 'off',
            'vue/multi-word-component-names': 'off',

               'semi': ['error', 'always'],
            'quotes': ['error', 'single'],
            'comma-dangle': ['error', 'always-multiline'],
            
        }
    },
];
