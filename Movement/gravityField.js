function GravityField(posX, posY, width, height, forceX, forceY, color, particleNum) {
	this.box = new Box(posX, posY, width, height);
	this.pos = new Vector2D(posX, posY);	
	this.force = new Vector2D(forceX, forceY);
	this.width = width;
	this.height = height;
	this.color = color;

	this.particleNum = particleNum;
	this.particles = initGravityParticles(this, this.particleNum);

	this.isInside = function(player) {
		if (player.pos.x >= this.pos.x && 
			player.pos.x <= this.pos.x + this.width &&
			player.pos.y >= this.pos.y &&
			player.pos.y <= this.pos.y + this.height)
			return true;
		return false;
	};

	this.update = function() {
		for (let i = 0; i < this.particleNum; i++) {
			this.particles[i].update(this.force);
			constrainInBox(this.particles[i], testBox, "flow");
		}
	};

	this.draw = function() {
		c.fillStyle = "hsla(" + this.color + ", 100%, 0%, 0.051)";
		c.fillRect(this.pos.x, this.pos.y, this.width, this.height);

		for (let i = 0; i < this.particleNum; i++) 
			this.particles[i].draw();	
	};
}

function initGravityParticles(gravityField, count) {
	var particles = [];
	var top = gravityField.pos.y,
		bot = top + gravityField.height,
		left = gravityField.pos.x,
		right = left + gravityField.width;

	for (let i = 0; i < count; i++) {
		var x = left + Math.random()*gravityField.width,
			y = top + Math.random()*gravityField.height;
		particles[i] = new Particle(x, y, top, bot, left, right);
	}	
	return particles;
}

function updateGravityFields() {
	for (let i = 0; i < gravityFieldsNum; i++)
		gravityFields[i].update();
}

window.addEventListener("keydown", function(e) {
	// G pressed
	if (e.keyCode === 71) {
		if (gravityOn)
			gravityOn = false;
		else
			gravityOn = true;
	}
}, false);


