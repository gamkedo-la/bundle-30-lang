var letterFrogCanvas;
var letterFrogCanvasContext;

var letterFrogFrameRate = 1000/30;

var letterFrogLetterColor = 'red';

//TODO: when the game becomes a class, please give it a name property, like this.name = 'airGrab';

function drawLetterFrogBackground()
{
  //water
  letterFrogCanvasContext.fillStyle = 'Aqua';
  letterFrogCanvasContext.fillRect(0,0, 640,700);

  //land
  letterFrogCanvasContext.fillStyle = 'Chocolate';
  letterFrogCanvasContext.fillRect(0,0, 640,50);
  letterFrogCanvasContext.fillRect(0,650, 640,700);
}

window.onload = function()
{
  letterFrogCanvas = document.getElementById("letterFrogCanvas");
  letterFrogCanvasContext = letterFrogCanvas.getContext('2d');

  document.addEventListener('keydown', handleKeyDown);
  document.addEventListener('click', handleSplashScreenClick);

  frog = new FrogClass();
  initializeOrResetLilyPads();

  initializeCorrectLetterAudio();
  setOrResetCorrectLetterAudio();

  setInterval(gameLoop, letterFrogFrameRate);
}

function handleKeyDown(builtInDocumentEventObject)
{
    switch(builtInDocumentEventObject.keyCode) {
  case 37://left arrow
  if (frog.yCoordinate === 650)
  {
    frog.xCoordinate -= 3;
  }

    break;
  case 38://up arrow
    frog.checkForLilyLanding();
    if (frog.yCoordinate === 50)
    {
      frog.yCoordinate -= 50;
      frog.currentLilyPad = undefined;
    }
    if (frog.yCoordinate === 0)
    {
      frog.yCoordinate = 650;
    }
    break;
  case 39://right arrow
  if (frog.yCoordinate === 650)
  {
      frog.xCoordinate += 3;
    }
    break;
  }
}

function gameLoop()
{
  updateEverything();
  drawEverything();
}

function updateEverything()
{
  if(!userClickedAfterLoadingBool)
  {
    return;
  } else {
    moveLilyPads();
    handleOffScreenLilyPads();
    frog.updateCenterX();
    frog.moveWhileOnLilyPad();
    frog.handleOffScreen();
  }
}

function drawEverything()
{
  if(!userClickedAfterLoadingBool)
  {
    drawSplashScreen();
  } else {
    drawLetterFrogBackground();
    drawLilyPads();
    frog.draw();
  }

}

let frog;

function FrogClass()
{
  this.xCoordinate = Math.random() * 640;
  this.yCoordinate = 650;

  this.width = 64;
  this.height = 50;
  this.centerX = this.xCoordinate + this.width/2;

  this.updateCenterX = function()
  {
    this.centerX = this.xCoordinate + this.width/2;
  }

  this.color = 'DarkGreen';

  this.draw = function()
  {
    letterFrogCanvasContext.fillStyle = this.color;
    letterFrogCanvasContext.fillRect(this.xCoordinate,this.yCoordinate, this.width,this.height);
  }

  this.checkForLilyLanding = function()
  {
    for (let arrayOfLilyPadsIndex = 0; arrayOfLilyPadsIndex < arrayOfLilyPads.length; arrayOfLilyPadsIndex++)
    {
      if (this.centerX > arrayOfLilyPads[arrayOfLilyPadsIndex].xCoordinate &&
          this.centerX < arrayOfLilyPads[arrayOfLilyPadsIndex].xCoordinate + 50 &&
          this.yCoordinate - 50 === arrayOfLilyPads[arrayOfLilyPadsIndex].yCoordinate &&
          arrayOfLilyPads[arrayOfLilyPadsIndex].letter === currentCorrectLetter)
          {
            console.log('inside check for lily landing success, should have heard frog jump audio');
            gameAudio.frogJump.play();
            this.yCoordinate -= 50;
            this.currentLilyPad = arrayOfLilyPads[arrayOfLilyPadsIndex];
            setOrResetCorrectLetterAudio();
            correctLetterAudio.play();
          }
    }
  }

  this.currentLilyPad = undefined;

  this.moveWhileOnLilyPad = function()
  {
    if (this.currentLilyPad)
    {
      this.xCoordinate += this.currentLilyPad.speed*this.currentLilyPad.direction;
    }
  }

  this.handleOffScreen = function()
  {
    if (this.xCoordinate > 690)
    {
      {
        this.xCoordinate = -50;
      }
    }
    if (this.xCoordinate < -50)
    {
      this.xCoordinate = 690;
    }
  }

}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

