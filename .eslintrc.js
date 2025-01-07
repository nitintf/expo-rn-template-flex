// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: [
    "standard",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-native/all",
    // `expo` must come after `standard` or its globals configuration will be overridden
    "expo",
    // `jsx-runtime` must come after `expo` or it will be overridden
    "plugin:react/jsx-runtime",
    "prettier",
  ],
  plugins: ["reactotron", "prettier", "import", "unicorn"],
  rules: {
    "prettier/prettier": "error",
    // Add import rules
    "import/order": [
      "error",
      {
        "groups": [
          "builtin",
          "external",
          "internal",
          ["parent", "sibling"],
          "index",
          "object",
          "type",
        ],
        "pathGroups": [
          {
            pattern: "react",
            group: "external",
            position: "before",
          },
        ],
        "pathGroupsExcludedImportTypes": ["react"],
        "newlines-between": "always",
        "alphabetize": {
          order: "asc",
          caseInsensitive: true,
        },
      },
    ],
    "unicorn/filename-case": [
      "error",
      {
        case: "kebabCase",
        ignore: [
          // Expo Router patterns
          "^\\+.*\\.tsx?$",
          "^_.*\\.tsx?$",
          "^index\\.tsx?$",
        ],
      },
    ],
    // Prevent duplicate imports
    "import/no-duplicates": "error",
    // typescript-eslint
    "@typescript-eslint/array-type": 0,
    "@typescript-eslint/ban-ts-comment": 0,
    "@typescript-eslint/no-explicit-any": 0,
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
      },
    ],
    "@typescript-eslint/no-var-requires": 0,
    "@typescript-eslint/no-require-imports": 0,
    "@typescript-eslint/no-empty-object-type": 0,
    // eslint
    "no-use-before-define": 0,
    "no-restricted-imports": [
      "error",
      {
        paths: [
          // Prefer named exports from 'react' instead of importing `React`
          {
            name: "react",
            importNames: ["default"],
            message: "Import named exports from 'react' instead.",
          },
        ],
      },
    ],
    // react
    "react/prop-types": 0,
    // react-native
    "react-native/no-raw-text": 0,
    // reactotron
    "reactotron/no-tron-in-production": "error",
    // eslint-config-standard overrides
    "comma-dangle": 0,
    "no-global-assign": 0,
    "quotes": 0,
    "space-before-function-paren": 0,
  },
}
