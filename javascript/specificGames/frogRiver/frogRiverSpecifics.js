frogRiverGameClass.prototype = new GameClass();

function frogRiverGameClass()
{
  this.name = 'frogRiverGame';
  this.playerCharacter = undefined;
  this.textAnswerFontSize = '30';
  this.textAnswerFontStyle = this.textAnswerFontSize + 'px Helvetica';

  this.imageAnswerWidth = 70;
  this.imageAnswerHeight = 70;
  // this.imageAnswerHolderWidth = 60;
  // this.imageAnswerHolderHeight = 60;
  this.audioImageAnswerWidth = 70;
  this.audioImageAnswerHeight = 70;
  // this.audioImageAnswerHolderWidth = 60;
  // this.audioImageAnswerHolderHeight = 60;

  this.titleScreenData = [{name: "Frog",fontSize: 27,spacing: 15,x: 530, y: 265},
                          {name: "River",fontSize: 27,spacing: 15,x: 525, y: 305}];

  this.drawTransitionText = function()
  {
    customFontFillText(['Jump on the Answer', symbolExclamationPointImage], 60,30, 50,50);
    customFontFillText([upArrowImage, ' ', symbolEqualsImage, ' Jump Up'], 30,15, 210,200);
    customFontFillText([rightArrowImage, ' ', symbolEqualsImage, ' Move right'], 30,15, 350,350);
    customFontFillText([leftArrowImage, ' ', symbolEqualsImage, ' Move left'], 30,15, 50,350);
  }

  this.FRAME_RATE = 1000/30;

  this.playerCharacter = undefined;
  this.defineAndInitializePlayerCharacter = function()
  {
    this.playerCharacter = new FrogRiverPlayer();
  }
  this.background = undefined;
  this.lilyPadManager = undefined;
  this.backButtonColor = 'yellow';
  this.backButtonTextColor = 'blueViolet';

  this.backgroundMusic = new MusicTrack('audio/backgroundTracks/200410.mp3', 73.46);

  this.pregameSpecialCode = function()
  {
    this.lilyPadManager = new LilyPadManager();
    this.lilyPadManager.initializeLilyPads();
    gameAudio.frogJump = new sfxOneShot('audio/V/frogJump.mp3');
    gameAudio.riverComplete = new sfxOneShot('audio/V/riverComplete.mp3');
  }

  this.superInitialize = function()
  {
    this.background = new FrogRiverBackground();
    // initializePromptAndAnswerObjects();
    // promptsAndAnswersManager.setOrResetPromptsAndAnswers();
    // promptersManager.loadAppropriatePrompterBasedOnCurrentPromptsDataType();
  }

  this.draw = function()
  {
    this.background.draw();
    this.lilyPadManager.drawLilyPads();
    this.playerCharacter.draw();

    if(this.answerCount > -1){
      drawAnswersManager.draw();
    }

    promptersManager.drawPromptsWhenAppropriate();
  }

  this.update = function()
  {
    this.lilyPadManager.moveLilyPads();
    this.lilyPadManager.handleOffScreenLilyPads();
    this.playerCharacter.updateCenterX();
    this.playerCharacter.moveWhileOnLilyPad();
    this.playerCharacter.handleOffScreen();
  }

  this.handleLeftArrowDown = function()
  {
    if (this.playerCharacter.y === 600)
    {
      this.playerCharacter.x -= 3;
    }
  };

  this.handleRightArrowDown = function()
  {
    if (this.playerCharacter.y === 600)
    {
      this.playerCharacter.x += 3;
    }
  }

  this.handleUpArrowDown = function()
  {
    if (this.answerCount === -1)
    {
      gameAudio.riverComplete.play();
    }

    if (this.answerCount === -1)
    {
      this.playerCharacter.y = 600;
      this.playerCharacter.currentLilyPad = undefined;
      this.answerCount = 4;
      this.additiveToAnswers = 4;
      this.collisionsWithAnswersManager.resetAnswers();
    }
    else{
      this.playerCharacter.checkForLilyLanding();
    }

  }

  this.answerCount = 4;
  this.additiveToAnswers = 4;
}

const frogRiverGame = new frogRiverGameClass();

