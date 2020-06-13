function Bee(letter)
{
  this.x = undefined;
  this.y = undefined;

  this.width = 100;
  this.height = 100;

  this.image = 'images\\sprites\\SpellingBees\\Simple Bee Without Stripes.png';

  this.letter = letter;
  this.letterColor = 'black';

  this.xDirection = undefined;
  this.yDirection = undefined;

  this.velocity = 5;

  this.shouldBeMoving = true;
  this.initialize = function()
  {
    let leftBoxX = gameClassManager.currentGame.background.playingFieldLeftXBoundary;
    let rightBoxX = gameClassManager.currentGame.background.playingFieldRightXBoundary
    let topBoxY = gameClassManager.currentGame.background.playingFieldTopYBoundary;
    let bottomBoxY = gameClassManager.currentGame.background.playingFieldBottomYBoundary;

    this.x = getRandomIntInclusive(leftBoxX,rightBoxX - this.width);
    this.y = getRandomIntInclusive(topBoxY,bottomBoxY - this.height);

    //move away from player at the start of prompt
    let player = gameClassManager.currentGame.playerCharacter;
    if (player.x > this.x)
    {
      this.xDirection = -1;
    }
    else
    {
      this.xDirection = 1;
    }

    if (player.y > this.y)
    {
      this.yDirection = -1;
    }
    else
    {
      this.yDirection = 1;
    }
  }

  this.update = function()
  {
    this.move();
    this.checkForBoxCollisions();
  }

  this.checkForBoxCollisions = function()
  {
    let leftBoxX = gameClassManager.currentGame.background.playingFieldLeftXBoundary;
    let rightBoxX = gameClassManager.currentGame.background.playingFieldRightXBoundary
    let topBoxY = gameClassManager.currentGame.background.playingFieldTopYBoundary;
    let bottomBoxY = gameClassManager.currentGame.background.playingFieldBottomYBoundary;

    if (this.x + this.width > rightBoxX || this.x < leftBoxX)
    {
      this.xDirection *= -1;
    }

    if (this.y + this.height > bottomBoxY || this.y < topBoxY)
    {
      this.yDirection *= - 1;
    }
  }

  this.move = function()
  {
    if (this.shouldBeMoving === true)
    {
      this.x += this.velocity*this.xDirection;
      this.y += this.velocity*this.yDirection;
    }
  }

  this.draw = function()
  {
    drawFromSheet(this.image, this.x,this.y, this.width,this.height);
    //gameCanvasContext.drawImage(this.image, this.x,this.y, this.width,this.height);
    gameCanvasContext.fillStyle = this.letterColor;
    gameCanvasContext.font = '30px Helvetica';
    gameCanvasContext.fillText(this.letter, this.x + this.width/2 -10, this.y + this.height/2 + 10);
  }
}
