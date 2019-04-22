module.exports = {
    extends: ['airbnb', 'prettier'],
    plugins: ['prettier', 'import'],
    parser: 'babel-eslint',
    rules: {
        'react/jsx-indent': ['error', 4],
        'react/jsx-indent-props': ['error', 4],
        'prettier/prettier': ['error'],
        'jsx-a11y/click-events-have-key-events': 0,
        'jsx-a11y/no-static-element-interactions': 0,
        camelcase: 0,
    },
    globals: {
        document: true,
        window: true,
        fetch: true,
        Headers: true,
    },
};