function FrogRiverPlayer()
{
  this.x = Math.random() * 640;
  this.y = 600;

  this.width = 64;
  this.height = 50;
  this.centerX = this.x + this.width/2;

  this.updateCenterX = function()
  {
    this.centerX = this.x + this.width/2;
  }

  this.color = 'DarkGreen';
  this.sprite = "images\\sprites\\frogRiver\\Frog.png";

  this.draw = function()
  {
    drawFromSheet(this.sprite, this.x, this.y, this.width, this.height);
    //gameCanvasContext.drawImage(this.sprite, this.x, this.y, this.width, this.height);
  }

  this.checkForLilyLanding = function()
  {
    let answerCount = frogRiverGame.answerCount;
    let additive = frogRiverGame.additiveToAnswers;
    let leftLilyIndex = answerCount + additive;

    for (let i = leftLilyIndex; i < leftLilyIndex + 2; i++)
    {

        let lilyToCheck = frogRiverGame.lilyPadManager.arrayOfLilyPads[i];
        let lilyLeftBoundary = lilyToCheck.xCoordinate;
        let lilyRightBoundary = lilyLeftBoundary + lilyToCheck.width;
        let frogCenterPoint = this.centerX;

        if (frogCenterPoint > lilyLeftBoundary && frogCenterPoint < lilyRightBoundary)
        {
          this.y = lilyToCheck.yCoordinate + 10;

          this.currentLilyPad = lilyToCheck;

          if (lilyToCheck.answer === promptsAndAnswersManager.correctTargetPromptAndAnswerPairing)
          {
            frogRiverGame.collisionsWithAnswersManager.processCollisionWithCorrectAnswer();// amountCorrect++;
          }
          else
          {
            frogRiverGame.collisionsWithAnswersManager.processCollisionWithIncorrectAnswer();
          }
          calculateAccuracy();

          gameAudio.frogJump.play();

          this.resetAnswersInOccupiedLilyLine();

          frogRiverGame.answerCount--;
          frogRiverGame.additiveToAnswers--;

          if (frogRiverGame.answerCount > -1)
          {
            frogRiverGame.collisionsWithAnswersManager.resetAnswers();
          }
        }
      }

    }


  this.currentLilyPad = undefined;

  this.moveWhileOnLilyPad = function()
  {
    if (this.currentLilyPad !== undefined)
    {
      this.x += this.currentLilyPad.speed*this.currentLilyPad.direction;
    }
  }

  this.handleOffScreen = function()
  {
    if (this.x > 690)
    {
      {
        this.x = -50;
      }
    }
    if (this.x < -50)
    {
      this.x = 690;
    }
  }

  this.resetAnswersInOccupiedLilyLine = function() {
    this.currentLilyPad.answer = undefined;
    this.currentLilyPad.lilyNeighbourOnSameLine.answer = undefined;
  }
}

function LilyPadClass()
{
  this.xCoordinate = undefined;
  this.yCoordinate = undefined;

  this.image = undefined;
  this.answer = undefined;

  this.width = 100;
  this.height = 75;

  this.speed = 2;

  this.color = 'Chartreuse';

  this.direction = undefined;

  this.lilyNeighbourOnSameLine = undefined;

  this.draw = function()
  {
    drawFromSheet(this.image, this.xCoordinate,this.yCoordinate, this.width,this.height);
    //gameCanvasContext.drawImage(this.image, this.xCoordinate,this.yCoordinate, this.width,this.height);
  }

  this.move = function()
  {
    this.xCoordinate += this.speed*this.direction;
    if (this.answer !== undefined)
    {
      this.centerAnswersXCoordinate();
    }
  }

  this.centerAnswersXCoordinate = function() {
    this.answer.xCoordinate = this.xCoordinate + this.width / 2;

    if (promptsAndAnswersManager.currentAnswerDataType === 'string'){
      var answerWidth = gameCanvasContext.measureText(this.answer.textAssociation).width;
      this.answer.xCoordinate -= answerWidth / 2;
    }
    else if (promptsAndAnswersManager.currentAnswerDataType === 'IMG'){
      this.answer.xCoordinate -= gameClassManager.currentGame.imageAnswerWidth / 2;
    }
    else if (promptsAndAnswersManager.currentAnswerDataType === 'AUDIO'){
      this.answer.xCoordinate -= gameClassManager.currentGame.audioImageAnswerWidth / 2;
    }
}

  this.handleOffScreen = function()
  {
    if (this.xCoordinate > 690)
    {
      {
        this.xCoordinate = -50;
        if (this.answer !== undefined)
        {
          this.centerAnswersXCoordinate();
        }
      }
    }

    if (this.xCoordinate < -50)
    {
      this.xCoordinate = 690;
      if (this.answer !== undefined)
      {
        this.centerAnswersXCoordinate();
      }
    }
  }
}

