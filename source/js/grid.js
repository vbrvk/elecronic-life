import Vector from './vector';

export default function Grid(width, height) {
	this.space = Array(height * width);
	this.height = height;
	this.width = width;
}

Grid.prototype.isInside = function isInside(vector) {
	return vector.x >= 0 && vector.x <= this.width && vector.y >= 0 && vector.y <= this.width;
};

Grid.prototype.set = function set(vector, value) {
	this.space[vector.x + (vector.y * this.width)] = value; // Элемент в позиции (x, y) = value
};

Grid.prototype.get = function get(vector) {
	return this.space[vector.x + (vector.y * this.width)];
};

Grid.prototype.forEach = function forEach(f, context) {
	for (let y = 0; y < this.height; y++) {
		for (let x = 0; x < this.width; x++) {
			const value = this.get(new Vector(x, y));
			if (value != null) {
				f.call(context, value, new Vector(x, y));
			}
		}
	}
};
