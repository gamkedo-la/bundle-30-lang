function FinderPlayerCharacter()
{
  this.image = "images\\sprites\\dodgeBall\\Player2.png";

  this.width = gameCanvas.width*0.1;
  this.height = gameCanvas.height*0.15;

  this.startingX = gameCanvas.width/2 - this.width/2;
  this.startingY = gameCanvas.height/2 - this.height/2;

  this.x = this.startingX;
  this.y = this.startingY;

  this.previousX = undefined;
  this.previousY = undefined;

  this.numberOfKeys = 0;

  this.draw = function()
  {
    drawFromSheet(this.image, this.x,this.y, this.width,this.height);
    //gameCanvasContext.drawImage(this.image, this.x,this.y, this.width,this.height);
  }

  this.move = function()
  {
    this.previousX = this.x;
    this.previousY = this.y;
    if (inputManager.leftArrowIsBeingHeld === true)
    {
      this.x -= 5;
    }
    if (inputManager.upArrowIsBeingHeld === true)
    {
      this.y -= 5;
    }
    if (inputManager.rightArrowIsBeingHeld === true)
    {
      this.x += 5;
    }
    if (inputManager.downArrowIsBeingHeld === true)
    {
      this.y += 5;
    }
  }

  this.handleTrophyCollision = function()
  {
    let trophy = gameClassManager.currentGame.trophy;
    let bottomRoom = gameClassManager.currentGame.bottomRoom;
    let middleRoom = gameClassManager.currentGame.middleRoom;
    let topRoom = gameClassManager.currentGame.topRoom;

    if (this.x + this.width > trophy.x && this.x < trophy.x + trophy.width &&
        this.y + this.height > trophy.y && this.y < trophy.y + trophy.height)
        {
          this.x = this.startingX;
          this.y = this.startingY;
          this.numberOfKeys = 0;
          bottomRoom.hasADoor = true;
          middleRoom.hasADoor = true;
          topRoom.hasADoor = true;
        }
  }
}
