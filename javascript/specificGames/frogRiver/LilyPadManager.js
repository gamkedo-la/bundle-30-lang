function LilyPadManager()
{
  this.arrayOfLilyPads = [];

  this.arrayOfLilyPadImages = [lilyImage1,lilyImage2,lilyImage3,lilyImage4];

  this.initializeLilyPads = function()
  {
    for (let arrayOfLilyPadsIndex = 1; arrayOfLilyPadsIndex < 6; arrayOfLilyPadsIndex++)
    {
      let lilyPad1 = new LilyPadClass();
      lilyPad1.yCoordinate = 60 + arrayOfLilyPadsIndex*90;
      let randomNumber = getRandomIntInclusive(0,this.arrayOfLilyPadImages.length - 1);
      lilyPad1.image = this.arrayOfLilyPadImages[randomNumber];
      let lilyPad2 = new LilyPadClass();
      randomNumber = getRandomIntInclusive(0,this.arrayOfLilyPadImages.length - 1);
      lilyPad2.image = this.arrayOfLilyPadImages[randomNumber];
      lilyPad2.yCoordinate = 60 + arrayOfLilyPadsIndex*90;

      if (arrayOfLilyPadsIndex%2 === 0)
      {
        lilyPad1.direction = 1;//move to the right
        lilyPad2.direction = 1;//move to the right
      } else {
        lilyPad1.direction = -1;//move to the left
        lilyPad2.direction = -1;//move to the left
      }
      this.arrayOfLilyPads.push(lilyPad1);
      this.arrayOfLilyPads.push(lilyPad2);
    }
    console.log(this.arrayOfLilyPads);
  }

  this.drawLilyPads = function()
  {
    for (let lilyPadIndex = 0; lilyPadIndex < this.arrayOfLilyPads.length; lilyPadIndex++)
    {
      this.arrayOfLilyPads[lilyPadIndex].draw();
    }
  }

  this.moveLilyPads = function()
  {
    for (let arrayOfLilyPadsIndex = 0; arrayOfLilyPadsIndex < this.arrayOfLilyPads.length; arrayOfLilyPadsIndex++)
    {
      this.arrayOfLilyPads[arrayOfLilyPadsIndex].move();
    }
  }

  this.handleOffScreenLilyPads = function()
  {
    for (let arrayOfLilyPadsIndex = 0; arrayOfLilyPadsIndex < this.arrayOfLilyPads.length; arrayOfLilyPadsIndex++)
    {
      this.arrayOfLilyPads[arrayOfLilyPadsIndex].handleOffScreen();
    }
  }
}
