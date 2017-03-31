function Vector2d(x, y) {
	this.x = x; 
	this.y = y;
	this.intensity = Math.sqrt(this.x * this.x + this.y * this.y);
}

Vector2d.prototype.normalize = function() {
	return [this.x / this.intensity, this.y / this.intensity];
};

Vector2d.prototype.dot = function(vector) {
	return this.x * vector.x + this.y * vector.y;
};

