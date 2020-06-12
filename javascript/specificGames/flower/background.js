function FlowerBackgroundClass()
{
  this.color = 'cyan';
  this.draw = function()
  {
    gameCanvasContext.fillStyle = this.color;
    gameCanvasContext.fillRect(0,0, gameCanvas.width,gameCanvas.height);
    drawFromSheet("images\\Backgrounds\\Flower2.png", 0,0, gameCanvas.width,gameCanvas.height);
    //gameCanvasContext.drawImage("images\\Backgrounds\\Flower2.png", 0,0, gameCanvas.width,gameCanvas.height);
  }
}
