const path = require('path');
const nodeExternals = require('webpack-node-externals');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');


module.exports = {
	mode: 'production',
	entry: './src/app.ts',
	devtool: 'inline-source-map',
	module: {
		rules: [
			{
				test: /\.ts$/,
				enforce: 'pre',
				use: [
					{
						loader: 'tslint-loader',
						options: {
							configFile: path.resolve('.', 'tslint.json'),
						},
					},
				],
			},
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
	resolve: {
		extensions: ['.ts'],
		alias: {
			'@app': path.resolve(__dirname, 'src'),
		},
	},
	output: {
		filename: 'app.js',
		path: path.resolve(__dirname, 'dist'),
	},
	node: {
		__dirname: false,
	},
	target: 'node',
	externals: [nodeExternals({
		whitelist: ['lodash-es'],
	})],
	plugins: [
		new ForkTsCheckerWebpackPlugin(),
	],
};
