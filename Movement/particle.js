function Box(x, y, width, height) {
	this.pos = new Vector2D(x, y);
	this.size = new Vector2D(width, height);

	this.isInside = function(particle) {
		if (particle.pos.x >= this.pos.x && 
			particle.pos.x <= this.pos.x + this.size.x &&
			particle.pos.y >= this.pos.y &&
			particle.pos.y <= this.pos.y + this.size.y)
			return true;
		else
			return false;
	}
}

function constrainInBox(particle, box, mode) {
	var limit = false;
	if (particle.pos.x > box.size.x - particle.size) {
		if (mode === "bounce") {
			particle.pos.x = box.size.x - particle.size;
			particle.vel.x *= -particle.edgeBounce;
		}
		else {
			particle.pos.x = box.pos.x;
			limit = true;
		}
	}
	if (particle.pos.x < box.pos.x) {
		if (mode === "bounce") {
			particle.pos.x = box.pos.x;
			particle.vel.x *= -particle.edgeBounce;
		}
		else {
			particle.pos.x = box.size.x - particle.size;
			limit = true;
		}
	}
	if (particle.pos.y > box.size.y - particle.size) {
		if (mode === "bounce") {
			particle.pos.y = box.size.y - particle.size;
			particle.vel.y *= -particle.edgeBounce;
		}
		else {
			particle.pos.y = box.pos.y;
			limit = true;
		}
	}
	if (particle.pos.y < box.pos.y) {
		if (mode === "bounce") {
			particle.pos.y = box.pos.y;
			particle.vel.y *= -particle.edgeBounce;
		}
		else {
			particle.pos.y = box.size.y - particle.size;
			limit = true;
		}
	}
	if (limit && mode === "flow") {
		particle.vel.set(0,0);
	}
}

function Particle(x, y, edgeTop, edgeBot, edgeLeft, edgeRight) {
	this.pos = new Vector2D(x, y);	
	this.vel = new Vector2D(0, 0);	
	this.acc = new Vector2D(0, 0);	
	this.velPerSec = new Vector2D(0, 0);	
	this.accPerSec = new Vector2D(0, 0);	

	this.color = "hsla(260, 100%, 80%, 1)";
	this.size = 3;

	this.edgeCase = "flow";
	this.edgeFriction = 1;
	this.edgeBounce = 1;

	this.maxSpeed = 300;

	this.move = function() {
		this.accPerSec.setVector(this.acc);
		this.velPerSec.setVector(this.vel);

		this.accPerSec.mult(Simulation.delta);
		this.velPerSec.mult(Simulation.delta);

		this.vel.add(this.accPerSec);
		this.vel.limit(this.maxSpeed);
		this.pos.add(this.velPerSec);
		this.acc.mult(0);
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
	//	this.edge();
		this.vel.limit(this.maxSpeed);
		this.acc.mult(0);  // reset acceleration
	};

	this.draw = function() {
		c.fillStyle = this.color;
		c.fillRect(this.pos.x, this.pos.y, this.size, this.size);
	};
}
