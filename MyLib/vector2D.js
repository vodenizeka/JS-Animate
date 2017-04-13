function Vector2D(x, y) {
	this.x = x;
	this.y = y;	

	this.add = function(vector) {
		this.x += vector.x;
		this.y += vector.y;
	};

	this.mult = function(number) {
		this.x *= number;
		this.y *= number;
	};

	this.mag = function() {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	};

	this.normalize = function() {
		var magnitude = this.mag();
		if (magnitude != 0) {
			this.x /= magnitude;
			this.y /= magnitude;
		}
	};

	this.setMag = function(magnitude) {
		this.normalize();
		this.mult(magnitude);
	};

	this.limit = function(magnitude) {
		if (this.mag() > magnitude) {
			this.setMag(magnitude);
		}
	};

	this.draw = function(x, y, scale) {
		c.save();
		c.translate(x,y);
		c.strokeStyle = "blue";
		c.beginPath();
		c.moveTo(0,0);
		c.lineTo(this.x * scale, this.y * scale);
		c.stroke();
		c.restore();
	};

	this.clone = function() {
		return new Vector2D(this.x, this.y);
	};

	this.set = function(x,y) {
		this.x = x;
		this.y = y;
	};
}

function initVectors2D(number) {
	for (var i = 0; i < number; i++) {
		for (var j = 0; j < number; j++) {
			var angle = Math.random() * 2*Math.PI;
			var x = Math.sin(angle);
			var y = Math.cos(angle);
			vectorField[i*dimension + j] = new Vector2D(x,y);
		}
	}
};
