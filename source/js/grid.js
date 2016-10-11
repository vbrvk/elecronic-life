export default function Grid(height, width) {
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
