function Smoke(x,y)
{
  this.x = x;
  this.y = y;

  this.image = gunSmokeParticleImage;

  this.width = 5;
  this.height = gameClassManager.currentGame.playerCharacter.height/2;

  this.alpha = 1;
  this.alphaDecreaseRate = 0.97;

  this.update = function()
  {
    this.width += 4;
    this.x -= 5;
    this.alpha *= this.alphaDecreaseRate;
  }

  this.draw = function()
  {
    gameCanvasContext.globalAlpha = this.alpha;
    gameCanvasContext.drawImage(this.image, this.x,this.y, this.width,this.height);
    gameCanvasContext.globalAlpha = 1;
  }
}

function ShipSmokeManager()
{
  this.arrayOfSmoke = [];

  this.generateSmoke = function()
  {
    console.log('calling generate smoke');
    let ship = gameClassManager.currentGame.playerCharacter;
    let smoke = new Smoke(ship.x,ship.y + ship.height*0.3);
    gameClassManager.currentGame.shipSmokeManager.arrayOfSmoke.push(smoke);
    // this.arrayOfSmoke.push(smoke);

  }

  this.deleteFadedSmoke = function()
  {
    for (let i = 0; i < this.arrayOfSmoke.length; i++)
    {
      if (this.arrayOfSmoke[i].alpha < 0.1 || this.arrayOfSmoke[i].x < 0)
      {
        // gameClassManager.currentGame.shipSmokeManager.arrayOfSmoke.splice(i,1);
        this.arrayOfSmoke.splice(i,1);

      }
    }
  }

  this.drawSmoke = function()
  {
    for (let i = 0;  i < this.arrayOfSmoke.length; i++)
    {
      // gameClassManager.currentGame.shipSmokeManager.arrayOfSmoke[i].draw();
      console.log('inside draw smoke of ship smoke manager');
      this.arrayOfSmoke[i].draw();

    }
  }

  this.updateSmoke = function()
  {
    for (let i = 0;  i < this.arrayOfSmoke.length; i++)
    {
      // gameClassManager.currentGame.shipSmokeManager.arrayOfSmoke[i].update();
      this.arrayOfSmoke[i].update();

    }
  }
}
