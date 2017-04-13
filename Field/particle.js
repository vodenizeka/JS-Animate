function Particle(x, y, dx, dy) {
	this.pos = new Vector2D(x,y);
	this.vel = new Vector2D(dx,dy);
	this.acc = new Vector2D(0,0);

	this.update = function() {
		this.pos.add(this.vel);
		this.vel.add(this.acc);
		this.acc.set(0,0);

		if (this.pos.x > canvas.width)
			this.pos.x = 0;
		else if (this.pos.x < 0)
			this.pos.x = canvas.width;

		if (this.pos.y > canvas.height)
			this.pos.y = 0;
		else if (this.pos.y < 0)
			this.pos.y = canvas.width;

		if (this.vel.x > topSpeed)
			this.vel.x = topSpeed;
		if (this.vel.y > topSpeed)
			this.vel.y = topSpeed;
	};

	this.draw = function() {
		c.fillStyle = "white";
		c.fillRect(this.pos.x, this.pos.y, 1, 1);
	};

	this.applyForce = function() {
		var col = parseInt(this.pos.x / dimensionX);
		var row = parseInt(this.pos.y / dimensionY);
		return vectorField[row* dimension + col];
	};
}

function initParticles(array, number) {
	for (let i = 0; i < number; i++) {
		var x = Math.random()*canvas.width;
		var y = Math.random()*canvas.height;
		var dx = Math.random()*startSpeed;
		var dy = Math.random()*startSpeed;
		array[i] = new Particle(x,y,dx,dy);
	}
}

