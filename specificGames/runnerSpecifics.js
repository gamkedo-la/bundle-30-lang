var playerShouldBePlayingRunner = false;

function drawRunnerBackground() {
	gameCanvasContext.fillStyle = 'cyan';
	gameCanvasContext.fillRect(0, 0, gameCanvas.width, gameCanvas.height*0.75);
	gameCanvasContext.fillStyle = 'green';
	gameCanvasContext.fillRect(0, gameCanvas.height*0.75, gameCanvas.width, gameCanvas.height);
}

function drawRunnerWorld() {

}

function updateRunnerWorld() {
}
