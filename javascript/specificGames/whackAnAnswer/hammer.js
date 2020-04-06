function Hammer()
{
  this.image = hammerImage;

  this.x = undefined;
  this.y = undefined;

  this.width = undefined;
  this.height = undefined;

  this.mouseClicked = false;

  this.initialize = function()
  {
    this.width = gameCanvas.width/5;
    this.height = gameCanvas.height/5;
  }

  this.draw = function()
  {
    if (this.mouseClicked === true)
    {
      gameCanvasContext.save();
      gameCanvasContext.translate(this.x + 35,this.y + 25);
      gameCanvasContext.rotate(-45*Math.PI/180);
      gameCanvasContext.translate(-(this.x + 35),-(this.y + 25));

      gameCanvasContext.drawImage(this.image, this.x - 35,this.y - 25, this.width,this.height);
      gameCanvasContext.restore();
    }
    else if (this.mouseClicked === false)
    {
      gameCanvasContext.drawImage(this.image, this.x - 35,this.y - 25, this.width,this.height);
    }
  }

  this.update = function()
  {
    this.x = inputManager.mouseCoordinates.x;
    this.y = inputManager.mouseCoordinates.y;
  }

  this.handleMouseClick = function()
  {
    this.mouseClicked = true;
    setTimeout(this.unClickMouse, 200);
  }

  this.unClickMouse = function()
  {
    console.log('should be unclicking mouse');
    this.mouseClicked = false;
  }
}
