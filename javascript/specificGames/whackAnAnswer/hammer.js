function Hammer()
{
  this.image = 'images\\sprites\\whackAnAnswer\\whackHammer.png';

  this.x = undefined;
  this.y = undefined;

  this.width = undefined;
  this.height = undefined;

  this.mouseClicked = false;

  this.initialize = function()
  {
    this.width = gameCanvas.width*0.4;
    this.height = gameCanvas.height*0.4;
  }

  this.draw = function()
  {
    //document.body.style.cursor = 'none';
    if (this.mouseClicked === true)
    {
      drawFromSheet(this.image, this.x - 20,this.y - 215, this.width,this.height, undefined, -120*Math.PI/180,this.x + this.width,this.y);
      // gameCanvasContext.save();
      // gameCanvasContext.translate(this.x + this.width,this.y);
      // gameCanvasContext.rotate(-25*Math.PI/180);
      // gameCanvasContext.translate(-(this.x + this.width),-(this.y));
      //
      // gameCanvasContext.drawImage(this.image, this.x - 20,this.y - 215, this.width,this.height);
      // gameCanvasContext.restore();
    }
    else if (this.mouseClicked === false)
    {
      drawFromSheet(this.image, this.x - 20,this.y - 215,
                                              this.width,this.height);
      // gameCanvasContext.drawImage(this.image, this.x - 20,this.y - 215,
      //                                         this.width,this.height);
    }
  }

  this.update = function()
  {
    this.x = inputManager.mouseCoordinates.x;
    this.y = inputManager.mouseCoordinates.y;
  }

  this.handleMouseClick = function()
  {
    this.mouseClicked = true;
    setTimeout(this.unClickMouse, 200);

    var mouseCol = Math.floor((inputManager.mouseCoordinates.x - 95)/150);
    var mouseRow = Math.floor((inputManager.mouseCoordinates.y - 120)/150);
    let mouseGridIndex = undefined;
    if (mouseCol >= 0 && mouseCol < 3 && mouseRow >= 0 && mouseRow < 3)
    {
      mouseGridIndex = mouseCol + mouseRow * 3;
    }



    if (mouseGridIndex === promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.whackAnAnswerGridIndex)
    {
      genAudio.playPositive();
      promptersManager.currentPrompter.currentWidth = 150;
      promptersManager.currentPrompter.currentHeight = 150;
      promptsAndAnswersManager.setOrResetPromptsAndAnswers();
      promptersManager.loadAppropriatePrompterBasedOnCurrentPromptsDataType();
      promptersManager.promptThePlayer();
      amountCorrect++;
      calculateAccuracy();
    }
    else if (mouseGridIndex === promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.whackAnAnswerGridIndex)
    {
      genAudio.playNegative();
      promptersManager.currentPrompter.currentWidth = 150;
      promptersManager.currentPrompter.currentHeight = 150;
      promptsAndAnswersManager.setOrResetPromptsAndAnswers();
      promptersManager.loadAppropriatePrompterBasedOnCurrentPromptsDataType();
      promptersManager.promptThePlayer();
      amountIncorrect++;
      calculateAccuracy();
    }
  }

  this.unClickMouse = function()
  {
    gameClassManager.currentGame.playerCharacter.mouseClicked = false;
  }
}
