function ShooterPlayer()
{
  this.position = 1;

  this.gunRotated = false;

  this.draw = function()
  {
    if (this.gunRotated === true)
    {
      gameCanvasContext.save();
      gameCanvasContext.translate(this.position*(gameCanvas.width*0.165) - 3,gameCanvas.height);
      gameCanvasContext.rotate(15*Math.PI/180);
      gameCanvasContext.translate( -(this.position*(gameCanvas.width*0.165) - 3),-(gameCanvas.height) );
      gameCanvasContext.drawImage(galleryGunImage, this.position*(gameCanvas.width/3) - 3,gameCanvas.height - 150, 200,350);
      gameCanvasContext.restore();
    }
    else if (this.gunRotated === false)
    {
      gameCanvasContext.drawImage(galleryGunImage, this.position*(gameCanvas.width/3) - 3,gameCanvas.height - 150, 200,350);
    }

  }

  this.rotateGun = function()
  {
    this.gunRotated = true;
    setTimeout(unRotateGun, 200);
  }

  this.arrayOfGunSmokeParticles = [];
  this.generateSmoke = function()
  {
    let x = this.position*(gameCanvas.width/3) + 50;
    let y = gameCanvas.height - 175;
    let smoke = new GunSmokeParticle(x,y);
    this.arrayOfGunSmokeParticles.push(smoke);
  }
}

function unRotateGun()
{
  gameClassManager.currentGame.playerCharacter.gunRotated = false;
}

function GunSmokeParticle(x,y)
{

  this.image = gunSmokeParticleImage;
  this.x = x;
  this.y = y;

  this.alpha = 1;
  this.alphaDecreaseRate = 0.99;
  this.width = getRandomArbitrary(75,125);
  this.height = getRandomArbitrary(100,150);
  this.xVelocity = getRandomArbitrary(-1,1);
  this.yVelocity = getRandomArbitrary(1,2);

  this.draw = function()
  {
    gameCanvasContext.globalAlpha = this.alpha;
    gameCanvasContext.drawImage(this.image, this.x,this.y, this.width,this.height);
    gameCanvasContext.globalAlpha = 1;
  }

  this.move = function()
  {
    this.x += this.xVelocity;
    this.y -= this.yVelocity;

    this.width -= 1;
    this.height -= 1;

    this.alpha *= this.alphaDecreaseRate;

  }
}
