'use strict';

const gulp = require('gulp');
const gulpIf = require('gulp-if');
const through2 = require('through2').obj;
const eslint = require('gulp-eslint');
const fs = require('fs');
const multipipe = require('multipipe');

module.exports = function (opt) {
	return function () {
		let eslintCashe = {};
		let eslintFileCashe = process.cwd() + '/tmp/eslintCashe.json';
		try {
			eslintCashe = JSON.parse(fs.readFileSync(eslintFileCashe));
		} catch (e) {
			console.log('Cash is empty');
		}

		return gulp.src(opt.src, {read: false})
		.pipe(gulpIf(
			function (file) {
				return eslintCashe[file.path] && eslintCashe[file.path].mtime == file.stat.mtime.toJSON();
			},
			through2(function (file, enc, cb){
				file.eslint = eslintCashe[file.path].eslint;
				cb(null, file);
			}),
			multipipe(
				through2(function (file, enc, cb){
					file.contents = fs.readFileSync(file.path);
					cb(null, file);
				}),
				eslint(),
				through2(function (file, enc, cb) {
					eslintCashe[file.path] = {
						eslint: file.eslint,
						mtime: file.stat.mtime
					};
					cb(null, file);
				})
			)
		))
		.pipe(eslint.format())
		.on('end',function () {
			fs.writeFileSync(eslintFileCashe, JSON.stringify(eslintCashe));
		});
	};
};
