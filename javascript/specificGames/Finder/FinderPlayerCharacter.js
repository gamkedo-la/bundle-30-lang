function FinderPlayerCharacter()
{
  this.image = russianDollImage2;

  this.width = gameCanvas.width*0.1;
  this.height = gameCanvas.height*0.15;

  this.startingX = gameCanvas.width/2 - this.width/2;
  this.startingY = gameCanvas.height/2 - this.height/2;

  this.x = this.startingX;
  this.y = this.startingY;

  this.previousX = undefined;
  this.previousY = undefined;

  this.numberOfKeys = 0;

  this.draw = function()
  {
    gameCanvasContext.drawImage(this.image, this.x,this.y, this.width,this.height);
  }

  this.move = function()
  {
    this.previousX = this.x;
    this.previousY = this.y;
    if (inputManager.leftArrowIsBeingHeld === true)
    {
      this.x -= 5;
    }
    if (inputManager.upArrowIsBeingHeld === true)
    {
      this.y -= 5;
    }
    if (inputManager.rightArrowIsBeingHeld === true)
    {
      this.x += 5;
    }
    if (inputManager.downArrowIsBeingHeld === true)
    {
      this.y += 5;
    }
  }
}
