export default function Vector(x, y) {
	this.x = x || 0;
	this.y = y || 0;
}

Vector.prototype.add = function add(otherVector) {
	return new Vector(this.x + otherVector.x, this.y + otherVector.y);
};
