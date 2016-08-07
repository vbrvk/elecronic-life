'use strict';

const del = require('del');

module.exports = function () {
	return function () {
		return del('public');
	};
};
