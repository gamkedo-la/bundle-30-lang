function FrogCratePlayer()
{
  this.image = frogInBowlImage;
  this.width = gameCanvas.width*0.1;
  this.height = gameCanvas.height*0.1;

  this.x = gameCanvas.width/2 - this.width/2;
  this.y = gameCanvas.height*0.8;

  this.draw = function()
  {
    gameCanvasContext.drawImage(this.image, this.x,this.y, this.width,this.height);
  }

  this.move = function()
  {
    if (inputManager.rightArrowIsBeingHeld === true)
    {
      this.x += 5;
    }
    if (inputManager.leftArrowIsBeingHeld === true)
    {
      this.x -= 5;
    }
  }
}
