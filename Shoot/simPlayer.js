	

function Player(x, y) {
				this.radius = 10;
				this.mass = this.radius * this.radius;
				this.x = x;
				this.y = y;
				this.vx = 0;
				this.vy = 0;
				this.intensity = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
				this.color = "hsla("+ Math.random()*360 +",100%,50%,1)";
			}


Player.prototype.draw = function() {
	c.strokeStyle = this.color;
	c.fillStyle = this.color;
	c.beginPath();
	c.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
	c.stroke();
	c.fill();
}

Player.prototype.update = function() {
	var rightEdge = canvas.width - this.radius,
		leftEdge = this.radius,
		topEdge = this.radius,
		bottomEdge = canvas.height - this.radius;

	this.x += this.vx * Simulation.delta;
	this.y += this.vy * Simulation.delta;					

	if (this.x >= rightEdge) {
		this.x = rightEdge;
		this.vx *= -1;
	}
	if (this.x <= leftEdge) {
		this.x = leftEdge;
		this.vx *= -1;
	}
	if (this.y <= topEdge) {
		this.y = topEdge;
		this.vy *= -1;
	}
	if (this.y >= bottomEdge) {
		this.y = bottomEdge;
		this.vy *= -1;
	}
};
Simulation = {
	frame : function() {
		Simulation.setDelta();
		Simulation.update();
		Simulation.draw();
		Simulation.animationFrame = window.requestAnimationFrame(Simulation.frame);
	},
	
	setDelta : function() {
		Simulation.now = Date.now();
		Simulation.delta = (Simulation.now - Simulation.then) / 1000;
		Simulation.then = Simulation.now;
	},

	update : function() {
		player.update();	
	},

	draw : function() {
		c.fillStyle = background;
		c.fillRect(0, 0, canvas.width, canvas.height);
		player.draw();	
	}
};
