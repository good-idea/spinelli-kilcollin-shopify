module.exports = {
	presets: [
		[
			'@babel/preset-env',
			{
				modules: false,
				targets: {
					browsers: ['last 2 versions'],
				},
			},
		],
	],
	plugins: ['@babel/plugin-proposal-object-rest-spread'].filter(Boolean),
}
