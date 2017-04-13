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
		var airDrag = player.vel.clone();
		airDrag.mult(-airDragConst);

		for (let i = 0; i < antiGravityNum; i++) {
			if (antiGravity[i].isPlayerInside(player))
				player.applyForce(antiGravity[i].force);
		}

		player.applyForce(airDrag);
		player.applyForce(gravity);
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
