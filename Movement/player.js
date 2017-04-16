function Player(x, y) {
	this.pos = new Vector2D(x, y);	
	this.vel = new Vector2D(0, 0);	
	this.acc = new Vector2D(0, 0);	
	this.velPerSec = new Vector2D(0, 0);	
	this.accPerSec = new Vector2D(0, 0);	
	
	
	this.color = "white";
	this.radius = 10;

	this.thrustCharging = false;
	this.thrustPower = 0;
	this.thrustIncrease = 400;

	this.mouseThrustCharging = false;
	this.mouseThrustPower = 0;
	this.mouseThrustIncrease = 2000;
	this.mouseVector = new Vector2D(0, 0); 
	
	this.maxSpeed = 1000;

	this.moveVector = new Vector2D(0, 0);
	this.moveSpeed = 1000;
	this.moveUp = false;
	this.moveDown = false;
	this.moveRight = false;
	this.moveLeft = false;

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

		if (bounce)
			this.vel.mult(edgeFriction);
	}
	
	this.applyForce = function(force) {
		this.acc.add(force);
	};

	this.updateMovement = function() {
		var x = 0, y = 0;
		if (this.moveUp)
			y -= 1;
		if (this.moveDown)
			y += 1;
		if (this.moveRight)
			x += 1;
		if (this.moveLeft)
			x -= 1;

		this.moveVector.set(x, y);
		this.moveVector.mult(this.moveSpeed);
	};

	this.thrust = function() {
		if (this.thrustCharging) {
			this.thrustPower += this.thrustIncrease;
		}
		else if (this.thrustPower) {
			var thrustForce = this.vel.clone();
			thrustForce.normalize();
			thrustForce.mult(this.thrustPower);
			this.applyForce(thrustForce);
			this.thrustPower = 0;
		}
		if (this.mouseThrustCharging) {
			this.mouseThrustPower += this.mouseThrustIncrease;
		}
		else if (this.mouseThrustPower) {
			this.mouseVector.sub(this.pos);
			this.mouseVector.normalize();
			this.mouseVector.mult(this.mouseThrustPower);
			this.applyForce(this.mouseVector);
			this.mouseThrustPower = 0;
		}
	};

	this.applyMovementForces = function() {
		this.updateMovement();
		this.applyForce(this.moveVector);
		this.thrust();
	};

	this.draw = function() {
		c.fillStyle = this.color;
		c.beginPath();
		c.arc(this.pos.x, this.pos.y, this.radius, 0, 2*Math.PI, false);
		c.fill();
	};
}

function applyAllForces() {
	player.applyMovementForces();			

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
		player.moveUp = true;		
	}
	// DOWN movement
	if (e.keyCode === 83 || e.keyCode === 40) {
		player.moveDown = true;		
	}
	// RIGHT movement
	if (e.keyCode === 68 || e.keyCode === 39) {
		player.moveRight = true;
	}
	// LEFT movement
	if (e.keyCode === 65 || e.keyCode === 37) {
		player.moveLeft = true;
	}
}, false);

// Movement deactivate
window.addEventListener("keyup", function(e) {
	// UP movement
	if (e.keyCode === 87 || e.keyCode === 38) {
		player.moveUp = false;		
	}
	// DOWN movement
	if (e.keyCode === 83 || e.keyCode === 40) {
		player.moveDown = false;		
	}
	// RIGHT movement
	if (e.keyCode === 68 || e.keyCode === 39) {
		player.moveRight = false;
	}
	// LEFT movement
	if (e.keyCode === 65 || e.keyCode === 37) {
		player.moveLeft = false;
	}
}, false);


// Thrust movement
window.addEventListener("keydown", function(e) {
	if (e.keyCode === 32) 
		player.thrustCharging = true;
}, false);

window.addEventListener("keyup", function(e) {
	if (e.keyCode === 32) 
		player.thrustCharging = false;
}, false);


// Mouse thrust movement
window.addEventListener("mousedown", function(e) {
	if (e.button === 0) {
		player.mouseThrustCharging = true;	
	}
}, false);

window.addEventListener("mouseup", function(e) {
	if (e.button === 0) {
		player.mouseThrustCharging = false;	
		player.mouseVector.set(e.clientX, e.clientY);
	}
}, false);



