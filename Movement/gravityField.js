function GravityField(posX, posY, width, height, forceX, forceY, color) {
	this.pos = new Vector2D(posX, posY);	
	this.force = new Vector2D(forceX, forceY);
	this.width = width;
	this.height = height;
	this.colorRange = color;

	this.isPlayerInside = function(player) {
		if (player.pos.x >= this.pos.x && 
			player.pos.x <= this.pos.x + this.width &&
			player.pos.y >= this.pos.y &&
			player.pos.y <= this.pos.y + this.height)
			return true;
		return false;
	};
}




