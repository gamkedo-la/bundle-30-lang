function getRandomIntInclusive(min, max)
{
min = Math.ceil(min);
max = Math.floor(max);
return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

var snakeStartingX = getRandomIntInclusive(0,640);
var snakeStartingY = getRandomIntInclusive(0,700);

var snakeTail = [];


const STARTING_SNAKE_SPEED_X = 0;
const STARTING_SNAKE_SPEED_Y = 0;

const SNAKE_TAIL_MAX_LENGTH = 5;
const SNAKE_DIMENSION = 20;

const SNAKE_GAME_FRAME_RATE = 1000/10;

const SNAKE_BACK_BUTTON_RECTANGLE_COLOR = 'yellow';
const SNAKE_BACK_BUTTON_TEXT_COLOR = 'blueviolet';

const SNAKE_LETTER_COLOR = 'cyan';

const SNAKE_LETTER_SPEED = 0;

const SNAKE_BACKGROUND_COLOR = 'brown';

const SNAKE_PLAYER_COLOR = 'lime';

function snakeGameClass()
{
  let gameIsPlaying = false;

  this.isPlaying = function()
  {
    return gameIsPlaying;
  };

  this.startPlaying = function()
  {
    gameIsPlaying = true;
  }

  this.stopPlaying = function()
  {
    gameIsPlaying = false;
  }

  this.initialize = function()
  {
    playerXCoordinate = snakeStartingX;
    playerYCoordinate = snakeStartingY;
    gameInterval.reset(SNAKE_GAME_FRAME_RATE);
    playerSpeedX = 0;
    playerSpeedY = 0;
    letterSpeed = SNAKE_LETTER_SPEED;
    SNAKE_GAME.populateArrayOfAnswers();
    setOrResetCorrectLetter();

  }


  //update section
  this.update = function()
  {
    this.updateSnakeTail();
    this.movePlayer();
  }

  this.updateSnakeTail = function()
  {
    this.populateSnakeTail();
    this.deleteExcessTail();
  }

  this.populateSnakeTail = function()
  {
    snakeTail.push({x:playerXCoordinate,y:playerYCoordinate});
  }

  this.deleteExcessTail = function()
  {
    while (snakeTail.length > SNAKE_TAIL_MAX_LENGTH)
    {
      snakeTail.shift();
    }
  }

  this.movePlayer = function()
  {
    playerXCoordinate += playerSpeedX;
    playerYCoordinate += playerSpeedY;
    this.wrapSnakeIfOffScreen();
  }

  this.wrapSnakeIfOffScreen = function()
  {
    if (playerXCoordinate > gameCanvas.width)
    {
      playerXCoordinate = 0;
    } else if (playerXCoordinate < 0)
    {
      playerXCoordinate = gameCanvas.width;
    } else if (playerYCoordinate > gameCanvas.height)
    {
      playerYCoordinate = 0;
    } else if (playerYCoordinate < 0)
    {
      playerYCoordinate = gameCanvas.height;
    }
  }

  //draw section
  this.draw = function()
  {
    this.drawBackground();
    this.drawPlayer();
    this.drawAnswers();
  }

  this.drawBackground = function()
  {
    gameCanvasContext.fillStyle = SNAKE_BACKGROUND_COLOR;
    gameCanvasContext.fillRect(0,0, gameCanvas.width,gameCanvas.height);
  }

  this.drawPlayer = function()
  {
    gameCanvasContext.fillStyle = SNAKE_PLAYER_COLOR;

    for(let snakeTailIndex = 0; snakeTailIndex < snakeTail.length; snakeTailIndex++)
    {
      gameCanvasContext.fillRect(snakeTail[snakeTailIndex].x,snakeTail[snakeTailIndex].y,
      SNAKE_DIMENSION - 2,SNAKE_DIMENSION - 2);

      // if (snakeTrail[i].x === playerX && snakeTrail[i].y == playerY)
      // {
      //   tail = 5;
      // }
    }
  }

  this.drawTransitionText = function()
  {
    customFontFillText(['Eat the answers', symbolExclamationPointImage], 60,30, 100,50);
    customFontFillText([upArrowImage, ' ', symbolEqualsImage, ' move up'], 30,15, 210,200);
    customFontFillText([rightArrowImage, ' ', symbolEqualsImage, ' move right'], 30,15, 350,350);
    customFontFillText([downArrowImage, ' ', symbolEqualsImage, ' move down'], 30,15, 200,500);
    customFontFillText([leftArrowImage, ' ', symbolEqualsImage, ' move left'], 30,15, 50,350);
  }

  this.populateArrayOfAnswers = function()
  {

    

  }

  this.drawAnswers = function()
  {
    gameCanvasContext.fillStyle = SNAKE_LETTER_COLOR;
    for (var letterIndex = 0; letterIndex < arrayOfAnswers.length; letterIndex++)
    {
      gameCanvasContext.fillText(arrayOfAnswers[letterIndex].name,
      arrayOfAnswers[letterIndex].xCoordinate,arrayOfAnswers[letterIndex].yCoordinate);
    }
  }
}

const SNAKE_GAME = new snakeGameClass();
