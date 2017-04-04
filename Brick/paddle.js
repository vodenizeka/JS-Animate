function Paddle() {
	this.width = 100;
	this.height = 15;
	this.x = canvas.width/2 - this.width/2;
	this.y = canvas.height - this.height;
	this.vx = 0;
	this.vy = 0;
	this.speed = playerSpeed;
	this.color = "blue";
}

Paddle.prototype.reset = function() {
	this.x = canvas.width/2 - this.width/2;
	this.y = canvas.height - this.height;
	this.vx = 0;
	this.vy = 0;
};

Paddle.prototype.draw = function() {
	c.fillStyle = this.color;
	c.fillRect(this.x, this.y, this.width, this.height);
};

Paddle.prototype.update = function() {
	this.x += this.vx * Simulation.delta;
	this.y += this.vy * Simulation.delta;
	
	var rightEdge = canvas.width - this.width,
		leftEdge = 0;
	if (this.x > rightEdge)
		this.x = rightEdge;
	else if (this.x < leftEdge)
		this.x = leftEdge;
};

window.addEventListener("keydown", function(e) {
	if (e.keyCode === 39)
		player.vx = player.speed;
	else if (e.keyCode === 37)
		player.vx = -player.speed;
}, false);

window.addEventListener("keyup", function(e) {
	if (e.keyCode === 39) {
		if (player.vx > 0)
			player.vx = 0;
	}
	else if (e.keyCode === 37) {
		if (player.vx < 0)
			player.vx = 0;
	}
}, false);
