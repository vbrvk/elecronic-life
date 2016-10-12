import Grid from './grid.js';
import Vector from './vector.js';

const elementFromChar = (legend, char) => {
	if (char === ' ') {
		return null;
	}
	const element = new (legend[char])();
	element.originChar = char;
	return element;
};

export default class World {
	constructor(map, legend) {
		const grid = new Grid(map[0].length, map.length);
		this.grid = grid;
		this.legend = legend;
		map.forEach((line, y) => {
			for (let x = 0; x < line.length; x++) {
				grid.set(new Vector(x, y), elementFromChar(legend, line[x]));
			}
		});
	}
}
