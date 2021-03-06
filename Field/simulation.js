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
		for (let i of particles) { 
			i.update();	
		}
	},

	draw : function() {
		c.fillStyle = background;
		c.fillRect(0,0,canvas.width, canvas.height);
		clock.draw();			
		for (let i of particles ) 
			i.draw();	
		for (let i = 0; i < dimension; i++) {
			for (let j = 0; j < dimension; j++)
				vectorField[i,j].draw(scale +j*dimensionX,scale + i*dimensionY);
		}
	}
}

