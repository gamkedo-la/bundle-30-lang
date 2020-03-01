function AudioPrompter()
{
  this.name = 'audio prompter';
  this.currentAudioPrompt = undefined;
  this.image = placeholderPlayButtonImage;

  this.draw = function()
  {
    console.log('inside audio prompter draw function');
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
      this.currentWidth = 150;
      this.currentHeight = 150;
    } else {
      promptersManager.shouldBeDrawingAPrompt = true;
      this.currentHeight = 150;
      this.currentHeight = 150;
    }
  }

  this.backgroundColor = 'white';
  this.currentWidth = 150;
  this.currentHeight = 150;

  this.updatePromptImage = function()
  {
    this.currentWidth += gameClassManager.currentGame.FRAME_RATE/5;
    this.currentHeight += gameClassManager.currentGame.FRAME_RATE/5;
  }

  this.drawThePrompt = function()
  {
    if (this.image !== undefined)
    {
      gameCanvasContext.fillStyle = this.backgroundColor;
      gameCanvasContext.fillRect(gameCanvas.width/2 - this.currentWidth/2,gameCanvas.height/2 - this.currentHeight/2,
                                 this.currentWidth,this.currentHeight);

     customFontFillText(["What do you hear", symbolQuestionMarkImage],
                         this.currentWidth*0.15 /*font size*/,this.currentWidth*0.055 /*spacing*/,
                         gameCanvas.width/2 - this.currentWidth/2 + this.currentHeight*0.0125,//xCoordinate
                         gameCanvas.height/2 - this.currentHeight/2);//yCoordinate
      //(img,
      //sourceImageStartingX,SourceImageStartingY,SourceImageWidthToCrop,SourceImageHeightToCrop,
      //targetCanvasXCoordinateToStartDrawing,targetCanvasYCoordinateToStartDrawing,
      //widthOfImageToDrawOnTargetCanvas,heightOfImageToDrawOnTargetCanvas);
      gameCanvasContext.drawImage(this.image,
                           0,0, 1000,750,
                           gameCanvas.width/2 - this.currentWidth/2 + this.currentWidth*0.15,
                           gameCanvas.height/2 - this.currentHeight/2 + this.currentHeight*0.25,
                           this.currentWidth*0.7,this.currentHeight*0.65);
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
