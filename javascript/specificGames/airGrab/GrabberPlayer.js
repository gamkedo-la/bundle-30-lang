function GrabberPlayer()
{

  this.armlessBodyImage = armlessBodyImage;
  this.rightArmImage = rightArmImage;
  this.leftArmImage = leftArmImage;

  this.leftArmX = undefined;
  this.leftArmY = undefined;
  this.leftArmWidth = gameCanvas.width/35;
  this.leftArmHeight = gameCanvas.height/7;
  this.leftArmAngle = 90;
  this.leftArmPivotX = undefined;
  this.leftArmPivotY = undefined;


  this.rightArmX = undefined;
  this.rightArmY = undefined;
  this.rightArmAngle = 90;
  this.rightArmWidth = gameCanvas.width/35;
  this.rightArmHeight = gameCanvas.height/7;
  this.rightArmPivotX = undefined;
  this.rightArmPivotY = undefined;


  this.bodyWidth = gameCanvas.width/3;
  this.bodyHeight = gameCanvas.width/2;

  this.initialize = function()
  {
    this.leftArmX = gameCanvas.width/2;
    this.leftArmY = gameCanvas.height*(5/7);
    this.rightArmX = gameCanvas.width/2;
    this.rightArmY = gameCanvas.height*(5/7);

    this.leftArmPivotX = this.leftArmX + this.leftArmWidth;
    this.leftArmPivotY = this.leftArmY + this.leftArmHeight;
    this.rightArmPivotX = this.rightArmX - this.rightArmWidth;
    this.rightArmPivotY = this.rightArmY + this.rightArmHeight;
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
    gameCanvasContext.drawImage(this.leftArmImage, this.leftArmX,600, this.leftArmWidth,this.leftArmHeight);//normal draw code affected by rotation
    gameCanvasContext.restore();//erase any errant abnormal draw code

    this.calculateRightArmAngle();
    gameCanvasContext.save();//save context so we can do weird stuff and go back to normal drawing afterwards
    gameCanvasContext.translate(this.rightArmPivotX,this.rightArmPivotY);//place imaginary hand at pivot point
    gameCanvasContext.rotate(this.rightArmAngle + Math.PI/2);//rotate with hand at pivot based in radians
    gameCanvasContext.translate(-this.rightArmPivotX,-this.rightArmPivotY);//return hand to 0,0 of canvas
    gameCanvasContext.drawImage(this.rightArmImage, this.rightArmX,600, this.rightArmWidth,this.rightArmHeight);//normal draw code affected by rotation
    gameCanvasContext.restore();//erase any errant abnormal draw code
  }

  this.calculateLeftArmAngle = function()
  {
    if (inputManager.mouseCoordinates.x > gameCanvas.width/2)//stop the arm from going past the mid angle point for aesthetic reasons
    {
      this.leftArmAngle = -2;
    } else
    {
      this.leftArmAngle = Math.atan2(inputManager.mouseCoordinates.y - this.leftArmPivotY, inputManager.mouseCoordinates.x - gameCanvas.width/2);
    }
  }

  this.calculateRightArmAngle = function()
  {
    if (inputManager.mouseCoordinates.x < gameCanvas.width/2)//stop the arm from going past the mid angle point for aesthetic reasons
    {
      this.rightArmAngle = -1;
    } else
    {
      this.rightArmAngle = Math.atan2(inputManager.mouseCoordinates.y - this.rightArmPivotY, inputManager.mouseCoordinates.x - gameCanvas.width/2)
    }
  }
}
