function Particle(x, y) {
	this.pos = new Vector2D(x, y);	
	this.vel = new Vector2D(0, 0);	
	this.acc = new Vector2D(0, 0);	
	this.velPerSec = new Vector2D(0, 0);	
	this.accPerSec = new Vector2D(0, 0);	

	this.maxSpeed = 300;
	this.edgeBounce = 1;
	this.color = "hsla(260, 100%, 80%, 1)";
	this.size = 3;

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
	
	this.applyForce = function(force) {
		this.acc.add(force)
	};

	this.draw = function() {
		c.fillStyle = this.color;
		c.fillRect(this.pos.x, this.pos.y, this.size, this.size);
	};
}

function Box(x, y, width, height) {
	this.pos = new Vector2D(x, y);
	this.size = new Vector2D(width, height);

	this.contains = function(particle) {
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
	var leftEdge = box.pos.x,
		rightEdge = box.pos.x + box.size.x,
		topEdge = box.pos.y,
		botEdge = box.pos.y + box.size.y;

	if (particle.pos.x > rightEdge - particle.size) {
		if (mode === "bounce") {
			particle.pos.x = rightEdge - particle.size;
			particle.vel.x *= -particle.edgeBounce;
		}
		else {
			particle.pos.x = leftEdge + particle.size;
			limit = true;
		}
	}
	if (particle.pos.x < leftEdge + particle.size) {
		if (mode === "bounce") {
			particle.pos.x = leftEdge + particle.size;
			particle.vel.x *= -particle.edgeBounce;
		}
		else {
			particle.pos.x = rightEdge - particle.size;
			limit = true;
		}
	}
	if (particle.pos.y > botEdge - particle.size) {
		if (mode === "bounce") {
			particle.pos.y = botEdge - particle.size;
			particle.vel.y *= -particle.edgeBounce;
		}
		else {
			particle.pos.y = topEdge + particle.size;
			limit = true;
		}
	}
	if (particle.pos.y < topEdge + particle.size) {
		if (mode === "bounce") {
			particle.pos.y = topEdge + particle.size;
			particle.vel.y *= -particle.edgeBounce;
		}
		else {
			particle.pos.y = botEdge - particle.size;
			limit = true;
		}
	}
	if (limit && mode === "flow") {
		particle.vel.set(0,0);
	}
}
