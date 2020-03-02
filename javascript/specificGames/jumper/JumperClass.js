function JumperClass()
{
  this.RIGHT_ARROW_DOWN_SPEED = 3;
  this.LEFT_ARROW_DOWN_SPEED = -3;
  this.JUMP_SPEED = 7;
  this.LEFT_OR_RIGHT_ARROW_UP_SPEED = 0;
  this.xSpeed = 0;
  this.x = Math.random() * gameCanvas.width;
  console.log('this.x: ' + this.x);
  this.y = (Math.floor(Math.random() * 7) * 100) + 30;
  console.log('this.y: ' + this.y);

  this.width = 20;
  this.height = 20;

  this.draw = function()
  {
  	gameCanvasContext.fillStyle = 'white';
  	gameCanvasContext.fillRect(this.x,this.y, this.width,this.height);
  };

  this.jump = function()
  {
	   this.y -= 5;
  }
}
