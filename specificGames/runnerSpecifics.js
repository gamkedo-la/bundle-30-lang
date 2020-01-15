var playerShouldBePlayingRunner = false;
var parallaxPos = [320,200,440, 0, 0];
const RUNNERSPEED = 10;
const RUNNERWIDTH = 30;
const RUNNERHEIGHT = 80;
const RUNNERGRAVITY = 3;
const RUNNERJUMPSPEED = 30;
const RUNNERMAXJUMPHEIGHT = 300;
const RUNNERFRAMERATE = 1000/30;
const RUNNERLETTERSPAWNRATE = 6666;
const RUNNERLETTERCOLOR = 'red';
var runnerStatus = 'run'; // 'run', 'jump', 'slide', or 'stumble'
var runnerFloorLevel = 0;

function initializeRunner() {
	runnerFloorLevel = gameCanvas.height*0.75;
	playerXCoordinate = (gameCanvas.width - RUNNERWIDTH)/2;
	playerYCoordinate = runnerFloorLevel - RUNNERHEIGHT;
	arrayOfLetters.splice(0);
	gameInterval.reset(RUNNERFRAMERATE);
    letterSpawnInterval.reset(RUNNERLETTERSPAWNRATE);
	letterSpeed = RUNNERSPEED/5;
	if (gameIsOnAServerAndCanUseWebAudioAPI)
	{
		currentBackgroundMusic = backgroundMusicBufferSource;
	} else
	{
		currentBackgroundMusic = runnerBackgroundMusic;
	}
}

function drawParallax() {
	//clouds
	gameCanvasContext.drawImage(runnerCloud1, parallaxPos[0],gameCanvas.height*0.20, 200,150);
	gameCanvasContext.drawImage(runnerCloud1, parallaxPos[1],gameCanvas.height*0.07, 150,125);
	gameCanvasContext.drawImage(runnerCloud1, parallaxPos[2],gameCanvas.height*0.12, 250,200);
	// gameCanvasContext.fillStyle = 'lightgrey';
	// gameCanvasContext.fillText('AMAZING', parallaxPos[0], gameCanvas.height*0.28);

	//mountains


	// gameCanvasContext.fillStyle = 'grey';
	// gameCanvasContext.fillText('PARALLAX', parallaxPos[3], gameCanvas.height/2);
	gameCanvasContext.fillStyle = 'dimgrey';
	gameCanvasContext.fillText('EFFECT', parallaxPos[4], gameCanvas.height*0.8);
}

function drawRunnerBackground() {
	gameCanvasContext.drawImage(runnerSunAndSkyBackgroundImage, 0,0, gameCanvas.width,gameCanvas.height);
	gameCanvasContext.drawImage(runnerMountain1Image, parallaxPos[3],gameCanvas.height*0.20, 200,350);
	gameCanvasContext.drawImage(runnerGrassImage, 0,gameCanvas.height*0.7, gameCanvas.width,gameCanvas.height*0.3);

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
	if (runnerStatus == 'stumble') {
		gameCanvasContext.save();
		gameCanvasContext.translate(x, y);
		gameCanvasContext.rotate(Math.PI/4);
		gameCanvasContext.fillRect(width, -height/2, width, height);
		gameCanvasContext.restore();
	} else {
		gameCanvasContext.fillRect(x, y, width, height);
	}
}

function runnerJump() {
	runnerStatus = 'jump';
	playerSpeedY = RUNNERJUMPSPEED;
}

function runnerSlide() {
	runnerStatus = 'slide';
}

function runnerRun() {
	runnerStatus = 'run';
	playerSpeedY = 0;
}

function moveRunnerPlayer() {
	let runnerIsRunning = runnerStatus == 'run';
	let runnerIsStumbling = runnerStatus == 'stumble';
	let runnerIsJumping = runnerStatus == 'jump';
	if (!runnerIsStumbling) {
		if (upArrowIsBeingHeld && runnerIsRunning) {
			runnerJump();
		} else if (downArrowIsBeingHeld && !runnerIsJumping) {
			runnerSlide();
		} else if (!runnerIsJumping) {
			runnerRun();
		}
		if (runnerIsJumping) {
			playerYCoordinate -= playerSpeedY;
			playerSpeedY -= RUNNERGRAVITY;
			if (playerYCoordinate + RUNNERHEIGHT > runnerFloorLevel) {
				playerYCoordinate = runnerFloorLevel - RUNNERHEIGHT;
				runnerStatus = 'run';
			}
			if (playerYCoordinate < RUNNERMAXJUMPHEIGHT) {
				playerYCoordinate = RUNNERMAXJUMPHEIGHT;
			}
		}
	}
}

function updateRunnerWorld() {
	//cloud 1
	parallaxPos[0] -= RUNNERSPEED/100;
	if (parallaxPos[0] + gameCanvasContext.measureText('AMAZING').width < 0) {
		parallaxPos[0] = gameCanvas.width;
	}
	//cloud 2
	parallaxPos[1] -= RUNNERSPEED/80;
	if (parallaxPos[1] + gameCanvasContext.measureText('PARALLAX').width < 0) {
		parallaxPos[1] = gameCanvas.width;
	}
	//cloud 3
	parallaxPos[2] -= RUNNERSPEED/120;
	if (parallaxPos[2] + gameCanvasContext.measureText('EFFECT').width < 0) {
		parallaxPos[2] = gameCanvas.width;
	}
	//mountain
	parallaxPos[3] -= RUNNERSPEED/60;
	if (parallaxPos[3] + gameCanvasContext.measureText('EFFECT').width < 0) {
		parallaxPos[3] = gameCanvas.width;
	}
	//mushroom
	parallaxPos[4] -= RUNNERSPEED/15;
	if (parallaxPos[4] + gameCanvasContext.measureText('EFFECT').width < 0) {
		parallaxPos[4] = gameCanvas.width;
	}
}
