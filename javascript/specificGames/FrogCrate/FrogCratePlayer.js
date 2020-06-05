function FrogCratePlayer()
{
  this.frogInBowlImage = frogInBowlImage;


  this.width = gameCanvas.width*0.2;
  this.height = gameCanvas.height*0.15;

  this.x = gameCanvas.width/2 - this.width/2;
  this.y = gameCanvas.height*0.8;

  this.tongue = undefined;

  this.draw = function()
  {
    gameCanvasContext.drawImage(this.tongue.image, this.tongue.x,this.tongue.y, this.tongue.width,this.tongue.height);
    gameCanvasContext.drawImage(this.frogInBowlImage, this.x,this.y, this.width,this.height);
  }

  this.move = function()
  {
    if (inputManager.rightArrowIsBeingHeld === true)
    {
      this.x += 5;
      this.tongue.x += 5;
    }
    if (inputManager.leftArrowIsBeingHeld === true)
    {
      this.x -= 5;
      this.tongue.x -= 5;
    }
  }

  this.tongueShouldBeStretchingOut = false;
  this.stretchTongue = function()
  {
    if (this.tongueShouldBeStretchingOut === true)
    {
      this.tongue.y -= 10;
      if (this.tongue.y <= 0)
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
      this.tongue.y += 10;
      if (this.tongue.y >= this.y - 10)
      {
        this.tongue.y = this.y - 10;
        this.tongueShouldBeReturningToMouth = false;
      }
    }
  }

  this.updateTongueLength = function()
  {
    this.tongue.height = this.y - this.tongue.y + 10;
  }
}

function Tongue()
{
  let playerCharacter = gameClassManager.currentGame.playerCharacter;

  this.image = frogTongueImage;
  this.width = 10;
  this.x = playerCharacter.x + playerCharacter.width/2 - 1.5;
  this.y = playerCharacter.y - 10;
  this.height = playerCharacter.y - playerCharacter.tongueY + 10;
}
