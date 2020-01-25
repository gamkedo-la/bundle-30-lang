var memoryCanvas;
var memoryCanvasContext;

var playerShouldSeeSplashScreen = true;;

function drawBackground()
{
  memoryCanvasContext.fillStyle = 'black';
  memoryCanvasContext.fillRect(0,0, 640,700);
}

function drawSplashScreen()
{
  drawBackground();
  memoryCanvasContext.fillStyle = 'blue';
  memoryCanvasContext.font = '30px Helvetica';
  memoryCanvasContext.fillText('Loading Screen.', 0,30);
  memoryCanvasContext.fillText('Click to start when finished loading.', 0,60);

}

window.onload = function()
{
  memoryCanvas = document.getElementById('memoryCanvas');
  memoryCanvasContext = memoryCanvas.getContext('2d');

  memoryCanvas.addEventListener('click', handleClicks);

  initializePromptBoxes();
  initializeButtonChoiceObjects();
  assignRandomLeftRightPositionForChoiceButtons();


  console.log(arrayOfPromptBoxes);
  console.log(arrayOfLetterChoiceButtons);

  drawSplashScreen();
}

function handleClicks()
{
  if (playerShouldSeeSplashScreen)
  {
    playerShouldSeeSplashScreen = !playerShouldSeeSplashScreen;

    shufflerIntervalObject = new intervalObject(shuffleLetterAnswerBoxesColors, 100, 1500);
    shufflerIntervalObject.start();
    setTimeout(function(){stopShufflingChoices()},2000);

    setInterval(gameLoop, 1000/30);

  }
}

function gameLoop()
{
  updateEverything();
  drawEverything();
}

function updateEverything()
{

}

function drawEverything()
{
    if (!playerShouldSeeSplashScreen)
    {
      drawBackground();
      drawPromptBoxes();
      drawLetterChoiceButtons();
    }
}

let leftSidePromptBoxObject = {};
let rightSidePromptBoxObject = {};
let arrayOfPromptBoxes = [];

function coloredAudioVisualPromptBoxClass(xCoordinateNumber,yCoordinateNumber,colorString)
{
  this.xCoordinate = xCoordinateNumber;
  this.yCoordinate = yCoordinateNumber;
  this.color = colorString;

  this.width = 100;
  this.height = 50;

  this.isPromptingBoolean = false;

  this.draw = function()
  {
    memoryCanvasContext.fillStyle = this.color;
    memoryCanvasContext.strokeStyle = this.color;
    memoryCanvasContext.beginPath();
    memoryCanvasContext.strokeRect(this.xCoordinate,this.yCoordinate, this.width,this.height);

    if (this.isPromptingBoolean)
    {
      memoryCanvasContext.fillRect(this.xCoordinate,this.yCoordinate, this.width,this.height);
    }
  }
}

function initializePromptBoxes()
{
  leftSidePromptBoxObject = new coloredAudioVisualPromptBoxClass(170,300, 'purple');
  arrayOfPromptBoxes.push(leftSidePromptBoxObject);
  rightSidePromptBoxObject = new coloredAudioVisualPromptBoxClass(420,300, 'green');
  arrayOfPromptBoxes.push(rightSidePromptBoxObject);
}

function drawPromptBoxes()
{
  for (let arrayOfPromptBoxesIndex = 0; arrayOfPromptBoxesIndex < arrayOfPromptBoxes.length; arrayOfPromptBoxesIndex++)
  {
    arrayOfPromptBoxes[arrayOfPromptBoxesIndex].draw();
  }
}

var lettersAreShufflingBoolean = true;
let arrayOfRandomShufflingColors = ['blue', 'green', 'red', 'yellow', 'purple', 'orange', 'pink'];
let arrayOfLetterChoiceButtons = [];

function stopShufflingChoices()
{
  lettersAreShufflingBoolean = false;
  clearInterval(shufflerIntervalObject.timerObject);
}

function letterChoiceButtonsClass(nameString)
{
  this.name = nameString;
  this.xCoordinate = undefined;
  this.yCoordinate = 600;

  this.width = 30;
  this.height = 30;

  this.randomShufflingColor = undefined;

  this.assignRandomShufflingColor = function()
  {
    let randomIndexForArrayOfShufflingColors = getRandomIntInclusive(0, arrayOfRandomShufflingColors.length - 1);
    this.randomShufflingColor = arrayOfRandomShufflingColors[randomIndexForArrayOfShufflingColors];
  }

  this.draw = function()
  {
    if (!lettersAreShufflingBoolean)
    {
      memoryCanvasContext.fillStyle = 'orange';
      memoryCanvasContext.fillRect(this.xCoordinate,this.yCoordinate, this.width,this.height);
    } else {
      memoryCanvasContext.fillStyle = this.randomShufflingColor;
      memoryCanvasContext.fillRect(this.xCoordinate,this.yCoordinate, this.width,this.height);
    }
  }
}

let letterMChoiceButtonObject = {};
let letterNChoiceButtonObject = {};

function initializeButtonChoiceObjects()
{
  letterMChoiceButtonObject = new letterChoiceButtonsClass('m');
  arrayOfLetterChoiceButtons.push(letterMChoiceButtonObject);
  letterNChoiceButtonObject = new letterChoiceButtonsClass('n');
  arrayOfLetterChoiceButtons.push(letterNChoiceButtonObject);
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

function shuffleLetterAnswerBoxesColors()
{
  for (let arrayOfLetterChoiceButtonsIndex = 0; arrayOfLetterChoiceButtonsIndex < arrayOfLetterChoiceButtons.length; arrayOfLetterChoiceButtonsIndex++)
  {
    arrayOfLetterChoiceButtons[arrayOfLetterChoiceButtonsIndex].assignRandomShufflingColor();
  }
}


function assignRandomLeftRightPositionForChoiceButtons()
{
  let randomNumber = Math.random();
  if (randomNumber < 0.5)
  {
    letterMChoiceButtonObject.xCoordinate = 100;
    letterNChoiceButtonObject.xCoordinate = 540;
  } else if (randomNumber >= 0.5)
  {
    letterMChoiceButtonObject.xCoordinate = 540;
    letterNChoiceButtonObject.xCoordinate = 100;
  }
}

function drawLetterChoiceButtons()
{
  for (let arrayOfLetterChoiceButtonsIndex = 0; arrayOfLetterChoiceButtonsIndex < arrayOfLetterChoiceButtons.length; arrayOfLetterChoiceButtonsIndex++)
  {
    arrayOfLetterChoiceButtons[arrayOfLetterChoiceButtonsIndex].draw();
  }
}

function intervalObject(updateFunction, frameRate) {
    var timerObject = setInterval(updateFunction, frameRate);

    this.stop = function() {
        if (timerObject) {
            clearInterval(timerObject);
            timerObject = null;
        }
        return this;
    }

    // start timer using current settings (if it's not already running)
    this.start = function() {
        if (!timerObject) {
            this.stop();
            timerObject = setInterval(updateFunction, frameRate);
        }
        return this;
    }

    // start with new interval, stop current interval
    this.reset = function(newRate) {
        frameRate = newRate;
        return this.stop().start();
    }
}

let shufflerIntervalObject = {};
