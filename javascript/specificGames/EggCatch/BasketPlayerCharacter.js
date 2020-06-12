function BasketPlayerCharacter()
{
  this.width = gameCanvas.width*0.2;
  this.height = gameCanvas.height*0.1;
  this.x = gameCanvas.width/2 - this.width/2;
  this.y = gameCanvas.height*0.8;
  this.image = 'images\\sprites\\eggCatch\\Basket.png';

  this.draw = function()
  {
    drawFromSheet(this.image, this.x,this.y, this.width,this.height);
    //gameCanvasContext.drawImage(this.image, this.x,this.y, this.width,this.height);
  }
}
