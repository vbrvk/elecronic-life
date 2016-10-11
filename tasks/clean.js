const del = require('del');

module.exports = function () {
	return function () {
		del('tmp');
		return del('public');
	};
};
