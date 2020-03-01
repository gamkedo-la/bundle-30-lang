function BirdClass()
{
  this.name = 'bird player';
  this.x = undefined;
  this.y = undefined;
  const BIRD_STARTING_X = 100;
  const BIRD_STARTING_Y = 100;
  this.width = 20;
  this.height = 20;
  this.xSpeed = undefined;

  this.draw = function()
  {
	  gameCanvasContext.fillStyle = 'lightCoral';
    gameCanvasContext.fillRect(this.x, this.y, this.width,this.height);
  };

  this.initialize = function()
  {
    this.x = BIRD_STARTING_X;
    this.y = BIRD_STARTING_Y;
    this.xSpeed = 0;
  }

  this.flapUp = function()
  {
	   this.y -= 50;
  }

  this.move = function()
  {
    birdGame.applyGRAVITYToBird();
    this.x += this.xSpeed;
  };

  this.handleOffScreen = function()
  {
	   if (this.y > gameCanvas.height - 10)
	{
      this.y = 5;
	}
  else if (this.y < 0)
  {
      this.y = 0;
	}
  else if (this.x > gameCanvas.width - 10)
	{
      this.x = -5;
	}
  else if (this.x < -5)
	{
      this.x = gameCanvas.width - 5;
	}
  };
}