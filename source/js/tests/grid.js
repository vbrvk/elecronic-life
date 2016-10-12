import chai from 'chai';

import Grid from '../grid.js';

chai.should();

describe('Grid of world', () => {
	describe('Props of grid', () => {
		it('Should return new grid with height 20', () => {
			(new Grid(30, 20)).height.should.to.equal(20);
		});
		it('Should return new grid with width 20', () => {
			(new Grid(30, 20)).width.should.to.equal(30);
		});
		it('Should return new grid with lenght 20*30', () => {
			(new Grid(20, 30)).space.should.to.have.lengthOf(30 * 20);
		});
	});
});
