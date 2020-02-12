function BeeCatcher()
{
  this.x = undefined;
  this.y = undefined;

  this.width = undefined;
  this.height = undefined;

  this.color = 'blue';

  this.initialize = function()
  {
    this.width = spellingBeesGame.canvas.width/10;
    this.height = spellingBeesGame.canvas.height/10;

    this.x = getRandomIntInclusive(0,spellingBeesGame.canvas.width - this.width);
    this.y = getRandomIntInclusive(0,spellingBeesGame.canvas.height - this.height);
  }

  this.draw = function()
  {
    spellingBeesGame.canvasContext.fillStyle = this.color,
    spellingBeesGame.canvasContext.fillRect(this.x,this.y, this.width,this.height);
  }
}

spellingBeesGame.beeCatcher = new BeeCatcher();
