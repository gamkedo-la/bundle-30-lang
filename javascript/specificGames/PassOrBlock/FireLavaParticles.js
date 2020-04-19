function FireLavaParticle(x,y, xVelocity,yVelocity, image)
{
  this.x = x;
  this.y = y;
  this.xVelocity = xVelocity;
  this.yVelocity = yVelocity;

  this.verticalDirection = undefined;

  this.width = 7;
  this.height = 7;

  this.image = image;

  this.move = function()
  {
    this.x += this.xVelocity;
    this.y += this.yVelocity;
  }

  this.draw = function()
  {
    gameCanvasContext.drawImage(this.image, this.x,this.y, this.width,this.height);
  }
}

function FireLavaParticleManager()
{
  this.arrayOfParticles = [];
  this.arrayOfParticleImages = [lavaParticle1Image,lavaParticle2Image,lavaParticle3Image,lavaParticle4Image];
  this.generateAParticle = function()
  {
    let targetAnswerToAssignAParticleTo = this.pickAnAnswer();
    let particle = new FireLavaParticle(
      this.pickAnXCoordinate(targetAnswerToAssignAParticleTo)
      ,this.pickAYCoordinate(targetAnswerToAssignAParticleTo),
      this.assignXVelocity(),this.assignYVelocity(this.answerDirection), this.pickAnImage());

    this.arrayOfParticles.push(particle);
  }

  this.moveParticles = function()
  {
    for (let particleIndex = 0; particleIndex < this.arrayOfParticles.length; particleIndex++)
    {
      this.arrayOfParticles[particleIndex].move();
    }
  }

  this.drawParticles = function()
  {
    for (let particleIndex = 0; particleIndex < this.arrayOfParticles.length; particleIndex++)
    {
      this.arrayOfParticles[particleIndex].draw();
    }
  }

  this.deleteOffScreenParticles = function()
  {
    for (let particleIndex = 0; particleIndex < this.arrayOfParticles.length; particleIndex++)
    {
      if (this.arrayOfParticles[particleIndex].y < 0 || this.arrayOfParticles[particleIndex].y > gameCanvas.height)
      {
        this.arrayOfParticles.splice(particleIndex,1);
      }
    }
  }

  this.handleParticles = function()
  {
    this.generateAParticle();
    this.moveParticles();
    this.deleteOffScreenParticles();
    this.drawParticles();
  }

  this.ySpeedReference = undefined;
  this.pickAnAnswer = function()
  {
    let randomNumberForCoinFlip = Math.random();
    if (randomNumberForCoinFlip < 0.5)
    {
      this.ySpeedReference = gameClassManager.currentGame.correctAnswersYSpeed;
      return promptsAndAnswersManager.correctTargetPromptAndAnswerPairing;
    }
    else
    {
      this.ySpeedReference = gameClassManager.currentGame.incorrectAnswersYSpeed;
      return promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing;
    }
  }

  this.pickAnImage = function()
  {
    let randomImageIndex = getRandomIntInclusive(0, this.arrayOfParticleImages.length - 1);
    let image = this.arrayOfParticles[randomImageIndex];
    return image;
  }

  this.pickAnXCoordinate = function(answer)
  {
    let randomX = getRandomArbitrary(answer.xCoordinate, answer.xCoordinate + gameClassManager.currentGame.currentAnswerHolderWidth)
    return randomX;
  }

  this.currentAnswerDirection = undefined;
  this.pickAYCoordinate = function(answer)
  {

    if (answer === promptsAndAnswersManager.correctTargetPromptAndAnswerPairing)
    {
      if (gameClassManager.currentGame.correctAnswersYSpeed > 0)
      {
        this.currentAnswerDirection = 'down';
      }
      else
      {
        this.currentAnswerDirection = 'up';
      }
    }
    else if (answer === promptsAndAnswersManager.correctTargetPromptAndAnswerPairing)
    {
      if (gameClassManager.currentGame.incorrectAnswersYSpeed > 0)
      {
        this.currentAnswerDirection = 'down';
      }
      else
      {
        this.currentAnswerDirection = 'up';
      }
    }

    let randomY = undefined;
    if (this.currentAnswerDirection === 'down')
    {
      randomY = getRandomArbitrary(answer.yCoordinate - 20, answer.yCoordinate);
    }
    else
    {
      randomY = getRandomArbitrary(answer.yCoordinate + gameClassManager.currentGame.currentAnswerHolderHeight, answer.yCoordinate + gameClassManager.currentGame.currentAnswerHolderHeight + 20);
    }

    return randomY;
  }

  this.assignXVelocity = function()
  {
    return getRandomArbitrary(-1,1);
  }

  this.assignYVelocity = function(answerDirection)
  {
    let yDirection = undefined;
    if (answerDirection === 'down')
    {
      yDirection = -1;
    }
    else
    {
      yDirection = 1;
    }

    let yVelocity = getRandomArbitrary(1*yDirection,3*yDirection);
    return yVelocity;
  }
}