let arrayOfLilyPads = [];

function LilyPadClass()
{
  this.xCoordinate = Math.floor(Math.random()*640);
  this.yCoordinate = undefined;

  this.width = 64;
  this.height = 50;

  this.speed = 2;

  this.color = 'Chartreuse';

  this.direction = undefined;

  this.drawLetter = function()
  {
    letterFrogCanvasContext.fillStyle = 'red';
    letterFrogCanvasContext.font = '30px Helvetica';
    letterFrogCanvasContext.fillText(this.letter, this.xCoordinate + 22,this.yCoordinate + 30);
  }

  this.draw = function()
  {
    letterFrogCanvasContext.fillStyle = this.color;
    letterFrogCanvasContext.fillRect(this.xCoordinate,this.yCoordinate, this.width,this.height);
    this.drawLetter();
  }

  this.move = function()
  {
    this.xCoordinate += this.speed*this.direction;
  }

  this.handleOffScreen = function()
  {
    if (this.xCoordinate > 690)
    {
      {
        this.xCoordinate = -50;
      }
    }
    if (this.xCoordinate < -50)
    {
      this.xCoordinate = 690;
    }
  }

  this.letter = undefined;

}

function initializeOrResetLilyPads()
{
  for (let arrayOfLilyPadsIndex = 1; arrayOfLilyPadsIndex < 13; arrayOfLilyPadsIndex++)
  {
    let lilyPad1 = new LilyPadClass();
    lilyPad1.yCoordinate = arrayOfLilyPadsIndex*50;
    let lilyPad2 = new LilyPadClass();
    lilyPad2.yCoordinate = arrayOfLilyPadsIndex*50;

    let randomNumber = Math.random();
    if (randomNumber < 0.5)
    {
      lilyPad1.letter = 'm';
      lilyPad2.letter = 'n';
    } else
    {
      lilyPad1.letter = 'n';
      lilyPad2.letter = 'm';
    }

    if (arrayOfLilyPadsIndex%2 === 0)
    {
      lilyPad1.direction = 1;//move to the right
      lilyPad2.direction = 1;//move to the right
    } else {
      lilyPad1.direction = -1;//move to the left
      lilyPad2.direction = -1;//move to the left
    }
    arrayOfLilyPads.push(lilyPad1);
    arrayOfLilyPads.push(lilyPad2);
  }
}

function drawLilyPads()
{
  for (let arrayOfLilyPadsIndex = 0; arrayOfLilyPadsIndex < arrayOfLilyPads.length; arrayOfLilyPadsIndex++)
  {
    arrayOfLilyPads[arrayOfLilyPadsIndex].draw();
  }
}

function moveLilyPads()
{
  for (let arrayOfLilyPadsIndex = 0; arrayOfLilyPadsIndex < arrayOfLilyPads.length; arrayOfLilyPadsIndex++)
  {
    arrayOfLilyPads[arrayOfLilyPadsIndex].move();
  }
}

function handleOffScreenLilyPads()
{
  for (let arrayOfLilyPadsIndex = 0; arrayOfLilyPadsIndex < arrayOfLilyPads.length; arrayOfLilyPadsIndex++)
  {
    arrayOfLilyPads[arrayOfLilyPadsIndex].handleOffScreen();
  }
}

var correctLetterAudio;
var currentCorrectLetter = undefined;

function initializeCorrectLetterAudio()
{
  correctLetterAudio = document.getElementById("correctLetterAudio");
}

function setOrResetCorrectLetterAudio()
{
  let randomNumber = Math.random();
  if (randomNumber < 0.5)
  {
    correctLetterAudio.src = 'm.mp3';
  } else {
    correctLetterAudio.src = 'n.mp3';
  }
  currentCorrectLetter = correctLetterAudio.src.charAt(correctLetterAudio.src.length - 5);
}

let userClickedAfterLoadingBool = false;

function drawSplashScreen()
{
  letterFrogCanvasContext.fillStyle = 'Aqua';
  letterFrogCanvasContext.fillRect(0,0, 640,700);

  letterFrogCanvasContext.fillStyle = 'black';
  letterFrogCanvasContext.font = '30px Helvetica';
  letterFrogCanvasContext.fillText('Game is loading, click when done', 30,30);
}

function handleSplashScreenClick(builtInDocumentEventObject)
{
  userClickedAfterLoadingBool = true;
  correctLetterAudio.play();
}
