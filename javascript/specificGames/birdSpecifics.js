const birdBackButtonRectangleColor = 'yellow';
const birdBackButtonTextColor = 'red';
const birdLetterColor = 'BlueViolet';

birdGameClass.prototype = new GameClass();
function birdGameClass() {
  const BIRD_STARTING_X = 100;
  const BIRD_STARTING_Y = 100;
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
    playerXCoordinate = BIRD_STARTING_X;
    playerYCoordinate = BIRD_STARTING_Y;
    playerXSpeed = 0;
    letterSpeed = 3;
  }

  function applyGRAVITYToBird()
  {
	   playerYCoordinate += GRAVITY;
  }

  this.handleLeftArrowDown = function()
  {
    playerXSpeed = LEFT_ARROW_DOWN_SPEED;
  };

  this.handleRightArrowDown = function()
  {
    playerXSpeed = RIGHT_ARROW_DOWN_SPEED;
  }

  this.handleLeftArrowUp = function()
  {
    playerXSpeed = LEFT_ARROW_UP_SPEED;
  }

  this.handleRightArrowUp = function()
  {
    playerXSpeed = RIGHT_ARROW_UP_SPEED;
  }

  function moveBirdPlayerLeft()
  {
     playerXSpeed = -5;
  };

  function moveBirdPlayerRight()
  {
     playerXSpeed = 5;
   };

  this.flapUp = function()
  {
	   playerYCoordinate -= 50;
  }

  this.update = function()
  {
    this.movePlayer();
    this.handleOffScreenSprites();
  };

  this.movePlayer = function()
  {
    applyGRAVITYToBird();

    playerXCoordinate += playerXSpeed;

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
