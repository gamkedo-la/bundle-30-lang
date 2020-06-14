function SplashScreen()
{
  this.shouldBeSplashing = true;

  this.draw = function()
  {
    spellingBeesGame.canvasContext.fillStyle = 'black';
    spellingBeesGame.canvasContext.fillRect(0,0, spellingBeesGame.canvas.width,spellingBeesGame.canvas.height);

    spellingBeesGame.canvasContext.fillStyle = 'orange';
    spellingBeesGame.canvasContext.font = '30px Helvetica';
    spellingBeesGame.canvasContext.fillText('Click to start', spellingBeesGame.canvas.width/2 - 50,
                                                              spellingBeesGame.canvas.height/2);
  }
}
