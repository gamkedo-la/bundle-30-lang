const birdBackButtonRectangleColor = 'yellow';
const birdBackButtonTextColor = 'red';
const birdLetterColor = 'BlueViolet';

birdGameClass.prototype = new GameClass();
function birdGameClass() {
  this.name = 'birdGame';
  this.playerCharacter = undefined;

  const GRAVITY = 4;
  const LEFT_ARROW_DOWN_SPEED = -8;
  const RIGHT_ARROW_DOWN_SPEED = 8;
  const LEFT_ARROW_UP_SPEED = -4;
  const RIGHT_ARROW_UP_SPEED = 4;

  this.frameRate = 1000/30;
  this.letterSpawnInterval = 2000;

  this.initialize = function()
  {
    gameInterval.reset(this.frameRate);
    this.playerCharacter = new BirdClass();
    this.playerCharacter.initialize();
  }

  this.applyGRAVITYToBird = function()
  {
	   this.playerCharacter.y += GRAVITY;
  }

  this.handleLeftArrowDown = function()
  {
    this.playerCharacter.xSpeed = LEFT_ARROW_DOWN_SPEED;
  };

  this.handleRightArrowDown = function()
  {
    this.playerCharacter.xSpeed = RIGHT_ARROW_DOWN_SPEED;
  }

  this.handleLeftArrowUp = function()
  {
    this.playerCharacter.xSpeed = LEFT_ARROW_UP_SPEED;
  }

  this.handleRightArrowUp = function()
  {
    this.playerCharacter.xSpeed = RIGHT_ARROW_UP_SPEED;
  }

  this.update = function()
  {
    this.playerCharacter.move();
    this.playerCharacter.handleOffScreen();
  };

  this.draw = function()
  {
    this.drawBackground();
    this.playerCharacter.draw();
  };

  this.drawBackground = function()
  {
  	gameCanvasContext.fillStyle = 'cyan';
  	gameCanvasContext.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
  };

  this.handleSpaceBarDown = function()
  {
	   this.playerCharacter.flapUp();
  };

  this.shuffleAndResetPromptsAndAnswers = function()
  {
    promptsAndAnswersManager.setOrResetPromptsAndAnswers();
  }

  this.loadPromptsManager = function()
  {
    promptersManager.loadAppropriatePrompterBasedOnCurrentPromptsDataType();
  }

  this.promptThePlayer = function()
  {
    promptersManager.promptThePlayer();
  }


}

var birdGame = new birdGameClass();
