function DodgeballNPC(image, x,y)
{
  this.image = image;

  this.width = gameCanvas.width/12;
  this.height = gameCanvas.height/10;

  this.x = x;
  this.y = y;



  this.draw = function()
  {
    gameCanvasContext.drawImage(this.image, this.x,this.y, this.width,this.height);
  }

  this.dodgeball = undefined;
}
