function ImageAndAudioPrompterForCVCs()
{
  this.name = 'Image And Audio Prompter';
  this.audio = undefined;
  this.image = undefined;

  this.loadCurrentImage = function(imageToLoad)
  {
    this.image = imageToLoad;
  }

  this.loadCurrentAudio = function(audioToLoad)
  {
    this.audio = audioToLoad;
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

     customFontFillText(["Spell this"],
                         this.currentWidth*0.15 /*font size*/,this.currentWidth*0.055 /*spacing*/,
                         gameCanvas.width/2 - this.currentWidth/2  + this.currentWidth*0.0175,//xCoordinate
                         gameCanvas.height/2 - this.currentHeight/2);//yCoordinate
      //(img,
      //sourceImageStartingX,SourceImageStartingY,SourceImageWidthToCrop,SourceImageHeightToCrop,
      //targetCanvasXCoordinateToStartDrawing,targetCanvasYCoordinateToStartDrawing,
      //widthOfImageToDrawOnTargetCanvas,heightOfImageToDrawOnTargetCanvas);
      
      drawFromSheet(this.image,
                            gameCanvas.width/2 - this.currentWidth/2 + this.currentWidth*0.225,
                           gameCanvas.height/2 - this.currentHeight/2 + this.currentHeight*0.2,
                           this.currentWidth*0.6,this.currentHeight*0.7);
      /*gameCanvasContext.drawImage(this.image,
                           0,0, 1000,750,
                           gameCanvas.width/2 - this.currentWidth/2 + this.currentWidth*0.225,
                           gameCanvas.height/2 - this.currentHeight/2 + this.currentHeight*0.2,
                           this.currentWidth*0.6,this.currentHeight*0.7);*/
    }
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

  this.promptThePlayer = function()
  {
    this.togglePromptingBoolean();
    this.audio.play();
    setTimeout(this.togglePromptingBoolean,2000);
  }
}

let imageAndAudioPrompterForCVCs;
