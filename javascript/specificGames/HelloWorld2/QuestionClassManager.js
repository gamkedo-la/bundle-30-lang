function QuestionClassManager()
{
  this.centralVietnameseWhatIsYourNameQuestionClass = new QuestionClass('what is your name question', promptAudio.centralVietnameseWhatsYourNameGeneral,whatIsYourNameImage);
  this.centralVietnameseWhereAreYouFromQuestionClass = new QuestionClass('where are you from question', promptAudio.centralVietnameseWhereAreYouFrom,whereAreYouFromImage);

  this.arrayOfCentralVietnameseQuestions = [];

  this.populateArraysOfConvoPatterns = function()
  {
    this.arrayOfCentralVietnameseQuestions.push(this.centralVietnameseWhatIsYourNameQuestionClass);
    this.arrayOfCentralVietnameseQuestions.push(this.centralVietnameseWhereAreYouFromQuestionClass);
  }

  this.currentCorrectQuestion = undefined;
  this.chooseCorrectQuestion = function(currentLanguageArray)
  {
    let randomArrayOfQuestionsIndex = getRandomIntInclusive(0,currentLanguageArray.length - 1);
    this.currentCorrectQuestion = currentLanguageArray[randomArrayOfQuestionsIndex];
    console.log('this.currentCorrectQuestion.name: ' + this.currentCorrectQuestion.name);
    gameClassManager.currentGame.imagePrompter.loadCurrentImage(this.currentCorrectQuestion.promptImage);
  }

  this.incorrectQuestion = undefined;
  this.chooseIncorrectQuestion = function(currentLanguageArray)
  {
    let randomArrayOfQuestionsIndex = getRandomIntInclusive(0,currentLanguageArray.length - 1);
    this.incorrectQuestion = currentLanguageArray[randomArrayOfQuestionsIndex];

    while (this.incorrectQuestion === this.currentCorrectQuestion)
    {
      randomArrayOfQuestionsIndex = getRandomIntInclusive(0,currentLanguageArray.length - 1);
      this.incorrectQuestion = currentLanguageArray[randomArrayOfQuestionsIndex];
    }
    console.log('this.incorrectQuestion.name: ' + this.incorrectQuestion.name);
  }

  this.assignAudioClipsToSpeechBubbles = function()
  {
    let playerCharacterSpeechBubbleA = gameClassManager.currentGame.playerCharacterSpeechBubbleA;
    let playerCharacterSpeechBubbleB = gameClassManager.currentGame.playerCharacterSpeechBubbleB;

    let fiftyFiftyChance = Math.random();
    if (fiftyFiftyChance < 0.5)
    {
      playerCharacterSpeechBubbleA.message = this.currentCorrectQuestion.questionAudio;

      playerCharacterSpeechBubbleB.message = this.incorrectQuestion.questionAudio;
    }
    else
    {
      playerCharacterSpeechBubbleB.message = this.currentCorrectQuestion.questionAudio;

      playerCharacterSpeechBubbleA.message = this.incorrectQuestion.questionAudio;

    }
  }
}
