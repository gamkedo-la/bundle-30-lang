function DrawAnswersManager()
{
  this.getTextLetterColor = function()
  {
    return gameClassManager.currentGame.LETTER_COLOR;
  }

  this.draw = function()
  {
    if (promptsAndAnswersManager.currentAnswerDataType === 'string')
    {
      gameCanvasContext.fillStyle = this.getTextLetterColor();

      var correctAnswerWidth = promptsAndAnswersManager.getCorrectAnswerWidthFromFontStyle(
        this.textAnswerFontStyle
      )

      var incorrectAnswerWidth = promptsAndAnswersManager.getIncorrectAnswerWidthFromFontStyle(
        this.textAnswerFontStyle
      )

      //draw correct answer
      // gameCanvasContext.font = '30px Helvetica';
      gameCanvasContext.font = this.textAnswerFontStyle;
      gameCanvasContext.fillText(promptsAndAnswersManager.currentCorrectAnswer,
      promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.xCoordinate,
      promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.yCoordinate);

      //collider box
      gameCanvasContext.strokeStyle = 'white';
      gameCanvasContext.strokeRect(promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.xCoordinate - 5,
                                  promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.yCoordinate-this.textAnswerFontSize,//fill text offset
                                  correctAnswerWidth + 10, this.textAnswerFontSize + 10);

      //draw incorrect answer
      gameCanvasContext.fillStyle = this.LETTER_COLOR;
      gameCanvasContext.fillText(promptsAndAnswersManager.currentIncorrectAnswer,
      promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.xCoordinate,
      promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.yCoordinate);

      //collider collider box
      gameCanvasContext.strokeStyle = 'white';
      gameCanvasContext.strokeRect(promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.xCoordinate - 5,
                                  promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.yCoordinate - this.textAnswerFontSize,//fill text offset
                                  incorrectAnswerWidth + 10 , this.textAnswerFontSize + 10);
      //}
    } else if (promptsAndAnswersManager.currentAnswerDataType === 'IMG')
    {
      // for (var arrayOfAnswersAnswerIndex = 0; arrayOfAnswersAnswerIndex < arrayOfAnswers.length; arrayOfAnswersAnswerIndex++)
      // {

        dateAndTime.checkForNecessityOfUsingDatesForDrawAnswersManager();

        gameCanvasContext.drawImage(promptsAndAnswersManager.currentCorrectAnswer,
        promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.xCoordinate,
        promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.yCoordinate, this.imageWidth,this.imageHeight);

        if (dateAndTime.shouldDrawADateOnAnswers)
        {
          let correctDateToDraw = undefined;
          console.log('promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.name: ' + promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.name);
          if (promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.name === 'mandarin today')
          {
            correctDateToDraw = dateAndTime.todaysDate;
          }
          else if (promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.name === 'mandarin tomorrow')
          {
            correctDateToDraw = dateAndTime.tomorrowsDate;
          }
          else if (promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.name === 'mandarin yesterday')
          {
            correctDateToDraw = dateAndTime.yesterdaysDate;
          }
          console.log('should be seeing date numbers');
          console.log('correctDateToDraw: ' + correctDateToDraw);
          customFontFillText( (correctDateToDraw.month + 1).toString(), 25, 15,
          promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.xCoordinate + this.imageWidth/2 - 20,
          promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.yCoordinate + this.imageHeight*0.1)

            customFontFillText( (correctDateToDraw.day).toString(), 30, 15,
            promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.xCoordinate + this.imageWidth/2 - 20,
            promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.yCoordinate + this.imageHeight/2);
        }

        gameCanvasContext.drawImage(promptsAndAnswersManager.currentIncorrectAnswer,
        promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.xCoordinate,
        promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.yCoordinate, this.imageWidth,this.imageHeight);

        if (dateAndTime.shouldDrawADateOnAnswers)
        {
          let incorrectDateToDraw = undefined;
          if (promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.name === 'mandarin today')
          {
            incorrectDateToDraw = dateAndTime.todaysDate;
          }
          else if (promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.name === 'mandarin tomorrow')
          {
            incorrectDateToDraw = dateAndTime.tomorrowsDate;
          }
          else if (promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.name === 'mandarin yesterday')
          {
            incorrectDateToDraw = dateAndTime.yesterdaysDate;
          }
            console.log('should be seeing date numbers');
            customFontFillText( (incorrectDateToDraw.month + 1).toString(), 25, 15,
            promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.xCoordinate + this.imageWidth/2 - 20,
            promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.yCoordinate + this.imageHeight*0.1);

            customFontFillText( (incorrectDateToDraw.day).toString(), 30, 15,
            promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.xCoordinate + this.imageWidth/2 - 20,
            promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.yCoordinate + this.imageHeight/2);
        }

      //}
    } else if (promptsAndAnswersManager.currentAnswerDataType === "AUDIO")
    {
      // for (var arrayOfAnswersAnswerIndex = 0; arrayOfAnswersAnswerIndex < arrayOfAnswers.length; arrayOfAnswersAnswerIndex++)
      // {
      if (promptsAndAnswersManager.currentCorrectAnswer.shouldBeFlashing)
      {
        gameCanvasContext.globalCompositeOperation = promptersManager.globalCompositeOperationForCanvasContext;
        gameCanvasContext.globalAlpha = promptersManager.highlightedAnswerCurrentAlpha;
      }
      //gameCanvasContext.globalAlpha = 0;
      gameCanvasContext.drawImage(placeholderPlayButtonImage,
      promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.xCoordinate,
      promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.yCoordinate, this.audioImageWidth,this.audioImageHeight);
      gameCanvasContext.globalCompositeOperation = 'source-over';
      gameCanvasContext.globalAlpha = 1;

      if (promptsAndAnswersManager.currentIncorrectAnswer.shouldBeFlashing)
      {
        gameCanvasContext.globalCompositeOperation = promptersManager.globalCompositeOperationForCanvasContext;
        gameCanvasContext.globalAlpha = promptersManager.highlightedAnswerCurrentAlpha;
      }
      //gameCanvasContext.globalAlpha = 0;
      gameCanvasContext.drawImage(placeholderPlayButtonImage,
      promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.xCoordinate,
      promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.yCoordinate, this.audioImageWidth,this.audioImageHeight);
      gameCanvasContext.globalCompositeOperation = 'source-over';
      gameCanvasContext.globalAlpha = 1;
      //}
    }
  }

  this.initialize = function () {
    this.imageWidth  = gameClassManager.currentGame.imageAnswerWidth;
    this.imageHeight = gameClassManager.currentGame.imageAnswerHeight;
    this.audioImageWidth  = gameClassManager.currentGame.audioImageAnswerWidth;
    this.audioImageHeight = gameClassManager.currentGame.audioImageAnswerHeight;
    this.textAnswerFontStyle = gameClassManager.currentGame.textAnswerFontStyle;
  }
}

let drawAnswersManager = new DrawAnswersManager();
