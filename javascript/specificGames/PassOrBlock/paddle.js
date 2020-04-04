function Paddle()
{
  this.width = 120;
  this.height = 25;

  this.x = gameCanvas.width/2 - this.width/2;
  this.y = gameCanvas.height - this.height*5;

  this.draw = function()
  {
    gameCanvasContext.fillStyle = 'white';
    gameCanvasContext.fillRect(this.x,this.y, this.width,this.height);
  }

  this.handleCollisionsWithAnswers = function()
  {
    //TODO: Make game specific collisions with answers code and put it into an abstracted collisions with answers
    //function in the collisionsWithAnswersManager

  }
}
