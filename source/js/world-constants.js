import Vector from './vector.js';
import { World } from './world';

const directions = {
	n: new Vector(0, -1),
	ne: new Vector(1, -1),
	e: new Vector(1, 0),
	se: new Vector(1, 1),
	s: new Vector(0, 1),
	sw: new Vector(-1, 1),
	w: new Vector(-1, 0),
	nw: new Vector(-1, -1),
};

const plan = ['############################',
            '#      #    #      o      ##',
            '#                          #',
            '#          #####           #',
            '##         #   #    ##     #',
            '###           ##     #     #',
            '#           ###      #     #',
            '#   ####                   #',
            '#   ##       o             #',
            '# o  #         o       ### #',
            '#    #                     #',
            '############################'];

/* eslint no-param-reassign: ["error", { "props": false }]*/
const actionTypes = {
	default: (opt) => {
		opt.critter.energy -= 0.2;
		if (opt.critter.energy <= 0) {
			opt.world.grid.set(opt.vector, null);
		}
	},
	grow: (opt) => {
		opt.critter.energy += 0.5;
		return true;
	},
	move: (opt) => {
		const world = opt.world;
		const critter = opt.critter;
		const vector = opt.vector;
		const action = opt.action;

		const destination = world.checkDestination(action, vector);
		if (destination == null || critter.energy <= 1 || world.grid.get(vector) !== ' ') {
			return false;
		}
		critter.energy -= 1;
		world.grid.set(vector, null);
		world.grid.set(destination, critter);
		return true;
	},
	eat: (opt) => {
		const world = opt.world;
		const critter = opt.critter;
		const vector = opt.vector;
		const action = opt.action;

		const destination = world.checkDestination(action, vector);
		const crittDest = destination != null && world.grid.get(destination);
		if (!crittDest || crittDest.energy == null) {
			return false;
		}
		critter.energy += crittDest.energy;
		world.grid.set(destination, null);
		return true;
	},
	reproduce: (opt) => {
		const world = opt.world;
		const critter = opt.critter;
		const vector = opt.vector;
		const action = opt.action;

		const baby = World.elementFromChar(world, critter.originChar);
		const dest = world.checkDestination(action, vector);
		if (dest == null || critter.energy <= 2 * baby.energy || world.grid.get.dest != null) {
			return false;
		}
		world.grid.set(dest, baby);
		critter.energy -= baby.energy * 2;
		return true;
	},
};

export default { directions, plan, actionTypes };
export { directions, plan, actionTypes };
