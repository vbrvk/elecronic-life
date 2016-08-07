'use strict';

const gulp = require('gulp');
const pug = require('gulp-pug');

module.exports = function (opt) {
	return function () {
		return gulp.src(opt.src)
			.pipe(pug())
			.pipe(gulp.dest('public'));
	};
};
