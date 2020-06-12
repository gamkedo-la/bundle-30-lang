function cVcShooterBackground()
{
  this.tileCount = 9;
  this.arrayOfGameBoardLetterPositions = [0,1,2];

  this.image = 'images\\Backgrounds\\ShootGallery.png';

  this.color = 'lime';

  this.draw = function()
  {
    // gameCanvasContext.fillStyle = this.color;
    // gameCanvasContext.fillRect(0,0, gameCanvas.width,gameCanvas.height);
    drawFromSheet(this.image, 0,0, gameCanvas.width,gameCanvas.height);
    //gameCanvasContext.drawImage(this.image, 0,0, gameCanvas.width,gameCanvas.height);
  }
}