function FrogRiverBackground()
{
  this.image = "images\\Backgrounds\\river.png";

  this.draw = function()
  {
    drawFromSheet(this.image, 0,0, gameCanvas.width,gameCanvas.height);
    //gameCanvasContext.drawImage(this.image, 0,0, gameCanvas.width,gameCanvas.height);
  }
}



function initializeOrResetLilyPads()
{

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

function LilyPadManager()
{
  this.arrayOfLilyPads = [];

  this.arrayOfLilyPadImages = ["images\\sprites\\frogRiver\\lilyImage1.png","images\\sprites\\frogRiver\\lilyImage2.png","images\\sprites\\frogRiver\\lilyImage3.png","images\\sprites\\frogRiver\\lilyImage4.png"];

  this.answerCount = 0;

  this.initializeLilyPads = function()
  {
    for (let arrayOfLilyPadsIndex = 0; arrayOfLilyPadsIndex < 5; arrayOfLilyPadsIndex++)
    {
      let lilyPad1 = new LilyPadClass();
      lilyPad1.yCoordinate = 150 + arrayOfLilyPadsIndex*90;
      lilyPad1.xCoordinate = Math.floor(Math.random()*640);
      let randomNumber = getRandomIntInclusive(0,this.arrayOfLilyPadImages.length - 1);
      lilyPad1.image = this.arrayOfLilyPadImages[randomNumber];
      let lilyPad2 = new LilyPadClass();
      lilyPad2.xCoordinate = Math.floor(Math.random()*640);

      do
      {
        lilyPad2.xCoordinate = Math.floor(Math.random()*640);
      }
      while (Math.abs(lilyPad2.xCoordinate - lilyPad1.xCoordinate) < 150)

      randomNumber = getRandomIntInclusive(0,this.arrayOfLilyPadImages.length - 1);
      lilyPad2.image = this.arrayOfLilyPadImages[randomNumber];
      lilyPad2.yCoordinate = 150 + arrayOfLilyPadsIndex*90;

      if (arrayOfLilyPadsIndex%2 === 0)
      {
        lilyPad1.direction = 1;//move to the right
        lilyPad2.direction = 1;//move to the right
      } else {
        lilyPad1.direction = -1;//move to the left
        lilyPad2.direction = -1;//move to the left
      }

      lilyPad1.lilyNeighbourOnSameLine = lilyPad2;
      lilyPad2.lilyNeighbourOnSameLine = lilyPad1;

      this.arrayOfLilyPads.push(lilyPad1);
      this.arrayOfLilyPads.push(lilyPad2);
    }
  }

  this.drawLilyPads = function()
  {
    for (let lilyPadIndex = 0; lilyPadIndex < this.arrayOfLilyPads.length; lilyPadIndex++)
    {
      this.arrayOfLilyPads[lilyPadIndex].draw();
    }
  }

  this.moveLilyPads = function()
  {
    for (let arrayOfLilyPadsIndex = 0; arrayOfLilyPadsIndex < this.arrayOfLilyPads.length; arrayOfLilyPadsIndex++)
    {
      this.arrayOfLilyPads[arrayOfLilyPadsIndex].move();
    }
  }

  this.handleOffScreenLilyPads = function()
  {
    for (let arrayOfLilyPadsIndex = 0; arrayOfLilyPadsIndex < this.arrayOfLilyPads.length; arrayOfLilyPadsIndex++)
    {
      this.arrayOfLilyPads[arrayOfLilyPadsIndex].handleOffScreen();
    }
  }
}
