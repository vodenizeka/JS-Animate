function Clock(x, y, rad) {
	this.hours = 0;
	this.minutes = 0;
	this.seconds = 0;
	this.x = x; 
	this.y = y;
	this.radius = rad;
	this.angleSec = 0;
	this.angleMin = 0;
	this.angleHour = 0;
	this.secLength = this.radius * 0.9;
	this.minLength = this.radius * 0.7;
	this.hourLength = this.radius * 0.4;
	this.speed = 100;
	
	this.updateTime = function() {
		this.seconds += this.speed * Simulation.delta;
		this.angleSec = this.seconds * 2 * Math.PI / 60;
		this.angleMin = this.minutes * 2 * Math.PI / 60;
		this.angleHour = this.hours * 2 * Math.PI / 12;

		if (this.seconds >= 60) {
			this.seconds = 0;
			this.minutes++;
		}
		if (this.minutes >= 60) {
			this.minutes = 0;
			this.hours++;
		}
		if (this.hours >= 12)
			this.hours = 0;
	}

	this.draw = function() {
		c.strokeStyle = "white";
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
		c.stroke();

		this.drawClock(this.angleSec, this.minLength, 1, "red");
		this.drawClock(this.angleMin, this.minLength, 2, "green");
		this.drawClock(this.angleHour, this.hourLength, 2, "blue");
	}

	this.drawClock = function(angle, length, tickness, color) {
		c.save();
		c.translate(this.x, this.y);
		c.rotate(angle);
		c.strokeStyle = color;
		c.lineWidth = tickness;
		c.beginPath();
		c.moveTo(0, 0);
		c.lineTo(0, -length);	
		c.stroke();
		c.restore();
	}
}
