function NighttimePlayerCharacter()
{
  this.image = russianDollImage2;

  this.width = gameCanvas.width*0.1;
  this.height = gameCanvas.height*0.15;

  this.x = gameCanvas.width/2 - this.width/2;
  this.y = gameCanvas.height - this.height*1.5;

  this.ghostGunX = this.x + this.width;
  this.ghostGunY = this.y - this.height*0.33;
  this.ghostGunWidth = this.width*0.33;
  this.ghostGunHeight = this.height*0.66;

  this.laserShot =
  {
    x: undefined,
    y: 0,
    width: this.ghostGunWidth*0.66,
    height: this.ghostGunY
  };

  this.initializeLaserShot = function()
  {
    this.laserShot.x = this.ghostGunX + this.ghostGunWidth*0.33;
    let laserShot = this.laserShot;
    setTimeout(function(){
      laserShot.x = undefined;
    },500,laserShot)
  }

  this.draw = function()
  {
    gameCanvasContext.drawImage(this.image, this.x,this.y, this.width,this.height);
    gameCanvasContext.fillStyle = 'yellow';
    gameCanvasContext.fillRect(this.ghostGunX,this.ghostGunY, this.ghostGunWidth,this.ghostGunHeight);
    if (this.laserShot.x !== undefined)
    {
      gameCanvasContext.fillStyle = 'red';
      gameCanvasContext.fillRect(this.laserShot.x,this.laserShot.y, this.laserShot.width,this.laserShot.height);
    }
  }

  this.move = function()
  {
    if (inputManager.leftArrowIsBeingHeld === true)
    {
      this.x -= 5;
      this.ghostGunX -=5;
    }
    if (inputManager.rightArrowIsBeingHeld === true)
    {
      this.x += 5;
      this.ghostGunX += 5;
    }
  }
}
