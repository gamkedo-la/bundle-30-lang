function FireLavaParticle(x,y, xVelocity,yVelocity, image)
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
    gameCanvasContext.drawImage(this.image, this.x,this.y, this.width,this.height);
  }
}
