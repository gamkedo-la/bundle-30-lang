function Paddle()
{
  this.width = 120;
  this.height = 25;
  this.image = 'images\\sprites\\passBlock\\volcanicRock.png';

  this.x = gameCanvas.width/2 - this.width/2;
  this.y = gameCanvas.height - this.height*5;

  this.arrayOfGemImages = ['images\\sprites\\passBlock\\Gem.png','images\\sprites\\passBlock\\Gem2.png','images\\sprites\\passBlock\\Gem3.png'];
  this.arrayOfGems = [];

  this.draw = function()
  {
    drawFromSheet(this.image, this.x,this.y, this.width,this.height);
    //gameCanvasContext.drawImage(paddleRockImage, this.x,this.y, this.width,this.height);
    this.drawGems();
    // gameCanvasContext.fillStyle = 'white';
    // gameCanvasContext.fillRect(this.x,this.y, this.width,this.height);
  }

  this.drawGems = function()
  {
    for (let gemArrayIndex = 0; gemArrayIndex < this.arrayOfGems.length; gemArrayIndex++)
    {
      if (this.arrayOfGems.length > 0)
      {
        this.arrayOfGems[gemArrayIndex].draw();
      }
    }
  }

  this.handleCollisionsWithAnswers = function()
  {
    //TODO: Make game specific collisions with answers code and put it into an abstracted collisions with answers
    //function in the collisionsWithAnswersManager

  }
}

function Gem(image, x,y)
{
  this.image = image;
  this.x = x;
  this.y = y;
  this.width = 25;
  this.height = 30;

  this.draw = function()
  {
    drawFromSheet(this.image, this.x,this.y - this.height + 3, this.width,this.height);
    //gameCanvasContext.drawImage(this.image, this.x,this.y - this.height + 3, this.width,this.height);
  }
}
