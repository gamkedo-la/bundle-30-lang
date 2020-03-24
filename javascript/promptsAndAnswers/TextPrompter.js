function TextPrompter()
{
  this.name = 'text prompter';
  this.currentText = undefined;
  this.loadCurrentText = function(textToLoad)
  {
    this.currentText = textToLoad;
  }

  this.currentTextPixelSize = 30;

  this.backgroundColor = 'white';
  this.currentWidth = 150;
  this.currentHeight = 150;

  this.updatePromptImage = function()
  {
    this.currentWidth += gameClassManager.currentGame.FRAME_RATE/5;
    this.currentHeight += gameClassManager.currentGame.FRAME_RATE/5;
    this.currentTextPixelSize += 1;
    console.log('this.currentTextPixelSize: ' + this.currentTextPixelSize);
  }

  this.drawThePrompt = function()
  {
    gameCanvasContext.fillStyle = this.backgroundColor;
    gameCanvasContext.fillRect(gameCanvas.width/2 - this.currentWidth/2,gameCanvas.height/2 - this.currentHeight/2,
                               this.currentWidth,this.currentHeight);

   customFontFillText(["What is this", symbolQuestionMarkImage],
                       this.currentWidth*0.15 /*font size*/,this.currentWidth*0.06 /*spacing*/,
                       gameCanvas.width/2 - this.currentWidth/2 + this.currentWidth*0.1,//xCoordinate
                       gameCanvas.height/2 - this.currentHeight/2);//yCoordinate

    if (this.currentText !== undefined)
    {
      // customFontFillText(this.currentText, this.currentWidth*0.45 /*font size*/,this.currentWidth*0.2 /*spacing*/,
      // gameCanvas.width/2 - this.currentWidth/2 + this.currentWidth*0.1,//xCoordinate
      // gameCanvas.height/2 - this.currentHeight/2 + this.currentHeight*0.25//yCoordinate
      // );
      console.log('this.currentText: ' + this.currentText);
      gameCanvasContext.fillStyle = 'black';
      gameCanvasContext.font = this.currentTextPixelSize + 'px Helvetica';
      gameCanvasContext.fillText(this.currentText,
      gameCanvas.width/2 - this.currentWidth*0.175, /* - this.currentWidth/2 + this.currentWidth*0.1*///xCoordinate
      gameCanvas.height/2/* - this.currentHeight/2 + this.currentHeight*0.25*///yCoordinate
      )
    }
  }

  this.togglePromptingBoolean = function()
  {
    if (promptersManager.shouldBeDrawingAPrompt)
    {
      promptersManager.shouldBeDrawingAPrompt = false;
      this.currentHeight = 150;
      this.currentHeight = 150;
      this.currentTextPixelSize = 30;
      if (promptsAndAnswersManager.currentAnswerDataType === "AUDIO")
      {
        promptersManager.promptAudioAnswersWhenAppropriate();
      }
    } else {
      promptersManager.shouldBeDrawingAPrompt = true;
      this.currentHeight = 150;
      this.currentHeight = 150;
      this.currentTextPixelSize = 30;
    }
  }

  this.promptThePlayer = function()
  {
    this.togglePromptingBoolean();
    setTimeout(this.togglePromptingBoolean,2000);
  }
}

let textPrompter;
