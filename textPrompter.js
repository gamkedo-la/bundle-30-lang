function TextPrompter()
{
  this.name = 'text prompter';
  this.currentText = undefined;
  this.loadCurrentText = function(textToLoad)
  {
    this.currentText = textToLoad;
  }

  this.backgroundColor = 'white';
  this.currentWidth = 150;
  this.currentHeight = 150;

  this.updatePromptImage = function()
  {
    this.currentWidth += 20;
    this.currentHeight += 20;
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
      customFontFillText(this.currentText, this.currentWidth*0.45 /*font size*/,this.currentWidth*0.2 /*spacing*/,
      gameCanvas.width/2 - this.currentWidth/2 + this.currentWidth*0.1,//xCoordinate
      gameCanvas.height/2 - this.currentHeight/2 + this.currentHeight*0.25,//yCoordinate
      );
    }
  }

  this.togglePromptingBoolean = function()
  {
    if (promptersManager.shouldBeDrawingAPrompt)
    {
      promptersManager.shouldBeDrawingAPrompt = false;
      if (promptsAndAnswersManager.currentAnswerDataType === "AUDIO")
      {
        promptersManager.promptAudioAnswersWhenAppropriate();
      }
    } else {
      promptersManager.shouldBeDrawingAPrompt = true;
    }
  }

  this.promptThePlayer = function()
  {
    this.togglePromptingBoolean();
    setTimeout(this.togglePromptingBoolean,2000);
  }
}

let textPrompter;
