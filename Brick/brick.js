function Brick(x, y) {
	this.x = x;
	this.y = y;
	this.width = 80;
	this.height = 20;
	this.exists = true;
	this.color = "yellow";
	this.id = brickNum;
	bricks[brickNum++] = this;
}

Brick.prototype.draw = function() {
	c.fillStyle = this.color;
	c.beginPath();
	c.fillRect(this.x, this.y, this.width, this.height);
};

function resetBricks() {
	for (var i = 0; i < brickNum; i++)
		bricks[i].exists = true;
}

function initBricks(row, col) {
	var startX = 150,
		startY = 50;
	for (var i = 0; i < row; i++) {
		for (var j = 0; j < col; j++) {
			new Brick(startX + j*100, startY + i*50);
		}
	}
}
