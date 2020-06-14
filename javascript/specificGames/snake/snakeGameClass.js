snakeGameClass.prototype = new GameClass();
function snakeGameClass()
{
  this.name = 'Snake Game';
  this.titleScreenData = [{
	name: "Snake",
	fontSize: 27,
	spacing: 15,
	x: 30, y: 185
  }];

  this.FRAME_RATE = 1000/10;

  this.playerCharacter = undefined;
  this.defineAndInitializePlayerCharacter = function()
  {
    this.playerCharacter = new SnakeClass();
    this.playerCharacter.initialize();
    this.collidingObject = this.playerCharacter;
  }
  this.background = undefined;
  this.backButtonColor = 'yellow';
  this.backButtonTextColor = 'blueViolet';

  this.isTransitioningIn = false;

  this.textAnswerFontSize = 30;
  this.textAnswerFontStyle = this.textAnswerFontSize + 'px Helvetica';

  this.imageAnswerWidth = undefined;
  this.imageAnswerHeight = undefined;
  this.imageAnswerHolderWidth = undefined;
  this.imageAnswerHolderHeight = undefined;

  this.audioImageAnswerWidth = undefined;
  this.audioImageAnswerHeight = undefined;
  this.audioImageAnswerHolderWidth = undefined;
  this.audioImageAnswerHolderHeight = undefined;

  this.correctTextAnswerHolderWidth = undefined;
  this.incorrectTextAnswerHolderWidth = undefined;

  this.currentCorrectAnswerHolderWidth = undefined;
  this.currentCorrectAnswerHolderHeight = undefined;
  this.currentIncorrectAnswerHolderWidth = undefined;
  this.currentIncorrectAnswerHolderHeight = undefined;

  this.answerHolderImage = 'images\\sprites\\Snake\\apple.png';

  var populateBugsInterval;
  var assignCoreInterval;

  this.assignAnswerHolder = function()
  {
    let appleAnswerHolder = new AppleAnswerHolder(this.answerHolderImage);
    return appleAnswerHolder;
  }

  this.backgroundMusic = new MusicTrack('audio/backgroundTracks/200417i.mp3', 6.7);

  this.pregameSpecialCode = function()
  {
    gameAudio = {};
    gameAudio.slither = new sfxOneShot("audio/snake_slither_01.mp3");
	  gameAudio.playSlither = function() {
	    gameAudio.slither.play();
  	}
    gameAudio.appleEating = new sfxOneShot('audio/eatingApple1.mp3');
  };

  this.postGameSpecialCode = function() {
  	clearInterval(populateBugsInterval);
  	clearInterval(assignCoreInterval);
  };

  this.superInitialize = this.initialize;
  this.initialize = function()
  {
    this.imageAnswerWidth = gameCanvas.width/8;
    this.imageAnswerHeight = gameCanvas.height/9;
    this.imageAnswerHolderWidth = gameCanvas.width/4;
    this.imageAnswerHolderHeight = gameCanvas.height/5;

    this.audioImageAnswerWidth = gameCanvas.width/6;
    this.audioImageAnswerHeight = gameCanvas.height/7;
    this.audioImageAnswerHolderWidth = gameCanvas.width/5;
    this.audioImageAnswerHolderHeight = gameCanvas.height/6;

    this.correctTextAnswerHolderWidth = undefined;
    this.incorrectTextAnswerHolderWidth = undefined;

	  this.playerCharacter = new SnakeClass();
    this.background = new SnakeBackground();
    this.playerCharacter.initialize();
    this.collidingObject = this.playerCharacter;
    initializePromptAndAnswerObjects();
    promptsAndAnswersManager.setOrResetPromptsAndAnswers();
    promptersManager.loadAppropriatePrompterBasedOnCurrentPromptsDataType();
	  this.superInitialize();
  	musicManager.addTrack(new MusicTrack('audio/backgroundTracks/200417.mp3', 87.27));


    populateBugsInterval = setInterval(populateArrayOfBugs, 5000);
    assignCoreInterval = setInterval(assignAnAppleCoreToABug, 3000);
  };

  //update section
  this.update = function()
  {
    if (!promptersManager.shouldBeDrawingAPrompt &&
        fullGameStateMachine.currentState !== fullGameStateMachine.FULL_GAME_ENUMERABLE_STATES.pausedMiniGame)
    {
      this.playerCharacter.update();
      this.collisionsWithAnswersManager.handleCollisionsWithAnswers(this.collidingObject);
    }

    for (let i = 0; i < this.arrayOfBugs.length; i++)
    {
      this.arrayOfBugs[i].move();
    }

    for (let i = 0; i < this.arrayOfAppleCores.length; i++)
    {
      this.arrayOfAppleCores[i].update();
      if (this.arrayOfAppleCores[i].totalDecay > 0.95)
      {
        for (let j = 0; j < this.arrayOfBugs.length; j++)
          {
            if (this.arrayOfBugs[j].targetAppleCore === this.arrayOfAppleCores[i])
            {
              this.arrayOfBugs[j].hasATargetAppleCore = false;
              this.arrayOfBugs[j].hasCollidedWithTarget = false;
            }
          }
        this.arrayOfAppleCores.splice(i,1);
      }
    }
  }

  //draw section
  this.draw = function()
  {
    this.background.draw();    // this.background.draw();
    for (let i = 0; i < this.arrayOfAppleCores.length; i++)
    {
      this.arrayOfAppleCores[i].draw();
    }
    for (let i = 0; i < this.arrayOfBugs.length; i++)
    {
      this.arrayOfBugs[i].draw();
    }
    this.playerCharacter.draw();
    drawAnswersManager.draw();
    promptersManager.drawPromptsWhenAppropriate();
  }

  this.drawTransitionText = function()
  {
    customFontFillText(['Eat the answers', symbolExclamationPointImage], 60,30, 100,50);
    customFontFillText([upArrowImage, ' ', symbolEqualsImage, ' Slither up'], 30,15, 210,200);
    customFontFillText([rightArrowImage, ' ', symbolEqualsImage, ' Slither right'], 30,15, 350,350);
    customFontFillText([downArrowImage, ' ', symbolEqualsImage, ' Slither down'], 30,15, 200,500);
    customFontFillText([leftArrowImage, ' ', symbolEqualsImage, ' Slither left'], 30,15, 50,350);
  }

  this.LETTER_COLOR = 'cyan';

  this.handleLeftArrowDown = function()
  {
    if (this.playerCharacter.headOrientation != 1){
        this.playerCharacter.headOrientation = 1;
    }
    if (!this.playerCharacter.middleX)
    {
      this.playerCharacter.middleX = this.playerCharacter.x;
      this.playerCharacter.middleY = this.playerCharacter.y;
    }
    this.playerCharacter.speedX = -20;
    this.playerCharacter.speedY = 0;
    gameAudio.playSlither();
  }

  this.handleUpArrowDown = function()
  {
    if (!this.playerCharacter.middleX)
    {
      this.playerCharacter.middleX = this.playerCharacter.x;
      this.playerCharacter.middleY = this.playerCharacter.y;
    }
    this.playerCharacter.speedX = 0;
    this.playerCharacter.speedY = -20;
    if (this.playerCharacter.headOrientation != 0){
        this.playerCharacter.headOrientation = 0;
    }
    gameAudio.playSlither();
  }

  this.handleRightArrowDown = function()
  {
    if (!this.playerCharacter.middleX)
    {
      this.playerCharacter.middleX = this.playerCharacter.x;
      this.playerCharacter.middleY = this.playerCharacter.y;
    }
    if (this.playerCharacter.headOrientation != 3){
        this.playerCharacter.headOrientation = 3;
    }
    this.playerCharacter.speedX = 20;
    this.playerCharacter.speedY = 0;
    gameAudio.playSlither();
  }

  this.handleDownArrowDown = function()
  {
    if (!this.playerCharacter.middleX)
    {
      this.playerCharacter.middleX = this.playerCharacter.x;
      this.playerCharacter.middleY = this.playerCharacter.y;
    }
    if (this.playerCharacter.headOrientation != 2){
        this.playerCharacter.headOrientation = 2;
    }
    this.playerCharacter.speedX = 0;
    this.playerCharacter.speedY = 20;
    gameAudio.playSlither();
  }


  this.collisionVisualEffect = function(answerHolderX,answerHolderY, answerHolderWidth,answerHolderHeight)
  {
    let appleCore = new AppleCore(answerHolderX,answerHolderY, answerHolderWidth,answerHolderHeight);
    this.arrayOfAppleCores.push(appleCore);
  }

  this.arrayOfAppleCores = [];

  this.collisionAudioEffect = function()
  {
    gameAudio.appleEating.play();
  }

  this.arrayOfBugs = [];

}

