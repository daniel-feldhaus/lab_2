module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
        "prettier"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "project": "tsconfig.json",
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint"
    ],
    "rules": {
        "@typescript-eslint/array-type": ["warn", { "default": "array", "readonly": "array" }],
        "camelcase": ["warn"],
        "consistent-return": ["error"],
        "default-case-last": ["warn"],
        "dot-notation": ["warn"],
        "@typescript-eslint/explicit-function-return-type": ["warn", { "allowExpressions": true }],
        "no-array-constructor": ["error"],
        "no-caller": ["error"],
        "no-case-declarations": ["warn"],
        "no-continue": ["error"],
        "no-duplicate-imports": "warn",
        "no-eval": ["error"],
        "no-extra-label": ["error"],
        "no-implicit-coercion": ["warn"],
        "no-implicit-globals": ["error"],
        "no-implied-eval": ["error"],
        "@typescript-eslint/no-inferrable-types": "off",
        "no-invalid-this": "off", "@typescript-eslint/no-invalid-this": ["error"],
        "no-iterator": ["error"],
        "no-labels": ["error"],
        "no-lone-blocks": ["warn"],
        "no-lonely-if": ["warn"],
        "no-multi-assign": ["warn"],
        "no-new-object": ["error"],
        "no-new-wrappers": ["error"],
        "no-param-reassign": ["error"],
        "no-return-assign": ["warn"],
        "no-sequences": ["warn"],
        "no-shadow": "off", "@typescript-eslint/no-shadow": ["error"],
        "no-template-curly-in-string": ["warn"],
        "no-throw-literal": "off", "@typescript-eslint/no-throw-literal": ["error", { "allowThrowingAny": false }],
        "no-underscore-dangle": ["warn"],
        "@typescript-eslint/no-unnecessary-boolean-literal-compare": ["warn"],
        "no-unreachable-loop": ["warn"],
        "no-unused-expressions": "off", "@typescript-eslint/no-unused-expressions": ["error"],
        "no-unused-vars": "off", "@typescript-eslint/no-unused-vars": ["warn", { "vars": "local", "args": "none" }],
        "no-use-before-define": "off", "@typescript-eslint/no-use-before-define": ["error", "nofunc"],
        "no-useless-return": ["warn"],
        "no-var": ["error"],
        "no-void": ["error"],
        "object-shorthand": ["warn"],
        "prefer-const": ["warn"],
        "@typescript-eslint/prefer-for-of": ["warn"],
        "prefer-regex-literals": ["error"],
        "prefer-rest-params": ["error"],
        "prefer-spread": ["error"],
        "sort-imports": ["warn"],
        "space-infix-ops": "off",
        "spaced-comment": ["warn"],
    }
}
