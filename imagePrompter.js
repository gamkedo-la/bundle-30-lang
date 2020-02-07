function ImagePrompter()
{
  this.name = 'image prompter';
  this.image = undefined;
  this.loadCurrentImage = function(imageToLoad)
  {
    this.image = imageToLoad;
    console.log('imagePrompter.currentImage: ' + this.image);
  }

  this.backgroundColor = 'white';
  this.currentWidth = 50;
  this.currentHeight = 50;

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
      //(img,
      //sourceImageStartingX,SourceImageStartingY,SourceImageWidthToCrop,SourceImageHeightToCrop,
      //targetCanvasXCoordinateToStartDrawing,targetCanvasYCoordinateToStartDrawing,
      //widthOfImageToDrawOnTargetCanvas,heightOfImageToDrawOnTargetCanvas);
      gameCanvasContext.drawImage(this.image,
                           0,0, 1000,750,
                           gameCanvas.width/2 - this.currentWidth/2 + this.currentWidth/2*0.2,
                           gameCanvas.height/2 - this.currentHeight/2 + this.currentHeight/2*0.2,
                           this.currentWidth*0.75,this.currentHeight*0.75);
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

let imagePrompter;
