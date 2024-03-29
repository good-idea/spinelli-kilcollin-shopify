const webpack = require('webpack')
const merge = require('webpack-merge')
const path = require('path')

const common = {
	target: 'web',
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				use: ['babel-loader'],
			},
		],
	},
	devtool: 'cheap-module-eval-source-map',
	entry: ['@babel/polyfill', './src/js/main.js'],
	output: {
		path: path.resolve(__dirname, 'assets'),
		publicPath: '/js',
		filename: 'main.js',
		sourceMapFilename: 'main.js.map',
		chunkFilename: '[name].js',
	},
}

const development = {
	mode: 'development',
	watch: true,
}

const production = {
	mode: 'production',
	devtool: 'source-map',
	optimization: {
		minimize: true,
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('production'),
		}),
	],
}

module.exports = env => {
	switch (env) {
		case 'production':
			return merge(common, production)
		case 'development':
		default:
			return merge(common, development)
	}
}
