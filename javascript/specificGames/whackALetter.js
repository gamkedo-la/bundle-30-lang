var whackALetterCanvas;
var whackALetterCanvasContext;
var whackALetterFrameRate = 1000/30;

var playerShouldSeeSplashScreen = true;

var tileImage = document.createElement("img");
var hammerCursorImage = document.createElement("img");

var mouseCoordinates = {mouseX:undefined,mouseY:undefined};

function calculateMousePosition(builtInDocumentEventObject)
{
  var rect = whackALetterCanvas.getBoundingClientRect();
  var root = document.documentElement;
  var x = builtInDocumentEventObject.clientX - rect.left - root.scrollLeft;
  var y = builtInDocumentEventObject.clientY - rect.top - root.scrollTop;
  mouseCoordinates.mouseX = x;
  mouseCoordinates.mouseY = y;
}

function drawSplashScreen()
{
  whackALetterCanvasContext.fillStyle = 'black';
  whackALetterCanvasContext.fillRect(0,0, 640,700);

  whackALetterCanvasContext.fillStyle = 'blue';
  whackALetterCanvasContext.font = '30px Helvetica';
  whackALetterCanvasContext.fillText('Loading Screen. Click to start.', 0,30);
}

window.onload = function()
{
  whackALetterCanvas = document.getElementById('whackALetterCanvas');
  whackALetterCanvasContext = whackALetterCanvas.getContext('2d');

  whackALetterCanvas.addEventListener('click', handleWhackALetterClick);
  whackALetterCanvas.addEventListener('mousemove', calculateMousePosition);

  initializeLetters();
  loadTileImage();
  setInterval(gameLoop, whackALetterFrameRate);
}

let mouseClicked = false;

function handleWhackALetterClick()
{
  playerShouldSeeSplashScreen = false;
  document.body.style.cursor = 'none';
  if (!playerShouldSeeSplashScreen)
  {
    mouseClicked = true;
    setTimeout(unclickMouse, 200);
  }
}

function unclickMouse()
{
  mouseClicked = false;
}

function gameLoop()
{
  updateEverything();
  drawEverything();
}

function updateEverything()
{
  moveLetters();
}

function drawEverything()
{
  if (playerShouldSeeSplashScreen)
  {
    drawSplashScreen();
  } else {

    drawBackground();
    drawLetters();
    drawTiles();
    drawHammerCursor();
  }
}

function drawHammerCursor()
{
  if (mouseClicked)
  {
    whackALetterCanvasContext.save();
    whackALetterCanvasContext.translate(mouseCoordinates.mouseX + 35,mouseCoordinates.mouseY + 25);
    whackALetterCanvasContext.rotate(-45*Math.PI/180);
    whackALetterCanvasContext.translate(-(mouseCoordinates.mouseX + 35),-(mouseCoordinates.mouseY + 25));

    whackALetterCanvasContext.drawImage(hammerCursorImage, mouseCoordinates.mouseX - 35,mouseCoordinates.mouseY - 25, 100,100);
    whackALetterCanvasContext.restore();
  } else {
    {
      whackALetterCanvasContext.drawImage(hammerCursorImage, mouseCoordinates.mouseX - 35,mouseCoordinates.mouseY - 25, 100,100);
    }
  }

}

function drawBackground()
{
  whackALetterCanvasContext.fillStyle = 'black';
  whackALetterCanvasContext.fillRect(0,0, 640,700);
}

function loadTileImage()
{
  tileImage.src = 'whackALetterTile.png';
  hammerCursorImage.src = 'whackHammer.png';
}

function drawTiles()
{
  for (let rowIndex = 0; rowIndex < 3; rowIndex++)
  {
    for (let currentColumn = 0; currentColumn < 3; currentColumn++)
    {
      whackALetterCanvasContext.drawImage(tileImage, currentColumn*(640/3),rowIndex*(700/3), 640/3,700/3);
    }
  }
}

var arrayOfAnswers = [];

