function ConversationPatternManager()
{
  //central vietnamese
  this.centralVietnameseWhatIsYourNameConvoPattern = new ConversationPattern('whats your name convo',promptAudio.centralVietnameseWhatsYourNameGeneral,promptAudio.centralVietnameseMyNameIsSteven);
  this.centralVietnameseWhereAreYouFromConvoPattern = new ConversationPattern('where are you from convo',promptAudio.centralVietnameseWhereAreYouFrom,promptAudio.centralVietnameseIAmFromAmerica);
  this.centralVietnameseWhatDoYouLikeToEatConvoPattern = new ConversationPattern('what do you like to eat convo',promptAudio.centralVietnameseWhatDoYouLikeToEat,promptAudio.centralVietnameseILikeToEatVegetarian);
  this.centralVietnameseGoodbyeVeryNiceToMeetYouConvoPattern = new ConversationPattern('goodbye very nice to meet you pattern',promptAudio.centralVietnameseGoodBye,promptAudio.centralVietnameseVeryNiceToMeetYou);
  this.centralVietnameseHowAreYouGoodAndYouConvoPattern = new ConversationPattern('how are you good and you convo pattern',promptAudio.centralVietnameseHowAreYouGeneral,promptAudio.centralVietnameseGoodAndYouGeneral);
  this.centralVietnameseExcuseMePoliteHelloConvoPattern = new ConversationPattern('excuse me polite hello convo pattern',promptAudio.centralVietnameseExcuseMe,promptAudio.centralVietnamesePoliteHello);

  this.arrayOfCentralVietnameseConvoPatterns = [];

  //mandarin
  this.mandarinHelloConversationPattern = new ConversationPattern('hello conversation pattern', promptAudio.mandarinHello,promptAudio.mandarinHello);
  this.mandarinHowAreYouConversationPattern = new ConversationPattern('how are you conversation pattern', promptAudio.mandarinHowAreYou,promptAudio.mandarinImGoodAndYou);
  this.mandarinWhereAreYouFromConversationPattern = new ConversationPattern('where are you from conversation pattern', promptAudio.mandarinWhereAreYouFrom,promptAudio.mandarinImFromAmerica);
  this.mandarinWhatDoYouLikeToDoConversationPattern = new ConversationPattern('what do you like to do conversation pattern', promptAudio.mandarinWhatDoYouLikeToDo,promptAudio.mandarinILikeProgramming);
  this.mandarinWhereDoYouLiveConversationPattern = new ConversationPattern('where do you live conversation pattern', promptAudio.mandarinWhereDoYouLive,promptAudio.mandarinILiveInVietnam);
  this.mandarinWhatIsYourJobConversationPattern = new ConversationPattern('what is your job conversation pattern', promptAudio.mandarinWhatIsYourJob,promptAudio.mandarinIAmATeacher);
  this.mandarinAnythingElseConversationPattern = new ConversationPattern('anything else conversation pattern', promptAudio.mandarinAnythingElse,promptAudio.mandarinIAlsoLikeFitness);
  this.mandarinWhatIsYourNameConversationPattern = new ConversationPattern('what is your name conversation pattern', promptAudio.mandarinWhatIsYourName,promptAudio.mandarinMyNameIsSteven);
  this.mandarinHowOldAreYouConversationPattern = new ConversationPattern('how old are you conversation pattern', promptAudio.mandarinHowOldAreYou,promptAudio.mandarinIAm37YearsOld);
  this.mandarinWhereAreYouConversationPattern = new ConversationPattern('how old are you conversation pattern', promptAudio.mandarinHowOldAreYou,promptAudio.mandarinIAm37YearsOld);

  this.arrayOfMandarinConvoPatterns = [];
  this.initializeArraysOfConvoPatterns = function()
  {
    //central vietnamese
    this.arrayOfCentralVietnameseConvoPatterns.push(this.centralVietnameseWhatIsYourNameConvoPattern);
    this.arrayOfCentralVietnameseConvoPatterns.push(this.centralVietnameseWhereAreYouFromConvoPattern);
    this.arrayOfCentralVietnameseConvoPatterns.push(this.centralVietnameseWhatDoYouLikeToEatConvoPattern);
    this.arrayOfCentralVietnameseConvoPatterns.push(this.centralVietnameseGoodbyeVeryNiceToMeetYouConvoPattern);
    this.arrayOfCentralVietnameseConvoPatterns.push(this.centralVietnameseHowAreYouGoodAndYouConvoPattern);
    this.arrayOfCentralVietnameseConvoPatterns.push(this.centralVietnameseExcuseMePoliteHelloConvoPattern);

    //mandarin
    this.arrayOfMandarinConvoPatterns.push(this.mandarinHelloConversationPattern);
    this.arrayOfMandarinConvoPatterns.push(this.mandarinHowAreYouConversationPattern);
    this.arrayOfMandarinConvoPatterns.push(this.mandarinWhereAreYouFromConversationPattern);
    this.arrayOfMandarinConvoPatterns.push(this.mandarinWhatDoYouLikeToDoConversationPattern);
    this.arrayOfMandarinConvoPatterns.push(this.mandarinWhereDoYouLiveConversationPattern);
    this.arrayOfMandarinConvoPatterns.push(this.mandarinWhatIsYourJobConversationPattern);
    this.arrayOfMandarinConvoPatterns.push(this.mandarinAnythingElseConversationPattern);
    this.arrayOfMandarinConvoPatterns.push(this.mandarinWhatIsYourNameConversationPattern);
    this.arrayOfMandarinConvoPatterns.push(this.mandarinHowOldAreYouConversationPattern);
  }

  this.currentCorrectConversationPattern = undefined;
  this.chooseCorrectConversationPattern = function(currentLanguageArray)
  {
    let randomArrayOfConvoPatternsIndex = getRandomIntInclusive(0,currentLanguageArray.length - 1);
    this.currentCorrectConversationPattern = currentLanguageArray[randomArrayOfConvoPatternsIndex];
    console.log('this.currentCorrectConversationPattern.name: ' + this.currentCorrectConversationPattern.name);
  }

  this.incorrectConversationPattern = undefined;
  this.chooseIncorrectConversationPattern = function(currentLanguageArray)
  {
    let randomArrayOfConvoPatternsIndex = getRandomIntInclusive(0,currentLanguageArray.length - 1);
    this.incorrectConversationPattern = currentLanguageArray[randomArrayOfConvoPatternsIndex];

    while (this.incorrectConversationPattern === this.currentCorrectConversationPattern)
    {
      randomArrayOfConvoPatternsIndex = getRandomIntInclusive(0,currentLanguageArray.length - 1);
      this.incorrectConversationPattern = currentLanguageArray[randomArrayOfConvoPatternsIndex];
    }
    console.log('this.incorrectConversationPattern.name: ' + this.incorrectConversationPattern.name);
  }

  this.assignAudioClipsToSpeechBubbles = function()
  {
    let npcGuestSpeechBubble = gameClassManager.currentGame.NPCSpeechBubble;
    npcGuestSpeechBubble.message = this.currentCorrectConversationPattern.promptAudio;

    let playerCharacterSpeechBubbleA = gameClassManager.currentGame.playerCharacterSpeechBubbleA;
    let playerCharacterSpeechBubbleB = gameClassManager.currentGame.playerCharacterSpeechBubbleB;

    let fiftyFiftyChance = Math.random();
    if (fiftyFiftyChance < 0.5)
    {
      playerCharacterSpeechBubbleA.message = this.currentCorrectConversationPattern.answerAudio;

      playerCharacterSpeechBubbleB.message = this.incorrectConversationPattern.answerAudio;
    }
    else
    {
      playerCharacterSpeechBubbleB.message = this.currentCorrectConversationPattern.answerAudio;

      playerCharacterSpeechBubbleA.message = this.incorrectConversationPattern.answerAudio;

    }
  }

}
