function Spaceship()
{
  this.width = undefined;
	this.height = undefined;

  this.x = 100;
  this.y = 100;

  this.initialize = function()
  {
    this.width = gameCanvas.width/10;
    this.height = gameCanvas.height/10;
  }

  this.draw = function()
	{
		gameCanvasContext.drawImage(spaceshipImage, this.x,this.y, this.width,this.height);
	};

  this.move = function()
	{
		//console.log('inside space shooter movePlayer');
		if (inputManager.upArrowIsBeingHeld)
		{
			gameClassManager.currentGame.playerCharacter.y -= spaceShooterPlayerSpeed;
		}
		if (inputManager.rightArrowIsBeingHeld)
		{
			gameClassManager.currentGame.playerCharacter.x += spaceShooterPlayerSpeed;
		}
		if (inputManager.downArrowIsBeingHeld)
		{
			gameClassManager.currentGame.playerCharacter.y += spaceShooterPlayerSpeed;
		}
		if (inputManager.leftArrowIsBeingHeld)
		{
			gameClassManager.currentGame.playerCharacter.x -= spaceShooterPlayerSpeed;
		}
		this.handleShipAtCanvasBoundaries();
	};

	this.handleShipAtCanvasBoundaries = function()
	{
			if (gameClassManager.currentGame.playerCharacter.x + this.playerCharacterWidth >= gameCanvas.width)
			{
				gameClassManager.currentGame.playerCharacter.x = gameCanvas.width - this.playerCharacterHeight;
			}
			if (gameClassManager.currentGame.playerCharacter.x <= 0)
			{
				gameClassManager.currentGame.playerCharacter.x = 0;
			}
			if (gameClassManager.currentGame.playerCharacter.y + this.playerCharacterHeight >= gameCanvas.height)
			{
				gameClassManager.currentGame.playerCharacter.y = gameCanvas.height - this.playerCharacterHeight;
			}
			if (gameClassManager.currentGame.playerCharacter.y <= 0)
			{
				gameClassManager.currentGame.playerCharacter.y = 0
			}
	}
}
