function Player(x, y) {
	this.pos = new Vector2D(x, y);	
	this.vel = new Vector2D(0, 0);	
	this.acc = new Vector2D(0, 0);	

	this.color = "white";
	this.radius = 10;

	this.move = function() {
		this.vel.add(this.acc);
		this.pos.add(this.vel);
	};

	this.edge = function() {
		var bounce = false;
		if (this.pos.x > canvas.width - this.radius) {
			this.pos.x = canvas.width - this.radius;
			this.vel.x *= -edgeBounce;
			bounce = true;
		}
		if (this.pos.x < this.radius) {
			this.pos.x = this.radius;
			this.vel.x *= -edgeBounce;
			bounce = true;
		}
		if (this.pos.y > canvas.height - this.radius) {
			this.pos.y = canvas.height - this.radius;
			this.vel.y *= -edgeBounce;
			bounce = true;
		}
		if (this.pos.y < this.radius) {
			this.pos.y = this.radius;
			this.vel.y *= -edgeBounce;
			bounce = true;
		}

		if (bounce === true)
			this.vel.mult(edgeFriction);
	}
	
	this.applyForce = function(force) {
		this.acc.add(force)
	};

	this.draw = function() {
		c.fillStyle = this.color;
		c.beginPath();
		c.arc(this.pos.x, this.pos.y, this.radius, 0, 2*Math.PI, false);
		c.fill();
	};
}

function createMovementForce(speed) {
	if (moveUp)
		moveForce.add(new Vector2D(0,-1));
	if (moveDown)
		moveForce.add(new Vector2D(0, 1));
	if (moveRight)
		moveForce.add(new Vector2D(1, 0));
	if (moveLeft)
		moveForce.add(new Vector2D(-1, 0));

	moveForce.mult(speed);	
}

function applyMovementForce(speed) {
	createMovementForce(speed);
	player.applyForce(moveForce);
	moveForce.mult(0); // reset movement force
}

function applyAllForces() {
	applyMovementForce(playerSpeed);			

	//apply anti-gravity forces
	for (let i = 0; i < gravityFieldsNum; i++) {
		if (gravityFields[i].isInside(player))
			player.applyForce(gravityFields[i].force);
	}

	if (gravityOn)
		player.applyForce(gravity);

	var airDrag = player.vel.clone();
	airDrag.mult(-airDragConst);
	player.applyForce(airDrag);
}

// Movement activate 
window.addEventListener("keydown", function(e) {
	console.log(e.keyCode);	
	// UP movement
	if (e.keyCode === 87 || e.keyCode === 38) {
		moveUp = true;		
	}
	// DOWN movement
	if (e.keyCode === 83 || e.keyCode === 40) {
		moveDown = true;		
	}
	// RIGHT movement
	if (e.keyCode === 68 || e.keyCode === 39) {
		moveRight = true;
	}
	// LEFT movement
	if (e.keyCode === 65 || e.keyCode === 37) {
		moveLeft = true;
	}
}, false);

// Movement deactivate
window.addEventListener("keyup", function(e) {
	// UP movement
	if (e.keyCode === 87 || e.keyCode === 38) {
		moveUp = false;		
	}
	// DOWN movement
	if (e.keyCode === 83 || e.keyCode === 40) {
		moveDown = false;		
	}
	// RIGHT movement
	if (e.keyCode === 68 || e.keyCode === 39) {
		moveRight = false;
	}
	// LEFT movement
	if (e.keyCode === 65 || e.keyCode === 37) {
		moveLeft = false;
	}
}, false);

window.addEventListener("keydown", function(e) {
	if (e.keyCode === 32) 
		player.thrustCharge = true;
}, false);

window.addEventListener("keyup", function(e) {
	if (e.keyCode === 32) 
		player.thrustCharge = false;
}, false);



