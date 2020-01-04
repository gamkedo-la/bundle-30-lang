var playerShouldBePlayingRunner = false;
var parallaxPos = [0, 0, 0];
const RUNNERSPEED = 10;

function drawParallax() {
	gameCanvasContext.fillStyle = 'lightgrey';
	gameCanvasContext.fillText('AMAZING', parallaxPos[0], 100);
	gameCanvasContext.fillStyle = 'grey';
	gameCanvasContext.fillText('PARALLAX', parallaxPos[1], 200);
	gameCanvasContext.fillStyle = 'dimgrey';
	gameCanvasContext.fillText('EFFECT', parallaxPos[2], 300);
}

function drawRunnerBackground() {
	gameCanvasContext.fillStyle = 'cyan';
	gameCanvasContext.fillRect(0, 0, gameCanvas.width, gameCanvas.height*0.75);
	gameCanvasContext.fillStyle = 'green';
	gameCanvasContext.fillRect(0, gameCanvas.height*0.75, gameCanvas.width, gameCanvas.height);
	drawParallax();
}

function drawRunnerWorld() {

}

function updateRunnerWorld() {
	parallaxPos[0] -= RUNNERSPEED/3;
	if (parallaxPos[0] + gameCanvasContext.measureText('AMAZING').width < 0) {
		parallaxPos[0] = gameCanvas.width;
	}
	parallaxPos[1] -= RUNNERSPEED/2;
	if (parallaxPos[1] + gameCanvasContext.measureText('PARALLAX').width < 0) {
		parallaxPos[1] = gameCanvas.width;
	}
	parallaxPos[2] -= RUNNERSPEED;
	if (parallaxPos[2] + gameCanvasContext.measureText('EFFECT').width < 0) {
		parallaxPos[2] = gameCanvas.width;
	}
}
