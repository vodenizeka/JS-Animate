Simulation = {
	frame : function() {
		Simulation.setDelta();
		Simulation.update();
		Simulation.draw();
		Simulation.checkConditions();
		Simulation.animationFrame = window.requestAnimationFrame(Simulation.frame);
	},
	
	setDelta : function() {
		Simulation.now = Date.now();
		Simulation.delta = (Simulation.now - Simulation.then) / 1000;
		Simulation.then = Simulation.now;
	},

	update : function() {
		player.update();
		ball.update();
	},

	draw : function() {
		c.fillStyle = background;
		c.fillRect(0, 0, canvas.width, canvas.height);
		c.fillStyle = textColor;
		c.fillText("Life: " + life, canvas.width * 0.855555, 30);
		player.draw();
		ball.draw();
		for (var i = 0; i < brickNum; i++) {
			if (bricks[i].exists)
				bricks[i].draw();
		}
	},

	checkConditions : function() {
		if (destroyedBricks == brickNum) {
			player.reset();
			ball.reset();
			resetBricks();	
			destroyedBricks = 0;
			life = 3;
			alert("YOU WIN!");
		}
		else if (outOfBounds) {
			player.reset();
			ball.reset();
			outOfBounds = false;
			life--;
			if (life == 0) {
				alert("GAME OVER!");
				resetBricks();
			}
			else
				alert("You suck!");
		}

	}
};
