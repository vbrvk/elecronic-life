import { random } from 'underscore';
import { directions } from '../world-constants.js';

const directionsKeys = Object.keys(directions);

export default class BouncingCritter {
	constructor() {
		this.direction = directionsKeys[random(0, directionsKeys.length - 1)];
	}
}
