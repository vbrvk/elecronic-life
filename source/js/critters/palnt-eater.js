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
