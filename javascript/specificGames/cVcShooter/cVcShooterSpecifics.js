function ShooterGameClass()
{
  this.FRAME_RATE = 1000/15;

  this.playerCharacter = undefined;
  this.cVcManager = undefined;
  this.background = undefined;

  this.initialize = function()
  {
    this.background = new cVcShooterBackground();
    this.playerCharacter = new ShooterPlayer();
    this.cVcManager = new cVcManger();
  }
}

let shooterGame = new ShooterGameClass();
