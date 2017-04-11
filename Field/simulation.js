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
		clock.updateTime();
	},

	draw : function() {
		c.fillStyle = background;
		c.fillRect(0,0,canvas.width, canvas.height);
		clock.draw();			
	}
}

