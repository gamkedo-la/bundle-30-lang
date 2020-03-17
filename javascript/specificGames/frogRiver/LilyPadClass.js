function LilyPadClass()
{
  this.xCoordinate = Math.floor(Math.random()*640);
  this.yCoordinate = undefined;

  this.image = undefined;
  this.answer = undefined;

  this.width = 100;
  this.height = 75;

  this.speed = 2;

  this.color = 'Chartreuse';

  this.direction = undefined;

  this.draw = function()
  {
    gameCanvasContext.drawImage(this.image, this.xCoordinate,this.yCoordinate, this.width,this.height);
  }

  this.move = function()
  {
    this.xCoordinate += this.speed*this.direction;
  }

  this.handleOffScreen = function()
  {
    if (this.xCoordinate > 690)
    {
      {
        this.xCoordinate = -50;
      }
    }
    if (this.xCoordinate < -50)
    {
      this.xCoordinate = 690;
    }
  }
}