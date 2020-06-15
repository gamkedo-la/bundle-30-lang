function AnswersManager()
{
  this.manAnswer =
  {
    audioTag: spellingBeesGame.audioTagsManager.manAudioTag,
    textString: 'man'
  }

  this.womanAnswer =
  {
    audioTag: spellingBeesGame.audioTagsManager.womanAudioTag,
    textString: 'woman'
  }

  this.arrayOfPossibleAnswers = [this.manAnswer,this.womanAnswer];
  this.currentAnswer = undefined;
  this.currentSplitAnswer = [];

  this.defineCurrentAnswer = function()
  {
    let randomPossibleAnswerIndex = getRandomIntInclusive(0,this.arrayOfPossibleAnswers.length - 1);
    this.currentAnswer = this.arrayOfPossibleAnswers[randomPossibleAnswerIndex];
    this.currentSplitAnswer = this.currentAnswer.textString.split("");
  }
}
