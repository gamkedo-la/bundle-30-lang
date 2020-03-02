var gameCanvas;
var gameCanvasContext;
var correctLetterAudioTag;
var arrayOfAnswers = [];

var textAnswerFontSize = 30;
var textAnswerFontStyle = 'px Helvetica';

//TODO: when the game becomes a class, please give it a name property, like this.name = 'airGrab';
window.onload = function()
{
  gameCanvas = document.getElementById("gameCanvas");
  gameCanvasContext = gameCanvas.getContext('2d');


  document.addEventListener('click', letterBounceClick, false);

  letterM = new letter('m');
  letterN = new letter('n');

  arrayOfAnswers.push(letterM);
  arrayOfAnswers.push(letterN);

  correctLetterAudioTag = document.getElementById('correctLetter');
  setOrResetCorrectLetter();

  setInterval(gameLoop, 1000/30);
}

function gameLoop()
{
  update();
  draw();
}

function update()
{
  letterM.move();
  letterM.checkWallCollision();
  letterN.move();
  letterN.checkWallCollision();
  letterM.updateCollider();
  letterN.updateCollider();
}

function draw()
{
  if (!canvasClicked)
  {
    drawSplashScreen();
  } else
  {
    drawBackground();
    letterM.draw();
    letterN.draw();
    letterM.drawCollider();
    letterN.drawCollider();
    letterM.drawColliderCoordinates();
    letterN.drawColliderCoordinates();
  }
}

var mouseCoordinates = {mouseX:undefined,mouseY:undefined};

function letterBounceClick()
{
  canvasClicked = true;
  calculateMousePosition(event);
  if (playerShouldBeSeeingSplashScreen)
  {
    setOrResetCorrectLetter();
  }
  console.log(mouseCoordinates);
  // if ()
  playerShouldBeSeeingSplashScreen = false;

  checkForCorrectLetterClick(currentCorrectLetter);
}

function calculateMousePosition(event)
{
  var rect = gameCanvas.getBoundingClientRect();
  var root = document.documentElement;
  var x = event.clientX - rect.left - root.scrollLeft;
  var y = event.clientY - rect.top - root.scrollTop;
  mouseCoordinates.mouseX = x;
  mouseCoordinates.mouseY = y;
}


function drawBackground()
{
  gameCanvasContext.fillStyle = 'black';
  gameCanvasContext.fillRect(0,0, 640,700);
}

function getRandomNumberInRange(max)
{
  let randomNumberInRange = Math.floor(Math.random() * Math.floor(max));
  return randomNumberInRange;
}

var letter = function(name)
{
  this.name = name;

  this.xCoordinate = getRandomNumberInRange(640);
  this.yCoordinate = getRandomNumberInRange(700);

  this.xVelocity = 5;
  this.yVelocity = 5;

  this.draw = function()
  {
    gameCanvasContext.fillStyle = 'red';
    gameCanvasContext.font = '30px Helvetica';
    gameCanvasContext.fillText(this.name, this.xCoordinate,this.yCoordinate);
  }

  this.move = function()
  {
    this.xCoordinate += this.xVelocity;
    this.yCoordinate += this.yVelocity;
  }

  this.checkWallCollision = function()
  {
    if (this.xCoordinate > 625 || this.xCoordinate < 5)
    {
      this.xVelocity *= -1;
    }
    if (this.yCoordinate > 700 || this.yCoordinate < 10)
    {
      this.yVelocity *= -1;
    }
  }


    this.leftWallX = this.xCoordinate;
    this.topWallY = this.yCoordinate;
    this.rightWallX = this.xCoordinate + 30;
    this.bottomWallY = this.yCoordinate + 30;


  this.drawCollider = function()
  {
    gameCanvasContext.strokeStyle = 'white';
    gameCanvasContext.strokeRect(this.leftWallX - 25,this.topWallY - 45, 65,65);
    gameCanvasContext.stroke();
  }

  this.updateCollider = function()
  {
    this.leftWallX = this.xCoordinate;
    this.topWallY = this.yCoordinate;
    this.rightWallX = this.xCoordinate + 30;
    this.bottomWallY = this.yCoordinate + 30;
  }

  this.drawColliderCoordinates = function()
  {
    gameCanvasContext.fillStyle = 'white';
    gameCanvasContext.fillText(this.leftWallX, this.leftWallX - 75,this.topWallY);
    gameCanvasContext.fillText(this.rightWallX, this.rightWallX + 15,this.topWallY);
    gameCanvasContext.fillText(this.topWallY, this.leftWallX,this.topWallY - 35);
    gameCanvasContext.fillText(this.bottomWallY, this.leftWallX,this.bottomWallY + 35);
  }
}

let letterM;
let letterN;
let currentCorrectLetter;

function setOrResetCorrectLetter()
{
  let randomNumber = Math.random()*10;

  if (randomNumber < 5)
  {
    currentCorrectLetter = 'm';
  } else {
    currentCorrectLetter = 'n';
  }
  correctLetterAudioTag.src = currentCorrectLetter + '.mp3';

  letterM.xCoordinate = getRandomNumberInRange(640);
  letterM.yCoordinate = getRandomNumberInRange(700);
  letterN.xCoordinate = getRandomNumberInRange(640);
  letterN.yCoordinate = getRandomNumberInRange(700);

  playCorrectLetterAudioTag();
}

function playCorrectLetterAudioTag()
{
  correctLetterAudioTag.play();
}

var canvasClicked = false;
var playerShouldBeSeeingSplashScreen = true;
function drawSplashScreen()
{
  drawBackground();
  gameCanvasContext.fillStyle = 'red';
  gameCanvasContext.font = '30px Helvetica';
  gameCanvasContext.fillText("Click to start", 100,100);
}

function checkForCorrectLetterClick(currentCorrectLetter)
{
  let correctLetterString = 'letter' + currentCorrectLetter.toUpperCase();
  console.log('correctLetterString: ' + correctLetterString);
  for (let arrayOfAnswersIndex = 0; arrayOfAnswersIndex < arrayOfAnswers.length; arrayOfAnswersIndex++)
  {
    // console.log('leftWallX: ' + arrayOfAnswers[arrayOfAnswersIndex].leftWallX);
    // console.log('rightWallX: ' + arrayOfAnswers[arrayOfAnswersIndex].rightWallX);
    // console.log('topWallY: ' + arrayOfAnswers[arrayOfAnswersIndex].topWallY);
    // console.log('bottomWallY: ' + arrayOfAnswers[arrayOfAnswersIndex].bottomWallY);
    // console.log('mouseX: ' + mouseCoordinates.mouseX);
    // console.log('mouseY: ' + mouseCoordinates.mouseY);
    if (mouseCoordinates.mouseX > arrayOfAnswers[arrayOfAnswersIndex].leftWallX - 30 &&
        mouseCoordinates.mouseX < arrayOfAnswers[arrayOfAnswersIndex].rightWallX + 25
     && mouseCoordinates.mouseY > arrayOfAnswers[arrayOfAnswersIndex].topWallY - 45 &&
        mouseCoordinates.mouseY < arrayOfAnswers[arrayOfAnswersIndex].bottomWallY &&
        arrayOfAnswers[arrayOfAnswersIndex].name === currentCorrectLetter)
    {
      setOrResetCorrectLetter();
      console.log('hello world');
    }
  }

}
