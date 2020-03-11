function cVcShooterBackground()
{
  this.tileCount = 9;
  this.arrayOfGameBoardLetterPositions = [0,1,2];

  this.color = 'lime';

  this.draw = function()
  {
    gameCanvasContext.fillStyle = this.color;
    gameCanvasContext.fillRect(0,0, gameCanvas.width,gameCanvas.height);
  }
}
