function Ball() {
	this.radius = Math.random()*10 + 5;
	this.mass = this.radius;
	this.x = Math.random() * (canvas.width - this.radius);
	this.y = Math.random() * (canvas.height - this.radius);
	this.vx = Math.random() * maxSpeed;
	this.vy = Math.random() * maxSpeed;
	this.color = "hsla("+ Math.random()*360 +",100%,50%,1)";
	this.intensity = Math.sqrt(this.vx*this.vx + this.vy*this.vy);
}

Ball.prototype.checkEdge = function() {
	var rightEdge = canvas.width - this.radius,
		leftEdge = this.radius,
		topEdge = this.radius,
		bottomEdge = canvas.height - this.radius;
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

Ball.prototype.draw = function() {
	this.x += this.vx;
	this.y += this.vy;					
	this.checkEdge();
	var visual = this.color;
	if (visualMode === "SPEED") {
		var relSpeed = (this.intensity - speedAvg)/speedAvg;
		if (relSpeed > 1) {
			relSpeed = 1;	
		}
		visual = "hsla(" + (120 - 120*relSpeed) + ",100%, 50%, 1)";
	}
	c.fillStyle = visual;
	c.strokeStyle = visual;
	c.beginPath();
	c.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
	c.stroke();
	c.fill();
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
	for (var i = 0; i < setBallNum; i++) {
		delete balls[i];
	}	
	ballNum = 0;
	speedSum = 0;
}	

function distance(x, y, x1, y1) {
	return Math.sqrt((x-x1)*(x-x1) + (y-y1)*(y-y1));
}	

function collide(ball1, ball2) {
	var tmp;
	if ((tmp = distance(ball1.x, ball1.y, ball2.x, ball2.y))
				 <= ball1.radius + ball2.radius) {
		var vektor = [ball2.x - ball1.x, ball2.y - ball1.y],
			distanceDiff = ball1.radius + ball2.radius - tmp,
			norm = [vektor[0]/tmp, vektor[1]/tmp];
		ball1.x -= norm[0] * distanceDiff/2;
		ball1.y -= norm[1] * distanceDiff/2;
		ball2.x += norm[0] * distanceDiff/2;
		ball2.y += norm[1] * distanceDiff/2;
		
		return true;
	}
	return false;
}

function updateVelocity(ball1, ball2) {
	var vektor = [ball2.x - ball1.x, ball2.y - ball1.y],
		intensity = ball1.radius + ball2.radius,
		norm = [vektor[0]/intensity, vektor[1]/intensity],
		u1 = ball1.vx * norm[0] + ball1.vy * norm[1], // vektor1 before coll
		u2 = ball2.vx * norm[0] + ball2.vy * norm[1], // vektor2 before coll
		v1 = (u1*(ball1.mass - ball2.mass) + 2*ball2.mass*u2) /
			 (ball1.mass + ball2.mass),             // vektor1 after coll
		v2 = (u2*(ball2.mass - ball1.mass) + 2*ball1.mass*u1) /
			 (ball1.mass + ball2.mass);             // vektor1 after coll	
		ball1.vx += norm[0]*(v1-u1)
		ball1.vy += norm[1]*(v1-u1)
		ball2.vx += norm[0]*(v2-u2)
		ball2.vy += norm[1]*(v2-u2)
		ball1.intensity = Math.sqrt(ball1.vx*ball1.vx + ball1.vy*ball1.vy);
		ball2.intensity = Math.sqrt(ball2.vx*ball2.vx + ball2.vy*ball2.vy);
}

function calculateCollisions() {
	for (var i = 0; i < ballNum-1; i++) {
		for (var j = i +1; j < ballNum; j++) {
			if (collide(balls[i], balls[j]))
				updateVelocity(balls[i], balls[j]);
		}
	}
}

