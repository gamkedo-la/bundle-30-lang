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
      this.currentWidth = 0;
      this.currentHeight = 0;
    } else {
      promptersManager.shouldBeDrawingAPrompt = true;
    }
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
                           gameCanvas.width/2 - this.currentWidth/2 + this.currentWidth*0.15,
                           gameCanvas.height/2 - this.currentHeight/2 + this.currentWidth*0.1,
                           this.currentWidth*0.75,this.currentHeight*0.75);
    }
  }


  this.promptThePlayer = function()
  {
    this.currentAudioPrompt.play();
    this.togglePromptingBoolean();
    setTimeout(this.togglePromptingBoolean,2000);
  }
}

let audioPrompter;
