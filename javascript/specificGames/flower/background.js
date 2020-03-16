function FlowerBackgroundClass()
{
  this.color = 'cyan';
  this.draw = function()
  {
    gameCanvasContext.fillStyle = this.color;
    gameCanvasContext.fillRect(0,0, gameCanvas.width,gameCanvas.height);
    gameCanvasContext.drawImage(flowerBackground, 0,0, gameCanvas.width,gameCanvas.height);
  }
}
