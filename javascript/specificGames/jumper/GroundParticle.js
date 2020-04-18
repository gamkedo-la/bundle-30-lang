function GroundParticle(x,y, xVelocity,yVelocity, image)
{
  this.x = x;
  this.y = y;
  this.xVelocity = xVelocity;
  this.yVelocity = yVelocity;

  this.image = image;

  this.move = function()
  {
    this.x += this.xVelocity;
    this.y += this.yVelocity;
  }
}
