function Room(image,y)
{
  this.image = image;
  this.y = y;

  this.width = gameCanvas.width*0.2;
  this.height = gameCanvas.height*0.2;

  this.x = gameCanvas.width - this.width;

  this.hasADoor = true;
  this.draw = function()
  {
    gameCanvasContext.drawImage(this.image, this.x,this.y, this.width,this.height);
    if (this.hasADoor)
    {
      gameCanvasContext.drawImage(doorImage, this.x,this.y, this.width,this.height);
    }
  }

  this.handlePlayerCollision = function()
  {
    let playerCharacter = gameClassManager.currentGame.playerCharacter;
    if (playerCharacter.y + playerCharacter.height > this.y && playerCharacter.y < this.y + 10 &&
        playerCharacter.x > this.x && playerCharacter.x + playerCharacter.width < this.x + this.width &&
        playerCharacter.numberOfKeys > 0)
        {
          this.hasADoor = false;
          playerCharacter.numberOfKeys--;
        }
        else if (playerCharacter.y + playerCharacter.height > this.y && playerCharacter.y < this.y + 10 &&
            playerCharacter.x > this.x && playerCharacter.x + playerCharacter.width < this.x + this.width &&
            playerCharacter.numberOfKeys <= 0)
            {
              playerCharacter.x = playerCharacter.previousX;
              playerCharacter.y = playerCharacter.previousY;
            }
        else if (playerCharacter.previousX < this.x &&
          (playerCharacter.y + playerCharacter.height > gameCanvas.height*0.2 || playerCharacter.y < gameCanvas.height*0.2 + gameCanvas.height*0.2 + gameCanvas.height*0.2) )
        {
          if (playerCharacter.x + playerCharacter.width > this.x)
          {
            playerCharacter.x = playerCharacter.previousX;
          }
        }
      else if (playerCharacter.previousY > this.y + this.height)
      {
        if (playerCharacter.y < this.y + this.height)
        {
          playerCharacter.y = playerCharacter.previousY;
        }
      }
  }
}
