function Player(x, y) {
	this.pos = new Vector2D(x, y);	
	this.vel = new Vector2D(0, 0);	
	this.acc = new Vector2D(0, 0);	

	this.color = "white";
	this.radius = 10;

	this.move = function() {
		this.vel.add(this.acc);
		this.pos.add(this.vel);
	};

	this.edge = function() {
		var bounce = false;
		if (this.pos.x > canvas.width - this.radius) {
			this.pos.x = canvas.width - this.radius;
			this.vel.x *= -edgeBounce;
			bounce = true;
		}
		if (this.pos.x < this.radius) {
			this.pos.x = this.radius;
			this.vel.x *= -edgeBounce;
			bounce = true;
		}
		if (this.pos.y > canvas.height - this.radius) {
			this.pos.y = canvas.height - this.radius;
			this.vel.y *= -edgeBounce;
			bounce = true;
		}
		if (this.pos.y < this.radius) {
			this.pos.y = this.radius;
			this.vel.y *= -edgeBounce;
			bounce = true;
		}

		if (bounce === true)
			this.vel.mult(edgeFriction);
	}
	
	this.applyForce = function(force) {
		this.vel.add(force)
	};

	this.draw = function() {
		c.fillStyle = this.color;
		c.beginPath();
		c.arc(this.pos.x, this.pos.y, this.radius, 0, 2*Math.PI, false);
		c.fill();
	}
}
