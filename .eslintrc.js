module.exports = {
    extends: ['airbnb', 'prettier'],
    plugins: ['prettier', 'import'],
    parser: 'babel-eslint',
    rules: {
        'react/jsx-indent': ['error', 4],
        'prettier/prettier': ['error'],
        camelcase: false,
    },
    globals: {
        document: true,
    },
};
