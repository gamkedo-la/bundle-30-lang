function GameClass()
{

  this.Player =
  {
    coordinates: {x:undefined,y:undefined},
    xySpeeds: {x:undefined,y:undefined},
    dimensions: {width:undefined,height:undefined},
    placeholderColor: undefined,
    image: undefined,

    update: function()
    {

    },

    drawPlaceHolderImage: function()
    {
      gameCanvasContext.fillStyle = this.placeholderColor;
      gameCanvasContext.fillRect(this.coordinates.x,this.coordinates.y, this.dimensions.width,this.dimensions.height);
    },

    drawImage: function()
    {
      //drawImage(image,startingPointOfOriginalImageX (optional),startingPointOfOriginalImageY (optional),
      //                cropWidthOfOriginalImage (optional),cropWidthOfOriginalImage (optional),
      //                startingXofDrawingOnCanvas,startingYofDrawingOnCanvas,
      //                widthOfDrawingOnCanvas,height);
      gameCanvasContext.drawImage(this.image, this.coordinates.x,this.coordinates.y,
                                              this.this.dimensions.width,this.dimensions.height);
    },

    draw: function()
    {
      if (this.image === undefined)
      {
        this.drawPlaceHolderImage();
      } else
      {
        this.drawImage();
      }

      // for(let snakeTailIndex = 0; snakeTailIndex < snakeTail.length; snakeTailIndex++)
      // {
      //   gameCanvasContext.fillRect(snakeTail[snakeTailIndex].x,snakeTail[snakeTailIndex].y,
      //   snakeDimension - 2,snakeDimension - 2);
      // }
    }
  }

  this.backgroundImage = undefined;
  this.placeholderBackgroundColor = undefined;

  this.drawPlaceHolderBackgroundImage = function()
  {
    gameCanvasContext.fillStyle = this.placeholderBackgroundColor;
    gameCanvasContext.fillRect(0,0, gameCanvas.width,gameCanvas.height);
  }

  this.drawBackgroundImage = function()
  {
    //drawImage(image,startingPointOfOriginalImageX (optional),startingPointOfOriginalImageY (optional),
    //                cropWidthOfOriginalImage (optional),cropWidthOfOriginalImage (optional),
    //                startingXofDrawingOnCanvas,startingYofDrawingOnCanvas,
    //                widthOfDrawingOnCanvas,height);
    gameCanvasContext.drawImage(this.backgroundImage, this.coordinates.x,this.coordinates.y,
                                                      this.this.dimensions.width,this.dimensions.height);
  }

  this.drawBackground = function()
  {
    if (this.background === undefined)
    {
      this.drawPlaceHolderBackgroundImage();
    } else
    {
      this.drawBackgroundImage();
    }
  }

  this.frameRate = undefined;

  this.backButtonSpecifics =
  {
    backButtonRectangleColor: undefined,
    backButtonTextColor: undefined
  }

  this.answersSpeed = undefined;

  this.canvasDimensions = {width:undefined,height:undefined};

  this.init = function()
  {

  };
  this.update = function()
  {

  };
	this.movePlayer = function()
  {

  };
	this.handleSpritesOffScreen = function()
  {

	};
	this.moveAnswersIfAppropriate = function()
  {

  };
	this.handleCollisionsWithAnswers = function()
  {

  };
	this.draw = function()
  {
    gameCanvasContext.fillStyle = undefined;
    gameCanvasContext.fillRect(0,0, gameCanvas.width,gameCanvas.height);
  };

  this.input = function()
  {

  }
}
