export default class Plant {
	constructor() {
		this.energy = 3 + (Math.random() * 4);
	}

	act(view) {
		if (this.energy > 15) {
			const space = view.find(' '); // Направление хода
			if (space) {
				return { type: 'reproduce', direction: space };
			}
		}

		return { type: 'grow' };
	}
}
