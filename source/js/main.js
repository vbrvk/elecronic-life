import { plan } from './world-constants';
import { World, Wall } from './world';
import BouncingCritter from './critters/bouncing-criters';

const world = new World(plan, {
	'#': Wall,
	o: BouncingCritter,
});

document.write(world.toString());
