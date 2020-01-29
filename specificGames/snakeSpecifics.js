var snakeStartingX = 320;
var snakeStartingY = 350;

var snakeTail = [];
var snakeTailMaxLength = 5;

var startingSnakeSpeedX = 0;
var startingSnakeSpeedY = 0;

var snakeDimension = 20;

var snakeGameFrameRate = 1000/10;

var snakeBackButtonRectangleColor = 'yellow';
var snakeBackButtonTextColor = 'blueviolet';

var snakeLetterColor = 'cyan';

var snakeLetterSpeed = 0;

function drawSnakeBackground()
{
    gameCanvasContext.fillStyle = 'brown';
    gameCanvasContext.fillRect(0,0, 640,700);
}



function drawSnakePlayer()
{
  gameCanvasContext.fillStyle = 'lime';

  for(let snakeTailIndex = 0; snakeTailIndex < snakeTail.length; snakeTailIndex++)
  {
    gameCanvasContext.fillRect(snakeTail[snakeTailIndex].x,snakeTail[snakeTailIndex].y,
    snakeDimension - 2,snakeDimension - 2);

    // if (snakeTrail[i].x === playerX && snakeTrail[i].y == playerY)
    // {
    //   tail = 5;
    // }

  }

}

function populateSnakeTail()
{
  snakeTail.push({x:playerXCoordinate,y:playerYCoordinate});
}

function deleteExcessTail()
{
  while (snakeTail.length > snakeTailMaxLength)
  {
    snakeTail.shift();
  }
}

function updateSnakeTail()
{
  populateSnakeTail();
  deleteExcessTail();
}

function moveSnakePlayer()
{
  playerXCoordinate += playerSpeedX;
  playerYCoordinate += playerSpeedY;
}

function wrapSnakeIfOffScreen()
{
  if (playerXCoordinate > 640)
  {
    playerXCoordinate = -20;
  } else if (playerXCoordinate < 0)
  {
    playerXCoordinate = 640;
  } else if (playerYCoordinate > 700)
  {
    playerYCoordinate = -20;
  } else if (playerYCoordinate < 0)
  {
    playerYCoordinate = 700;
  }
}

function populateArrayOfAnswersForSnake()
{
  arrayOfAnswers = [];
  
  arrayOfAnswers.push({name:'m',xCoordinate:Math.floor(Math.random()*640),yCoordinate:Math.floor(Math.random()*675)});
  arrayOfAnswers.push({name:'n',xCoordinate:Math.floor(Math.random()*640),yCoordinate:Math.floor(Math.random()*675)});
}

function drawSnakeTransitionText()
{
  //customFontFillText(sentenceArray, fontSize, spacing, xCoordinate,yCoordinate)
  customFontFillText(['Eat the answers', symbolExclamationPointImage], 60,30, 100,50);
  customFontFillText([upArrowImage, ' ', symbolEqualsImage, ' move up'], 30,15, 210,200);
  customFontFillText([rightArrowImage, ' ', symbolEqualsImage, ' move right'], 30,15, 350,350);
  customFontFillText([downArrowImage, ' ', symbolEqualsImage, ' move down'], 30,15, 200,500);
  customFontFillText([leftArrowImage, ' ', symbolEqualsImage, ' move left'], 30,15, 50,350);
}
