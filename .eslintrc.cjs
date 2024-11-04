module.exports = {
    env: {
        es2021: true,
        node: true,
    },
    extends: ['eslint:recommended'],
    parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
    },
    rules: {
        'no-unused-vars': 'warn',
        'no-console': 'warn',
    },
};
