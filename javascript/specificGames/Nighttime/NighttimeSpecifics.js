nighttimeGameClass.prototype = new GameClass();
function nighttimeGameClass()
{
  this.name = 'nighttime game';
  this.playerCharacter = undefined;
  this.ghost1 = undefined;
  this.ghost2 = undefined;

  this.background = new nighttimeBackground();
  this.backgroundMusic = new MusicTrack('audio/backgroundTracks/nightenedForeigner.mp3', 15.85);

  this.drawTransitionText = function()
  {
    customFontFillText(['Shoot the answers!', symbolExclamationPointImage], 60,30, 50,50);
    customFontFillText([rightArrowImage, ' ', symbolEqualsImage, ' Move right'], 30,15, 350,350);
    customFontFillText(['Space bar', ' ', symbolEqualsImage, ' Shoot'], 30,15, 175,500);
    customFontFillText([leftArrowImage, ' ', symbolEqualsImage, ' Move left'], 30,15, 50,350);
  }

  this.defineAndInitializePlayerCharacter = function()
  {
    this.playerCharacter = new NighttimePlayerCharacter();
  }

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

  this.LETTER_COLOR = 'black';
  this.textAnswerFontSize = '30';
  this.textAnswerFontStyle = this.textAnswerFontSize + 'px Helvetica';

  this.titleScreenData =
  [
	  {name: "Nighttime", fontSize: 20, spacing: 10, x: 222, y: 480}
	];

  this.collidingObject = undefined;
  this.initialize = function()
  {
    this.defineAndInitializePlayerCharacter();
    let ghost1OscillationVelocity = getRandomArbitrary(-0.035,0.035);
    let ghost2OscillationVelocity = getRandomArbitrary(-0.035,0.035);

    this.ghost1 = new Ghost("images\\sprites\\nightTime\\Ghost.png", 1, ghost1OscillationVelocity);
    this.ghost2 = new Ghost("images\\sprites\\nightTime\\ghost2.png", -1, ghost2OscillationVelocity);

    this.imageAnswerWidth = gameCanvas.width*0.1;
		this.imageAnswerHeight = gameCanvas.height*0.1;
		this.audioImageAnswerWidth = gameCanvas.width*0.1;
    this.audioImageAnswerHeight = gameCanvas.height*0.1;

    this.imageAnswerHolderWidth = gameCanvas.width*0.15;
		this.imageAnswerHolderHeight = gameCanvas.height*0.15;
		this.audioImageAnswerHolderWidth = gameCanvas.width*0.15;
    this.audioImageAnswerHolderHeight = gameCanvas.height*0.15;
    drawAnswersManager.initialize();

    promptersManager.loadAppropriatePrompterBasedOnCurrentPromptsDataType();
    this.collidingObject = this.playerCharacter.laserShot;
    gameAudio.laserShoot = new sfxOneShot('audio/V/laser.mp3');

  }

  this.handleLeftArrowDown = function()
  {
    inputManager.leftArrowIsBeingHeld = true;
  }
  this.handleLeftArrowUp = function()
  {
    inputManager.leftArrowIsBeingHeld = false;
  }
  this.handleRightArrowDown = function()
  {
    inputManager.rightArrowIsBeingHeld = true;
  }
  this.handleRightArrowUp = function()
  {
    inputManager.rightArrowIsBeingHeld = false;
  }

  this.handleSpaceBarDown = function()
  {
    this.playerCharacter.initializeLaserShot();
    gameAudio.laserShoot.play();

  }

  this.update = function()
  {
    if (!promptersManager.shouldBeDrawingAPrompt &&
        fullGameStateMachine.currentState !== fullGameStateMachine.FULL_GAME_ENUMERABLE_STATES.pausedMiniGame)
    {
      this.playerCharacter.move();
    }
    this.moveGhosts();
    this.handleGhostsAtEdgesOfScreen();
    this.collisionsWithAnswersManager.handleCollisionsWithAnswers(this.collidingObject);
  }

  this.draw = function()
  {
    this.background.draw();
    this.playerCharacter.draw();
    this.ghost1.draw();
    this.ghost2.draw();

    drawAnswersManager.draw();
    promptersManager.drawPromptsWhenAppropriate();
  }

  this.moveGhosts = function()
  {
    this.ghost1.move();
    this.ghost2.move();
  }

  this.handleGhostsAtEdgesOfScreen = function()
  {
    this.ghost1.handleEndOfScreenDirectionChanges();
    this.ghost2.handleEndOfScreenDirectionChanges();
  }
}

const nighttimeGame = new nighttimeGameClass();

function nighttimeBackground()
{
  this.image = "images\\Backgrounds\\nighttimeBackground.png";
  this.draw = function()
  {
    drawFromSheet(this.image, 0,0, gameCanvas.width,gameCanvas.height);
    //gameCanvasContext.drawImage(this.image, 0,0, gameCanvas.width,gameCanvas.height);
  }
}
