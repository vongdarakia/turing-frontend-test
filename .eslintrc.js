module.exports = {
    extends: ['airbnb', 'prettier'],
    plugins: ['prettier', 'import'],
    parser: 'babel-eslint',
    rules: {
        'react/jsx-indent': ['error', 4],
        'react/jsx-indent-props': ['error', 4],
        'prettier/prettier': ['error'],
        camelcase: 0,
    },
    globals: {
        document: true,
        window: true,
    },
};
