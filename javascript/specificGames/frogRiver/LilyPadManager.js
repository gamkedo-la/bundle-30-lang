function LilyPadManager()
{
  this.arrayOfLilyPads = [];

  this.arrayOfLilyPadImages = [lilyImage1,lilyImage2,lilyImage3,lilyImage4];

  this.answerCount = 0;

  this.initializeLilyPads = function()
  {
    for (let arrayOfLilyPadsIndex = 0; arrayOfLilyPadsIndex < 5; arrayOfLilyPadsIndex++)
    {
      let lilyPad1 = new LilyPadClass();
      lilyPad1.yCoordinate = 150 + arrayOfLilyPadsIndex*90;
      lilyPad1.xCoordinate = Math.floor(Math.random()*640);
      let randomNumber = getRandomIntInclusive(0,this.arrayOfLilyPadImages.length - 1);
      lilyPad1.image = this.arrayOfLilyPadImages[randomNumber];
      let lilyPad2 = new LilyPadClass();
      lilyPad2.xCoordinate = Math.floor(Math.random()*640);

      do
      {
        lilyPad2.xCoordinate = Math.floor(Math.random()*640);
      }
      while (Math.abs(lilyPad2.xCoordinate - lilyPad1.xCoordinate) < 150)

      randomNumber = getRandomIntInclusive(0,this.arrayOfLilyPadImages.length - 1);
      lilyPad2.image = this.arrayOfLilyPadImages[randomNumber];
      lilyPad2.yCoordinate = 150 + arrayOfLilyPadsIndex*90;

      if (arrayOfLilyPadsIndex%2 === 0)
      {
        lilyPad1.direction = 1;//move to the right
        lilyPad2.direction = 1;//move to the right
      } else {
        lilyPad1.direction = -1;//move to the left
        lilyPad2.direction = -1;//move to the left
      }

      lilyPad1.lilyNeighbourOnSameLine = lilyPad2;
      lilyPad2.lilyNeighbourOnSameLine = lilyPad1;

      this.arrayOfLilyPads.push(lilyPad1);
      this.arrayOfLilyPads.push(lilyPad2);
    }
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
