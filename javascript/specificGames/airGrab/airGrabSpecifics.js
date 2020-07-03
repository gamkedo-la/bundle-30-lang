AirGrabGameClass.prototype = new GameClass();

function AirGrabGameClass()
{
  this.name = 'airGrabGame';

  this.FRAME_RATE = 1000/30;

  this.textAnswerFontSize = 30;
  this.textAnswerFontStyle = this.textAnswerFontSize + 'px Helvetica';

  this.LETTER_COLOR = 'black';

  this.drawTransitionText = function()
  {
    customFontFillText(['Grab the Money'], 55,30, 75,50);
    drawFromSheetSimple("images\\Custom Font\\pngs\\symbols\\symbol!.png", 500,40, 75,50);
    customFontFillText(['Move the Mouse    Move the arms'], 40,15, gameCanvas.width*0.125,250);
    drawFromSheetSimple("images\\Custom Font\\pngs\\symbols\\symbol=.png", 290,250, 75,50);
    customFontFillText(['Mouse Click       Reach and Grab'], 40,15, gameCanvas.width*0.125,450);
    drawFromSheetSimple("images\\Custom Font\\pngs\\symbols\\symbol=.png", 275,450, 75,50);
  }

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

  this.answerHolderImage = undefined;
  this.arrayOfAnswerHolders = [];
  this.assignAnswerHolder = function()
  {
      let randomNumber = getRandomIntInclusive(0, this.arrayOfAnswerHolders.length - 1);
      return this.arrayOfAnswerHolders[randomNumber];
  }

  this.titleScreenData = [
	  {name: "Money", fontSize: 27, spacing: 15, x: 428, y: 265},
	  {name: "Grab", fontSize: 27, spacing: 15, x: 432, y: 300}
	];

  this.playerCharacter = undefined;
  this.defineAndInitializePlayerCharacter = function()
  {
    this.playerCharacter = new GrabberPlayer();
    this.playerCharacter.initialize();
    this.collidingObject = this.playerCharacter;
  }

  this.backgroundMusic = new MusicTrack('audio/backgroundTracks/200412.mp3', 121.62);

  this.background = undefined;

  this.pregameSpecialCode = function()
  {
    gameAudio = {};
    gameAudio.clap = new sfxOneShot('audio/clap1.mp3');
    gameAudio.paperCrumple = new sfxOneShot('audio/paper1.mp3');
  };

  this.superInitialize = function()
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

    this.dollarBillAnswerHolder1 = new DollarBillAnswerHolder("images\\sprites\\air grab\\Bill.png");
    this.dollarBillAnswerHolder2 = new DollarBillAnswerHolder("images\\sprites\\air grab\\Bill2.png");
    this.dollarBillAnswerHolder3 = new DollarBillAnswerHolder("images\\sprites\\air grab\\Bill3.png");
    this.dollarBillAnswerHolder4 = new DollarBillAnswerHolder("images\\sprites\\air grab\\Bill4.png");
    this.arrayOfAnswerHolders.push(this.dollarBillAnswerHolder1);
    this.arrayOfAnswerHolders.push(this.dollarBillAnswerHolder2);
    this.arrayOfAnswerHolders.push(this.dollarBillAnswerHolder3);
    this.arrayOfAnswerHolders.push(this.dollarBillAnswerHolder4);

    this.initializeAnswerSettings();
    drawAnswersManager.initialize();
    this.background = new AirGrabBackground();
    this.playerCharacter.collisionsWithAnswersManager.initialize(gameClassManager.currentGame);
  }

  this.draw = function()
  {
    this.playerCharacter.draw();
    drawAnswersManager.draw();
    this.background.draw();


    promptersManager.drawPromptsWhenAppropriate();
  }

  this.update = function()
  {
    this.moveAnswers();
  }

  this.handleClick = function()
  {
    this.playerCharacter.handleClick();
  }

  this.moveAnswers = function()
  {
    let correctAnswer = promptsAndAnswersManager.correctTargetPromptAndAnswerPairing;
    let incorrectAnswer = promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing;



    correctAnswer.radians += correctAnswer.circlePathVelocity;
    correctAnswer.xCoordinate = correctAnswer.xCoordinate + (Math.cos(correctAnswer.radians) * 10) + correctAnswer.xSpeed;
    correctAnswer.yCoordinate = correctAnswer.yCoordinate + (Math.sin(correctAnswer.radians) * 10) + correctAnswer.ySpeed;

    incorrectAnswer.radians += incorrectAnswer.circlePathVelocity;
    incorrectAnswer.xCoordinate = incorrectAnswer.xCoordinate + (Math.cos(incorrectAnswer.radians) * 10) + incorrectAnswer.xSpeed;
    incorrectAnswer.yCoordinate = incorrectAnswer.yCoordinate + (Math.sin(incorrectAnswer.radians) * 10) + incorrectAnswer.ySpeed;
    this.checkAnswerWallCollisions();
  }

  this.updateAnswerPositions = function()
  {
    let correctAnswer = promptsAndAnswersManager.correctTargetPromptAndAnswerPairing;
    let incorrectAnswer = promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing;
    //move points over time

  }

  this.checkAnswerWallCollisions = function()
  {
    let correctAnswer = promptsAndAnswersManager.correctTargetPromptAndAnswerPairing;
    let incorrectAnswer = promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing;

    if (correctAnswer.xCoordinate + 50 > 500 || correctAnswer.xCoordinate  - 50 < 100)
    {
      correctAnswer.xSpeed *= -1;
    }
    if (correctAnswer.yCoordinate + 50 > 600 || correctAnswer.yCoordinate - 50 < 150)
    {
      correctAnswer.ySpeed *= -1;
    }

    if (incorrectAnswer.xCoordinate + 50 > 500 || incorrectAnswer.xCoordinate  - 50 < 100)
    {

      incorrectAnswer.xSpeed *= -1;
    }
    if (incorrectAnswer.yCoordinate + 50 > 600 || incorrectAnswer.yCoordinate - 50 < 150)
    {
      incorrectAnswer.ySpeed *= -1;
    }
  }

  this.initializeAnswerSettings = function()
  {
    promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.xSpeed = getRandomArbitrary(-3,3);
    promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.ySpeed = getRandomArbitrary(-3,3);
    promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.xSpeed = getRandomArbitrary(-3,3);
    promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.ySpeed = getRandomArbitrary(-3,3);
  }
}

