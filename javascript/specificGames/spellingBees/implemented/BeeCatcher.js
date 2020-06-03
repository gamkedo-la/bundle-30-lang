function BeeCatcher()
{
  this.width = gameCanvas.width*0.1;
  this.height = gameCanvas.height*0.1;

  this.x = gameCanvas.width/2 - this.width/2;
  this.y = gameCanvas.height/2 - this.height/2;

  this.image = russianDollImage2;

  this.draw = function()
  {
    gameCanvasContext.drawImage(this.image, this.x,this.y, this.width,this.height);
  }

  this.velocity = 7;
  this.move = function()
  {
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
  }
}
