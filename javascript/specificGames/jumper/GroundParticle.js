function GroundParticle(x,y, xVelocity,yVelocity, image)
{
  this.x = x;
  this.y = y;
  this.xVelocity = xVelocity;
  this.yVelocity = yVelocity;

  this.width = 7;
  this.height = 7;

  const GRAVITY = -0.5;

  this.image = image;

  this.update = function()
  {
    this.yVelocity -= GRAVITY;
  }

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

function GroundParticleManager()
{
  this.arrayOfGroupsOfParticles = [];
  this.createAGroupOfParticles = function()
  {
    let groupOfParticles = [];
    let randomAmountOfParticles = getRandomIntInclusive(15, 30);
    for (let particleIndex = 0; particleIndex < randomAmountOfParticles; particleIndex++)
    {
      let currentX = gameClassManager.currentGame.playerCharacter.x;
      let currentY = gameClassManager.currentGame.playerCharacter.y;
      let xToAssign = getRandomArbitrary(currentX - 35, currentX + 35);
      let yToAssign = getRandomArbitrary(currentY + 70, currentY + 10);
      let xVelocity = getRandomArbitrary(-1,1);
      let yVelocity = getRandomArbitrary(-7, -10);

      let particle = new GroundParticle(xToAssign,yToAssign, xVelocity,yVelocity, jumperGroundParticleImage);
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
          this.arrayOfGroupsOfParticles[groupsOfParticlesIndex][individualParticlesIndex].update();
          if (this.arrayOfGroupsOfParticles[groupsOfParticlesIndex][individualParticlesIndex].y > gameCanvas.height)
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
