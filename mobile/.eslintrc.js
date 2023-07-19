module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:import/recommended',
    'airbnb',
    'airbnb-typescript',
    'prettier',
    'plugin:testing-library/react',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier', 'react', 'import', 'jest', 'testing-library'],
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.d.ts'],
      extends: ['plugin:@typescript-eslint/recommended'],
      parserOptions: {
        project: './tsconfig.json',
      },
      rules: {
        'import/extensions': 'off',
        'linebreak-style': 0,
        'import/no-extraneous-dependencies': [
          'error',
          {
            devDependencies: ['**/__tests__/**'],
            optionalDependencies: false,
          },
        ],
        'no-async-promise-executor': 'off',
        'no-await-in-loop': 'off',
      },
    },
  ],
  rules: {
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    'import/extensions': ['error', 'never', { types: 'off' }],
    'no-shadow': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    'react/jsx-props-no-spreading': 'off',
    'react/prop-types': 'off',
    'react/require-default-props': 'off',
    'import/prefer-default-export': 'off',
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'interface',
        format: ['PascalCase'],
        custom: {
          regex: '^I[A-Z]',
          match: false,
        },
      },
    ],
    '@typescript-eslint/no-non-null-assertion': 'off',
    'no-restricted-syntax': ['error', 'ForInStatement', 'LabeledStatement', 'WithStatement'],
  },
  settings: {
    'import/resolver': {
      typescript: {}, // this loads <rootdir>/tsconfig.json to ESLint
    },
  },
  /* for lint-staged */
  globals: {
    __dirname: true,
  },
};
