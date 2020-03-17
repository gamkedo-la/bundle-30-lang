function FrogRiverPlayer()
{
  this.x = Math.random() * 640;
  this.y = 600;

  this.width = 64;
  this.height = 50;
  this.centerX = this.x + this.width/2;

  this.updateCenterX = function()
  {
    this.centerX = this.x + this.width/2;
  }

  this.color = 'DarkGreen';

  this.draw = function()
  {
    gameCanvasContext.fillStyle = this.color;
    gameCanvasContext.fillRect(this.x,this.y, this.width,this.height);
  }

  this.checkForLilyLanding = function()
  {
    console.log(this.centerX);
    for (let arrayOfLilyPadsIndex = 0; arrayOfLilyPadsIndex < frogRiverGame.lilyPadManager.arrayOfLilyPads.length; arrayOfLilyPadsIndex++)
    {
      console.log(frogRiverGame.lilyPadManager.arrayOfLilyPads[arrayOfLilyPadsIndex]);
      if (this.centerX > frogRiverGame.lilyPadManager.arrayOfLilyPads[arrayOfLilyPadsIndex].x &&
          this.centerX < frogRiverGame.lilyPadManager.arrayOfLilyPads[arrayOfLilyPadsIndex].x + 50 &&
          this.y - 50 === frogRiverGame.lilyPadManager.arrayOfLilyPads[arrayOfLilyPadsIndex].y //&&
        /*lilyPadManager.arrayOfLilyPads[arrayOfLilyPadsIndex].letter === currentCorrectLetter*/)
          {
            console.log('lily landing detected');
            this.y -= 50;
            this.currentLilyPad = frogRiverGame.lilyPadManager.arrayOfLilyPads[arrayOfLilyPadsIndex];
            //setOrResetCorrectLetterAudio();
            //correctLetterAudio.play();
          }
    }
  }

  this.currentLilyPad = undefined;

  this.moveWhileOnLilyPad = function()
  {
    if (this.currentLilyPad)
    {
      this.x += this.currentLilyPad.speed*this.currentLilyPad.direction;
    }
  }

  this.handleOffScreen = function()
  {
    if (this.x > 690)
    {
      {
        this.x = -50;
      }
    }
    if (this.x < -50)
    {
      this.x = 690;
    }
  }

}
