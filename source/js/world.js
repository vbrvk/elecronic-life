import { isNull } from 'underscore';
import Grid from './grid.js';
import Vector from './vector.js';
import { directions, actionTypes } from './world-constants';
import View from './view';

export default class World {
	constructor(map, legend) {
		const grid = new Grid(map[0].length, map.length);
		this.grid = grid;
		this.legend = legend;
		map.forEach((line, y) => {
			for (let x = 0; x < line.length; x++) {
				grid.set(new Vector(x, y), World.elementFromChar(legend, line[x]));
			}
		}, this);
	}
	toString() {
		let output = '';
		for (let y = 0; y < this.grid.height; y++) {
			for (let x = 0, element; x < this.grid.width; x++) {
				element = this.grid.get(new Vector(x, y));
				output += World.charFromElement(element);
			}
			output += '\n';
		}
		return output;
	}
	turn() {
		const acted = [];
		this.grid.forEach((critter, vector) => {
			if (critter.act && !acted.includes(critter)) {
				acted.push(critter);
				this.letAct(critter, vector);
			}
		}, this);
	}
	letAct(critter, vector) {
		const action = critter.act(new View(this, vector));
		if (action && action.type === 'move') {
			const destination = this.checkDestination(action, vector);
			if (destination && World.charFromElement(this.grid.get(destination)) === ' ') {
				this.grid.set(vector, null);
				this.grid.set(destination, critter);
			}
		}
	}
	checkDestination(action, vector) {
		if (Object.keys(directions).includes(action.direction)) {
			const dest = vector.add(directions[action.direction]);
			if (this.grid.isInside(dest)) {
				return dest;
			}
		}
		return null;
	}

	static elementFromChar(legend, char) {
		if (char === ' ') {
			return null;
		}
		const element = new (legend[char].constructor)(legend[char].props);
		element.originChar = char;
		return element;
	}

	static charFromElement(element) {
		return isNull(element) ? ' ' : element.originChar;
	}
}

function Wall() {
	return;
}

class LifeLikeWorld extends World {
	letAct(critter, vector) {
		const action = critter.act(new View(this, vector));
		const actionProps = { world: this, critter, vector, action };
		const handled = action &&
					actionTypes[action.type] &&
					actionTypes[action.type](actionProps);
		if (!handled) {
			actionTypes.default(actionProps);
		}
	}
}

export { Wall, World, LifeLikeWorld };
