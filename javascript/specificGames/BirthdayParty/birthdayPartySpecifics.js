birthdayPartyGameClass.prototype = new GameClass();
function birthdayPartyGameClass()
{
  this.name = 'birthday party game';

  this.playerCharacter = undefined;
  this.partyGuest = undefined;
  this.defineAndInitializePlayerCharacter = function()
	{
		this.playerCharacter = new BirthdayPerson(russianDollImage1, gameCanvas.width*0.1);
    this.partyGuest = new BirthdayPerson(russianDollImage4, gameCanvas.width*0.8);
		// this.playerCharacter.initialize();

    this.playerCharacterSpeechBubble1 = new BirthdayPersonSpeechBubble(speechBubbleFromLeftImage, gameCanvas.width*0.1,gameCanvas.height*0.1, gameCanvas.width/3,gameCanvas.height/3);
    this.playerCharacterSpeechBubble2 = new BirthdayPersonSpeechBubble(speechBubbleFromLeftImage, gameCanvas.width*0.2,gameCanvas.height*0.3, gameCanvas.width/3,gameCanvas.height/3);
    this.partyGuestSpeechBubble = new BirthdayPersonSpeechBubble(speechBubbleFromRightImage, gameCanvas.width*0.5,gameCanvas.height*0.2, gameCanvas.width/3,gameCanvas.width/3);
	}

  this.conversationPatternManager = undefined;


  this.background = new BirthdayPartyBackground();

  this.textAnswerFontSize = '30';
  this.textAnswerFontStyle = this.textAnswerFontSize + 'px Helvetica';
	this.titleScreenData = [
	  {name: "Birthday", fontSize: 25, spacing: 12, x: 530, y: 365},
	  {name: "Party", fontSize: 17, spacing: 10, x: 530, y: 400}
	];

	this.imageAnswerHolderWidth = undefined;
  this.imageAnswerHolderHeight = undefined;

	this.audioImageAnswerHolderWidth = undefined;
  this.audioImageAnswerHolderHeight = undefined;

  this.correctTextAnswerHolderWidth = undefined;
  this.incorrectTextAnswerHolderWidth = undefined;

  this.superInitialize = function()
	{
    this.defineAndInitializePlayerCharacter();
    this.conversationPatternManager = new ConversationPatternManager();
    this.conversationPatternManager.initializeArraysOfConvoPatterns();
    this.currentLanguageArray = this.setCurrentLanguageArray();
    this.conversationPatternManager.chooseCorrectConversationPattern();
  }

  this.currentLanguageArray = undefined;
  this.setCurrentLanguageArray = function()
  {
    if (languageSelectionScreen.languageNum === 0)
    {
      // this.currentLanguageArray = this.conversationPatternManager.arrayOfEnglishConvoPatterns; **doesn't exist yet, use vietnamese
      this.currentLanguageArray = this.conversationPatternManager.arrayOfCentralVietnameseConvoPatterns;
    }
    else if (languageSelectionScreen.languageNum === 1)
    {
      // this.currentLanguageArray = this.conversationPatternManager.arrayOfMandarinConvoPatterns; **doesn't exist yet, use vietnamese
      this.currentLanguageArray = this.conversationPatternManager.arrayOfCentralVietnameseConvoPatterns;
    }
    else if (languageSelectionScreen.languageNum === 2)
    {
      this.currentLanguageArray = this.conversationPatternManager.arrayOfCentralVietnameseConvoPatterns;
    }
    console.log('this.currentLanguageArray: ' + this.currentLanguageArray);
  }

  this.draw = function()
	{
    this.background.draw();
    this.playerCharacter.draw();
    this.partyGuest.draw();
    this.playerCharacterSpeechBubble1.draw();
    this.playerCharacterSpeechBubble2.draw();
    this.partyGuestSpeechBubble.draw();
  }
}

const birthdayPartyGame = new birthdayPartyGameClass();

function BirthdayPartyBackground()
{
  this.image = daytimeImage;

  this.draw = function()
  {
    gameCanvasContext.drawImage(this.image, 0,0, gameCanvas.width,gameCanvas.height);
  }
}
