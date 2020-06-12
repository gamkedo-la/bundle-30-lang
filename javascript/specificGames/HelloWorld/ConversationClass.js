function ConversationPattern(name,promptAudio,answerAudio)
{

  this.name = name;
  this.image = "images\\placeholderPlayButtonImage.png";

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
      drawFromSheet(this.image, this.promptAudioX,this.promptAudioY, 100,100);
      //gameCanvasContext.drawImage(this.image, this.promptAudioX,this.promptAudioY, 100,100);
    }

    if (this.answerAudioX !== undefined)
    {
      drawFromSheet(this.image, this.answerAudioX,this.answerAudioY, 100,100);
      //gameCanvasContext.drawImage(this.image, this.answerAudioX,this.answerAudioY, 100,100);
    }
  }
}
