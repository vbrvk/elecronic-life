'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const gulpIf = require('gulp-if');
const notify = require('gulp-notify');
const multipipe = require('multipipe');

module.exports = function (opt) {
	return function () {
		return multipipe(gulp.src(opt.src),
			gulpIf(opt.isDev, sourcemaps.init()),
			sass(),
			gulpIf(opt.isDev, sourcemaps.write()),
			gulp.dest('public/styles')
		).on('error', notify.onError(function (err) {
			return {
				title: 'Styles',
				message: err.message
			};
		}));
	};
};
