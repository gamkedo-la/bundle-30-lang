function FlyingBeePlayerCharacter()
{
  this.image = flyingBeePlayerCharacterImage;

  this.width = gameCanvas.width*0.15;
  this.height = gameCanvas.height*0.1;

  this.x = getRandomIntInclusive(0,gameCanvas.width - this.width);
  this.y = getRandomIntInclusive(0,gameCanvas.height - this.height);

  this.draw = function()
  {
    gameCanvasContext.drawImage(this.image, this.x,this.y, this.width,this.height);
  }

  this.velocity = 7;
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
