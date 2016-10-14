import { random, isEmpty } from 'underscore';
import { directions } from './world-constants';
import { World } from './world';

export default class View {
	constructor(world, vector) {
		this.world = world;
		this.vector = vector;
	}
	look(direction) {
		const target = this.vector.plus(directions[direction]);
		if (this.world.grid.isInside(target)) {
			return World.charFromElement(this.world.grid.get(target));
		}
		return '#';
	}
	findAll(char) {
		const found = [];
		Object.keys(directions).forEach((dir) => {
			if (this.look(dir) === char) {
				found.push(dir);
			}
		});
		return found;
	}

	find(char) {
		const found = this.findAll(char);
		if (isEmpty(found)) return null;
		return random(0, found.length - 1);
	}
}
