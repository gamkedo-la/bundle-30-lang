function HelloWorldCharacter(image, x)
{
  this.image = image;

  this.x = x;
  this.y = gameCanvas.height*0.5;

  this.width = 100;
  this.height = 200;

  this.draw = function()
  {
    gameCanvasContext.drawImage(this.image, this.x,this.y, this.width,this.height);
  }
}

function CharacterSpeechBubble(image,highlightedImage, x,y, width,height)
{
  this.image = image;
  this.highlightedImage = highlightedImage;
  this.arrowImage = helloWorldArrowImage;
  this.arrowImageWidth = 50;
  this.arrowImageHeight = 100;

  this.isBeingHeard = false;

  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;

  this.message = undefined;

  this.highlighted = false;

  this.draw = function()
  {
    if (this.highlighted === true)
    {
      gameCanvasContext.drawImage(this.highlightedImage, this.x,this.y, this.width,this.height);
    }
    else if (this.highlighted === false)
    {
      gameCanvasContext.drawImage(this.image, this.x,this.y, this.width,this.height);
    }

    if (this.isBeingHeard === true)
    {
      let arrowImageStartingX = this.x + this.width/2 - this.arrowImageWidth/2;
      let arrowImageStartingY = this.y - this.arrowImageHeight;
      // let arrowImageStartingX = gameCanvas.width/2;
      // let arrowImageStartingY = gameCanvas.height/2;
      gameCanvasContext.drawImage(this.arrowImage, arrowImageStartingX,arrowImageStartingY, this.arrowImageWidth,this.arrowImageHeight);
    }
  }

  this.highlightBoundaryLeftX = this.x;
  this.highlightBoundaryTopY = this.y;
  this.highlightBoundaryRightX = this.x + this.width;
  this.highlightBoundaryBottomY = (this.y + this.height)*0.725;

  this.returnMouseOverStatus = function()
  {
    if (inputManager.mouseCoordinates.x > this.highlightBoundaryLeftX && inputManager.mouseCoordinates.x < this.highlightBoundaryRightX &&
        inputManager.mouseCoordinates.y > this.highlightBoundaryTopY && inputManager.mouseCoordinates.y < this.highlightBoundaryBottomY)
        {
          this.highlighted = true;
        }
        else {
          this.highlighted = false;
        }
  }

  this.handleClick = function()
  {
    if (!this.highlighted)
    {
      return
    }
    else
    {
      if (this.message === gameClassManager.currentGame.conversationPatternManager.currentCorrectConversationPattern.answerAudio)
      {
        amountCorrect++;
        genAudio.playPositive();
      }
      else if (this.message === gameClassManager.currentGame.conversationPatternManager.incorrectConversationPattern.answerAudio)
      {
        amountIncorrect++;
        genAudio.playNegative();
      }
      gameClassManager.currentGame.conversationPatternManager.chooseCorrectConversationPattern(gameClassManager.currentGame.currentLanguageArray);
      gameClassManager.currentGame.conversationPatternManager.promptAudio = gameClassManager.currentGame.conversationPatternManager.currentCorrectConversationPattern.promptAudio;
      gameClassManager.currentGame.conversationPatternManager.chooseIncorrectConversationPattern(gameClassManager.currentGame.currentLanguageArray);
      gameClassManager.currentGame.conversationPatternManager.assignAudioClipsToSpeechBubbles();
      gameClassManager.currentGame.conversationAudioManager.getAudioClips();
      gameClassManager.currentGame.conversationAudioManager.assignOrderOfAudioAnswers();
      gameClassManager.currentGame.conversationAudioManager.assignOnendedFunctions();
      gameClassManager.currentGame.conversationAudioManager.promptAudio.play();
      gameClassManager.currentGame.partyGuestSpeechBubble.isBeingHeard = true;
    }
  }
}
