function GameClass()
{

  this.Player =
  {
    startingCoordinates: {x:undefined,y:undefined},
    xySpeeds: {x:undefined,y:undefined},
    widthAndHeight: {width:undefined,height:undefined},
    placeHolderColor: undefined,
    image: undefined,

    draw: function()
    {
      gameCanvasContext.fillStyle = this.placeHolderColor;

      // for(let snakeTailIndex = 0; snakeTailIndex < snakeTail.length; snakeTailIndex++)
      // {
      //   gameCanvasContext.fillRect(snakeTail[snakeTailIndex].x,snakeTail[snakeTailIndex].y,
      //   snakeDimension - 2,snakeDimension - 2);
      // }
    }
  }

  this.frameRate = undefined;

  this.backButtonSpecifics =
  {
    backButtonRectangleColor = undefined;
    backButtonTextColor = undefined;
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
}
