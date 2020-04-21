function GrabberPlayer()
{

  this.armlessBodyImage = armlessBodyImage;
  this.rightArmImage = rightArmImage;
  this.leftArmImage = leftArmImage;

  this.leftArmX = undefined;
  this.leftArmY = undefined;
  this.leftArmWidth = gameCanvas.width/20;
  this.leftArmHeight = gameCanvas.height/5;
  this.leftArmAngle = 90;
  this.leftArmPivotX = undefined;
  this.leftArmPivotY = undefined;


  this.rightArmX = undefined;
  this.rightArmY = undefined;
  this.rightArmAngle = 90;
  this.rightArmWidth = gameCanvas.width/20;
  this.rightArmHeight = gameCanvas.height/5;
  this.rightArmPivotX = undefined;
  this.rightArmPivotY = undefined;


  this.bodyWidth = gameCanvas.width/5;
  this.bodyHeight = gameCanvas.width/3;

  this.shoulderY = 545;

  this.initialize = function()
  {
    this.leftArmX = gameCanvas.width/2 - this.bodyWidth/2;
    this.leftArmY = this.shoulderY - this.leftArmHeight;
    this.rightArmX = gameCanvas.width/2 + this.bodyWidth/2 - this.rightArmWidth;
    this.rightArmY = this.shoulderY - this.rightArmHeight;

    this.leftArmPivotX = this.leftArmX + this.leftArmWidth/2;
    this.leftArmPivotY = this.shoulderY;
    this.rightArmPivotX = this.rightArmX + this.rightArmWidth/2;
    this.rightArmPivotY = this.shoulderY;
  }

  this.draw = function()
  {
    gameCanvasContext.drawImage(this.armlessBodyImage, gameCanvas.width/2 - this.bodyWidth/2,
                                gameCanvas.height - this.bodyHeight - gameCanvas.width*0.0225,
                                this.bodyWidth,this.bodyHeight);

    this.calculateLeftArmAngle();
    gameCanvasContext.save();//save context so we can do weird stuff and go back to normal drawing afterwards
    gameCanvasContext.translate(this.leftArmPivotX,this.leftArmPivotY);//place imaginary hand at pivot point
    gameCanvasContext.rotate(this.leftArmAngle + Math.PI/2);//rotate with hand at pivot based in radians
    gameCanvasContext.translate(-this.leftArmPivotX,-this.leftArmPivotY);//return hand to 0,0 of canvas
    gameCanvasContext.drawImage(this.leftArmImage, this.leftArmX,this.leftArmY, this.leftArmWidth,this.leftArmHeight);//normal draw code affected by rotation
    gameCanvasContext.restore();//erase any errant abnormal draw code

    this.calculateRightArmAngle();
    gameCanvasContext.save();//save context so we can do weird stuff and go back to normal drawing afterwards
    gameCanvasContext.translate(this.rightArmPivotX,this.rightArmPivotY);//place imaginary hand at pivot point
    gameCanvasContext.rotate(this.rightArmAngle + Math.PI/2);//rotate with hand at pivot based in radians
    gameCanvasContext.translate(-this.rightArmPivotX,-this.rightArmPivotY);//return hand to 0,0 of canvas
    gameCanvasContext.drawImage(this.rightArmImage, this.rightArmX,this.rightArmY, this.rightArmWidth,this.rightArmHeight);//normal draw code affected by rotation
    gameCanvasContext.restore();//erase any errant abnormal draw code
  }

  this.calculateLeftArmAngle = function()
  {
      this.leftArmAngle = Math.atan2(inputManager.mouseCoordinates.y - this.shoulderY,
                                     inputManager.mouseCoordinates.x - this.leftArmPivotX);
  }

  this.calculateRightArmAngle = function()
  {
      this.rightArmAngle = Math.atan2(inputManager.mouseCoordinates.y - this.shoulderY,
                                      inputManager.mouseCoordinates.x - this.rightArmPivotX);
  }

  this.handleClick = function()
  {
    this.leftArmY = inputManager.mouseCoordinates.y;
    this.rightArmY = inputManager.mouseCoordinates.y;
    this.leftArmPythagoreanALength = Math.abs(this.shoulderY - this.leftArmY);
    this.rightArmPythagoreanALength = Math.abs(this.shoulderY - this.rightArmY);
    this.leftArmPythagoreanBLength = Math.abs(inputManager.mouseCoordinates.x - this.leftArmPivotX);
    this.rightArmPythagoreanBLength = Math.abs(inputManager.mouseCoordinates.x - this.rightArmPivotX);
    this.leftArmHeight = Math.sqrt( (this.leftArmPythagoreanALength*this.leftArmPythagoreanALength) +
                                    (this.leftArmPythagoreanBLength*this.leftArmPythagoreanBLength) );

    this.rightArmHeight = Math.sqrt( (this.rightArmPythagoreanALength*this.rightArmPythagoreanALength) +
                                     (this.rightArmPythagoreanBLength*this.rightArmPythagoreanBLength) );
    this.leftArmY = this.shoulderY - this.leftArmHeight;
    this.rightArmY = this.shoulderY - this.rightArmHeight;
    setTimeout(resetArmSettings, 500);
  }
}

function resetArmSettings()
{
  let airGuy = gameClassManager.currentGame.playerCharacter;
  airGuy.leftArmHeight = gameCanvas.height/5;
  airGuy.rightArmHeight = gameCanvas.height/5;
  airGuy.leftArmY = airGuy.shoulderY - airGuy.leftArmHeight;
  airGuy.rightArmY = airGuy.shoulderY - airGuy.rightArmHeight;
  airGuy.leftArmX = gameCanvas.width/2 - airGuy.bodyWidth/2;
  airGuy.rightArmX = gameCanvas.width/2 + airGuy.bodyWidth/2 - airGuy.rightArmWidth;
}
