function ActualDodgeball(number, startingX,startingY, oscillationVelocityX,oscillationVelocityY)
{
  this.number = number;
  this.image = dodgeballImage;

  this.x = startingX;
  this.y = startingY;

  this.startingX = startingX;
  this.startingY = startingY;

  this.oscillationVelocityX = oscillationVelocityX;
  this.oscillationVelocityY = oscillationVelocityY;

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
    this.velocityX = 5 * Math.cos(this.angleFromPlayerInRadians);
    this.velocityY = 5 * Math.sin(this.angleFromPlayerInRadians);
  }

  this.isBeingThrown = false;
  this.circlePathRadius = 250;
  this.circleAngleInRadians = 0;
  this.move = function()
  {
    if (this.isBeingThrown === true)
    {
      this.x += this.velocityX;
      this.y += this.velocityY;
    }
    else if (this.isBeingThrown === false)
    {
      let npc1 = gameClassManager.currentGame.arrayOfNPCs[0];
      let npc2 = gameClassManager.currentGame.arrayOfNPCs[1];
      let npc3 = gameClassManager.currentGame.arrayOfNPCs[2];
      let npc4 = gameClassManager.currentGame.arrayOfNPCs[3];

      if (this.number === '1')
      {
        this.x = npc1.x + npc1.width/2;
        this.y = npc1.y + npc1.height/2;
      }
      else if (this.number === '2')
      {
        this.x = npc2.x + npc2.width/2;
        this.y = npc2.y + npc2.height/2;
      }
      else if (this.number === '3')
      {
        this.x = npc3.x + npc3.width/2;
        this.y = npc3.y + npc3.height/2;
      }
      else if (this.number === '4')
      {
        this.x = npc4.x + npc4.width/2;
        this.y = npc4.y + npc4.height/4;
      }
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

  this.detectCollisionWithPlayer = function()
  {
    let playerCharacter = gameClassManager.currentGame.playerCharacter;
    if (this.x < playerCharacter.x + playerCharacter.width && this.x + this.width > playerCharacter.x &&
        this.y < playerCharacter.y + playerCharacter.height && this.y + this.height > playerCharacter.y)
        {
          this.isBeingThrown = false;

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

          gameAudio.dodgeballCollision.play();
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
     if (this.x > gameCanvas.width || this.x + this.width < 0 || this.y > gameCanvas.height || this.y - this.height < -5)
     {
       this.x = startingX;
       this.y = startingY;
       this.isBeingThrown = false;
       this.wentOffScreenThisPromptingRound = true;
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
  setTimeout(toggleIsBeingThrown,Math.random()*3000,dodgeball);
}

function toggleIsBeingThrown(dodgeball)
{
  if (dodgeball.isBeingThrown === false)
  {
    dodgeball.calculateVelocitiesBetweenBallAndPlayer();
    dodgeball.isBeingThrown = true;
    gameAudio.dodgeballCollision.play();
  }
}