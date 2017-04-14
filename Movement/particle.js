function Particle(x, y, edgeTop, edgeBot, edgeLeft, edgeRight) {
	this.pos = new Vector2D(x, y);	
	this.vel = new Vector2D(0, 0);	
	this.acc = new Vector2D(0, 0);	

	this.color = "hsla(260, 100%, 80%, 1)";
	this.size = 3;

	this.edgeCase = "flow";
	this.edgeFriction = 1;
	this.edgeBounce = 1;

	this.maxSpeed = 300;

	this.move = function() {
		var accPerSec = this.acc.clone();
		var velPerSec = this.vel.clone();
		accPerSec.mult(Simulation.delta);
		velPerSec.mult(Simulation.delta);
		this.vel.add(accPerSec);
		this.pos.add(velPerSec);
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
			var flow = false;
			if (this.pos.x > edgeRight - this.size) {
				this.pos.x = edgeLeft;
				flow = true;
			}
			if (this.pos.x < edgeLeft) {
				this.pos.x = edgeRight - this.size;
				flow = true;
			}
			if (this.pos.y > edgeBot - this.size) {
				this.pos.y = edgeTop;
				flow = true;
			}
			if (this.pos.y < edgeTop) {
				this.pos.y = edgeBot - this.size;
				flow = true;
			}
			
			if (flow) 
				this.vel.set(0,0);
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
