function PauseButton()
{
  this.isEngaged = false;

  this.toggleEngagement = function()
  {
    if (this.isEngaged)
    {
      this.isEngaged = false;
    }
    else
    {
      this.isEngaged = true;
    }
  }
}

spellingBeesGame.pauseButton = new PauseButton();
