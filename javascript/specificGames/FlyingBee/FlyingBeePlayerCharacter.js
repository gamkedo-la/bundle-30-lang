function FlyingBeePlayerCharacter()
{
  this.image = flyingBeeFacingRightImage;

  this.width = gameCanvas.width*0.15;
  this.height = gameCanvas.height*0.1;

  this.x = gameCanvas.width/2 - this.width/2;
  this.y = gameCanvas.height/2 - this.height/2;

  this.draw = function()
  {
    if (inputManager.leftArrowIsBeingHeld && !inputManager.upArrowIsBeingHeld &&
        !inputManager.downArrowIsBeingHeld)//flying left
        {
          this.image = flyingBeeFacingLeftImage;
        }
    else if (inputManager.leftArrowIsBeingHeld && inputManager.upArrowIsBeingHeld &&
        !inputManager.downArrowIsBeingHeld)//flying up left up
        {
          this.image = flyingBeeFacingLeftUpImage;
        }
    else if (inputManager.leftArrowIsBeingHeld && !inputManager.upArrowIsBeingHeld &&
             inputManager.downArrowIsBeingHeld)//flying right
             {
               this.image = flyingBeeFacingLeftDownImage;
             }
    else if (inputManager.rightArrowIsBeingHeld && inputManager.upArrowIsBeingHeld &&
             !inputManager.downArrowIsBeingHeld)//flying right up
             {
               this.image = flyingBeeFacingRightUpImage;
             }
    else if (inputManager.rightArrowIsBeingHeld && !inputManager.upArrowIsBeingHeld &&
             inputManager.downArrowIsBeingHeld)// flying right down
             {
               this.image = flyingBeeFacingRightDownImage;
             }
    else if (inputManager.upArrowIsBeingHeld && !inputManager.rightArrowIsBeingHeld &&
             !inputManager.leftArrowIsBeingHeld)// flying up
             {
               this.image = flyingBeeFacingUpImage;
             }
    else if (inputManager.downArrowIsBeingHeld && !inputManager.rightArrowIsBeingHeld &&
             !inputManager.leftArrowIsBeingHeld)// flying down
             {
               this.image = flyingBeeFacingDownImage;
             }
    else
    {
      this.image = flyingBeeFacingRightImage;
    }
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
