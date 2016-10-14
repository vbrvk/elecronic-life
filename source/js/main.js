import { plan } from './world-constants';
import { World, Wall } from './world';
import BouncingCritter from './critters/bouncing-criters';

const world = new World(plan, {
	'#': Wall,
	o: BouncingCritter,
});

const container = document.querySelector('.container');


setInterval(() => {
	container.innerHTML = world.toString().replace('\n', '</br>');
}, 3000);
