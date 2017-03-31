function Ball() {
	this.radius = Math.random()*radiusDiff + radiusMin;
	this.mass = this.radius * this.radius;
	this.x = Math.random() * canvas.width;
	this.y = Math.random() * canvas.height;
	this.vx = Math.random() * maxSpeed;
	this.vy = Math.random() * maxSpeed;
	this.intensity = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
	this.color = "hsla("+ Math.random()*360 +",100%,50%,1)";
	this.colorWheel = 0;
}

Ball.prototype.draw = function() {
	c.strokeStyle = this.color;
	c.fillStyle = this.color;
	c.beginPath();
	c.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
	c.stroke();
	c.fill();
	if (glowAlpha > 0) { 
		c.beginPath();
		c.fillStyle = "rgba(255,255,255," + glowAlpha + ")";
		c.arc(this.x, this.y, this.radius * glowSize, 0, 2*Math.PI);
		c.fill();
	}
};

Ball.prototype.update = function() {
	var rightEdge = canvas.width - this.radius,
		leftEdge = this.radius,
		topEdge = this.radius,
		bottomEdge = canvas.height - this.radius;

	this.x += this.vx * Simulation.delta;
	this.y += this.vy * Simulation.delta;					
	this.vy += gravity * Simulation.delta;

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

function calculateCollisions() {
	for (var i = 0; i < ballNum-1; i++) {
		for (var j = i +1; j < ballNum; j++) {
			if (balls[i].isClose(balls[j])) {
				if (balls[i].collide(balls[j]))
					balls[i].updateVelocity(balls[j]);
			}
		}
	}
}

Ball.prototype.isClose = function(ball) {
	var right1 = this.x + this.radius,
		left1 = this.x - this.radius,
		top1 = this.y - this.radius,
		bot1 = this.y + this.radius,
		right2 = ball.x + ball.radius,
		left2 = ball.x - ball.radius,
		top2 = ball.y - ball.radius,
		bot2 = ball.y + ball.radius;

	if (right1 > left2 && left1 < right2 && bot1 > top2 && top1 < bot2)
		return true;

	return false;
}

Ball.prototype.collide = function(ball) {
	var realDist;
	if ((realDist = this.distance(ball)) <= this.radius + ball.radius) {
		var vector = new Vector2d(ball.x - this.x, ball.y - this.y),
			distanceDiff = this.radius + ball.radius - realDist,
			norm = vector.normalize(),
			massSum = this.mass + ball.mass,
			relMass1 = this.mass / massSum,
			relMass2 = ball.mass / massSum;

		this.x -= norm[0] * distanceDiff * relMass1;
		this.y -= norm[1] * distanceDiff * relMass1;
		ball.x += norm[0] * distanceDiff * relMass2;
		ball.y += norm[1] * distanceDiff * relMass2;

		return true;
	}
	return false;
};

Ball.prototype.updateVelocity = function(ball) {
	var vector = [ball.x - this.x, ball.y - this.y],
		intensity = this.radius + ball.radius,
		norm = [vector[0]/intensity, vector[1]/intensity];

	u1 = this.vx * norm[0] + this.vy * norm[1], 
	u2 = ball.vx * norm[0] + ball.vy * norm[1], 
	v1 = (u1*(this.mass - ball.mass) + 2*ball.mass*u2) / (this.mass + ball.mass), 
	v2 = (u2*(ball.mass - this.mass) + 2*this.mass*u1) / (this.mass + ball.mass); 

	this.vx += norm[0]*(v1-u1);
	this.vy += norm[1]*(v1-u1);
	ball.vx += norm[0]*(v2-u2);
	ball.vy += norm[1]*(v2-u2);

	this.intensity = Math.sqrt(this.vx*this.vx + this.vy*this.vy);
	ball.intensity = Math.sqrt(ball.vx*ball.vx + ball.vy*ball.vy);

	if (visualMode === "SPEED") {
		this.changeColor();
		ball.changeColor();
	}
};

Ball.prototype.changeColor = function() {
	var relSpeed = (this.intensity - speedAvg) / speedAvg;
	if (relSpeed > 1) 
		relSpeed = 1;	
	this.colorWheel = relSpeed;
	this.color = "hsla(" + (120 - 120*relSpeed) + ",100%, 50%, 1)";
};

Ball.prototype.distance = function(ball) {
	return Math.sqrt((this.x-ball.x)*(this.x-ball.x) + (this.y-ball.y)*(this.y-ball.y));
};	

function initBalls() {
	for (var i = 0; i < setBallNum; i++) {
		balls[i] = new Ball();
		speedSum += balls[i].intensity;
		ballNum++;
	}
	speedAvg = speedSum / ballNum;
}

function deleteBalls() {
	for (var i = 0; i < setBallNum; i++) 
		delete balls[i];
	ballNum = 0;
	speedSum = 0;
}	

function prebroj() {
	var colorNum = [0,0,0,0];
	for (var i = 0; i < ballNum; i++) {
		var tmp = balls[i].colorWheel;
		if (tmp >= -1 && tmp <= -0.5) 
			colorNum[3]++;
		else if (tmp > -0.5 && tmp <= 0)
			colorNum[2]++;
		else if (tmp > 0 && tmp <= 0.5)
			colorNum[1]++;
		else if (tmp > 0.5 && tmp <= 1)
			colorNum[0]++;
	}
	document.getElementById("red").innerHTML = colorNum[0];	
	document.getElementById("yellow").innerHTML = colorNum[1];	
	document.getElementById("green").innerHTML = colorNum[2];	
	document.getElementById("blue").innerHTML = colorNum[3];	
}

function hideElement(element, button) {
	if (element.style.display != "none") {
		element.style.display = "none";
		button.value = "show";
	}
	else {
		element.style.display = "block";
		button.value = "hide";
	}
}

function reColor() {
	for (var i = 0; i < ballNum; i++)
		balls[i].changeColor();
}
