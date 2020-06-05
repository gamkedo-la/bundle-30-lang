function FrogCratePlayer()
{
  this.frogInBowlImage = frogInBowlImage;


  this.width = gameCanvas.width*0.2;
  this.height = gameCanvas.height*0.15;

  this.x = gameCanvas.width/2 - this.width/2;
  this.y = gameCanvas.height*0.8;

  this.tongueImage = frogTongueImage;
  this.tongueWidth = 10;
  this.tongueX = this.x + this.width/2 - 1.5;
  this.tongueY = this.y - 10;
  this.tongueHeight = this.y - this.tongueY + 10;

  this.draw = function()
  {
    gameCanvasContext.drawImage(this.tongueImage, this.tongueX,this.tongueY, this.tongueWidth,this.tongueHeight);
    gameCanvasContext.drawImage(this.frogInBowlImage, this.x,this.y, this.width,this.height);
  }

  this.move = function()
  {
    if (inputManager.rightArrowIsBeingHeld === true)
    {
      this.x += 5;
      this.tongueX += 5;
    }
    if (inputManager.leftArrowIsBeingHeld === true)
    {
      this.x -= 5;
      this.tongueX -= 5;
    }
  }

  this.tongueShouldBeStretchingOut = false;
  this.stretchTongue = function()
  {
    if (this.tongueShouldBeStretchingOut === true)
    {
      this.tongueY -= 10;
      if (this.tongueY <= 0)
      {
        this.tongueShouldBeStretchingOut = false;
        this.tongueShouldBeReturningToMouth = true;
      }
    }
  }

  this.tongueShouldBeReturningToMouth = false;
  this.returnTongue = function()
  {
    if (this.tongueShouldBeReturningToMouth === true)
    {
      this.tongueY += 10;
      if (this.tongueY >= this.y - 10)
      {
        this.tongueY = this.y - 10;
        this.tongueShouldBeReturningToMouth = false;
      }
    }
  }

  this.updateTongueLength = function()
  {
    this.tongueHeight = this.y - this.tongueY + 10;
  }
}
