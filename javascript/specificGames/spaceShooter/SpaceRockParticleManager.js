function SpaceRockParticle(x,y, xVelocity,yVelocity, image)
{
  this.x = x;
  this.y = y;
  this.xVelocity = xVelocity;
  this.yVelocity = yVelocity;

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
    drawFromSheet(this.image, this.x,this.y, this.width,this.height);
    //gameCanvasContext.drawImage(this.image, this.x,this.y, this.width,this.height);
  }
}


function SpaceRockParticleManager()
{
  this.arrayOfGroupsOfParticles = [];
  this.createAGroupOfParticles = function()
  {
    console.log('inside create a group of particles');
    let groupOfParticles = [];
    let randomAmountOfParticles = getRandomIntInclusive(15, 30);

    let currentCollidedAnswer = gameClassManager.currentGame.collisionsWithAnswersManager.currentCollidedAnswer;
    let rockCenterX = undefined;
    let rockCenterY = undefined;
    if (currentCollidedAnswer === promptsAndAnswersManager.correctTargetPromptAndAnswerPairing)
    {
      console.log('inside create correct collided answer');
      rockCenterX = drawAnswersManager.currentCorrectAnswerHolderX + drawAnswersManager.currentCorrectAnswerHolderWidth/2;
      rockCenterY = drawAnswersManager.currentCorrectAnswerHolderY + drawAnswersManager.currentCorrectAnswerHolderHeight/2;
    }
    else if (currentCollidedAnswer === promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing){
      console.log('inside create incorrect collided answer');

      rockCenterX = drawAnswersManager.currentIncorrectAnswerHolderX + drawAnswersManager.currentIncorrectAnswerHolderWidth/2;
      rockCenterY = drawAnswersManager.currentIncorrectAnswerHolderY + drawAnswersManager.currentIncorrectAnswerHolderHeight/2;
    }

    for (let particleIndex = 0; particleIndex < randomAmountOfParticles; particleIndex++)
    {
      let xVelocity = getRandomArbitrary(-7, 7);
      let yVelocity = getRandomArbitrary(-7, 7);

      let particle = new SpaceRockParticle(rockCenterX,rockCenterY, xVelocity,yVelocity, 'images\\sprites\\Jumper\\jumperGroundParticle.png');
      groupOfParticles.push(particle);
    }
    this.arrayOfGroupsOfParticles.push(groupOfParticles);
  }

  this.updateParticles = function()
  {
    if (this.arrayOfGroupsOfParticles.length === 0)
    {
      return;
    }
    else
    {

      for (let groupsOfParticlesIndex = 0; groupsOfParticlesIndex < this.arrayOfGroupsOfParticles.length; groupsOfParticlesIndex++)
      {
        for (let individualParticlesIndex = 0; individualParticlesIndex < this.arrayOfGroupsOfParticles[groupsOfParticlesIndex].length; individualParticlesIndex++)
        {

          if (this.arrayOfGroupsOfParticles[groupsOfParticlesIndex][individualParticlesIndex].y > gameCanvas.height ||
              this.arrayOfGroupsOfParticles[groupsOfParticlesIndex][individualParticlesIndex].y < 0 ||
              this.arrayOfGroupsOfParticles[groupsOfParticlesIndex][individualParticlesIndex].x < 0 ||
              this.arrayOfGroupsOfParticles[groupsOfParticlesIndex][individualParticlesIndex].x > gameCanvas.width)
          {
            this.arrayOfGroupsOfParticles[groupsOfParticlesIndex].splice(individualParticlesIndex,1);
          }
        }
      }
    }

  }

  this.moveParticles = function()
  {
    if (this.arrayOfGroupsOfParticles.length === 0)
    {
      return;
    }
    else
    {

      for (let groupsOfParticlesIndex = 0; groupsOfParticlesIndex < this.arrayOfGroupsOfParticles.length; groupsOfParticlesIndex++)
      {
        for (let individualParticlesIndex = 0; individualParticlesIndex < this.arrayOfGroupsOfParticles[groupsOfParticlesIndex].length; individualParticlesIndex++)
        {
          this.arrayOfGroupsOfParticles[groupsOfParticlesIndex][individualParticlesIndex].move();
        }
      }
    }
  }

  this.drawParticles = function()
  {
    if (this.arrayOfGroupsOfParticles.length === 0)
    {
      return;
    }
    else
    {

      for (let groupsOfParticlesIndex = 0; groupsOfParticlesIndex < this.arrayOfGroupsOfParticles.length; groupsOfParticlesIndex++)
      {
        for (let individualParticlesIndex = 0; individualParticlesIndex < this.arrayOfGroupsOfParticles[groupsOfParticlesIndex].length; individualParticlesIndex++)
        {
          this.arrayOfGroupsOfParticles[groupsOfParticlesIndex][individualParticlesIndex].draw();
        }
      }
    }
  }
}
