function ActualDodgeball(startingX,startingY)
{
  this.image = dodgeballImage;

  this.x = startingX;
  this.y = startingY;

  this.width = gameCanvas.width/18;
  this.height = gameCanvas.height/18;

  this.draw = function()
  {
    gameCanvasContext.drawImage(this.image, this.x,this.y, this.width,this.height);
  }

  this.targetX = undefined;
  this.targetY = undefined;
  this.calculateTargetFromPlayerCharacterLocation = function()
  {
    this.targetX = gameClassManager.currentGame.playerCharacter.x;
    this.targetY = gameClassManager.currentGame.playerCharacter.y;
  }

  this.velocityX = 4;
  this.velocityXDirection = undefined;
  this.velocityY = 4;
  this.calculateVelocityDirections = function()
  {
    if (this.x < this.targetX)
    {
      this.velocityXDirection = 1;
    }
    else
    {
      this.velocityXDirection = -1;
    }

    if (this.y < this.targetY)
    {
      this.velocityYDirection = 1;
    }
    else
    {
      this.velocityYDirection = -1;
    }
  }

  this.isBeingThrown = false;
  this.move = function()
  {
    if (this.isBeingThrown)
    {
      this.x += this.velocityX * this.velocityXDirection;
      this.y += this.velocityY * this.velocityYDirection;
    }
  }

  this.currentTimeoutLength = undefined;
  this.setRandomTimeoutLength = function()
  {
    this.currentTimeoutLength = getRandomArbitrary(0,2000);
  }

  this.toggleIsBeingThrown = function()
  {
    if (!this.isBeingThrown)
    {
      this.calculateTargetFromPlayerCharacterLocation();
      this.calculateVelocityDirections();
      this.isBeingThrown = true;
    }
    else
    {
      this.isBeingThrown = false;
    }
  }

  this.throwTheBallAfterTimeout = function()
  {
    this.setRandomTimeoutLength();
    setTimeout(this.toggleIsBeingThrown,this.currentTimeoutLength);
  }
}
