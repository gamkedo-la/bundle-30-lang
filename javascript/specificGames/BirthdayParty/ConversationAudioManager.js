function ConversationAudioManager()
{
  this.promptAudio = undefined;
  this.correctAnswerAudio = undefined;
  this.incorrectAnswerAudio = undefined;

  this.getAudioClips = function()
  {
    let conversationPatternManager = gameClassManager.currentGame.conversationPatternManager;
    this.promptAudio = conversationPatternManager.currentCorrectConversationPattern.promptAudio;
    this.correctAnswerAudio = conversationPatternManager.currentCorrectConversationPattern.answerAudio;
    this.incorrectAnswerAudio = conversationPatternManager.incorrectAnswerAudio;
  }

  this.promptBubble = undefined;
  this.firstAnswerBubble = undefined;
  this.secondAnswerBubble = undefined;
  this.playAudioClipsInSuccession = function()
  {
    console.log('play audio clips function being called');
    this.promptBubble = gameClassManager.currentGame.partyGuestSpeechBubble;


    let fiftyFiftyChance = Math.random();
    if (fiftyFiftyChance < 0.5)
    {
      this.firstAnswerBubble = gameClassManager.currentGame.playerCharacterSpeechBubble1;
      this.secondAnswerBubble = gameClassManager.currentGame.playerCharacterSpeechBubble2;
    }
    else
    {
      this.firstAnswerBubble = gameClassManager.currentGame.playerCharacterSpeechBubble2;
      this.secondAnswerBubble = gameClassManager.currentGame.playerCharacterSpeechBubble1;
    }

    console.log('first answer bubble.message: ' + this.firstAnswerBubble.message);
    console.log('second answer bubble.message: ' + this.secondAnswerBubble.message);

    this.promptBubble.isBeingHeard = true;
    this.promptBubble.message.play();
  }

  this.assignOnendedFunctions = function()
  {
    let scopingProblemThis = gameClassManager.currentGame.conversationAudioManager;
    scopingProblemThis.promptBubble.message.sfx.onended = function()
    {
      console.log('inside onended of prompt');
      scopingProblemThis.firstAnswerBubble.message.play();
      scopingProblemThis.promptBubble.isBeingHeard = false;
      scopingProblemThis.firstAnswerBubble.isBeingHeard = true;
    }

    scopingProblemThis.firstAnswerBubble.message.sfx.onended = function()
    {
      console.log('inside onended of first answer');
      scopingProblemThis.secondAnswerBubble.message.play();
      scopingProblemThis.firstAnswerBubble.isBeingHeard = false;
      scopingProblemThis.secondAnswerBubble.isBeingHeard = true;
    }

    scopingProblemThis.secondAnswerBubble.message.sfx.onended = function()
    {
      console.log('inside onended of second answer');
      scopingProblemThis.secondAnswerBubble.isBeingHeard = false;
    }
  }
}
