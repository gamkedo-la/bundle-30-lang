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
  this.angleFromPlayerInRadians = undefined;
  this.calculateVelocitiesBetweenBallAndPlayer = function()
  {
    this.deltaXFromPlayer =  this.x - gameClassManager.currentGame.playerCharacter.centerX;
    this.deltaYFromPlayer =  this.y - gameClassManager.currentGame.playerCharacter.centerY;
    this.angleFromPlayer = Math.atan2(this.deltaYFromPlayer,this.deltaXFromPlayer);
    this.angleFromPlayerInRadians = this.angleFromPlayer * 180/Math.PI;
    this.velocityX = 4 * Math.cos(this.angleFromPlayerInRadians);
    this.velocityY = 4 * Math.sin(this.angleFromPlayerInRadians);
    console.log('this.velocityX: ' + this.velocityX);
    console.log('this.velocityY: ' + this.velocityY);
  }

  this.isBeingThrown = false;
  this.move = function()
  {
    if (this.isBeingThrown === true)
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


  this.throwTheBallAfterTimeout = function()
  {
    // this.setRandomTimeoutLength();
    setTimeout(this.toggleIsBeingThrown,10000);
  }

  this.toggleIsBeingThrown = function()
  {
    console.log('toggleIsBeingThrown triggered');
    if (this.isBeingThrown === false)
    {
      console.log('check if isBeingThrown === false entered');
      this.calculateVelocitiesBetweenBallAndPlayer();
      this.isBeingThrown = true;
    }
    else if (this.isBeingThrown === true)
    {
      console.log('else case of isBeingThrown entered');

      this.isBeingThrown = false;
    }
  }
}



function throwTheBallAfterTimeout(dodgeball)
{
  // this.setRandomTimeoutLength();
  console.log('dodgeball: ' + dodgeball);
  setTimeout(toggleIsBeingThrown,10000,dodgeball);
}

function toggleIsBeingThrown(dodgeball)
{
  if (dodgeball.isBeingThrown === false)
  {
    console.log('check if isBeingThrown === false entered');
    dodgeball.calculateVelocitiesBetweenBallAndPlayer();
    dodgeball.isBeingThrown = true;
  }
  else if (dodgeball.isBeingThrown === true)
  {
    console.log('else case of isBeingThrown entered');

    dodgeball.isBeingThrown = false;
  }
}
