const path = require('path');
const webpackStream = require('webpack-stream');
const named = require('vinyl-named');
const gulp = require('gulp');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const gulpIf = require('gulp-if');
const uglify = require('gulp-uglify');
const gulplog = require('gulplog');

const webpack = webpackStream.webpack;

module.exports = (opt) => {
	let firstBuildReady = false;

	function done(err, stats) {
		firstBuildReady = true;

		if (err) { // hard error, see https://webpack.github.io/docs/node.js-api.html#error-handling
			return;	// emit('error', err) in webpack-stream
		}

		gulplog[stats.hasErrors() ? 'error' : 'info'](stats.toString({
			colors: true,
		}));
	}
	const webpackOptions = {
		output: {
			publicPath: '/js/',
			filename: '[name].js',
		},
		watch: opt.isDev,

		watchOptions: {
			aggregateTimeout: 100,
		},

		devtool: opt.isDev ? 'cheap-module-inline-source-map' : null,

		plugins: [
			new webpack.NoErrorsPlugin(),
			// new webpack.optimize.CommonsChunkPlugin({
			// 	name: 'common',
			// 	chunks: ['main', 'home'],
			// }),
		],

		resolve: {
			modulesDirectories: 'node_modules',
			extensions: ['', '.js'],
		},

		resolveLoader: {
			modulesDirectories: [path.join(__dirname, '/../', 'node_modules')],
			extensions: ['', '.js'],
			moduleTemplates: ['*-loader'],
		},

		module: {
			loaders: [
				{
					test: /\.js$/,
					include: path.join(__dirname, '/../', 'source'),
					loader: 'babel?presets[]=es2015',
				},
			],
		},
	};

	if (!opt.isDev) {
		module.exports.plugins.push(
			new webpack.optimize.UglifyJsPlugin({
				compress: {
					warnings: false,
					drop_console: true,
					unsafe: true,
				},
			})
		);
	}
	return function res(callback) {
		return gulp.src('source/js/*.js')
			.pipe(plumber({
				errorHandler: notify.onError(err => ({
					title: 'Webpack',
					message: err.message,
				})),
			}))
			.pipe(named())
			.pipe(webpackStream(webpackOptions, null, done))
			.pipe(gulpIf(!opt.isDev, uglify()))
			.pipe(gulp.dest('public/js'))
			.on('data', () => {
				if (firstBuildReady) {
					callback();
				}
			});
	};
};
