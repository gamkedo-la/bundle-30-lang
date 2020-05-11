function QuestionClass(name, questionAudio,promptImage)
{
  this.name = name;
  this.questionAudio = questionAudio;
  this.promptImage = promptImage;

  this.promptImageX = gameCanvas.width/2;
  this.promptImageY = gameCanvas.height/2;

  this.drawPrompt = function()
  {
    if (this.promptImageX !== undefined)
    {
      gameCanvasContext.drawImage(this.image, this.promptAudioX,this.promptAudioY, 100,100);
    }
  }
}
