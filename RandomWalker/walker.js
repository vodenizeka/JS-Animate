function Walker(x,y) {
	this.x = x;
	this.y = y;
	this.color = "white";
	this.size = 10;

	this.move = function() {
		var random = Math.random();
		if (random < 0.25) {
			this.x += 1;
			this.color = "yellow";
		}
		else if (random < 0.5) {
			this.x -= 1;
			this.color = "green";
		}
		else if (random < 0.75) {
			this.y += 1;
			this.color = "blue";
		}
		else {
			this.y -= 1;
			this.color = "red";
		}
	};

	this.draw = function() {
		c.fillStyle = this.color;
		c.fillRect(this.x, this.y, this.size, this.size);
	};
}
