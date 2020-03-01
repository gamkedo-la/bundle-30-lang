function FlowerClass()
{
  this.x = gameCanvas.width/3;
  this.y = gameCanvas.height - gameCanvas.height/9;

  this.width = 20;
  this.height = 20;

  this.LEFT_ARROW_SPEED = -5;
  this.RIGHT_ARROW_SPEED = 5;

  this.xSpeed = 0;

  this.draw = function()
  {
      gameCanvasContext.fillStyle = 'red';
      gameCanvasContext.fillRect(this.x,this.y, this.width, this.height);
  }
}
