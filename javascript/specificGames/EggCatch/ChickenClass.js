function Chicken(x,y)
{
  this.x = x;
  this.y = y;

  this.width = gameCanvas.width*0.15;
  this.height = gameCanvas.height*0.15;

  this.eggStartingX = this.x;
  this.eggStartingY = this.y + this.height*0.6;

  this.image = chickenImage;

  this.draw = function()
  {
    gameCanvasContext.drawImage(this.image, this.x,this.y, this.width,this.height);
  }
}
