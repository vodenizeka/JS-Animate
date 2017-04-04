function Ball() {
	this.radius = 10;
	this.x = player.x +  player.width/2;
	this.y = canvas.height - player.height - this.radius;
	this.vx = ballSpeed;
	this.vy = -ballSpeed;
	this.moving = false;
	this.color = "red";
}

Ball.prototype.reset = function() {
	this.x = player.x +  player.width/2;
	this.y = canvas.height - player.height - this.radius;
	this.vx = ballSpeed;
	this.vy = -ballSpeed;
	this.moving = false;
};

Ball.prototype.draw = function() {
	c.fillStyle = this.color;
	c.beginPath();
	c.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
	c.fill();
};

Ball.prototype.update = function() {
	// update position
	if (!this.moving) {
		this.x = player.x + player.width/2;
		this.y = player.y - this.radius;
		return;
	}
	this.x += this.vx * Simulation.delta;
	this.y += this.vy * Simulation.delta;

	var leftEdge = this.radius,
		rightEdge = canvas.width - this.radius,
		topEdge = this.radius,
		botEdge = canvas.height - this.radius;
	
	// check for wall collision
	if (this.x < leftEdge) {
		this.x = leftEdge;
		this.vx *= -1;
	}
	if (this.x > rightEdge) {
		this.x = rightEdge;
		this.vx *= -1;
	}
	if (this.y < topEdge) {
		this.y = topEdge;
		this.vy *= -1;
	}
	if (this.y > botEdge) {
		// ball out of bounds
		outOfBounds = true;
	}

	// check for player collision
	if (this.y + this.radius >= player.y && 
		this.x >= player.x && this.x <= player.x + player.width) {
		this.y = player.y - this.radius;
		this.vy *= -1;
	}

	// check for brick collision
	for (var i = 0; i < brickNum; i++) {
		if (bricks[i].exists) {
			if (this.collideRect(bricks[i])) {
				bricks[i].exists = false;
				destroyedBricks++;
			}
		}
	}
};

Ball.prototype.collideRect = function(rect) {
	var centerX = rect.x + rect.width / 2,
		centerY = rect.y + rect.height / 2,
		distanceX = Math.abs(centerX - this.x),
		distanceY = Math.abs(centerY - this.y);
	if (distanceX > rect.width / 2 + this.radius)
		return false;
	if (distanceY > rect.height / 2 + this.radius)
		return false;
	if (distanceX <= rect.width / 2) {
		ball.vy *= -1;
		return true;
	}
	if (distanceY <= rect.height / 2) {
		ball.vx *= -1;
		return true;
	}
}

window.addEventListener("keydown", function(e) {
	if (e.keyCode == 17) {
		if (!ball.moving)
			ball.moving = true;
	}
}, false);

