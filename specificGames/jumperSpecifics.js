const jumperLetterColor = 'red';
const jumperBackButtonRectangleColor = 'yellow';
const jumperBackButtonTextColor = 'green';

jumperGameClass.prototype = new GameClass();
function jumperGameClass()
{
  const MAX_PLATFORMS = 7;
  const jumperStartingXCoordinate = Math.random() * 640;
  const jumperStartingYCoordinate = (Math.floor(Math.random() * 7) * 100) + 30;
  const arrayOfJumperPlatforms = [...Array(MAX_PLATFORMS).keys()].map(function(i) {
	return {x:0, y:i*100};
  });
  this.frameRate = 1000/30;
  this.letterSpawnInterval = 2000;

  this.initialize = function()
  {
	playerXCoordinate = jumperStartingXCoordinate;
    playerYCoordinate = jumperStartingYCoordinate;
  };

  this.update = function()
  {
  };

  this.movePlayer = function()
  {
	if (!upArrowIsBeingHeld && playerYCoordinate !== 30 && playerYCoordinate !== 130 && playerYCoordinate !== 230
		&& playerYCoordinate !== 330 && playerYCoordinate !== 430 && playerYCoordinate !== 530 && playerYCoordinate !== 630)
    {
      playerYCoordinate += 5;
    }

    if (leftArrowIsBeingHeld)
    {
      playerXCoordinate -= 3;
      if (playerXCoordinate < -10)//if the player goes off the left side of the screen
      {
        playerXCoordinate = 635;//put them on the right side
      }
    }
    if (upArrowIsBeingHeld)
    {
      playerYCoordinate -= 5;
    }
    if (rightArrowIsBeingHeld)
    {
      playerXCoordinate += 3;
      if (playerXCoordinate > 635)//if the player goes off the right side of the screen
      {
        playerXCoordinate = -5;//put them on the left side of the screen
      }
    }
    if (downArrowIsBeingHeld)
    {

    }
  };

  this.draw = function()
  {
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

function initializeLettersForJumper()
{
  arrayOfAnswers = [];
  arrayOfAnswers.push({name:'m',
                       xCoordinate:Math.random()*640,
                       yCoordinate:Math.floor(Math.random() * 6 ) * 100 + 30/*font size*/ + 20/*offset for fillText*/});
  arrayOfAnswers.push({name:'n',
                       xCoordinate:Math.random()*640,
                       yCoordinate:Math.floor(Math.random() * 6 ) * 100 + 30/*font size*/ + 20/*offset for fillText*/});
}
