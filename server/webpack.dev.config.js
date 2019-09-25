const webpack = require('webpack');
const merge = require('webpack-merge');
const mainCfg = require('./webpack.config');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const path = require('path');

module.exports = merge(mainCfg, {
	mode: 'development',
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				exclude: /node_modules/,
				use: {
					loader: 'ts-loader',
					options: {
						transpileOnly: true,
					},
				},
			},
		],
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '\'local\'',
				APP_CREDS_PATH: `'${path.resolve(__dirname, 'appCreds.json')}'`,
			},
		}),
		// replaces constants with file that doesn't get committed
		// so passwords aren't pushed to git
		new webpack.NormalModuleReplacementPlugin(
			/Constants\.ts/,
			path.resolve(__dirname, 'src/Constants.local.ts'),
		),
		new CircularDependencyPlugin({
			// exclude detection of files based on a RegExp
			exclude: /a\.js|node_modules/,
			// add errors to webpack instead of warnings
			failOnError: true,
			// allow import cycles that include an asyncronous import,
			// e.g. via import(/* webpackMode: "weak" */ './file.js')
			allowAsyncCycles: false,
			// set the current working directory for displaying module paths
			cwd: process.cwd(),
		}),
	],
});
