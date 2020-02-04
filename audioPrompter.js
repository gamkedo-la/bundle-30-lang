function AudioPrompter()
{
  this.currentAudioPrompt = undefined;
  this.image = placeholderPlayButtonImage;

  this.draw = function()
  {
    gameCanvasContext.drawImage(this.image, gameCanvas.width/2 - this.image.width/2,gameCanvas.height/2 - this.image.height/2);
  }

  this.loadCurrentAudioPrompt = function(audioTagToLoad)
  {
    this.currentAudioPrompt = audioTagToLoad;
  }

  this.playAudioPrompt = function()
  {
    this.currentAudioPrompt.play();
  }
}

let audioPrompter = new AudioPrompter();
