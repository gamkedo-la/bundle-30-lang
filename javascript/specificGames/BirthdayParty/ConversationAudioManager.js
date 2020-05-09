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
    console.log('assign order of audio answers');
    scopingProblemThis.promptBubble = gameClassManager.currentGame.partyGuestSpeechBubble;


    let fiftyFiftyChance = Math.random();
    if (fiftyFiftyChance < 0.5)
    {
      scopingProblemThis.firstAnswerBubble = gameClassManager.currentGame.playerCharacterSpeechBubbleA;
      scopingProblemThis.secondAnswerBubble = gameClassManager.currentGame.playerCharacterSpeechBubbleB;
    }
    else
    {
      scopingProblemThis.firstAnswerBubble = gameClassManager.currentGame.playerCharacterSpeechBubbleB;
      scopingProblemThis.secondAnswerBubble = gameClassManager.currentGame.playerCharacterSpeechBubbleA;
    }

    console.log('first answer bubble.message: ' + scopingProblemThis.firstAnswerBubble.message);
    console.log('second answer bubble.message: ' + scopingProblemThis.secondAnswerBubble.message);
  }

  this.assignOnendedFunctions = function()
  {
    console.log('inside assignOnendedFunctions of conversationAudioManager');
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
      musicManager.endDuck();
    }
  }
}
