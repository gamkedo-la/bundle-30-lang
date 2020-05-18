function ConversationAudioManager()
{
  this.promptAudio = undefined;
  this.correctAnswerAudio = undefined;


  this.getAudioClips = function()
  {
    let conversationPatternManager = gameClassManager.currentGame.conversationPatternManager;
    this.promptAudio = conversationPatternManager.currentCorrectConversationPattern.promptAudio;
    this.correctAnswerAudio = conversationPatternManager.currentCorrectConversationPattern.answerAudio;
    this.incorrectAnswerAudio = conversationPatternManager.incorrectConversationPattern.answerAudio;
  }

  this.promptBubble = undefined;
  this.firstAnswerBubble = undefined;
  this.secondAnswerBubble = undefined;
  this.assignOrderOfAudioAnswers = function()
  {
    let scopingProblemThis = gameClassManager.currentGame.conversationAudioManager;

    scopingProblemThis.promptBubble = gameClassManager.currentGame.NPCSpeechBubble;


    let fiftyFiftyChance = Math.random();
    if (fiftyFiftyChance < 0.5)
    {
      scopingProblemThis.firstAnswerBubble = gameClassManager.currentGame.playerCharacterSpeechBubbleHW1A;
      scopingProblemThis.secondAnswerBubble = gameClassManager.currentGame.playerCharacterSpeechBubbleHW1B;
    }
    else
    {
      scopingProblemThis.firstAnswerBubble = gameClassManager.currentGame.playerCharacterSpeechBubbleHW1B;
      scopingProblemThis.secondAnswerBubble = gameClassManager.currentGame.playerCharacterSpeechBubbleHW1A;
    }
  }

  this.assignOnendedFunctions = function()
  {
    let scopingProblemThis = gameClassManager.currentGame.conversationAudioManager;
    scopingProblemThis.promptBubble.message.sfx.onended = function()
    {
      scopingProblemThis.firstAnswerBubble.message.play();
      scopingProblemThis.promptBubble.isBeingHeard = false;
      scopingProblemThis.firstAnswerBubble.isBeingHeard = true;
    }

    scopingProblemThis.firstAnswerBubble.message.sfx.onended = function()
    {
      scopingProblemThis.secondAnswerBubble.message.play();
      scopingProblemThis.firstAnswerBubble.isBeingHeard = false;
      scopingProblemThis.secondAnswerBubble.isBeingHeard = true;
    }

    scopingProblemThis.secondAnswerBubble.message.sfx.onended = function()
    {
      scopingProblemThis.secondAnswerBubble.isBeingHeard = false;
      musicManager.endDuck();
    }
  }
}
