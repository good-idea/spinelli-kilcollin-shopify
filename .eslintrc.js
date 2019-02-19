module.exports = {
	parser: 'babel-eslint',
	extends: ['airbnb', 'prettier'],
	rules: {
		'no-underscore-dangle': 0,
		'no-nested-ternary': 0,
		'jsx-a11y/anchor-is-valid': 0,
		'react/destructuring-assignment': 0,
		'import/prefer-default-export': 0,
		'import/no-extraneous-dependencies': [
			'error',
			{
				devDependencies: true,
			},
		],
	},
	plugins: ['import'],
	env: {
		browser: true,
	},
}
