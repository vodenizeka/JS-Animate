function Gravity(x,y,range,mass) {
	this.x = x;
	this.y = y;
	this.range = range;
	this.mass = mass;
}

Gravity.prototype.pull = function(ball) {
	if ((ball.x-this.x)*(ball.x-this.x) + (ball.y-this.y)*(ball.y-this.y) <
			this.range * this.range) {
		var vector = new Vector2d(this.x - ball.x, this.y - ball.y),
			norm = vector.normalize(),
			force = this.mass * ball.mass  / (vector.intensity * vector.intensity); 
		ball.ax += force * norm[0];
		ball.ay += force * norm[1];
	}
	else {
		ball.ax = 0;
		ball.ay = 0;
	}
};

Gravity.prototype.draw = function() {
	c.fillStyle = "rgb(255,255,255,0.2)";
	c.strokeStyle = "red";
	c.beginPath();
	c.arc(this.x, this.y, this.range, 0, 2*Math.PI);
	c.stroke();
	c.fill();
};
