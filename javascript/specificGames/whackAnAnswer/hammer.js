function Hammer()
{
  this.image = hammerImage;

  this.width = undefined;
  this.height = undefined;

  this.initialize = function()
  {
    this.width = gameCanvas.width/10;
    this.height = gameCanvas.height/10;
  }

}
