function HelloWorld2ImagePrompter()
{
  this.name = 'hello world 2 image prompter';
  this.image = undefined;
  this.loadCurrentImage = function(imageToLoad)
  {
    this.image = imageToLoad;
  }

  this.backgroundColor = 'rgb(224,224,224)';
  this.currentWidth = 150;
  this.currentHeight = 150;

  this.updatePromptImage = function()
  {
    this.currentWidth += gameClassManager.currentGame.FRAME_RATE/5;
    this.currentHeight += gameClassManager.currentGame.FRAME_RATE/5;
  }

  this.drawThePrompt = function()
  {
    console.log('inside draw the prompt function');
    if (this.image !== undefined)
    {
      gameCanvasContext.fillStyle = this.backgroundColor;
      gameCanvasContext.fillRect(gameCanvas.width/2 - this.currentWidth/2,gameCanvas.height/2 - this.currentHeight/2,
                                 this.currentWidth,this.currentHeight);

     customFontFillText(["Ask this question", symbolQuestionMarkImage],
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

    dateAndTime.checkForNecessityOfUsingDatesForImagePrompter();
    if (dateAndTime.shouldDrawADate)
    {
      console.log('dateAndTime.dateToDraw.month: ' + dateAndTime.dateToDraw.month);
      customFontFillText( (dateAndTime.dateToDraw.month + 1).toString(), this.currentWidth*0.1 /*font size*/, this.currentWidth*0.055 /*spacing*/,
                         gameCanvas.width/2 - 20, /*- this.currentWidth/2  + this.currentWidth*0.0175,*///xCoordinate)
                         gameCanvas.height/2 - this.currentHeight/2 + this.currentHeight*0.3);/* - this.currentHeight/2 + this.currentHeight*0.1);*///yCoordinate

      customFontFillText(dateAndTime.dateToDraw.day.toString(), this.currentWidth*0.15 /*font size*/,this.currentWidth*0.055 /*spacing*/,
                         gameCanvas.width/2 - 20,//xCoordinate)
                         gameCanvas.height/2);//yCoordinate
    }
  }

  this.shouldBeDrawingAPrompt = false;
  this.togglePromptingBoolean = function()
  {
    console.log('image prompter toggled');
    if (this.shouldBeDrawingAPrompt)
    {
      this.shouldBeDrawingAPrompt = false;
      this.currentWidth = 150;
      this.currentHeight = 150;
      gameClassManager.currentGame.questionAudioManager.firstQuestionBubble.message.sfx.play();
			gameClassManager.currentGame.questionAudioManager.firstQuestionBubble.isBeingHeard = true;
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
