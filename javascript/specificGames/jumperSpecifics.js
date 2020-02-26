const jumperLetterColor = 'red';
const jumperBackButtonRectangleColor = 'yellow';
const jumperBackButtonTextColor = 'green';

jumperGameClass.prototype = new GameClass();
function jumperGameClass()
{
  this.name = 'jumperGame';
  const MAX_PLATFORMS = 7;
  const jumperStartingXCoordinate = Math.random() * 640;
  const jumperStartingYCoordinate = (Math.floor(Math.random() * 7) * 100) + 30;
  const arrayOfJumperPlatforms = [...Array(MAX_PLATFORMS).keys()].map(function(i) {
	return {x:0, y:i*100};
  });
  this.frameRate = 1000/30;
  this.letterSpawnInterval = 2000;

  function jump()
  {
	playerYCoordinate -= 5;
  }

  this.initialize = function()
  {
	playerXCoordinate = jumperStartingXCoordinate;
    playerYCoordinate = jumperStartingYCoordinate;
    gameInterval.reset(this.frameRate);
  };

  this.update = function()
  {
    this.movePlayer();
    this.handlePlayerWrapping();
  };

  this.handleLeftArrowDown = function()
  {
    inputManager.leftArrowIsBeingHeld = true;
  }

  this.handleLeftArrowBeingHeld = function()
  {
    playerXCoordinate -= 3;
  }

  this.handleRightArrowDown = function()
  {
    inputManager.rightArrowIsBeingHeld = true;
  }

  this.handleRightArrowIsBeingHeld = function()
  {
    playerXCoordinate += 3;
  }

  this.handleSpaceBarDown = function()
  {
	jump();
  }

  this.handlePlayerWrapping = function()
  {
    if (playerXCoordinate < -10)//if the player goes off the left side of the screen
    {
      playerXCoordinate = 635;//put them on the right side
    }

    if (playerXCoordinate > 635)//if the player goes off the right side of the screen
    {
      playerXCoordinate = -5;//put them on the left side of the screen
    }
  }

  this.movePlayer = function()
  {
	if (!inputManager.upArrowIsBeingHeld &&
		playerYCoordinate !== 30 && playerYCoordinate !== 130 &&
		playerYCoordinate !== 230 && playerYCoordinate !== 330 && playerYCoordinate !== 430 &&
		playerYCoordinate !== 530 && playerYCoordinate !== 630) //if not jumping and not contacting a platform
    {
      playerYCoordinate += 5;//apply GRAVITY
    }
  };

  this.handleLeftArrowDown = function() {
	playerXCoordinate -= 3;
  };

  this.handleUpArrowDown = function() {
	jump();
  };

  this.handleRightArrowDown = function() {
	playerXCoordinate += 3;
  };

  this.handleDownArrowDown = function()
  {
    playerYCoordinate += 100;
    if (playerYCoordinate > 700)//if the player goes below the screen
    {
      playerYCoordinate = 30;//put them at the top platform
    }
  }

  this.draw = function()
  {
    this.drawBackground();
    this.drawPlayer();
  };

  this.drawBackground = function()
  {
  	gameCanvasContext.fillStyle = 'black';
  	gameCanvasContext.fillRect(0,0, 640,700);
  	gameCanvasContext.fillStyle = 'blue';
  	for (let platformsIndex = 0; platformsIndex < arrayOfJumperPlatforms.length; platformsIndex++)
  	{
        gameCanvasContext.fillRect(arrayOfJumperPlatforms[platformsIndex].x, arrayOfJumperPlatforms[platformsIndex].y, gameCanvas.width, 50)
  	}
  };

  this.drawPlayer = function()
  {
  	gameCanvasContext.fillStyle = 'white';
  	gameCanvasContext.fillRect(playerXCoordinate,playerYCoordinate, 20,20);
  };

  this.onSpaceBarKeyDown = function()
  {
  	playerYCoordinate += -5;
  };
}

const jumperGame = new jumperGameClass();
