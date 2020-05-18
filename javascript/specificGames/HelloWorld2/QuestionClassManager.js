function QuestionClassManager()
{
  this.centralVietnameseWhatIsYourNameQuestionClass = new QuestionClass('what is your name question', promptAudio.centralVietnameseWhatsYourNameGeneral,whatIsYourNameImage);
  this.centralVietnameseWhereAreYouFromQuestionClass = new QuestionClass('where are you from question', promptAudio.centralVietnameseWhereAreYouFrom,whereAreYouFromImage);
  this.centralVietnameseWhatDoYouLikeToEatQuestionClass = new QuestionClass('what do you like to eat question', promptAudio.centralVietnameseWhatDoYouLikeToEat,whatDoYouLikeToEatImage);
  this.centralVietnameseHowAreYouQuestionClass = new QuestionClass('how are you question', promptAudio.centralVietnameseHowAreYouGeneral,howAreYouImage);
  this.centralVietnameseExcuseMeQuestionClass = new QuestionClass('excuse me question', promptAudio.centralVietnameseExcuseMe,excuseMeQuestionAskingContextImage);

  this.arrayOfCentralVietnameseQuestions = [];

  this.mandarinHowAreYouQuestionClass = new QuestionClass('how are you question', promptAudio.mandarinHowAreYou,howAreYouImage);
  this.mandarinWhereAreYouFromQuestionClass = new QuestionClass('where are you from question', promptAudio.mandarinWhereAreYouFrom,whereAreYouFromImage);
  this.mandarinWhereDoYouLiveQuestionClass = new QuestionClass('where do you live question', promptAudio.mandarinWhereDoYouLive,whereDoYouLiveImage);
  this.mandarinWhatIsYourNameQuestionClass = new QuestionClass('what is your name question', promptAudio.mandarinWhatIsYourName,whatIsYourNameImage);
  this.mandarinWhatIsYourJobQuestionClass = new QuestionClass('what is your job question', promptAudio.mandarinWhatIsYourJob,whatIsYourJobImage);
  this.mandarinWhatDoYouLikeToDoQuestionClass = new QuestionClass('what do you like to do question', promptAudio.mandarinWhatDoYouLikeToDo,whatDoYouLikeToDoImage);
  this.mandarinWhatPartOfChinaQuestionClass = new QuestionClass('what part of China question', promptAudio.mandarinWhatPartOfChina,whatPartOfChinaImage);
  this.mandarinAnythingElseQuestionClass = new QuestionClass('anything else question', promptAudio.mandarinAnythingElse,anythingElseImage);

  this.arrayOfMandarinQuestions = [];

  this.populateArraysOfConvoPatterns = function()
  {
    //central vietnamese
    this.arrayOfCentralVietnameseQuestions.push(this.centralVietnameseWhatIsYourNameQuestionClass);
    this.arrayOfCentralVietnameseQuestions.push(this.centralVietnameseWhereAreYouFromQuestionClass);
    this.arrayOfCentralVietnameseQuestions.push(this.centralVietnameseWhatDoYouLikeToEatQuestionClass);
    this.arrayOfCentralVietnameseQuestions.push(this.centralVietnameseHowAreYouQuestionClass);
    this.arrayOfCentralVietnameseQuestions.push(this.centralVietnameseExcuseMeQuestionClass);

    //mandarin
    this.arrayOfMandarinQuestions.push(this.mandarinHowAreYouQuestionClass);
    this.arrayOfMandarinQuestions.push(this.mandarinWhereAreYouFromQuestionClass);
    this.arrayOfMandarinQuestions.push(this.mandarinWhereDoYouLiveQuestionClass);
    this.arrayOfMandarinQuestions.push(this.mandarinWhatIsYourNameQuestionClass);
    this.arrayOfMandarinQuestions.push(this.mandarinWhatIsYourJobQuestionClass);
    this.arrayOfMandarinQuestions.push(this.mandarinWhatDoYouLikeToDoQuestionClass);
    this.arrayOfMandarinQuestions.push(this.mandarinWhatPartOfChinaQuestionClass);
    this.arrayOfMandarinQuestions.push(this.mandarinAnythingElseQuestionClass);

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
    let playerCharacterSpeechBubbleHW2A = gameClassManager.currentGame.playerCharacterSpeechBubbleHW2A;
    let playerCharacterSpeechBubbleHW2B = gameClassManager.currentGame.playerCharacterSpeechBubbleHW2B;

    let fiftyFiftyChance = Math.random();
    if (fiftyFiftyChance < 0.5)
    {
      playerCharacterSpeechBubbleHW2A.message = this.currentCorrectQuestion.questionAudio;

      playerCharacterSpeechBubbleHW2B.message = this.incorrectQuestion.questionAudio;
    }
    else
    {
      playerCharacterSpeechBubbleHW2B.message = this.currentCorrectQuestion.questionAudio;

      playerCharacterSpeechBubbleHW2A.message = this.incorrectQuestion.questionAudio;

    }
  }
}
