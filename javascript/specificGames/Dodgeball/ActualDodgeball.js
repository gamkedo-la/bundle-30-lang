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

  this.velocityX = undefined;
  this.velocityY = undefined;
  this.deltaXFromPlayer = undefined;
  this.deltaYFromPlayer = undefined;
  this.angleFromPlayer = undefined;
  this.calculateVelocitiesBetweenBallAndPlayer = function()
  {
    this.deltaXFromPlayer = this.x - gameClassManager.currentGame.playerCharacter.x;
    console.log('player character x: ' + gameClassManager.currentGame.playerCharacter.x);
    console.log('dodgeball x: ' + this.x);
    this.deltaYFromPlayer = this.y - gameClassManager.currentGame.playerCharacter.y;
    this.angleFromPlayer = Math.atan2(this.deltaXFromPlayer, this.deltaYFromPlayer);

    this.velocityX = 4 * Math.cos(this.angleFromPlayer);
    this.velocityY = 4 * Math.sin(this.angleFromPlayer);
  }

  this.isBeingThrown = false;
  this.move = function()
  {
    if (this.isBeingThrown)
    {
      this.x += this.velocityX;
      this.y += this.velocityY;
    }
  }

  this.currentTimeoutLength = undefined;
  this.setRandomTimeoutLength = function()
  {
    this.currentTimeoutLength = getRandomArbitrary(0,2000);
  }

  this.toggleIsBeingThrown = function()
  {
    console.log('toggleIsBeingThrown timeout is triggering');
    if (!this.isBeingThrown)
    {
      this.calculateVelocitiesBetweenBallAndPlayer();
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
    setTimeout(this.toggleIsBeingThrown,5000);
  }
}
