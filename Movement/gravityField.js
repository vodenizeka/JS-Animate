function GravityField(posX, posY, width, height, forceX, forceY, color, particleNum) {
	this.box = new Box(posX, posY, width, height);
	this.force = new Vector2D(forceX, forceY);
	this.color = color;

	this.particleNum = particleNum;
	this.particles = initGravityParticles(this, this.particleNum);

	this.update = function() {
		for (let i = 0; i < this.particleNum; i++) {
			this.particles[i].applyForce(this.force);
			this.particles[i].move();
			constrainInBox(this.particles[i], this.box, "flow");
		}
	};

	this.draw = function() {
		c.fillStyle = "hsla(" + this.color + ", 0%, 0%, 0.01)";
		c.fillRect(this.box.pos.x, this.box.pos.y, this.box.size.x, this.box.size.y);

		for (let i = 0; i < this.particleNum; i++) 
			this.particles[i].draw();	
	};
}

function GravityPoint(posX, posY, gravity, color) {
	this.pos = new Vector2D(posX, posY);
	this.gravity = gravity;
	this.size = 20;
	this.color = color;
	this.maxForce = 1000;

	this.force = function(particle) {
		var force = this.pos.clone();
		force.sub(particle.pos);
		var distance = force.mag();
		force.normalize();

		var magnitude = this.gravity * particle.size / (distance * distance);
		force.mult(magnitude);
		force.limit(this.maxForce);

		return force;
	};

	this.draw = function() {
		c.fillStyle = "hsla(" + this.color + ", 50%, 50%, 0.1)";
		c.beginPath();
		c.arc(this.pos.x, this.pos.y, this.size, 0, 2*Math.PI, false);
		c.fill();
	};
}

function initGravityParticles(gravityField, count) {
	var particles = [];
	for (let i = 0; i < count; i++) {
		var x = gravityField.box.pos.x + Math.random()*gravityField.box.size.x,
			y = gravityField.box.pos.y + Math.random()*gravityField.box.size.y;
		particles[i] = new Particle(x, y);
	}	
	return particles;
}

function updateGravityFields() {
	for (let gravity of gravityFields)
		gravity.update();
}



