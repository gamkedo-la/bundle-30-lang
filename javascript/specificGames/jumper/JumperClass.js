function JumperClass()
{
  this.RIGHT_ARROW_DOWN_SPEED = 3;
  this.LEFT_ARROW_DOWN_SPEED = -3;
  this.JUMP_SPEED = 7;
  this.LEFT_OR_RIGHT_ARROW_UP_SPEED = 0;
  this.xSpeed = 0;
  this.x = Math.random() * gameCanvas.width;
  this.y = (Math.floor(Math.random() * 7) * 100) + 20;

  this.width = 60;
  this.height = 60;

  this.rotationAmount = 0;


  this.facingRightImage = jumperPlayerFacingRightImage;
  this.facingLeftImage = jumperPlayerFacingLeftImage;
  this.currentImage = this.facingRightImage;

  this.draw = function()
  {
    let currentCenterX = this.x + this.width/2;
    let currentCenterY = this.y + this.height/2;

    gameCanvasContext.save();//save context so we can do weird stuff and go back to normal drawing afterwards
    gameCanvasContext.translate(currentCenterX,currentCenterY);//place imaginary hand at pivot point
    gameCanvasContext.rotate(this.rotationAmount + Math.PI/2);//rotate with hand at pivot based in radians
    gameCanvasContext.translate(-currentCenterX,-currentCenterY);//return hand to 0,0 of canvas
    gameCanvasContext.drawImage(this.currentImage, this.x,this.y, this.width,this.height);
    gameCanvasContext.restore();//erase any errant abnormal draw code

  	// gameCanvasContext.fillStyle = 'white';
  	// gameCanvasContext.fillRect(this.x,this.y, this.width,this.height);
  };

  this.jump = function()
  {
	   this.y -= 5;
  }
}
