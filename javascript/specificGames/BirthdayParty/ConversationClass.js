function ConversationPattern(name,promptAudio,answerAudio)
{

  this.name = name;
  this.image = placeholderPlayButtonImage;

  this.promptAudioX = undefined;
  this.promptAudioY = undefined;

  this.answerAudioX = undefined;
  this.answerAudioY = undefined;

  this.promptAudio = promptAudio;

  this.answerAudio = answerAudio;

  this.draw = function()
  {
    if (this.promptAudioX !== undefined)
    {
      gameCanvasContext.drawImage(this.image, this.promptAudioX,this.promptAudioY, 100,100);
    }

    if (this.answerAudioX !== undefined)
    {
      gameCanvasContext.drawImage(this.image, this.answerAudioX,this.answerAudioY, 100,100);
    }
  }
}
