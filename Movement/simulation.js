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
		applyMovementForce(playerSpeed);			

		//apply anti-gravity forces
		for (let i = 0; i < antiGravityNum; i++) {
			if (antiGravity[i].isPlayerInside(player))
				player.applyForce(antiGravity[i].force);
		}
		if (gravityOn)
			player.applyForce(gravity);

		var airDrag = player.vel.clone();
		airDrag.mult(-airDragConst);
		player.applyForce(airDrag);


		player.vel.limit(maxSpeed);
		player.move();
		player.edge();
	},

	draw : function() {
		drawBackground();
		player.draw();
		player.vel.draw(player.pos.x, player.pos.y, 20);
	}
};
