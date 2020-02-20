const birdBackButtonRectangleColor = 'yellow';
const birdBackButtonTextColor = 'red';
const birdLetterColor = 'BlueViolet';

birdGameClass.prototype = new GameClass();
function birdGameClass() {
  const birdStartingX = 100;
  const birdStartingY = 100;
  const gravity = 4;

  this.initialize = function()
  {
    gameInterval.reset(this.frameRate);
  }

  function applyGravityToBird()
  {
	   playerYCoordinate += gravity;
  }

  this.handleLeftArrowDown = function()
  {
    inputManager.leftArrowIsBeingHeld = true;
  };

  this.handleRightArrowDown = function()
  {
    inputManager.rightArrowIsBeingHeld = true;
  }

  this.moveBirdPlayerLeft = function()
  {
	   playerXCoordinate -= playerSpeedplayerSpeedYX;
  };

  this.moveBirdPlayerRight = function()
  {
	   playerXCoordinate += playerSpeedX;
   };

  this.flapUp = function()
  {
	   playerYCoordinate -= 50;
  }

  this.frameRate = 1000/30;
  this.letterSpawnInterval = 2000;

  this.initialize = function()
  {
	playerXCoordinate = birdStartingX;
    playerYCoordinate = birdStartingY;
    playerSpeedX = 5;
    letterSpeed = 3;
  };

  this.update = function()
  {
    this.movePlayer();
    this.handleOffScreenSprites();
  };

  this.movePlayer = function()
  {
  	applyGravityToBird();
  	if (inputManager.leftArrowIsBeingHeld)
  	{
      moveBirdPlayerLeft();
  	}
    else if (inputManager.rightArrowIsBeingHeld)
  	{
      moveBirdPlayerRight();
  	}
  };

  this.draw = function()
  {
    this.drawBackground();
    this.drawPlayer();
  };

  this.drawBackground = function()
  {
  	gameCanvasContext.fillStyle = 'cyan';
  	gameCanvasContext.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
  };

  this.drawPlayer = function()
  {
	  gameCanvasContext.fillStyle = 'lightCoral';
    gameCanvasContext.fillRect(playerXCoordinate, playerYCoordinate, 20,20);
  };

  this.handleOffScreenSprites = function()
  {
	if (playerYCoordinate > 690)
	{
      playerYCoordinate = 5;
	} else if (playerYCoordinate < 0) {
      playerYCoordinate = 0;
	} else if (playerXCoordinate > 630)
	{
      playerXCoordinate = -5;
	} else if (playerXCoordinate < -5)
	{
      playerXCoordinate = 635;
	}
  };

  this.handleSpaceBarDown = function()
  {
	   this.flapUp();
  };
}

var birdGame = new birdGameClass();
