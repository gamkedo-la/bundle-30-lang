function FeedGrabberPlayer()
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
    drawFromSheet(this.leftArmImage, this.leftArmX,this.leftArmY, this.leftArmWidth,this.leftArmHeight, undefined, this.leftArmAngle,this.leftArmPivotX,this.leftArmPivotY);
    // gameCanvasContext.save();//save context so we can do weird stuff and go back to normal drawing afterwards
    // gameCanvasContext.translate(this.leftArmPivotX,this.leftArmPivotY);//place imaginary hand at pivot point
    // gameCanvasContext.rotate(this.leftArmAngle + Math.PI/2);//rotate with hand at pivot based in radians
    // gameCanvasContext.translate(-this.leftArmPivotX,-this.leftArmPivotY);//return hand to 0,0 of canvas
    // gameCanvasContext.drawImage(this.leftArmImage, this.leftArmX,this.leftArmY, this.leftArmWidth,this.leftArmHeight);//normal draw code affected by rotation
    // gameCanvasContext.restore();//erase any errant abnormal draw code

    this.calculateRightArmAngle();
    drawFromSheet(this.rightArmImage, this.rightArmX,this.rightArmY, this.rightArmWidth,this.rightArmHeight, undefined, this.rightArmAngle,this.rightArmPivotX,this.rightArmPivotY);
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
