import { random } from 'underscore';
import { directions } from '../world-constants.js';

const directionsKeys = Object.keys(directions);

export default class BouncingCritter {
	constructor() {
		this.direction = directionsKeys[random(0, directionsKeys.length - 1)];
	}
	act(view) {
		if (view.look(this.direction) !== ' ') {
			this.direction = view.find(' ') || 's'; // В свободном направлении или на юг
		}
		return { type: 'move', direction: this.direction };
	}
}
