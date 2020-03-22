function GrabberPlayer()
{

  this.armlessBodyImage = armlessBodyImage;
  this.rightArmImage = rightArmImage;
  this.leftArmImage = leftArmImage;

  this.leftArmX = undefined;
  this.leftArmY = 0;
  this.leftArmAngle = 90;
  this.leftArmPivotX = 326;
  this.leftArmPivotY = 550;

  this.rightArmX = undefined;
  this.rightArmY = 0;
  this.rightArmAngle = 0;
  this.rightArmPivotX = 326;
  this.rightArmPivotY = 550;

  this.bodyWidth = gameCanvas.width/3;
  this.bodyHeight = gameCanvas.width/2;

  this.initialize = function()
  {
    this.leftArmX = gameCanvas.width/2;
    this.rightArmX = gameCanvas.width/2;
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
    gameCanvasContext.drawImage(this.leftArmImage, 320,450, 75,160);//normal draw code affected by rotation
    gameCanvasContext.restore();//erase any errant abnormal draw code

    this.calculateRightArmAngle();
    gameCanvasContext.save();//save context so we can do weird stuff and go back to normal drawing afterwards
    gameCanvasContext.translate(this.rightArmPivotX,this.rightArmPivotY);//place imaginary hand at pivot point
    gameCanvasContext.rotate(this.rightArmAngle + Math.PI/2);//rotate with hand at pivot based in radians
    gameCanvasContext.translate(-this.rightArmPivotX,-this.rightArmPivotY);//return hand to 0,0 of canvas
    gameCanvasContext.drawImage(this.rightArmImage, 320,450, 75,160);//normal draw code affected by rotation
    gameCanvasContext.restore();//erase any errant abnormal draw code
  }

  this.calculateLeftArmAngle = function()
  {
    if (inputManager.mouseCoordinates.mouseX > 326)//stop the arm from going past the mid angle point for aesthetic reasons
    {
      leftArmAngle = -2;
    } else
    {
      leftArmAngle = Math.atan2(inputManager.mouseCoordinates.mouseY - 550, inputManager.mouseCoordinates.mouseX - 326);
    }
  }

  this.calculateRightArmAngle = function()
  {
    if (inputManager.mouseCoordinates.mouseX < 326)//stop the arm from going past the mid angle point for aesthetic reasons
    {
      this.rightArmAngle = -1;
    } else
    {
      this.rightArmAngle = Math.atan2(inputManager.mouseCoordinates.mouseY - 550, inputManager.mouseCoordinates.mouseX - 326)
    }
  }
}
