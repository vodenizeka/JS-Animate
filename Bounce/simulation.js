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
		for (var i = 0; i < ballNum; i++) 
			balls[i].update();	
		calculateCollisions();
	},

	draw : function() {
		c.fillStyle = background;
		c.fillRect(0, 0, canvas.width, canvas.height);
		for (var i = 0; i < ballNum; i++) 
			balls[i].draw();	
	}
};
