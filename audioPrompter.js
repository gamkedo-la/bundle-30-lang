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
    console.log('promptersManager.shouldBeDrawingAPrompt: ' + promptersManager.shouldBeDrawingAPrompt);
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

  this.promptThePlayer = function()
  {
    this.currentAudioPrompt.play();
    setTimeout(this.togglePromptingBoolean,1000);
    console.log('inside audio prompter play code');
  }
}

let audioPrompter;
