import { directions } from './world-constants';

export default class View {
	constructor(world, vector) {
		this.world = world;
		this.vector = vector;
	}
	look(direction) {
		const target = this.vector.plus(directions[direction]);
		if (this.world.grid.isInside(target)) {
			return this.world.grid.get(target);
		}
		return '#';
	}
}
