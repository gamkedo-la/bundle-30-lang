function DodgeballPlayerCharacter()
{
  this.image = russianDollImage1;

  this.width = gameCanvas.width/12;
  this.height = gameCanvas.height/10;

  this.x = gameCanvas.width/2 - this.width/2;
  this.y = gameCanvas.height/2 - this.height/2;

  this.centerX = this.x + this.width/2;
  this.centerY = this.x + this.height/2;

  this.updateCenterCoordinates = function()
  {
    this.centerX = this.x + this.width/2;
    this.centerY = this.y + this.height/2;
  }

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

  this.velocity = 7;

  this.weebleWobbleRate = 2.5;
  this.updateAngle = function()
  {
    this.angle += this.weebleWobbleRate;
    if (this.angle > 14 || this.angle < -14)
    {
      this.weebleWobbleRate *= -1;
    }
  }

  this.updatePivotsForWeebleWobble = function()
  {
    this.pivotX = this.x + this.width/2;
    this.pivotY = this.y + this.height*0.9;
  }

  this.move = function()
	{
		//console.log('inside space shooter movePlayer');
		if (inputManager.upArrowIsBeingHeld)
		{
			gameClassManager.currentGame.playerCharacter.y -= this.velocity;
		}
		if (inputManager.rightArrowIsBeingHeld)
		{
			gameClassManager.currentGame.playerCharacter.x += this.velocity;
		}
		if (inputManager.downArrowIsBeingHeld)
		{
			gameClassManager.currentGame.playerCharacter.y += this.velocity;
		}
		if (inputManager.leftArrowIsBeingHeld)
		{
			gameClassManager.currentGame.playerCharacter.x -= this.velocity;
		}
		// this.handleShipAtCanvasBoundaries();
	};
}
