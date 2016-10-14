import { plan } from './world-constants';
import { World, Wall } from './world';
import BouncingCritter from './critters/bouncing-criters';

const world = new World(plan, {
	'#': Wall,
	o: BouncingCritter,
});

const container = document.querySelector('.container');
const text = container.appendChild(document.createTextNode(world.toString()));
setInterval(() => {
	world.turn();
	text.textContent = world.toString();
}, 700);
