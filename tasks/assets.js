'use strict';

const gulp = require('gulp');

module.exports = function (opt) {
	return function () {
		return gulp.src(opt.src, {since: gulp.lastRun('assets')})
		.pipe(gulp.dest('public'));
	};
};
