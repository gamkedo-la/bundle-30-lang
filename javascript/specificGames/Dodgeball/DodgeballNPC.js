function DodgeballNPC(image, x,y)
{
  this.image = image;

  this.width = gameCanvas.width/12;
  this.height = gameCanvas.height/10;

  this.x = x;
  this.y = y;

  this.pivotX = this.x + this.width/2;
  this.pivotY = this.y + this.height*0.9;

  this.angle = getRandomIntInclusive(-10,10);

  this.draw = function()
  {
    let angleInRadians = this.angle * 0.01745;

    gameCanvasContext.save();
    gameCanvasContext.translate(this.pivotX,this.pivotY);
    gameCanvasContext.rotate(angleInRadians);
    gameCanvasContext.translate(-this.pivotX,-this.pivotY);
    gameCanvasContext.drawImage(this.image, this.x,this.y, this.width,this.height);
    gameCanvasContext.restore();
  }

  this.weebleWobbleRate = 2.5;
  this.updateAngle = function()
  {
    this.angle += this.weebleWobbleRate;
    if (this.angle > 14 || this.angle < -14)
    {
      this.weebleWobbleRate *= -1;
    }
  }

  this.dodgeball = undefined;
}
