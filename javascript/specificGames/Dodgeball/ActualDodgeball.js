function ActualDodgeball(number, startingX,startingY)
{
  this.number = number;
  this.image = dodgeballImage;

  this.x = startingX;
  this.y = startingY;

  this.startingX = startingX;
  this.startingY = startingY;

  this.width = gameCanvas.width/18;
  this.height = gameCanvas.height/18;

  this.phonicClass = undefined;

  this.draw = function()
  {
    gameCanvasContext.drawImage(this.image, this.x,this.y, this.width,this.height);
    gameCanvasContext.fillStyle = 'white';
    gameCanvasContext.fillText(this.phonicClass.textAssociation, this.x + this.width/3,this.y + this.height*0.75);
  }

  this.velocityX = undefined;
  this.velocityY = undefined;
  this.deltaXFromPlayer = undefined;
  this.deltaYFromPlayer = undefined;
  this.angleFromPlayer = undefined;
  this.angleFromPlayerInRadians = undefined;
  this.calculateVelocitiesBetweenBallAndPlayer = function()
  {
    this.deltaXFromPlayer =  gameClassManager.currentGame.playerCharacter.centerX - this.x;
    this.deltaYFromPlayer =  gameClassManager.currentGame.playerCharacter.centerY - this.y;
    this.angleFromPlayerInRadians = Math.atan2(this.deltaYFromPlayer,this.deltaXFromPlayer);
    this.velocityX = 4 * Math.cos(this.angleFromPlayerInRadians);
    this.velocityY = 4 * Math.sin(this.angleFromPlayerInRadians);
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
    setTimeout(this.toggleIsBeingThrown,5000);
  }

  this.toggleIsBeingThrown = function()
  {

    if (this.isBeingThrown === false)
    {
      console.log('ball ' + this.number + ' is being thrown');
      this.calculateVelocitiesBetweenBallAndPlayer();
      this.isBeingThrown = true;
    }
    else if (this.isBeingThrown === true)
    {
      this.isBeingThrown = false;
    }
  }

  this.detectCollisionWithPlayer = function()
  {
    let playerCharacter = gameClassManager.currentGame.playerCharacter;
    if (this.x < playerCharacter.x + playerCharacter.width && this.x + this.width > playerCharacter.x &&
        this.y < playerCharacter.y + playerCharacter.height && this.y + this.height > playerCharacter.y)
        {
          this.x = startingX;
          this.y = startingY;
          this.isBeingThrown = false;
          console.log('ball ' + this.number + ' collided with the player and should be reset');

          if (this.phonicClass.isTheCorrectChoice === true)
          {
            genAudio.playPositive();
            amountCorrect++;
          }
          else if (this.phonicClass.isTheCorrectChoice === false)
          {
            genAudio.playNegative();
            amountIncorrect++;
          }

          gameClassManager.currentGame.phonicClassManager.setOrResetPhonicsOnDodgeballsAndPlayPromptAudio();
          for (let i = 0; i < gameClassManager.currentGame.arrayOfDodgeballs.length; i++)
          {
            gameClassManager.currentGame.arrayOfDodgeballs[i].x = gameClassManager.currentGame.arrayOfDodgeballs[i].startingX;
            gameClassManager.currentGame.arrayOfDodgeballs[i].y = gameClassManager.currentGame.arrayOfDodgeballs[i].startingY;
            gameClassManager.currentGame.arrayOfDodgeballs[i].isBeingThrown = false;
            gameClassManager.currentGame.throwTheBallsAfterTimeouts();
          }


        }

   }

   this.wentOffScreenThisPromptingRound = false;
   this.detectOffScreen = function()
   {
     if (this.x > gameCanvas.width || this.x + this.width < 0 || this.y > gameCanvas.height || this.y - this.height < 0)
     {
       this.x = startingX;
       this.y = startingY;
       this.isBeingThrown = false;
       this.wentOffScreenThisPromptingRound = true;
       console.log('ball ' + this.number + ' was off screen and should be reset');
     }

     let numberOfBallsThatWentOffScreen;
     for (let i = 0; i < gameClassManager.currentGame.arrayOfDodgeballs.length; i++)
     {
       if (gameClassManager.currentGame.arrayOfDodgeballs[i].wentOffScreenThisPromptingRound === true)
       {
         numberOfBallsThatWentOffScreen++;
       }
     }
     if (numberOfBallsThatWentOffScreen === 4)
     {
       gameClassManager.currentGame.phonicClassManager.setOrResetPhonicsOnDodgeballsAndPlayPromptAudio();
       gameClassManager.currentGame.arrayOfDodgeballs[i].x = gameClassManager.currentGame.arrayOfDodgeballs[i].startingX;
       gameClassManager.currentGame.arrayOfDodgeballs[i].y = gameClassManager.currentGame.arrayOfDodgeballs[i].startingY;
       gameClassManager.currentGame.arrayOfDodgeballs[i].isBeingThrown = false;
       genAudio.playNegative();
       gameClassManager.currentGame.throwTheBallsAfterTimeouts();
       for (let i = 0; i < gameClassManager.currentGame.arrayOfDodgeballs.length; i++)
       {
         gameClassManager.currentGame.arrayOfDodgeballs[i].wentOffScreenThisPromptingRound = false;
       }
     }
   }
}



function throwTheBallAfterTimeout(dodgeball)
{
  console.log('throw the ball after timeout is being called');
  setTimeout(toggleIsBeingThrown,Math.random()*3000,dodgeball);
}

function toggleIsBeingThrown(dodgeball)
{
  if (dodgeball.isBeingThrown === false)
  {
    console.log('inside toggle ball is being thrown');
    dodgeball.calculateVelocitiesBetweenBallAndPlayer();
    dodgeball.isBeingThrown = true;
  }
}
