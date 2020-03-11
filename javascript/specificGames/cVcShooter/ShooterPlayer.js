function ShooterPlayer()
{
  this.position = 1;

  this.draw = function()
  {
    gameCanvasContext.beginPath();
    gameCanvasContext.moveTo(this.position*200 + 10, gameCanvas.height - 10);
    gameCanvasContext.lineTo(this.position*200 + 100, gameCanvas.height - 150);
    gameCanvasContext.lineTo(this.position*200 + 190, gameCanvas.height - 10);
    gameCanvasContext.closePath();

    gameCanvasContext.lineWidth = 10;
    gameCanvasContext.strokeStyle = '#666666';
    gameCanvasContext.stroke();

    gameCanvasContext.fillStyle = "#FFCC00";
    gameCanvasContext.fill();
  }
}