function AppleCore(x,y, width,height)
{
  this.image = 'images\\sprites\\Snake\\appleCore.png';
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;

  this.decayingRate = 0;
  this.totalDecay = 0;

  this.draw = function()
  {
    gameCanvasContext.globalAlpha -= this.totalDecay;
    drawFromSheet(this.image, this.x,this.y, this.width,this.height);
    //gameCanvasContext.drawImage(this.image, this.x,this.y, this.width,this.height);
    gameCanvasContext.globalAlpha = 1;
  }

  this.update = function()
  {
    this.totalDecay += this.decayingRate;
  }
}

const snakeGame = new snakeGameClass();

function Bug()
{
  this.x = getRandomArbitrary(0,gameCanvas.width);
  this.y = getRandomArbitrary(0,gameCanvas.height);
  this.width = 4;
  this.height = 4;

  this.xVelocity = 4;
  this.yVelocity = 4;

  this.color = 'brown';

  this.isEating = false;
  this.hasATargetAppleCore = false;
  this.targetAppleCore = undefined;

  this.update = function()
  {
    if (!this.hasATargetAppleCore)
    {
      if (gameClassManager.currentGame.arrayOfAppleCores.length > 0)
      {
        this.targetAppleCore = getRandomIntInclusive(0,gameClassManager.currentGame.arrayOfAppleCores.length - 1);
      }
    }
  }

  this.draw = function()
  {
    gameCanvasContext.fillStyle = this.color;
    gameCanvasContext.fillRect(this.x,this.y, this.width,this.height)
  }

  this.move = function()
  {
    if (!this.hasATargetAppleCore)
    {
      this.moveRandomly();
    }
    else
    {
      this.moveTowardsTargetAppleCore();
    }
  }

  this.moveRandomly = function()
  {
    let twentyPercentChanceBasis = Math.random();
    if (twentyPercentChanceBasis > 0 && twentyPercentChanceBasis < 0.2)
    {
      this.x += this.xVelocity;
    }
    else if (twentyPercentChanceBasis >= 0.2 && twentyPercentChanceBasis < 0.4)
    {
      this.y += this.yVelocity;
    }
    else if (twentyPercentChanceBasis > 0.4 && twentyPercentChanceBasis <= 0.6)
    {
      this.x -= this.xVelocity;
    }
    else if (twentyPercentChanceBasis > 0.6 && twentyPercentChanceBasis <= 0.8)
    {
      this.y -= this.yVelocity;
    }
    else if (twentyPercentChanceBasis > 0.8 && twentyPercentChanceBasis < 1)
    {
      return;
    }
  }

  this.hasCollidedWithTarget = false;
  this.moveTowardsTargetAppleCore = function()
  {
    if (this.y > this.targetAppleCore.y + this.targetAppleCore.height*0.8)
    {
      this.y -= this.yVelocity;
    }
    else if (this.y < this.targetAppleCore.y + this.targetAppleCore.height*0.8)
    {
      this.y += this.yVelocity;
    }

    if (this.x < this.targetAppleCore.x + this.targetAppleCore.width/3)
    {
      this.x += this.xVelocity;
    }
    else if (this.x > this.targetAppleCore.x + this.targetAppleCore.width/3)
    {
      this.x -= this.xVelocity;
    }

    if (this.x > this.targetAppleCore.x && this.x < this.targetAppleCore.x + this.targetAppleCore.width &&
        this.y > this.targetAppleCore.y && this.y < this.targetAppleCore.y + this.targetAppleCore.height)
        {
          if (!this.hasCollidedWithTarget)
          {
            this.targetAppleCore.decayingRate += 0.01;
            this.hasCollidedWithTarget = true;
          }
        }
  }
}

function populateArrayOfBugs()
{
  let bug = new Bug();
  gameClassManager.currentGame.arrayOfBugs.push(bug);
}

function assignAnAppleCoreToABug()
{
  let arrayOfBugs = gameClassManager.currentGame.arrayOfBugs;
  let arrayOfAppleCores = gameClassManager.currentGame.arrayOfAppleCores;
  for (let i = 0; i < arrayOfBugs.length; i++)
  {
    if (arrayOfBugs.length > 0)
    {
      if (!arrayOfBugs[i].hasATargetAppleCore)
      {
        if (arrayOfAppleCores.length < 1)
        {
          return;
        }
        else
        {
          let appleCoreIndex = getRandomIntInclusive(0,arrayOfAppleCores.length - 1);
          arrayOfBugs[i].targetAppleCore = arrayOfAppleCores[appleCoreIndex];
          arrayOfBugs[i].hasATargetAppleCore = true;
          console.log('arrayOfBugs[i].targetAppleCore: ' + arrayOfBugs[i].targetAppleCore);
        }//end of else case that actually assigns a target apple core
      }//end of if statement that checks for existence of apple cores
    }//end of if statement that checks for existence of bugs
  }//end of for loop through array of bugs
}//end of assign an apple core to a bug function
