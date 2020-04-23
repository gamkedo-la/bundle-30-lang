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

  this.answerHolderImage = appleImage;

  this.assignAnswerHolder = function()
  {
    let appleAnswerHolder = new AppleAnswerHolder(this.answerHolderImage);
    return appleAnswerHolder;
  }

  this.backgroundMusic = new MusicTrack('audio/backgroundTracks/200417i.mp3', 6.7);

  this.pregameSpecialCode = function()
  {
    gameAudio = {};
    gameAudio.slither = new sfxMulti(["audio/snake_slither_01.mp3", "audio/snake_slither_02.mp3", "audio/snake_slither_03.mp3", "audio/snake_slither_04.mp3"]);
	  gameAudio.playSlither = function() {
	    gameAudio.slither.play();
  	}
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
  }

  //draw section
  this.draw = function()
  {
    this.background.draw();    // this.background.draw();
    for (let i = 0; i < this.arrayOfAppleCores.length; i++)
    {
      this.arrayOfAppleCores[i].draw();
    }
    this.playerCharacter.draw();
    drawAnswersManager.draw();
    promptersManager.drawPromptsWhenAppropriate();
  }

  this.drawTransitionText = function()
  {
    customFontFillText(['Eat the answers', symbolExclamationPointImage], 60,30, 100,50);
    customFontFillText([upArrowImage, ' ', symbolEqualsImage, ' move up'], 30,15, 210,200);
    customFontFillText([rightArrowImage, ' ', symbolEqualsImage, ' move right'], 30,15, 350,350);
    customFontFillText([downArrowImage, ' ', symbolEqualsImage, ' move down'], 30,15, 200,500);
    customFontFillText([leftArrowImage, ' ', symbolEqualsImage, ' move left'], 30,15, 50,350);
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
    genAudio.appleEating.play();
  }
}

function AppleCore(x,y, width,height)
{
  this.image = appleCoreImage;
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;

  this.draw = function()
  {
    gameCanvasContext.drawImage(this.image, this.x,this.y, this.width,this.height);
  }
}

const snakeGame = new snakeGameClass();
