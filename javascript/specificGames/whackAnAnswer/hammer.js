function Hammer()
{
  this.image = hammerImage;

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
      gameCanvasContext.save();
      gameCanvasContext.translate(this.x + this.width,this.y);
      gameCanvasContext.rotate(-25*Math.PI/180);
      gameCanvasContext.translate(-(this.x + this.width),-(this.y));

      gameCanvasContext.drawImage(this.image, this.x - 20,this.y - 215, this.width,this.height);
      gameCanvasContext.restore();
    }
    else if (this.mouseClicked === false)
    {
      gameCanvasContext.drawImage(this.image, this.x - 20,this.y - 215,
                                              this.width,this.height);
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

    console.log('mouseGridIndex: ' + mouseGridIndex);
    console.log('promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.gridIndex: ' +
                  promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.whackAnAnswerGridIndex);
                  console.log('promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.gridIndex: ' +
                                promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.whackAnAnswerGridIndex);

    if (mouseGridIndex === promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.whackAnAnswerGridIndex)
    {
      promptsAndAnswersManager.setOrResetPromptsAndAnswers();
      promptersManager.loadAppropriatePrompterBasedOnCurrentPromptsDataType();
      correctAnswer++;
    }
    else if (mouseGridIndex === promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.whackAnAnswerGridIndex)
    {
      promptsAndAnswersManager.setOrResetPromptsAndAnswers();
      promptersManager.loadAppropriatePrompterBasedOnCurrentPromptsDataType();
      incorrectAnswer++;
    }
  }

  this.unClickMouse = function()
  {
    console.log('should be unclicking mouse');
    gameClassManager.currentGame.playerCharacter.mouseClicked = false;
  }
}
