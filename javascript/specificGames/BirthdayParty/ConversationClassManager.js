function ConversationPatternManager()
{
  this.centralVietnameseWhatIsYourNameConvoPattern = new ConversationPattern(promptAudio.centralVietnameseWhatsYourNameGeneral,promptAudio.centralVietnameseMyNameIsSteven);
  this.centralVietnameseWhereAreYouFromConvoPattern = new ConversationPattern(promptAudio.centralVietnameseWhereAreYouFrom,promptAudio.centralVietnameseIAmFromAmerica);

  this.arrayOfCentralVietnameseConvoPatterns = [];

  this.initializeArraysOfConvoPatterns = function()
  {
    this.arrayOfCentralVietnameseConvoPatterns.push(this.centralVietnameseWhatIsYourNameConvoPattern);
    this.arrayOfCentralVietnameseConvoPatterns.push(this.centralVietnameseWhereAreYouFromConvoPattern);

  }

  this.chooseCorrectConversationPattern = function()
  {
    let currentLanguageArray = gameClassManager.currentGame.currentLanguageArray;
    console.log('currentLanguageArray: ' + currentLanguageArray);
    let randomArrayOfConvoPatternsIndex = getRandomIntInclusive(0,currentLanguageArray.length - 1);
    return currentLanguageArray[randomArrayOfConvoPatternsIndex];
  }

  this.currentCorrectConversationPattern = undefined;
}
