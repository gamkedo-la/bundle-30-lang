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
	gameClassManager.currentGame.playerCharacter.y -= 5;
  }

  this.initialize = function()
  {
	gameClassManager.currentGame.playerCharacter.x = jumperStartingXCoordinate;
    gameClassManager.currentGame.playerCharacter.y = jumperStartingYCoordinate;
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
    gameClassManager.currentGame.playerCharacter.x -= 3;
  }

  this.handleRightArrowDown = function()
  {
    inputManager.rightArrowIsBeingHeld = true;
  }

  this.handleRightArrowIsBeingHeld = function()
  {
    gameClassManager.currentGame.playerCharacter.x += 3;
  }

  this.handleSpaceBarDown = function()
  {
	jump();
  }

  this.handlePlayerWrapping = function()
  {
    if (gameClassManager.currentGame.playerCharacter.x < -10)//if the player goes off the left side of the screen
    {
      gameClassManager.currentGame.playerCharacter.x = 635;//put them on the right side
    }

    if (gameClassManager.currentGame.playerCharacter.x > 635)//if the player goes off the right side of the screen
    {
      gameClassManager.currentGame.playerCharacter.x = -5;//put them on the left side of the screen
    }
  }

  this.movePlayer = function()
  {
	if (!inputManager.upArrowIsBeingHeld &&
		gameClassManager.currentGame.playerCharacter.y !== 30 && gameClassManager.currentGame.playerCharacter.y !== 130 &&
		gameClassManager.currentGame.playerCharacter.y !== 230 && gameClassManager.currentGame.playerCharacter.y !== 330 && gameClassManager.currentGame.playerCharacter.y !== 430 &&
		gameClassManager.currentGame.playerCharacter.y !== 530 && gameClassManager.currentGame.playerCharacter.y !== 630) //if not jumping and not contacting a platform
    {
      gameClassManager.currentGame.playerCharacter.y += 5;//apply GRAVITY
    }
  };

  this.handleLeftArrowDown = function() {
	gameClassManager.currentGame.playerCharacter.x -= 3;
  };

  this.handleUpArrowDown = function() {
	jump();
  };

  this.handleRightArrowDown = function() {
	gameClassManager.currentGame.playerCharacter.x += 3;
  };

  this.handleDownArrowDown = function()
  {
    gameClassManager.currentGame.playerCharacter.y += 100;
    if (gameClassManager.currentGame.playerCharacter.y > 700)//if the player goes below the screen
    {
      gameClassManager.currentGame.playerCharacter.y = 30;//put them at the top platform
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
  	gameCanvasContext.fillRect(gameClassManager.currentGame.playerCharacter.x,gameClassManager.currentGame.playerCharacter.y, 20,20);
  };

  this.onSpaceBarKeyDown = function()
  {
  	gameClassManager.currentGame.playerCharacter.y += -5;
  };
}

const jumperGame = new jumperGameClass();
