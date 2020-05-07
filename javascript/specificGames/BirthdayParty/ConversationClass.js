function ConversationPattern(audioAssociation1,audioAssociation2)
{
  this.image = placeholderPlayButtonImage;


  this.audioAssociation1 = audioAssociation1;

  this.audioAssociation2 = audioAssociation2;

  this.draw = function(targetSpeechBubbleX,targetSpeechBubbleY)
  {
    gameCanvasContext.drawImage(this.image, targetSpeechBubbleX,targetSpeechBubbleY, 100,100);
  }
}
