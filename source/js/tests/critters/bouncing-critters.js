import chai from 'chai';
import BouncingCritter from '../../critters/bouncing-criters.js';
import { directions } from '../../world-constants.js';

chai.should();

describe('Bouncing critter', () => {
	it('Should return new bouncing critter with random directions', () => {
		const bouncingCritter = new BouncingCritter();
		bouncingCritter.should.to.be.instanceof(BouncingCritter);
		Object.keys(directions).should.to.include(bouncingCritter.direction);
	});
	it('Should return action object with direction and type');
});
