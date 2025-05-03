module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],

    // "react/react-in-jsx-scope": "off", // Add this line
    'no-unused-vars': 'warn', // Optional: add this if you want to ignore React specifically
    'react/prop-types': 'off', // Optional: add this if you want to ignore prop-types
    'react/no-unescaped-entities': 'warn',
  },
};
