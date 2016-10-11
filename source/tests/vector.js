const Vector = require('../js/vector.js').default;
const assert = require('chai').assert;

describe('Vector struct', () => {
	describe('Create vector', () => {
		it('Should return Vector with coordinates (1, -1)', () => {
			const vector = new Vector(1, -1);
			assert.equal(vector.x, 1);
			assert.equal(vector.y, -1);
		});
	});
	describe('Add vectors', () => {
		it('Should return with coordinates (1, 3)', () => {
			let vector = new Vector(1, -1);
			vector = vector.add(new Vector(0, 4));
			assert.equal(vector.x, 1);
			assert.equal(vector.y, 3);
		});
	});
});
