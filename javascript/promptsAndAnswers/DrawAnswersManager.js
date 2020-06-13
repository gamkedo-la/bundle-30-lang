function DrawAnswersManager()
{
  this.getTextLetterColor = function()
  {
    return gameClassManager.currentGame.LETTER_COLOR;
  }

  this.currentCorrectAnswerHolderX = undefined;
  this.currentCorrectAnswerHolderY = undefined;
  this.currentCorrectAnswerHolderWidth = undefined;
  this.currentCorrectAnswerHolderHeight = undefined;

  this.currentIncorrectAnswerHolderX = undefined;
  this.currentIncorrectAnswerHolderY = undefined;
  this.currentIncorrectAnswerHolderWidth = undefined;
  this.currentIncorrectAnswerHolderHeight = undefined;

  this.draw = function()
  {
    if (promptsAndAnswersManager.currentAnswerDataType === 'string')
    {
      gameCanvasContext.fillStyle = this.getTextLetterColor();

      var correctAnswerWidth = promptsAndAnswersManager.getCorrectAnswerWidthFromFontStyle(
        gameClassManager.currentGame.textAnswerFontStyle
      )

      var incorrectAnswerWidth = promptsAndAnswersManager.getIncorrectAnswerWidthFromFontStyle(
        gameClassManager.currentGame.textAnswerFontStyle
      )

      // if (gameClassManager.currentGame.currentCorrectAnswerHolderWidth)
      // {
        gameClassManager.currentGame.currentCorrectAnswerHolderWidth = correctAnswerWidth;
        gameClassManager.currentGame.currentCorrectAnswerHolderHeight = 30;
        gameClassManager.currentGame.currentIncorrectAnswerHolderWidth = incorrectAnswerWidth;
        gameClassManager.currentGame.currentIncorrectAnswerHolderHeight = 30;
      // }
      if (promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.answerHolder)
      {
        this.currentCorrectAnswerHolderX = promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.xCoordinate - gameClassManager.currentGame.correctTextAnswerHolderWidth/4;
        this.currentCorrectAnswerHolderY = promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.yCoordinate - gameClassManager.currentGame.currentCorrectAnswerHolderHeight*1.2;
        this.currentCorrectAnswerHolderWidth = gameClassManager.currentGame.correctTextAnswerHolderWidth*1.5;
        this.currentCorrectAnswerHolderHeight = gameClassManager.currentGame.currentCorrectAnswerHolderHeight*1.75;

        drawFromSheet(promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.answerHolder.image,
          this.currentCorrectAnswerHolderX,this.currentCorrectAnswerHolderY,
          this.currentCorrectAnswerHolderWidth,this.currentCorrectAnswerHolderHeight);
        // gameCanvasContext.drawImage(
        //   promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.answerHolder.image,
        //   this.currentCorrectAnswerHolderX,this.currentCorrectAnswerHolderY,
        //   this.currentCorrectAnswerHolderWidth,this.currentCorrectAnswerHolderHeight
        // );
      }

      if (promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.answerHolder)
      {
        this.currentIncorrectAnswerHolderX = promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.xCoordinate - gameClassManager.currentGame.incorrectTextAnswerHolderWidth/4;
        this.currentIncorrectAnswerHolderY = promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.yCoordinate - gameClassManager.currentGame.currentIncorrectAnswerHolderHeight*1.2;
        this.currentIncorrectAnswerHolderWidth = gameClassManager.currentGame.currentIncorrectAnswerHolderWidth*1.5;
        this.currentIncorrectAnswerHolderHeight = gameClassManager.currentGame.currentIncorrectAnswerHolderHeight*1.75;

        drawFromSheet(promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.answerHolder.image,
          this.currentIncorrectAnswerHolderX,this.currentIncorrectAnswerHolderY,
          this.currentIncorrectAnswerHolderWidth,this.currentIncorrectAnswerHolderHeight);
        // gameCanvasContext.drawImage(
        //   promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.answerHolder.image,
        //   this.currentIncorrectAnswerHolderX,this.currentIncorrectAnswerHolderY,
        //   this.currentIncorrectAnswerHolderWidth,this.currentIncorrectAnswerHolderHeight
        // );
      }


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

      if (gameClassManager.currentGame.currentCorrectAnswerHolderWidth !== undefined)
      {
        gameClassManager.currentGame.currentAnswerHolderWidth = gameClassManager.currentGame.imageAnswerHolderWidth;
        gameClassManager.currentGame.currentAnswerHolderHeight = gameClassManager.currentGame.imageAnswerHolderHeight;
      }

      if (promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.answerHolder)
      {
        if (gameClassManager.currentGame.name === 'MazeGame')
        {
          this.currentCorrectAnswerHolderX = promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.xCoordinate;
          this.currentCorrectAnswerHolderY = promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.yCoordinate + 5;
          this.currentCorrectAnswerHolderWidth = gameClassManager.currentGame.imageAnswerHolderWidth;
          this.currentCorrectAnswerHolderHeight = gameClassManager.currentGame.imageAnswerHolderHeight;

          drawFromSheet(promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.answerHolder.image,
            this.currentCorrectAnswerHolderX,this.currentCorrectAnswerHolderY,
            this.currentCorrectAnswerHolderWidth,this.currentCorrectAnswerHolderHeight);
          // gameCanvasContext.drawImage(
          //   promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.answerHolder.image,
          //   this.currentCorrectAnswerHolderX,this.currentCorrectAnswerHolderY,
          //   this.currentCorrectAnswerHolderWidth,this.currentCorrectAnswerHolderHeight
          // );
        }
        else
        {
          this.currentCorrectAnswerHolderX = promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.xCoordinate - 40;
          this.currentCorrectAnswerHolderY = promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.yCoordinate - 40;
          this.currentCorrectAnswerHolderWidth = gameClassManager.currentGame.imageAnswerHolderWidth;
          this.currentCorrectAnswerHolderHeight = gameClassManager.currentGame.imageAnswerHolderHeight;

          drawFromSheet(promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.answerHolder.image,
            this.currentCorrectAnswerHolderX,this.currentCorrectAnswerHolderY,
            this.currentCorrectAnswerHolderWidth,this.currentCorrectAnswerHolderHeight);
          // gameCanvasContext.drawImage(
          //   promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.answerHolder.image,
          //   this.currentCorrectAnswerHolderX,this.currentCorrectAnswerHolderY,
          //   this.currentCorrectAnswerHolderWidth,this.currentCorrectAnswerHolderHeight
          // );
        }
      }

      if (promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.answerHolder)
      {
        if (gameClassManager.currentGame.name === 'MazeGame')
        {
          this.currentIncorrectAnswerHolderX = promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.xCoordinate;
          this.currentIncorrectAnswerHolderY = promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.yCoordinate + 5;
          this.currentIncorrectAnswerHolderWidth = gameClassManager.currentGame.imageAnswerHolderWidth;
          this.currentIncorrectAnswerHolderHeight = gameClassManager.currentGame.imageAnswerHolderHeight;

          drawFromSheet(promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.answerHolder.image,
            this.currentIncorrectAnswerHolderX,this.currentIncorrectAnswerHolderY,
            this.currentIncorrectAnswerHolderWidth,this.currentIncorrectAnswerHolderHeight);
          // gameCanvasContext.drawImage(
          //   promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.answerHolder.image,
          //   this.currentIncorrectAnswerHolderX,this.currentIncorrectAnswerHolderY,
          //   this.currentIncorrectAnswerHolderWidth,this.currentIncorrectAnswerHolderHeight
          // );
        }
        else
        {
          this.currentIncorrectAnswerHolderX = promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.xCoordinate - 40;
          this.currentIncorrectAnswerHolderY = promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.yCoordinate - 40;
          this.currentIncorrectAnswerHolderWidth = gameClassManager.currentGame.imageAnswerHolderWidth;
          this.currentIncorrectAnswerHolderHeight = gameClassManager.currentGame.imageAnswerHolderHeight;

          drawFromSheet(promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.answerHolder.image,
            this.currentIncorrectAnswerHolderX,this.currentIncorrectAnswerHolderY,
            this.currentIncorrectAnswerHolderWidth,this.currentIncorrectAnswerHolderHeight);
          // gameCanvasContext.drawImage(
          //   promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.answerHolder.image,
          //   this.currentIncorrectAnswerHolderX,this.currentIncorrectAnswerHolderY,
          //   this.currentIncorrectAnswerHolderWidth,this.currentIncorrectAnswerHolderHeight
          // );
        }
      }


        dateAndTime.checkForNecessityOfUsingDatesForDrawAnswersManager();

        drawFromSheet(promptsAndAnswersManager.currentCorrectAnswer,
        promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.xCoordinate,
        promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.yCoordinate, this.imageWidth,this.imageHeight);
        // gameCanvasContext.drawImage(promptsAndAnswersManager.currentCorrectAnswer,
        // promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.xCoordinate,
        // promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.yCoordinate, this.imageWidth,this.imageHeight);

        if (dateAndTime.shouldDrawADateOnAnswers)
        {
          let correctDateToDraw = undefined;

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

          customFontFillText( (correctDateToDraw.month + 1).toString(), 25, 15,
          promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.xCoordinate + this.imageWidth/2 - 20,
          promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.yCoordinate + this.imageHeight*0.1)

            customFontFillText( (correctDateToDraw.day).toString(), 30, 15,
            promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.xCoordinate + this.imageWidth/2 - 20,
            promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.yCoordinate + this.imageHeight/2);
        }

        drawFromSheet(promptsAndAnswersManager.currentIncorrectAnswer,
        promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.xCoordinate,
        promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.yCoordinate, this.imageWidth,this.imageHeight);
        // gameCanvasContext.drawImage(promptsAndAnswersManager.currentIncorrectAnswer,
        // promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.xCoordinate,
        // promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.yCoordinate, this.imageWidth,this.imageHeight);

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

      if (gameClassManager.currentGame.currentCorrectAnswerHolderWidth !== undefined)
      {
        gameClassManager.currentGame.currentAnswerHolderWidth = gameClassManager.currentGame.audioImageAnswerHolderWidth*1.1;
        gameClassManager.currentGame.currentAnswerHolderHeight = gameClassManager.currentGame.audioImageAnswerHolderHeight*1.1;
      }

      if (promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.answerHolder)
      {
        this.currentCorrectAnswerHolderX = promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.xCoordinate - 15;
        this.currentCorrectAnswerHolderY = promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.yCoordinate - 20;
        this.currentCorrectAnswerHolderWidth = gameClassManager.currentGame.audioImageAnswerHolderWidth*1.1;
        this.currentCorrectAnswerHolderHeight = gameClassManager.currentGame.audioImageAnswerHolderHeight*1.1;

        drawFromSheet(promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.answerHolder.image,
          this.currentCorrectAnswerHolderX,this.currentCorrectAnswerHolderY,
          this.currentCorrectAnswerHolderWidth,this.currentCorrectAnswerHolderHeight);
        // gameCanvasContext.drawImage(
        //   promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.answerHolder.image,
        //   this.currentCorrectAnswerHolderX,this.currentCorrectAnswerHolderY,
        //   this.currentCorrectAnswerHolderWidth,this.currentCorrectAnswerHolderHeight
        // );
      }

      if (promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.answerHolder)
      {
        this.currentIncorrectAnswerHolderX = promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.xCoordinate - 15;
        this.currentIncorrectAnswerHolderY = promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.yCoordinate - 20;
        this.currentIncorrectAnswerHolderWidth = gameClassManager.currentGame.audioImageAnswerHolderWidth*1.1;
        this.currentIncorrectAnswerHolderHeight = gameClassManager.currentGame.audioImageAnswerHolderHeight*1.1;

        drawFromSheet(promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.answerHolder.image,
          this.currentIncorrectAnswerHolderX,this.currentIncorrectAnswerHolderY,
          this.currentIncorrectAnswerHolderWidth,this.currentIncorrectAnswerHolderHeight);
        // gameCanvasContext.drawImage(
        //   promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.answerHolder.image,
        //   this.currentIncorrectAnswerHolderX,this.currentIncorrectAnswerHolderY,
        //   this.currentIncorrectAnswerHolderWidth,this.currentIncorrectAnswerHolderHeight
        // );
      }


      this.audioImageWidth = gameClassManager.currentGame.audioImageAnswerWidth;
      this.audioImageHeight = gameClassManager.currentGame.audioImageAnswerHeight;

      if (promptsAndAnswersManager.currentCorrectAnswer.shouldBeFlashing)
      {
        gameCanvasContext.globalCompositeOperation = promptersManager.globalCompositeOperationForCanvasContext;
        gameCanvasContext.globalAlpha = promptersManager.highlightedAnswerCurrentAlpha;
      }
      //gameCanvasContext.globalAlpha = 0;
      drawFromSheet("images\\placeholderPlayButtonImage.png",
      promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.xCoordinate,
      promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.yCoordinate, this.audioImageWidth,this.audioImageHeight);

      // gameCanvasContext.drawImage(placeholderPlayButtonImage,
      // promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.xCoordinate,
      // promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.yCoordinate, this.audioImageWidth,this.audioImageHeight);
      gameCanvasContext.globalCompositeOperation = 'source-over';
      gameCanvasContext.globalAlpha = 1;

      if (promptsAndAnswersManager.currentIncorrectAnswer.shouldBeFlashing)
      {
        gameCanvasContext.globalCompositeOperation = promptersManager.globalCompositeOperationForCanvasContext;
        gameCanvasContext.globalAlpha = promptersManager.highlightedAnswerCurrentAlpha;
      }
      //gameCanvasContext.globalAlpha = 0;
      drawFromSheet("images\\placeholderPlayButtonImage.png",
      promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.xCoordinate,
      promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.yCoordinate, this.audioImageWidth,this.audioImageHeight);
      // gameCanvasContext.drawImage(placeholderPlayButtonImage,
      // promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.xCoordinate,
      // promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.yCoordinate, this.audioImageWidth,this.audioImageHeight);
      gameCanvasContext.globalCompositeOperation = 'source-over';
      gameCanvasContext.globalAlpha = 1;
      //}
    }
  }

  this.imageWidth = undefined;
  this.imageHeight = undefined;
  this.audioImageWidth = undefined;
  this.audioImageHeight = undefined;
  this.textAnswerFontStyle = undefined;

  this.initialize = function () {
    this.imageWidth  = gameClassManager.currentGame.imageAnswerWidth;
    this.imageHeight = gameClassManager.currentGame.imageAnswerHeight;
    this.audioImageWidth  = gameClassManager.currentGame.audioImageAnswerWidth;
    this.audioImageHeight = gameClassManager.currentGame.audioImageAnswerHeight;
    this.textAnswerFontStyle = gameClassManager.currentGame.textAnswerFontStyle;
  }
}

let drawAnswersManager = new DrawAnswersManager();
