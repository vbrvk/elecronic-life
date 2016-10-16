import { directions } from '../world-constants';

export default class PlantEater {
	constructor() {
		this.energy = 20;
	}

	act(view) {
		const space = view.find(' ');
		if (this.energy > 60 && space) {
			return { type: 'reproduce', direction: space };
		}
		const plant = view.find('*');
		if (plant) {
			return { type: 'eat', direction: plant };
		}
		if (space) {
			return { type: 'move', direction: space };
		}

		return null;
	}
}

class SmartEater extends PlantEater {
	constructor(props) {
		super();
		this.lastStepDirection = null;
		this.eat = props.eat;
	}

	act(view) {
		const space = view.find(' ');
		if (this.energy > 60 && space) {
			return { type: 'reproduce', direction: space };
		}
		const plant = view.find(this.eat);
		if (plant) {
			return { type: 'eat', direction: plant };
		}
		if (this.lastStepDirection == null) {
			this.lastStepDirection = space;
			return { type: 'move', direction: space };
		}

		let newSpace;
		for (let i = 0; i <= 4; ++i) {
			newSpace = directions.dirPlus(this.lastStepDirection, i);
			if (view.look(newSpace) === ' ') break;
			newSpace = directions.dirPlus(this.lastStepDirection, -i);
			if (view.look(newSpace) === ' ') break;
		}

		if (view.look(newSpace) === ' ') {
			this.lastStepDirection = newSpace;
			return { type: 'move', direction: newSpace };
		}
		return null;
	}
}

export { PlantEater, SmartEater };
