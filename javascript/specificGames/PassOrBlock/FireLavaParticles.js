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
      ,targetAnswerToAssignAParticleTo.yCoordinate,
      xVelocity,yVelocity, this.pickAnImage)
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
}
