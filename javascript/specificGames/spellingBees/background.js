function Background()
{
  this.startingX = 0;
  this.startingY = 0;

  this.color = 'DarkGoldenRod';

  this.width = undefined;
  this.height = undefined;

  this.initialize = function()
  {
    this.width = spellingBeesGame.canvas.width;
    this.height = spellingBeesGame.canvas.height;
  }

  this.draw = function()
  {
    spellingBeesGame.canvasContext.fillStyle = this.color;
    spellingBeesGame.canvasContext.fillRect(this.startingX,this.startingY, this.width,this.height);
  }
}

spellingBeesGame.background = new Background();
