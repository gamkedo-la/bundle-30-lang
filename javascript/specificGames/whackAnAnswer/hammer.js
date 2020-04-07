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
    this.width = gameCanvas.width*0.4;
    this.height = gameCanvas.height*0.4;
  }

  this.draw = function()
  {
    document.body.style.cursor = 'none';
    if (this.mouseClicked === true)
    {
      gameCanvasContext.save();
      gameCanvasContext.translate(this.x + this.width,this.y);
      gameCanvasContext.rotate(-25*Math.PI/180);
      gameCanvasContext.translate(-(this.x + this.width),-(this.y));

      gameCanvasContext.drawImage(this.image, this.x - 20,this.y - 215, this.width,this.height);
      gameCanvasContext.restore();
    }
    else if (this.mouseClicked === false)
    {
      gameCanvasContext.drawImage(this.image, this.x - 20,this.y - 215,
                                              this.width,this.height);
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
    gameClassManager.currentGame.playerCharacter.mouseClicked = false;
  }
}
