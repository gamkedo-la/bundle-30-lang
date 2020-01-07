var playerShouldBePlayingRunner = false;
var parallaxPos = [0, 0, 0];
const RUNNERSPEED = 10;
const RUNNERWIDTH = 30;
const RUNNERHEIGHT = 80;
const RUNNERGRAVITY = 4;
const RUNNERJUMPSPEED = 30;
const RUNNERMAXJUMPHEIGHT = 300;
var runnerStatus = 'run'; // 'run', 'jump', or 'slide'


function initializeRunner() {
	playerXCoordinate = (gameCanvas.width - RUNNERWIDTH)/2;
	playerYCoordinate = gameCanvas.height*0.75 - RUNNERHEIGHT;
}

function drawParallax() {
	gameCanvasContext.drawImage(runnerCloud1, parallaxPos[0],gameCanvas.height*0.28, 50,50);
	// gameCanvasContext.fillStyle = 'lightgrey';
	// gameCanvasContext.fillText('AMAZING', parallaxPos[0], gameCanvas.height*0.28);
	gameCanvasContext.fillStyle = 'grey';
	gameCanvasContext.fillText('PARALLAX', parallaxPos[1], gameCanvas.height/2);
	gameCanvasContext.fillStyle = 'dimgrey';
	gameCanvasContext.fillText('EFFECT', parallaxPos[2], gameCanvas.height*0.8);
}

function drawRunnerBackground() {
	gameCanvasContext.drawImage(runnerSunAndSkyBackgroundImage, 0,0, gameCanvas.width,gameCanvas.height);
	// gameCanvasContext.fillStyle = 'cyan';
	// gameCanvasContext.fillRect(0, 0, gameCanvas.width, gameCanvas.height*0.75);
	// gameCanvasContext.fillStyle = 'green';
	// gameCanvasContext.fillRect(0, gameCanvas.height*0.75, gameCanvas.width, gameCanvas.height);
	drawParallax();
}

function drawRunnerWorld() {
	gameCanvasContext.fillStyle = 'white';
	let x = playerXCoordinate;
	let y = playerYCoordinate;
	let width = RUNNERWIDTH;
	let height = RUNNERHEIGHT;
	if (runnerStatus == 'slide') {
		width = RUNNERHEIGHT;
		height = RUNNERWIDTH;
		y = gameCanvas.height*0.75 - height;
	}
	gameCanvasContext.fillRect(x, y, width, height);
}

function runnerJump() {
	runnerStatus = 'jump';
	playerSpeedY = RUNNERJUMPSPEED;
}

function runnerSlide() {
	runnerStatus = 'slide';
	playerSpeedY = 0;
}

function runnerRun() {
	runnerStatus = 'run';
	playerSpeedY = 0;
}

function moveRunnerPlayer() {
	if (upArrowIsBeingHeld) {
		runnerJump();
	} else if (downArrowIsBeingHeld) {
		runnerSlide();
	} else {
		runnerRun();
	}
	playerYCoordinate -= playerSpeedY;
	playerYCoordinate += RUNNERGRAVITY;
	if (playerYCoordinate + RUNNERHEIGHT > gameCanvas.height*0.75) {
		playerYCoordinate = gameCanvas.height*0.75 - RUNNERHEIGHT;
	}
	if (playerYCoordinate < RUNNERMAXJUMPHEIGHT) {
		playerYCoordinate = RUNNERMAXJUMPHEIGHT;
	}
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