function LetterClass(name, xStartingPosition,yStartingPosition, positionName)
{
  this.name = name;
  this.xStartingPosition = xStartingPosition;
  this.yStartingPosition = yStartingPosition;

  this.x = this.xStartingPosition;
  this.y = this.yStartingPosition;

  this.xVelocity = 2;
  this.yVelocity = 2;
  this.oscillationVelocity = getRandomArbitrary(0.1, 0.3);
  this.radians = 0;

  this.positionName = positionName;

  this.randomTimeoutToStartMovement = Math.random();

  this.draw = function()
  {
    whackALetterCanvasContext.fillStyle = 'red';
    whackALetterCanvasContext.font = '30px Helvetica';
    whackALetterCanvasContext.fillText(this.name, this.x,this.y);
  }

  this.move = function()
  {
    this.radians += this.oscillationVelocity;

    if (this.positionName === 'left')
    {
      //left and right
      this.x = this.xStartingPosition + 50 + (Math.cos(this.radians) * 25) + this.xVelocity;
    }
    else if (this.positionName === 'right')
    {
      this.x = this.xStartingPosition - 75 + (Math.cos(this.radians) * 25) + this.xVelocity;
    }
    else if (this.positionName === 'above')
    {
      //up and down
      this.y = this.yStartingPosition + 75 + (Math.sin(this.radians) * 25) + this.yVelocity;
    }
    else if (this.positionName === 'below')
    {
      this.y = this.yStartingPosition - 60 + (Math.sin(this.radians) * 25) + this.yVelocity;
    }
  }
}

function initializeLetters()
{
  let name;
  let startingPositions = {xStartingPosition:undefined,yStartingPosition:undefined};
  let positionName;

  for (let rowIndex = 0; rowIndex < 3; rowIndex++)
  {
    for (let currentColumn = 0; currentColumn < 3; currentColumn++)
    {
      let randomNumber = Math.random();
      if (randomNumber < 0.5)
      {
        name = 'm';
      } else {
        name = 'n';
      }

      randomNumber = Math.random();
      if (randomNumber < 0.25)//left of hole
      {
        startingPositions.xStartingPosition = 0 + currentColumn*(640/3);
        startingPositions.yStartingPosition = ((700/3)/2) + rowIndex*(700/3);
        positionName = 'left';
      } else if (randomNumber >= 0.25 && randomNumber < 0.5)//above hole
      {
        startingPositions.xStartingPosition = ((640/3)/2)  + currentColumn*(640/3);
        startingPositions.yStartingPosition = 0 + rowIndex*(700/3);
        positionName = 'above';
      } else if (randomNumber >= 0.5 && randomNumber < 0.75)//right of hole
      {
        startingPositions.xStartingPosition = 640/3 + currentColumn*(640/3);
        startingPositions.yStartingPosition = ((700/3)/2) + rowIndex*(700/3);
        positionName = 'right';
      } else if (randomNumber >= 0.75 && randomNumber <= 1)//below hole
      {
        startingPositions.xStartingPosition = (640/3)/2 + currentColumn*(640/3);
        startingPositions.yStartingPosition = (700/3) + rowIndex*(700/3);
        positionName = 'below';
      }

    let letter = new LetterClass(name, startingPositions.xStartingPosition,startingPositions.yStartingPosition, positionName);
    arrayOfAnswers.push(letter);
    }
  }
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function drawLetters()
{
  for (let arrayOfTextLettersIndex = 0; arrayOfTextLettersIndex < arrayOfAnswers.length; arrayOfTextLettersIndex++)
  {
    arrayOfAnswers[arrayOfTextLettersIndex].draw();
  }
}

function moveLetters()
{
  for (let arrayOfTextLettersIndex = 0; arrayOfTextLettersIndex < arrayOfAnswers.length; arrayOfTextLettersIndex++)
  {
    arrayOfAnswers[arrayOfTextLettersIndex].move();
  }
}
