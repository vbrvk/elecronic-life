import { directions } from '../world-constants';

function dirPlus(dir, n) {
	const directionsName = Object.keys(directions);
	const indexDirection = directionsName.indexOf(dir);
	return directionsName[(indexDirection + n + 8) % 8];
}

export default class WallFollowCritter {
	constructor() {
		this.direction = 's';
	}

	act(view) {
		let start = this.direction;
		if (view.look(dirPlus(this.direction, -3)) !== ' ') { // обход препядствия по диагонали
			start = this.direction = dirPlus(this.direction, -2);
		}
		while (view.look(this.direction) !== ' ') {
			this.direction = dirPlus(this.direction, 1);
			if (this.direction === start) break;
		}

		return {
			type: 'move',
			direction: this.direction,
		};
	}
}
