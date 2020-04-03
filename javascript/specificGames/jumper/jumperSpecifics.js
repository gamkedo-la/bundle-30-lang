const jumperLetterColor = 'red';
const jumperBackButtonRectangleColor = 'yellow';
const jumperBackButtonTextColor = 'green';

jumperGameClass.prototype = new GameClass();
function jumperGameClass()
{
  this.name = 'jumperGame';
  this.playerCharacter = undefined;
  this.defineAndInitializePlayerCharacter = function()
  {
    this.playerCharacter = new JumperClass();
    this.collidingObject = this.playerCharacter;
  }
  
  this.textAnswerFontSize = '30';
  this.textAnswerFontStyle = this.textAnswerFontSize + 'px Helvetica';

  this.titleScreenData = [{
	name: "Jumper",
	fontSize: 27,
	spacing: 15,
	x: 322, y: 185
  }];
  const MAX_PLATFORMS = 7;

  this.arrayOfJumperPlatforms = [...Array(MAX_PLATFORMS).keys()].map(function(i) {
	return {x:0, y:i*100};
  });

  this.FRAME_RATE = 1000/30;

  this.superInitialize = this.initialize;
  this.initialize = function()
  {
    this.playerCharacter = new JumperClass();
    this.collidingObject = this.playerCharacter;
    drawAnswersManager.draw();
	//this.superInitialize();
  };

  this.update = function()
  {
    if (!promptersManager.shouldBeDrawingAPrompt &&
        fullGameStateMachine.currentState === fullGameStateMachine.FULL_GAME_ENUMERABLE_STATES.playingMiniGame)
    {
      this.movePlayer();
      this.handlePlayerWrapping();
      collisionsWithAnswersManager.handleCollisionsWithAnswers(this.collidingObject);
    }
  };

  this.handleLeftArrowDown = function()
  {
    this.playerCharacter.xSpeed = this.playerCharacter.LEFT_ARROW_DOWN_SPEED;
  }

  this.handleRightArrowDown = function()
  {
    this.playerCharacter.xSpeed = this.playerCharacter.RIGHT_ARROW_DOWN_SPEED;
  }

  this.handleRightArrowUp = function()
  {
    this.playerCharacter.xSpeed = this.playerCharacter.LEFT_OR_RIGHT_ARROW_UP_SPEED;
  }

  this.handleSpaceBarDown = function()
  {
	   this.playerCharacter.jump();
  }

  this.handleLeftArrowUp = function()
  {
    this.playerCharacter.xSpeed = this.playerCharacter.LEFT_OR_RIGHT_ARROW_UP_SPEED;
  }

  this.handlePlayerWrapping = function()
  {
    if (this.playerCharacter.x < -10)//if the player goes off the left side of the screen
    {
      this.playerCharacter.x = gameCanvas.width - 5;//put them on the right side
    }

    if (this.playerCharacter.x > gameCanvas.width - 5)//if the player goes off the right side of the screen
    {
      this.playerCharacter.x = -5;//put them on the left side of the screen
    }
  }

  this.movePlayer = function()
  {
	if (!inputManager.upArrowIsBeingHeld &&
		this.playerCharacter.y !== 40 && this.playerCharacter.y !== 140 &&
		this.playerCharacter.y !== 240 && this.playerCharacter.y !== 340 && this.playerCharacter.y !== 440 &&
		this.playerCharacter.y !== 540 && this.playerCharacter.y !== 640) //if not jumping and not contacting a platform
    {
      this.playerCharacter.y += 5;//apply GRAVITY
    }
  this.playerCharacter.x += this.playerCharacter.xSpeed;
  };

  this.handleUpArrowDown = function()
  {
	   this.playerCharacter.jump();
  };

  this.handleDownArrowDown = function()
  {
    this.playerCharacter.y += 100;
    if (this.playerCharacter.y > 700)//if the player goes below the screen
    {
      this.playerCharacter.y = 30;//put them at the top platform
    }
  }

  this.draw = function()
  {
    this.drawBackground();
    this.playerCharacter.draw();
    drawAnswersManager.draw();
		promptersManager.drawPromptsWhenAppropriate();
  };

  this.drawBackground = function()
  {
  	gameCanvasContext.fillStyle = 'blue';
  	gameCanvasContext.fillRect(0,0, gameCanvas.width,gameCanvas.height);
  	gameCanvasContext.fillStyle = 'gray';
  	for (let platformsIndex = 0; platformsIndex < this.arrayOfJumperPlatforms.length; platformsIndex++)
  	{
        gameCanvasContext.fillRect(this.arrayOfJumperPlatforms[platformsIndex].x, this.arrayOfJumperPlatforms[platformsIndex].y, gameCanvas.width, 50)
  	}
    gameCanvasContext.drawImage(jumperBackground, 0,0, gameCanvas.width,gameCanvas.height);
  };

  this.onSpaceBarKeyDown = function()
  {
  	this.playerCharacter.y += -7;
  };
}

const jumperGame = new jumperGameClass();
