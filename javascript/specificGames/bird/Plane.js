function Plane()
{
  this.image = planeImage;
  this.width = gameCanvas.width/2;
  this.height = gameCanvas.height/10;
  this.x = getRandomArbitrary(0,gameCanvas.width - this.width);
  this.y = getRandomArbitrary(0,gameCanvas.height - this.height);

  this.xVelocity = -3;
  this.yVelocity = 1;

  this.bannerMessageCharacters = ['G','o','o','d',' ','J','o','b','!'];

  this.draw = function()
  {
    gameCanvasContext.drawImage(this.image, this.x,this.y, this.width,this.height);

    let arrayOfCharacterTypes = [];
    for (let bannerMessageIndex = 0; bannerMessageIndex < gameClassManager.currentGame.amountCorrect; bannerMessageIndex++)
             {
               arrayOfCharacterTypes.push(this.bannerMessageCharacters[bannerMessageIndex])
             }
             customFontFillText(arrayOfCharacterTypes, 30, 15, this.x + this.width/2 + 17,this.y + 10);


    // customFontFillText(this.bannerMessageCharacters, 30,15, this.x + this.width/2 + 17,this.y + 10);
  }

  this.targetY = getRandomArbitrary(0,gameCanvas.height - this.height);

  this.move = function()
  {
    this.x += this.xVelocity;

    if (this.y < this.targetY)
    {
      this.y += this.yVelocity;
      if (this.y >= this.targetY)
      {
        this.targetY = getRandomArbitrary(0,gameCanvas.height - this.height);
      }
    }
    else if (this.y > this.targetY)
    {
      this.y -= this.yVelocity;
      if (this.y <= this.targetY)
      {
        this.targetY = getRandomArbitrary(0,gameCanvas.height - this.height);
      }
    }
  }

  this.handleOffScreen = function()
  {
    if (this.x + this.width < 0)
    {
      this.x = gameCanvas.width;
    }
  }
}
