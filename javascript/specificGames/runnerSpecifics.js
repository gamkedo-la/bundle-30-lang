var arrayOfRunnerRunningImages = [];

runnerGameClass.prototype = new GameClass();
function runnerGameClass() {
  const RUNNERSPEED = 10;
  const RUNNERWIDTH = 100;
  const RUNNERHEIGHT = 220;
  const RUNNERGRAVITY = 0.44;
  const RUNNERJUMPSPEED = 20;
  const RUNNERMAXJUMPHEIGHT = 75;
  const RUNNERFRAMERATE = 1000/30;
  const parallaxPos = [320,200,440, 0, 0];
  let runnerStatus = 'run'; // 'run', 'jump', 'slide', or 'stumble'
  let arrayOfRunnerRunningImagesIndex = 0;

  this.currentRunnerRunningImage;
  let runnerSpeedY = 0;
  let runnerFloorLevel = 0;

  this.drawTransitionText = function()
  {
    customFontFillText(['Run and Jump to '], 35,30, 100,50);
    customFontFillText(['Collect Coins!', symbolExclamationPointImage], 35,30, gameCanvas.width/2 - 200,100);
    customFontFillText(['Space Bar ', symbolEqualsImage, ' Jump up'], 30,15, 210,gameCanvas.height/2);
  }

  this.name = 'runnerGame';
  this.textAnswerFontSize = '30';
  this.textAnswerFontStyle = this.textAnswerFontSize + 'px Helvetica';
  this.titleScreenData = [{
	name: "Runner",
	fontSize: 27,
	spacing: 13,
	x: 225, y: 285
  }];

  this.imageAnswerWidth = undefined;
  this.imageAnswerHeight = undefined;
  this.imageAnswerHolderWidth = undefined;
  this.imageAnswerHolderHeight = undefined;

  this.audioImageAnswerWidth = undefined;
  this.audioImageAnswerHeight = undefined;
  this.audioImageAnswerHolderWidth = undefined;
  this.audioImageAnswerHolderHeight = undefined;

  this.correctTextAnswerHolderWidth = undefined;
  this.incorrectTextAnswerHolderWidth = undefined;

  this.answerHolderImage = 'images\\sprites\\runner\\Coin.png';

  this.assignAnswerHolder = function()
  {
    let coinAnswerHolder = new CoinAnswerHolder(this.answerHolderImage);
    return coinAnswerHolder;
  }

  this.basketIsMovingForward = true;
  function cycleRunnerRunningImages()
  {

    if (arrayOfRunnerRunningImagesIndex === arrayOfRunnerRunningImages.length - 1)
    {
      this.basketIsMovingForward = false;
    }
    if (arrayOfRunnerRunningImagesIndex === 0)
    {
      this.basketIsMovingForward = true;
    }

  	if (this.basketIsMovingForward === true)
  	{

  	  arrayOfRunnerRunningImagesIndex++;
  	}
    else if (!this.basketIsMovingForward)
    {
      arrayOfRunnerRunningImagesIndex--;
    }

  	this.currentRunnerRunningImage = arrayOfRunnerRunningImages[arrayOfRunnerRunningImagesIndex];
  }

  // this.postLoadInit = function() {
  // 	if (gameIsOnAServerAndCanUseWebAudioAPI) {
  //          backgroundMusicBufferSource = webAudioAPIContext.createBufferSource();
  //          currentBackgroundMusic = backgroundMusicBufferSource;
  //          loadWebAudioAPISound('audio/backgroundTracks/runnerBackground.mp3', backgroundMusicBufferSource);
  //          backgroundMusicBufferSource.loop = true;
  //          backgroundMusicBufferSource.loopStart = 6.9;
  //          backgroundMusicBufferSource.loopEnd = 1;
  //      	}
  // }

  this.backgroundMusic = new MusicTrack('audio/backgroundTracks/runnerBackground.mp3', 12.8);

  this.superInitialize = this.initialize;
  this.initialize = function() {
    gameAudio.jumpSound = new sfxOneShot('audio/V/playerJump.mp3');
    gameAudio.runningSteps = new sfxLooping('audio/V/runningSteps.mp3');
    gameAudio.runningSteps.play();
    this.imageAnswerWidth = gameCanvas.width/8;
    this.imageAnswerHeight = gameCanvas.height/9;
    this.imageAnswerHolderWidth = gameCanvas.width/4;
    this.imageAnswerHolderHeight = gameCanvas.height/5;

    this.audioImageAnswerWidth = gameCanvas.width/6;
    this.audioImageAnswerHeight = gameCanvas.height/7;
    this.audioImageAnswerHolderWidth = gameCanvas.width/5;
    this.audioImageAnswerHolderHeight = gameCanvas.height/6;

    this.correctTextAnswerHolderWidth = undefined;
    this.incorrectTextAnswerHolderWidth = undefined;

    arrayOfRunnerRunningImages.push('images\\sprites\\runner\\1edited.png');
    arrayOfRunnerRunningImages.push('images\\sprites\\runner\\2edited.png');
    arrayOfRunnerRunningImages.push('images\\sprites\\runner\\3edited.png');
    arrayOfRunnerRunningImages.push('images\\sprites\\runner\\4edited.png');
    arrayOfRunnerRunningImages.push('images\\sprites\\runner\\5edited.png');
    this.currentRunnerRunningImage = arrayOfRunnerRunningImages[0];

	runnerSpeedY = 0;
	runnerFloorLevel = gameCanvas.height*0.75;
	this.playerCharacter = {
	  x: RUNNERWIDTH,
	  y: runnerFloorLevel - RUNNERHEIGHT,
	  width: RUNNERWIDTH,
	  height: RUNNERHEIGHT
	};
	this.collidingObject = this.playerCharacter;
	setInterval(cycleRunnerRunningImages, 100);
	initializePromptAndAnswerObjects();
    promptsAndAnswersManager.setOrResetPromptsAndAnswers();
    promptersManager.loadAppropriatePrompterBasedOnCurrentPromptsDataType();
	this.superInitialize();
  };

  this.update = function() {
	if (!promptersManager.shouldBeDrawingAPrompt &&
        fullGameStateMachine.currentState !== fullGameStateMachine.FULL_GAME_ENUMERABLE_STATES.pausedMiniGame)
    {
	  this.movePlayerCharacter();
	  moveAnswers();
	  this.collisionsWithAnswersManager.handleCollisionsWithAnswers(this.playerCharacter);
	}
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
    drawFromSheet(arrayOfRunnerRunningImages[arrayOfRunnerRunningImagesIndex], x, y, width,height, undefined, Math.PI/4, x,y);
	  // gameCanvasContext.save();
	  // gameCanvasContext.translate(x, y);
	  // gameCanvasContext.rotate(Math.PI/4);
	  // // gameCanvasContext.fillRect(width, -height/2, width, height);
	  // gameCanvasContext.drawImage(arrayOfRunnerRunningImages[arrayOfRunnerRunningImagesIndex], x, y, width,height);
	  // gameCanvasContext.restore();
	} else if (runnerStatus == 'jump'){
    drawFromSheet('images\\sprites\\runner\\1jump.png', x,y, width,height);
	  //gameCanvasContext.drawImage('images\\sprites\\runner\\1jump.png', x,y, width,height);
	}else {
	  // gameCanvasContext.fillRect(x, y, width, height);
    drawFromSheet(arrayOfRunnerRunningImages[arrayOfRunnerRunningImagesIndex], x,y, width,height);
	  //gameCanvasContext.drawImage(arrayOfRunnerRunningImages[arrayOfRunnerRunningImagesIndex], x,y, width,height);
	}
	drawAnswersManager.draw();
	promptersManager.drawPromptsWhenAppropriate();
  };

  this.handleUpArrowDown = function() {
	if (runnerStatus == 'run') {
	  runnerStatus = 'jump';
	  runnerSpeedY = RUNNERJUMPSPEED;
    gameAudio.jumpSound.play();
    gameAudio.runningSteps.stop();
	}
  };

  this.handleDownArrowDown = function() {
	if (runnerStatus == 'run') {
	  runnerStatus = 'slide';
	}
  };

  this.handleDownArrowUp = function() {
	if (runnerStatus == 'slide') {
	  runnerStatus = 'run';
	}
  };

  this.movePlayerCharacter = function() {
	if (runnerStatus == 'jump') {
	  this.playerCharacter.y -= runnerSpeedY;
	  runnerSpeedY -= RUNNERGRAVITY;
	  if (this.playerCharacter.y + RUNNERHEIGHT > runnerFloorLevel) {
		this.playerCharacter.y = runnerFloorLevel - RUNNERHEIGHT;
    gameAudio.runningSteps.play();
		runnerStatus = 'run';
		runnerSpeedY = 0;
	  } else if (this.playerCharacter.y < RUNNERMAXJUMPHEIGHT) {
		this.playerCharacter.y = RUNNERMAXJUMPHEIGHT;
	  }
	}
  };

  function moveAnswers() {
	promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.xCoordinate -= RUNNERSPEED/4;
    promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.xCoordinate -= RUNNERSPEED/4;
  }

  function drawParallax() {
	//clouds
  drawFromSheet('images\\Backgrounds\\runnerCloud1.png', parallaxPos[0],gameCanvas.height*0.20, 200,150);
	drawFromSheet('images\\Backgrounds\\runnerCloud1.png', parallaxPos[1],gameCanvas.height*0.07, 150,125);
	drawFromSheet('images\\Backgrounds\\runnerCloud1.png', parallaxPos[2],gameCanvas.height*0.12, 250,200);
	//gameCanvasContext.drawImage(runnerCloud1, parallaxPos[0],gameCanvas.height*0.20, 200,150);
	//gameCanvasContext.drawImage(runnerCloud1, parallaxPos[1],gameCanvas.height*0.07, 150,125);
	//gameCanvasContext.drawImage(runnerCloud1, parallaxPos[2],gameCanvas.height*0.12, 250,200);
	// gameCanvasContext.fillStyle = 'lightgrey';
	// gameCanvasContext.fillText('AMAZING', parallaxPos[0], gameCanvas.height*0.28);

	//mountains


	// gameCanvasContext.fillStyle = 'grey';
	// gameCanvasContext.fillText('PARALLAX', parallaxPos[3], gameCanvas.height/2);
	gameCanvasContext.fillStyle = 'dimgrey';
	gameCanvasContext.fillText('EFFECT', parallaxPos[4], gameCanvas.height*0.8);
  }

  this.drawBackground = function() {
  drawFromSheet('images\\Backgrounds\\runnerSunAndSky.png', 0,0, gameCanvas.width,gameCanvas.height);
  drawFromSheet('images\\Backgrounds\\runnerMountain1.png',  parallaxPos[3],gameCanvas.height*0.20, 200,350);
  drawFromSheet('images\\Backgrounds\\runnerGrass.png', 0,gameCanvas.height*0.7, gameCanvas.width,gameCanvas.height*0.3);
	// gameCanvasContext.drawImage('images\\Backgrounds\\runnerSunAndSky.png', 0,0, gameCanvas.width,gameCanvas.height);
	// gameCanvasContext.drawImage(runnerMountain1Image, parallaxPos[3],gameCanvas.height*0.20, 200,350);
	// gameCanvasContext.drawImage(runnerGrassImage, 0,gameCanvas.height*0.7, gameCanvas.width,gameCanvas.height*0.3);

	drawParallax();
  };

  this.getPromptAndAnswerPairingsCoordinates = function() {
	const coinFlip = Math.random() < 0.5;
	return {
	  correct: {
		x: gameCanvas.width - 80,
		y: coinFlip ? RUNNERMAXJUMPHEIGHT : runnerFloorLevel - 70
	  },
	  incorrect: {
		x: gameCanvas.width - 80,
		y: coinFlip ? runnerFloorLevel - 70 : RUNNERMAXJUMPHEIGHT
	  }
	};
  };
}

const runnerGame = new runnerGameClass();

function CoinAnswerHolder(image)
{
  this.image = image;
}
