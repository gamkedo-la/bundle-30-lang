function AudioPrompter()
{
  this.name = 'audio prompter';
  this.currentAudioPrompt = undefined;
  this.image = spellingBeesGame.imagesManager.placeholderPlayButtonImage;

  this.draw = function()
  {
    spellingBeesGame.canvasContext.drawImage(this.image, spellingBeesGame.canvas.width/2 - this.image.width/2,spellingBeesGame.canvas.height/2 - this.image.height/2);
  }

  this.loadCurrentAudioPrompt = function()
  {
    this.currentAudioPrompt = spellingBeesGame.answersManager.currentAnswer.audioTag;
  }

  this.togglePromptingBoolean = function()
  {
    if (this.shouldBeDrawingAPrompt)
    {
      this.shouldBeDrawingAPrompt = false;
      this.currentWidth = 150;
      this.currentHeight = 150;
    } else {
      this.shouldBeDrawingAPrompt = true;
      this.currentHeight = 150;
      this.currentHeight = 150;
    }
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
    console.log('should be drawing the prompt');
    if (this.image !== undefined)
    {
      spellingBeesGame.canvasContext.fillStyle = this.backgroundColor;
      spellingBeesGame.canvasContext.fillRect(spellingBeesGame.canvas.width/2 - this.currentWidth/2,spellingBeesGame.canvas.height/2 - this.currentHeight/2,
                                 this.currentWidth,this.currentHeight);

     // customFontFillText(["What do you hear", symbolQuestionMarkImage],
     //                     this.currentWidth*0.15 /*font size*/,this.currentWidth*0.055 /*spacing*/,
     //                     spellingBeesGame.canvas.width/2 - this.currentWidth/2 + this.currentHeight*0.0125,//xCoordinate
     //                     spellingBeesGame.canvas.height/2 - this.currentHeight/2);//yCoordinate
      //(img,
      //sourceImageStartingX,SourceImageStartingY,SourceImageWidthToCrop,SourceImageHeightToCrop,
      //targetCanvasXCoordinateToStartDrawing,targetCanvasYCoordinateToStartDrawing,
      //widthOfImageToDrawOnTargetCanvas,heightOfImageToDrawOnTargetCanvas);
      spellingBeesGame.canvasContext.drawImage(this.image,
                           0,0, 1000,750,
                           spellingBeesGame.canvas.width/2 - this.currentWidth/2 + this.currentWidth*0.15,
                           spellingBeesGame.canvas.height/2 - this.currentHeight/2 + this.currentHeight*0.25,
                           this.currentWidth*0.7,this.currentHeight*0.65);
    }
  }


  this.promptThePlayer = function()
  {
    this.currentAudioPrompt.play();
    
    setTimeout(this.togglePromptingBoolean,2000);
  }
}
