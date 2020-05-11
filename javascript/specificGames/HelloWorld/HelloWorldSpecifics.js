helloWorldGameClass.prototype = new GameClass();
function helloWorldGameClass()
{
  this.name = 'hello world game';

  this.playerCharacter = undefined;
  this.NPC = undefined;
  this.defineAndInitializePlayerCharacter = function()
	{
		this.playerCharacter = new HelloWorldCharacter(russianDollImage1, gameCanvas.width*0.1);
    this.NPC = new HelloWorldCharacter(russianDollImage4, gameCanvas.width*0.8);
		// this.playerCharacter.initialize();

    this.playerCharacterSpeechBubbleA = new CharacterSpeechBubble(speechBubbleFromLeftImageA,speechBubbleFromLeftImageAHighlighted, gameCanvas.width*0.1,gameCanvas.height*0.1, gameCanvas.width/3,gameCanvas.height/3);
    this.playerCharacterSpeechBubbleB = new CharacterSpeechBubble(speechBubbleFromLeftImageB,speechBubbleFromLeftImageBHighlighted, gameCanvas.width*0.2,gameCanvas.height*0.3, gameCanvas.width/3,gameCanvas.height/3);
    this.NPCSpeechBubble = new CharacterSpeechBubble(speechBubbleFromRightImage,speechBubbleFromRightImage, gameCanvas.width*0.5,gameCanvas.height*0.2, gameCanvas.width/3,gameCanvas.width/3);
  }

  this.conversationPatternManager = undefined;
  this.conversationAudioManager = undefined;

  this.background = new HelloWorldBackground();

  this.textAnswerFontSize = '30';
  this.textAnswerFontStyle = this.textAnswerFontSize + 'px Helvetica';
	this.titleScreenData = [
	  {name: "Hello", fontSize: 25, spacing: 12, x: 530, y: 365},
	  {name: "World", fontSize: 17, spacing: 10, x: 530, y: 400}
	];

	this.imageAnswerHolderWidth = undefined;
  this.imageAnswerHolderHeight = undefined;

	this.audioImageAnswerHolderWidth = undefined;
  this.audioImageAnswerHolderHeight = undefined;

  this.correctTextAnswerHolderWidth = undefined;
  this.incorrectTextAnswerHolderWidth = undefined;


  this.initialize = function()
	{
    this.defineAndInitializePlayerCharacter();
    this.conversationPatternManager = new ConversationPatternManager();
    this.conversationAudioManager = new ConversationAudioManager();
    this.conversationPatternManager.initializeArraysOfConvoPatterns();
    this.currentLanguageArray = this.setCurrentLanguageArray();
    console.log('this.currentLanguageArray: ' + this.currentLanguageArray);
    console.log('this.currentLanguageArray[0]: ' + this.currentLanguageArray[0]);
    this.conversationPatternManager.chooseCorrectConversationPattern(this.currentLanguageArray);
    this.conversationPatternManager.chooseIncorrectConversationPattern(this.currentLanguageArray);
    this.conversationPatternManager.assignAudioClipsToSpeechBubbles();

    this.conversationAudioManager.getAudioClips();
    // this.conversationAudioManager.playAudioClipsInSuccession();
  }

  this.setCurrentLanguageArray = function()
  {
    let currentLanguageArray = undefined;
    if (languageSelectionScreen.languageNum === 0)
    {
      // this.currentLanguageArray = this.conversationPatternManager.arrayOfEnglishConvoPatterns; **doesn't exist yet, use vietnamese
      currentLanguageArray = this.conversationPatternManager.arrayOfCentralVietnameseConvoPatterns;
    }
    else if (languageSelectionScreen.languageNum === 1)
    {
      // this.currentLanguageArray = this.conversationPatternManager.arrayOfMandarinConvoPatterns; **doesn't exist yet, use vietnamese
      currentLanguageArray = this.conversationPatternManager.arrayOfMandarinConvoPatterns;
    }
    else if (languageSelectionScreen.languageNum === 2)
    {
      currentLanguageArray = this.conversationPatternManager.arrayOfCentralVietnameseConvoPatterns;
    }
    return currentLanguageArray;
  }

  this.draw = function()
	{
    this.background.draw();
    this.playerCharacter.draw();
    this.NPC.draw();
    this.playerCharacterSpeechBubbleA.draw();
    this.playerCharacterSpeechBubbleB.draw();
    this.NPCSpeechBubble.draw();
  }

  this.update = function()
  {
    this.playerCharacterSpeechBubbleA.returnMouseOverStatus();
    this.playerCharacterSpeechBubbleB.returnMouseOverStatus();
    this.NPCSpeechBubble.returnMouseOverStatus();
  }

  this.handleClick = function()
  {
    this.playerCharacterSpeechBubbleA.handleClick();
    this.playerCharacterSpeechBubbleB.handleClick();
    this.NPCSpeechBubble.handleClick();
  }
}

const helloWorldGame = new helloWorldGameClass();

function HelloWorldBackground()
{
  this.image = daytimeImage;

  this.draw = function()
  {
    gameCanvasContext.drawImage(this.image, 0,0, gameCanvas.width,gameCanvas.height);
  }
}
