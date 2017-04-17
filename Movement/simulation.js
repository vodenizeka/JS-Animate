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
		applyAllForces();		
		player.move();
		constrainInBox(player, canvasBox, "bounce");

		updateGravityFields();
	},

	draw : function() {
		drawBackground();
		drawGravityFields();
		player.draw();
		//player.vel.draw(player.pos.x, player.pos.y, 0.5);
	}
};
