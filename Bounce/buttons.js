function hideElement(element, button) {
	if (element.style.display != "none") {
		element.style.display = "none";
		button.value = "show";
	}
	else {
		element.style.display = "block";
		button.value = "hide";
	}
}
function simulate() {
	deleteBalls();
	var num = document.getElementById("ball").value;
	setBallNum = parseInt(num);
	var speed = document.getElementById("speed").value; 
	maxSpeed = speed;
	visualMode = document.getElementById("color").value;
	initBalls();
}
