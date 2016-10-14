import chai from 'chai';
import Vector from '../vector';
import { World, Wall } from '../world';
import { plan } from '../world-constants';
import BouncingCritter from '../critters/bouncing-criters';

chai.should();

describe('World class', () => {
	it('Should return new world object with grid and legend props', () => {
		const world = new World(plan, {
			'#': Wall,
			o: BouncingCritter,
		});

		world.should.to.be.instanceof(World);
		world.should.to.have.all.keys('grid', 'legend');
	});

	it('Should return world as string', () => {
		const world = new World(plan, {
			'#': Wall,
			o: BouncingCritter,
		});
		const worldStr = [].filter.call(world.toString(), (el) => (el !== '\n'));
		const height = world.grid.height;
		const width = world.grid.width;
		const lastChar = world.grid.get(new Vector(width - 1, height - 1)).originChar;
		worldStr.should.to.have.lengthOf(height * width);
		worldStr[worldStr.length - 1].should.to.be.equal(lastChar);
	});
});
