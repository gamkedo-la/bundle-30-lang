function FlyingBeePlayerCharacter()
{
  this.image = 'images/sprites/Flying Bee/Simple Bee Facing Right.png';

  this.width = gameCanvas.width*0.15;
  this.height = gameCanvas.height*0.1;

  this.x = gameCanvas.width/2 - this.width/2;
  this.y = gameCanvas.height/2 - this.height/2;

  this.draw = function()
  {
    if (inputManager.leftArrowIsBeingHeld && !inputManager.upArrowIsBeingHeld &&
        !inputManager.downArrowIsBeingHeld)//flying left
        {
          this.image = 'images\\sprites\\Flying Bee\\Simple Bee Facing Left.png';
        }
    else if (inputManager.leftArrowIsBeingHeld && inputManager.upArrowIsBeingHeld &&
        !inputManager.downArrowIsBeingHeld)//flying up left up
        {
          this.image = 'images\\sprites\\Flying Bee\\Simple Bee Facing UpLeft.png';
        }
    else if (inputManager.leftArrowIsBeingHeld && !inputManager.upArrowIsBeingHeld &&
             inputManager.downArrowIsBeingHeld)//flying right
             {
               this.image = 'images\\sprites\\Flying Bee\\Simple Bee Facing DownLeft.png';
             }
    else if (inputManager.rightArrowIsBeingHeld && inputManager.upArrowIsBeingHeld &&
             !inputManager.downArrowIsBeingHeld)//flying right up
             {
               this.image = 'images\\sprites\\Flying Bee\\Simple Bee Facing UpRight.png';
             }
    else if (inputManager.rightArrowIsBeingHeld && !inputManager.upArrowIsBeingHeld &&
             inputManager.downArrowIsBeingHeld)// flying right down
             {
               this.image = 'images\\sprites\\Flying Bee\\Simple Bee Facing DownRight.png';
             }
    else if (inputManager.upArrowIsBeingHeld && !inputManager.rightArrowIsBeingHeld &&
             !inputManager.leftArrowIsBeingHeld)// flying up
             {
               this.image = 'images\\sprites\\Flying Bee\\Simple Bee Facing Up.png';
             }
    else if (inputManager.downArrowIsBeingHeld && !inputManager.rightArrowIsBeingHeld &&
             !inputManager.leftArrowIsBeingHeld)// flying down
             {
               this.image = 'images\\sprites\\Flying Bee\\Simple Bee Facing Down.png';
             }
    else
    {
      this.image = 'images\\sprites\\Flying Bee\\Simple Bee Facing Right.png';
    }
      drawFromSheet(this.image, this.x,this.y, this.width,this.height);
      //gameCanvasContext.drawImage(this.image, this.x,this.y, this.width,this.height);
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
