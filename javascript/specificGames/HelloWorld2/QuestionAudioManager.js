function QuestionAudioManager()
{
  this.correctQuestionAudio = undefined;
  this.incorrectQuestionAudio = undefined;

  this.getAudioClips = function()
  {
    let questionClassManager = gameClassManager.currentGame.questionClassManager;
    this.correctQuestionAudio = questionClassManager.currentCorrectQuestion.questionAudio;
    this.incorrectAnswerAudio = questionClassManager.incorrectQuestion.questionAudio;
  }

  this.firstQuestionBubble = undefined;
  this.secondQuestionBubble = undefined;
  this.assignOrderOfAudioQuestions = function()
  {
    let scopingProblemThis = gameClassManager.currentGame.questionAudioManager;

    let fiftyFiftyChance = Math.random();
    if (fiftyFiftyChance < 0.5)
    {
      scopingProblemThis.firstQuestionBubble = gameClassManager.currentGame.playerCharacterSpeechBubbleHW2A;
      scopingProblemThis.secondQuestionBubble = gameClassManager.currentGame.playerCharacterSpeechBubbleHW2B;
    }
    else
    {
      scopingProblemThis.firstQuestionBubble = gameClassManager.currentGame.playerCharacterSpeechBubbleHW2B;
      scopingProblemThis.secondQuestionBubble = gameClassManager.currentGame.playerCharacterSpeechBubbleHW2A;
    }
  }

  this.assignOnendedFunctions = function()
  {
    let scopingProblemThis = gameClassManager.currentGame.questionAudioManager;
    scopingProblemThis.firstQuestionBubble.message.sfx.onended = function()
    {
      scopingProblemThis.secondQuestionBubble.message.play();
      scopingProblemThis.firstQuestionBubble.isBeingHeard = false;
      scopingProblemThis.secondQuestionBubble.isBeingHeard = true;
    }

    scopingProblemThis.secondQuestionBubble.message.sfx.onended = function()
    {
      console.log('second question bubble audio onended triggering');
      scopingProblemThis.secondQuestionBubble.isBeingHeard = false;
      scopingProblemThis.firstQuestionBubble.isBeingHeard = false;
    }

  }
}
