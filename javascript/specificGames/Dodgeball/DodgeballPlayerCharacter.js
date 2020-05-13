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
    this.centerY = this.x + this.height/2;
  }

  this.draw = function()
  {
    gameCanvasContext.drawImage(this.image, this.x,this.y, this.width,this.height);
  }

  this.velocity = 6;

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
