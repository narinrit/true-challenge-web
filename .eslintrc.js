module.exports = {
    'extends': 'airbnb-typescript',
    'env': { 'browser': true, 'node': true },
    'rules': {
        'max-len': ['error', { 'code': 200 }],
        'indent': ['error', 4, {
            'SwitchCase': 1,
            'ignoredNodes': ['JSXElement', 'JSXElement *'],
        }],
        '@typescript-eslint/indent': ['error', 4, {
            'SwitchCase': 1,
        }],
        'react/jsx-indent': ['error', 4],
        'react/jsx-indent-props': ['error', 4],
        'react/jsx-props-no-spreading': 'off',
        'jsx-a11y/anchor-is-valid': 'off',
        'react/prop-types': 'off',
    },
};
