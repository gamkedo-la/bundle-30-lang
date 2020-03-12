const RUNNERSPEED = 10;
const RUNNERWIDTH = 100;
const RUNNERHEIGHT = 220;
const RUNNERGRAVITY = 1.5;
const RUNNERJUMPSPEED = 30;
const RUNNERMAXJUMPHEIGHT = 75;
const RUNNERFRAMERATE = 1000/30;
const RUNNERLETTERSPAWNRATE = 5555;
const RUNNERLETTERCOLOR = 'red';
var arrayOfRunnerRunningImages = [];
var runnerStatus = 'run'; // 'run', 'jump', 'slide', or 'stumble'
var runnerFloorLevel = 0;

runnerGameClass.prototype = new GameClass();
function runnerGameClass() {
	this.name = 'runnerGame';
	this.titleScreenData = [{
	  name: "Runner",
	  fontSize: 27,
	  spacing: 13,
	  x: 225, y: 285
	}];
	let arrayOfRunnerRunningImagesIndex = 0;
	let runnerImagesIndexDirection = 1;
	let currentRunnerRunningImage;

    const parallaxPos = [320,200,440, 0, 0];

	function cycleRunnerRunningImages()
	{
		arrayOfRunnerRunningImagesIndex += runnerImagesIndexDirection;
		if (arrayOfRunnerRunningImagesIndex === 2)
		{
			runnerImagesIndexDirection = -1;
		} else if (arrayOfRunnerRunningImagesIndex === 0){
			runnerImagesIndexDirection = 1;
		}
		currentRunnerRunningImage = arrayOfRunnerRunningImages[arrayOfRunnerRunningImagesIndex];
	}

  this.superInitialize = this.initialize;
  this.initialize = function() {
	runnerFloorLevel = gameCanvas.height*0.75;
	this.playerCharacter = {
	  x: (gameCanvas.width - RUNNERWIDTH)/2,
	  y: runnerFloorLevel - RUNNERHEIGHT
	};
	if (gameIsOnAServerAndCanUseWebAudioAPI)
	{
	  currentBackgroundMusic = backgroundMusicBufferSource;
	}
	setInterval(cycleRunnerRunningImages, 200);
	this.superInitialize();
  };

	this.update = function() {
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
	};

	this.draw = function() {
		this.drawBackground();
		gameCanvasContext.fillStyle = 'white';
		let x = this.playerCharacter.x;
		let y = this.playerCharacter.y;
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
			// gameCanvasContext.fillRect(width, -height/2, width, height);
			gameCanvasContext.drawImage(arrayOfRunnerRunningImages[arrayOfRunnerRunningImagesIndex], x,y, width,height);
			gameCanvasContext.restore();
		} else if (runnerStatus == 'jump'){
			gameCanvasContext.drawImage(runnerJumpingImage, x,y, width,height);
		}else {
			// gameCanvasContext.fillRect(x, y, width, height);
			gameCanvasContext.drawImage(currentRunnerRunningImage, x,y, width,height);
		}
	};

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

	this.movePlayerCharacter = function() {
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
				this.playerCharacter.y -= playerSpeedY;
				playerSpeedY -= RUNNERGRAVITY;
				if (this.playerCharacter.y + RUNNERHEIGHT > runnerFloorLevel) {
					this.playerCharacter.y = runnerFloorLevel - RUNNERHEIGHT;
					runnerStatus = 'run';
				}
				if (this.playerCharacter.y < RUNNERMAXJUMPHEIGHT) {
					this.playerCharacter.y = RUNNERMAXJUMPHEIGHT;
				}
			}
		}
	};

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

	this.drawBackground = function() {
		gameCanvasContext.drawImage(runnerSunAndSkyBackgroundImage, 0,0, gameCanvas.width,gameCanvas.height);
		gameCanvasContext.drawImage(runnerMountain1Image, parallaxPos[3],gameCanvas.height*0.20, 200,350);
		gameCanvasContext.drawImage(runnerGrassImage, 0,gameCanvas.height*0.7, gameCanvas.width,gameCanvas.height*0.3);

		drawParallax();
	};

  this.handleDownArrowDown = runnerSlide;
  this.handleUpArrowDown = runnerJump;
  this.handleUpArrowUp = runnerRun;
  this.handleDownArrowUp = runnerRun;
}

const runnerGame = new runnerGameClass();
AVAILABLE_GAMES.push(runnerGame);
