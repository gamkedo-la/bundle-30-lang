function Room(image,y)
{
  this.image = image;
  this.y = y;

  this.width = gameCanvas.width*0.2;
  this.height = gameCanvas.height*0.2;

  this.x = gameCanvas.width - this.width;

  this.leftWallX = this.x;
  this.leftWallTopY = this.y;
  this.leftWallBottomY = this.y + this.height;
  this.wallWidth = 10;
  this.bottomWallLeftX = this.x;
  this.bottomWallRightX = this.x + this.width;
  this.bottomWallY = this.y + this.height;
  this.rightWallX = this.x + this.width;
  this.rightWallTopY = this.y;
  this.rightWallBottomY = this.y + this.height;
  this.doorLeftX = this.x + 10;
  this.doorRightX = this.x + this.width - 10;
  this.doorY = this.y;

  this.hasADoor = true;
  this.draw = function()
  {
    drawFromSheet(this.image, this.x,this.y, this.width,this.height);
    //gameCanvasContext.drawImage(this.image, this.x,this.y, this.width,this.height);
    if (this.hasADoor)
    {
      drawFromSheet('images\\sprites\\Finder\\door.png', this.x,this.y, this.width,this.height)
      //gameCanvasContext.drawImage(doorImage, this.x,this.y, this.width,this.height);
    }
  }

  this.handlePlayerCollision = function()
  {
    let playerCharacter = gameClassManager.currentGame.playerCharacter;

    if (playerCharacter.previousX < this.leftWallX &&
        playerCharacter.y + playerCharacter.height > this.leftWallTopY &&
        playerCharacter.y < this.leftWallBottomY)
    {
      if (playerCharacter.x + playerCharacter.width > this.leftWallX)
      {
        console.log('left wall collision');
        playerCharacter.x = playerCharacter.previousX;
      }
    }

    if (playerCharacter.previousX > this.leftWallX + 10 &&
        playerCharacter.y + playerCharacter.height > this.leftWallTopY &&
        playerCharacter.y < this.leftWallBottomY)
    {
      if (playerCharacter.x <= this.leftWallX + 10)
      {
        playerCharacter.x = playerCharacter.previousX;
      }
    }

    if (playerCharacter.previousX < this.rightWallX &&
        playerCharacter.y + playerCharacter.height > this.rightWallTopY &&
        playerCharacter.y < this.rightWallBottomY)
    {
      if (playerCharacter.x + playerCharacter.width > this.rightWallX)
      {
        playerCharacter.x = playerCharacter.previousX;
      }
    }

    if (playerCharacter.previousY > 557 &&
        playerCharacter.x + playerCharacter.width > this.bottomWallLeftX &&
        playerCharacter.x < this.bottomWallRightX)
    {
      if (playerCharacter.y <= 557)
      {
        playerCharacter.y = playerCharacter.previousY;
      }
    }

    if (playerCharacter.previousY < 547 &&
        playerCharacter.x + playerCharacter.width > this.bottomWallLeftX &&
        playerCharacter.x < this.bottomWallRightX)
    {
      if (playerCharacter.y >= 547)
      {
        playerCharacter.y = playerCharacter.previousY;
      }
    }

    if (playerCharacter.previousY + playerCharacter.height < this.doorY &&
        playerCharacter.x + playerCharacter.width > this.doorLeftX &&
        playerCharacter.x < this.doorRightX)
    {

      if (playerCharacter.y + playerCharacter.height >= this.doorY)
      {
        console.log('door collision detected');
        if (!this.hasADoor)
        {
          console.log('no door here');
          return;
        }
        else if (this.hasADoor)
        {
          console.log('there is a door');
          if (playerCharacter.numberOfKeys < 1)
          {
            console.log('no key, should not enter room');
            playerCharacter.y = playerCharacter.previousY;
          }
          else if (playerCharacter.numberOfKeys > 0)
          {
            console.log('player has a key, should make the door disappear and room enterable');
            this.hasADoor = false;
            playerCharacter.numberOfKeys -= 1;
            console.log('playerCharacter.numberOfKeys: ' + playerCharacter.numberOfKeys);
          }
        }
      }
    }
  }
}
