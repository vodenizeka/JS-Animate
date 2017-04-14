function Particle(x, y, edgeTop, edgeBot, edgeLeft, edgeRight) {
	this.pos = new Vector2D(x, y);	
	this.vel = new Vector2D(0, 0);	
	this.acc = new Vector2D(0, 0);	

	this.color = "hsla(260, 100%, 80%, 0.8)";
	this.size = 3;

	this.edgeCase = "flow";
	this.edgeFriction = 1;
	this.edgeBounce = 1;

	this.maxSpeed = 3;

	this.move = function() {
		this.vel.add(this.acc);
		this.pos.add(this.vel);
	};

	this.edge = function() {
		if (this.edgeCase === "bounce") {
			var bounce = false;
			if (this.pos.x > edgeRight - this.size) {
				this.pos.x = edgeRight - this.size;
				this.vel.x *= -this.edgeBounce;
				bounce = true;
			}
			if (this.pos.x < edgeLeft) {
				this.pos.x = edgeLeft;
				this.vel.x *= -this.edgeBounce;
				bounce = true;
			}
			if (this.pos.y > edgeBot - this.size) {
				this.pos.y = edgeBot - this.size;
				this.vel.y *= -this.edgeBounce;
				bounce = true;
			}
			if (this.pos.y < edgeTop) {
				this.pos.y = edgeTop;
				this.vel.y *= -this.edgeBounce;
				bounce = true;
			}

			if (bounce === true)
				this.vel.mult(this.edgeFriction);
		}
		else {
			if (this.pos.x > edgeRight - this.size) 
				this.pos.x = edgeLeft;
			if (this.pos.x < edgeLeft) 
				this.pos.x = edgeRight - this.size;
			if (this.pos.y > edgeBot - this.size) 
				this.pos.y = edgeTop;
			if (this.pos.y < edgeTop) 
				this.pos.y = edgeBot - this.size;
		}
	}
	
	this.applyForce = function(force) {
		this.acc.add(force)
	};

	this.update = function(force) {
		this.applyForce(force);
		this.move();
		this.edge();
		this.vel.limit(this.maxSpeed);
		this.acc.mult(0);  // reset acceleration
	};

	this.draw = function() {
		c.fillStyle = this.color;
		c.fillRect(this.pos.x, this.pos.y, this.size, this.size);
	};
}
