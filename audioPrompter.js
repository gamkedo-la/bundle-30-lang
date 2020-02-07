function AudioPrompter()
{
  this.name = 'audio prompter';
  this.currentAudioPrompt = undefined;
  this.image = placeholderPlayButtonImage;

  this.draw = function()
  {
    gameCanvasContext.drawImage(this.image, gameCanvas.width/2 - this.image.width/2,gameCanvas.height/2 - this.image.height/2);
  }

  this.loadCurrentAudioPrompt = function(audioTagToLoad)
  {
    this.currentAudioPrompt = audioTagToLoad;
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

  this.drawThePrompt = function()
  {
    if (this.image !== undefined)
    {
      //(img,
      //sourceImageStartingX,SourceImageStartingY,SourceImageWidthToCrop,SourceImageHeightToCrop,
      //targetCanvasXCoordinateToStartDrawing,targetCanvasYCoordinateToStartDrawing,
      //widthOfImageToDrawOnTargetCanvas,heightOfImageToDrawOnTargetCanvas);
      gameCanvasContext.drawImage(this.image,
                           0,0, 1000,750,
                           gameCanvas.width/2 - 150,gameCanvas.height/2 - 150,
                           300,300);
    }
  }

  this.promptThePlayer = function()
  {
    this.currentAudioPrompt.play();
    this.togglePromptingBoolean();
    setTimeout(this.togglePromptingBoolean,1000);
  }
}

let audioPrompter;
