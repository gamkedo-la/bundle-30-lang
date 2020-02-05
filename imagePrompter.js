function ImagePrompter()
{
  this.name = 'image prompter';
  this.currentImage = undefined;
  this.loadCurrentImage = function(imageToLoad)
  {
    this.currentImage = imageToLoad;
    console.log('imagePrompter.currentImage: ' + this.currentImage);
  }

  this.drawThePrompt = function()
  {
    if (this.currentImage !== undefined)
    {
      //(img,
      //sourceImageStartingX,SourceImageStartingY,SourceImageWidthToCrop,SourceImageHeightToCrop,
      //targetCanvasXCoordinateToStartDrawing,targetCanvasYCoordinateToStartDrawing,
      //widthOfImageToDrawOnTargetCanvas,heightOfImageToDrawOnTargetCanvas);
      gameCanvasContext.drawImage(this.currentImage,
                           0,0, 1000,750,
                           gameCanvas.width/2 - 150,gameCanvas.height/2 - 150,
                           300,300);
                           console.log('inside image prompt draw code');
    }
  }

  this.togglePromptingBoolean = function()
  {
    if (promptersManager.shouldBeDrawingAPrompt)
    {
      promptersManager.shouldBeDrawingAPrompt = false;
    } else {
      promptersManager.shouldBeDrawingAPrompt = true;
    }
  }

  this.promptingInterval = new frameInterval(this.togglePromptingBoolean,1000);

  this.promptThePlayer = function()
  {
    this.togglePromptingBoolean();
    this.promptingInterval.start();
    console.log('hello image prompter interval');
  }
}

let imagePrompter;