const airGrabGame = new AirGrabGameClass();

function DollarBillAnswerHolder(image)
{
  this.image = image;
}

function AirGrabBackground()
{
  this.draw = function()
  {
    gameCanvasContext.globalAlpha = 0.3;
    drawFromSheet("images\\Backgrounds\\airBoothPlasticLayer.png", 0,0, gameCanvas.width,gameCanvas.height);
    gameCanvasContext.globalAlpha = 1;
    drawFromSheet("images\\Backgrounds\\airBoothTopLayer.png", 0,0, gameCanvas.width,gameCanvas.height);
  }
}

function GrabberPlayer()
{

  this.armlessBodyImage = "images\\sprites\\air grab\\AirGuy.png";
  this.rightArmImage = "images\\sprites\\air grab\\rightArmm.png";
  this.leftArmImage = "images\\sprites\\air grab\\leftArmm.png";

  this.leftArmX = undefined;
  this.leftArmY = undefined;
  this.leftArmWidth = gameCanvas.width/20;
  this.leftArmHeight = gameCanvas.height/5;
  this.leftArmAngle = 90;
  this.leftArmPivotX = undefined;
  this.leftArmPivotY = undefined;


  this.rightArmX = undefined;
  this.rightArmY = undefined;
  this.rightArmAngle = 90;
  this.rightArmWidth = gameCanvas.width/20;
  this.rightArmHeight = gameCanvas.height/5;
  this.rightArmPivotX = undefined;
  this.rightArmPivotY = undefined;


  this.bodyWidth = gameCanvas.width/5;
  this.bodyHeight = gameCanvas.width/3;

  this.shoulderY = 545;

  this.collisionsWithAnswersManager = new CollisionsWithAnswersManager();

  this.initialize = function()
  {
    this.leftArmX = gameCanvas.width/2 - this.bodyWidth/2;
    this.leftArmY = this.shoulderY - this.leftArmHeight;
    this.rightArmX = gameCanvas.width/2 + this.bodyWidth/2 - this.rightArmWidth;
    this.rightArmY = this.shoulderY - this.rightArmHeight;

    this.leftArmPivotX = this.leftArmX + this.leftArmWidth/2;
    this.leftArmPivotY = this.shoulderY;
    this.rightArmPivotX = this.rightArmX + this.rightArmWidth/2;
    this.rightArmPivotY = this.shoulderY;
  }

  this.draw = function()
  {

    drawFromSheet(this.armlessBodyImage, gameCanvas.width/2 - this.bodyWidth/2,
                                gameCanvas.height - this.bodyHeight - gameCanvas.width*0.0225,
                                this.bodyWidth,this.bodyHeight);
    // gameCanvasContext.drawImage(this.armlessBodyImage, gameCanvas.width/2 - this.bodyWidth/2,
    //                             gameCanvas.height - this.bodyHeight - gameCanvas.width*0.0225,
    //                             this.bodyWidth,this.bodyHeight);

    this.calculateLeftArmAngle();
    drawFromSheet(this.leftArmImage, this.leftArmX,this.leftArmY, this.leftArmWidth,this.leftArmHeight, 'undefined', this.leftArmAngle,this.leftArmPivotX,this.leftArmPivotY);
    // gameCanvasContext.save();//save context so we can do weird stuff and go back to normal drawing afterwards
    // gameCanvasContext.translate(this.leftArmPivotX,this.leftArmPivotY);//place imaginary hand at pivot point
    // gameCanvasContext.rotate(this.leftArmAngle + Math.PI/2);//rotate with hand at pivot based in radians
    // gameCanvasContext.translate(-this.leftArmPivotX,-this.leftArmPivotY);//return hand to 0,0 of canvas
    // gameCanvasContext.drawImage(this.leftArmImage, this.leftArmX,this.leftArmY, this.leftArmWidth,this.leftArmHeight);//normal draw code affected by rotation
    // gameCanvasContext.restore();//erase any errant abnormal draw code

    this.calculateRightArmAngle();
    drawFromSheet(this.rightArmImage, this.rightArmX,this.rightArmY, this.rightArmWidth,this.rightArmHeight, 'undefined', this.rightArmAngle,this.rightArmPivotX,this.rightArmPivotY);
    // gameCanvasContext.save();//save context so we can do weird stuff and go back to normal drawing afterwards
    // gameCanvasContext.translate(this.rightArmPivotX,this.rightArmPivotY);//place imaginary hand at pivot point
    // gameCanvasContext.rotate(this.rightArmAngle + Math.PI/2);//rotate with hand at pivot based in radians
    // gameCanvasContext.translate(-this.rightArmPivotX,-this.rightArmPivotY);//return hand to 0,0 of canvas
    // gameCanvasContext.drawImage(this.rightArmImage, this.rightArmX,this.rightArmY, this.rightArmWidth,this.rightArmHeight);//normal draw code affected by rotation
    // gameCanvasContext.restore();//erase any errant abnormal draw code
  }

  this.calculateLeftArmAngle = function()
  {
      this.leftArmAngle = Math.atan2(inputManager.mouseCoordinates.y - this.shoulderY,
                                     inputManager.mouseCoordinates.x - this.leftArmPivotX);
  }

  this.calculateRightArmAngle = function()
  {
      this.rightArmAngle = Math.atan2(inputManager.mouseCoordinates.y - this.shoulderY,
                                      inputManager.mouseCoordinates.x - this.rightArmPivotX);
  }

  this.handleClick = function()
  {
    this.leftArmY = inputManager.mouseCoordinates.y;
    this.rightArmY = inputManager.mouseCoordinates.y;
    this.leftArmPythagoreanALength = Math.abs(this.shoulderY - this.leftArmY);
    this.rightArmPythagoreanALength = Math.abs(this.shoulderY - this.rightArmY);
    this.leftArmPythagoreanBLength = Math.abs(inputManager.mouseCoordinates.x - this.leftArmPivotX);
    this.rightArmPythagoreanBLength = Math.abs(inputManager.mouseCoordinates.x - this.rightArmPivotX);
    this.leftArmHeight = Math.sqrt( (this.leftArmPythagoreanALength*this.leftArmPythagoreanALength) +
                                    (this.leftArmPythagoreanBLength*this.leftArmPythagoreanBLength) );

    this.rightArmHeight = Math.sqrt( (this.rightArmPythagoreanALength*this.rightArmPythagoreanALength) +
                                     (this.rightArmPythagoreanBLength*this.rightArmPythagoreanBLength) );
    this.leftArmY = this.shoulderY - this.leftArmHeight;
    this.rightArmY = this.shoulderY - this.rightArmHeight;
    setTimeout(resetArmSettings, 500);

    this.handleCollisionsWithAnswers(promptsAndAnswersManager.correctTargetPromptAndAnswerPairing,
                                     promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing);
  }

  this.handleCollisionsWithAnswers = function(correctAnswer,incorrectAnswer)
  {
    let mouseX = inputManager.mouseCoordinates.x;
    let mouseY = inputManager.mouseCoordinates.y;
    let correctAnswerX = correctAnswer.xCoordinate;
    let correctAnswerY = correctAnswer.yCoordinate;
    let incorrectAnswerX = incorrectAnswer.xCoordinate;
    let incorrectAnswerY = incorrectAnswer.yCoordinate;
    let correctAnswerWidth = undefined;
    let incorrectAnswerWidth = undefined
    let correctAnswerHeight = undefined;
    let incorrectAnswerHeight = undefined;
    if (promptsAndAnswersManager.currentAnswerDataType === 'string')
    {
      correctAnswerWidth = promptsAndAnswersManager.getCorrectAnswerWidthFromFontStyle(
          gameClassManager.currentGame.textAnswerFontStyle
      );
      incorrectAnswerWidth = promptsAndAnswersManager.getIncorrectAnswerWidthFromFontStyle(
          gameClassManager.currentGame.textAnswerFontStyle
      );

      correctAnswerHeight = 30;
      incorrectAnswerHeight = 30;
      correctAnswerY -= correctAnswerHeight;
      incorrectAnswerY -= correctAnswerHeight;
    }
    else if (promptsAndAnswersManager.currentAnswerDataType === 'IMG')
    {
      correctAnswerWidth = gameClassManager.currentGame.imageAnswerWidth;
      correctAnswerHeight = gameClassManager.currentGame.imageAnswerHeight;
      incorrectAnswerWidth = gameClassManager.currentGame.imageAnswerWidth;
      incorrectAnswerHeight = gameClassManager.currentGame.imageAnswerHeight;
    }
    else if (promptsAndAnswersManager.currentAnswerDataType === 'AUDIO')
    {
      correctAnswerWidth = gameClassManager.currentGame.audioImageAnswerWidth;
      correctAnswerHeight = gameClassManager.currentGame.audioImageAnswerHeight;
      incorrectAnswerWidth = gameClassManager.currentGame.audioImageAnswerWidth;
      incorrectAnswerHeight = gameClassManager.currentGame.audioImageAnswerHeight;
    }


    if (mouseX >= correctAnswerX && mouseX <= correctAnswerX + correctAnswerWidth &&
        mouseY >= correctAnswerY && mouseY <= correctAnswerY + correctAnswerHeight)
        {
          this.collisionsWithAnswersManager.processCollisionWithCorrectAnswer();
          this.collisionsWithAnswersManager.resetAnswers();
          gameClassManager.currentGame.initializeAnswerSettings();
          gameAudio.paperCrumple.play();
        }
    else if (mouseX >= incorrectAnswerX && mouseX <= incorrectAnswerX + incorrectAnswerWidth &&
        mouseY >= incorrectAnswerY && mouseY <= incorrectAnswerY + incorrectAnswerHeight)
        {
          this.collisionsWithAnswersManager.processCollisionWithIncorrectAnswer();
          this.collisionsWithAnswersManager.resetAnswers();
          gameClassManager.currentGame.initializeAnswerSettings();
          gameAudio.paperCrumple.play();
        }

      gameAudio.clap.play();

  }
}

function resetArmSettings()
{
  let airGuy = gameClassManager.currentGame.playerCharacter;
  airGuy.leftArmHeight = gameCanvas.height/5;
  airGuy.rightArmHeight = gameCanvas.height/5;
  airGuy.leftArmY = airGuy.shoulderY - airGuy.leftArmHeight;
  airGuy.rightArmY = airGuy.shoulderY - airGuy.rightArmHeight;
  airGuy.leftArmX = gameCanvas.width/2 - airGuy.bodyWidth/2;
  airGuy.rightArmX = gameCanvas.width/2 + airGuy.bodyWidth/2 - airGuy.rightArmWidth;
}
