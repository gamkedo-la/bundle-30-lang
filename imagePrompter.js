function ImagePrompter()
{
  this.name = 'image prompter';
  this.image = undefined;
  this.loadCurrentImage = function(imageToLoad)
  {
    this.image = imageToLoad;
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
    if (this.image !== undefined)
    {


      gameCanvasContext.fillStyle = this.backgroundColor;
      gameCanvasContext.fillRect(gameCanvas.width/2 - this.currentWidth/2,gameCanvas.height/2 - this.currentHeight/2,
                                 this.currentWidth,this.currentHeight);

     customFontFillText(["What do you see", symbolQuestionMarkImage],
                         this.currentWidth*0.15 /*font size*/,this.currentWidth*0.055 /*spacing*/,
                         gameCanvas.width/2 - this.currentWidth/2  + this.currentWidth*0.0175,//xCoordinate
                         gameCanvas.height/2 - this.currentHeight/2);//yCoordinate
      //(img,
      //sourceImageStartingX,SourceImageStartingY,SourceImageWidthToCrop,SourceImageHeightToCrop,
      //targetCanvasXCoordinateToStartDrawing,targetCanvasYCoordinateToStartDrawing,
      //widthOfImageToDrawOnTargetCanvas,heightOfImageToDrawOnTargetCanvas);
      gameCanvasContext.drawImage(this.image,
                           0,0, 1000,750,
                           gameCanvas.width/2 - this.currentWidth/2 + this.currentWidth*0.225,
                           gameCanvas.height/2 - this.currentHeight/2 + this.currentHeight*0.2,
                           this.currentWidth*0.6,this.currentHeight*0.7);
    }
  }

  this.togglePromptingBoolean = function()
  {
    if (promptersManager.shouldBeDrawingAPrompt)
    {
      promptersManager.shouldBeDrawingAPrompt = false;
      this.currentWidth = 150;
      this.currentHeight = 150;
      if (promptsAndAnswersManager.currentAnswerDataType === "AUDIO")
      {
        promptersManager.promptAudioAnswersWhenAppropriate();
      }
    } else {
      promptersManager.shouldBeDrawingAPrompt = true;
      this.currentHeight = 150;
      this.currentHeight = 150;
    }
  }

  this.promptThePlayer = function()
  {
    this.togglePromptingBoolean();
    setTimeout(this.togglePromptingBoolean,2000);
  }
}

let imagePrompter;
