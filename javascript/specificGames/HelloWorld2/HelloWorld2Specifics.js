helloWorld2GameClass.prototype = new GameClass();
function helloWorld2GameClass()
{
  this.name = 'hello world 2 game';
  this.backgroundMusic = new MusicTrack('audio/backgroundTracks/helloWorldSong.mp3', 16);

  this.playerCharacter = undefined;
  this.NPC = undefined;
  this.defineAndInitializePlayerCharacter = function()
	{
		this.playerCharacter = new HelloWorldCharacter(russianDollImage1, gameCanvas.width*0.1);
    this.NPC = new HelloWorldCharacter(russianDollImage4, gameCanvas.width*0.8);
		// this.playerCharacter.initialize();

    this.playerCharacterSpeechBubbleHW2A = new CharacterSpeechBubbleHW2(speechBubbleFromLeftImageA,speechBubbleFromLeftImageAHighlighted, gameCanvas.width*0.1,gameCanvas.height*0.1, gameCanvas.width/3,gameCanvas.height/3);
    this.playerCharacterSpeechBubbleHW2B = new CharacterSpeechBubbleHW2(speechBubbleFromLeftImageB,speechBubbleFromLeftImageBHighlighted, gameCanvas.width*0.2,gameCanvas.height*0.3, gameCanvas.width/3,gameCanvas.height/3);
  }

  this.drawTransitionText = function()
  {
    customFontFillText(['Click the correct '], 35,30, 100,50);
    customFontFillText(['question!', symbolExclamationPointImage], 35,30, gameCanvas.width/2 - 150,100);
    customFontFillText(['Mouse Click ', symbolEqualsImage, ' Choose Question'], 30,15, 110,gameCanvas.height/2);
  }

  this.questionClassManager = undefined;
  this.questionAudioManager = undefined;
  this.imagePrompter = undefined;

  this.background = new HelloWorldBackground();

  this.textAnswerFontSize = '30';
  this.textAnswerFontStyle = this.textAnswerFontSize + 'px Helvetica';
	this.titleScreenData = [
	  {name: "Hello", fontSize: 25, spacing: 12, x: 530, y: 565},
	  {name: "World 2", fontSize: 17, spacing: 10, x: 530, y: 600}
	];

	this.imageAnswerHolderWidth = undefined;
  this.imageAnswerHolderHeight = undefined;

	this.audioImageAnswerHolderWidth = undefined;
  this.audioImageAnswerHolderHeight = undefined;

  this.correctTextAnswerHolderWidth = undefined;
  this.incorrectTextAnswerHolderWidth = undefined;

  this.startGameSpecialCode = function()
  {
      gameClassManager.currentGame.questionAudioManager.assignOrderOfAudioQuestions();
      musicManager.startDuck();
      gameClassManager.currentGame.questionAudioManager.assignOnendedFunctions();

      gameClassManager.currentGame.imagePrompter.promptThePlayer();
  }


  this.initialize = function()
	{
    this.defineAndInitializePlayerCharacter();
    this.questionClassManager = new QuestionClassManager();
    this.questionAudioManager = new QuestionAudioManager();
    this.imagePrompter = new HelloWorld2ImagePrompter();
    this.questionClassManager.populateArraysOfConvoPatterns();
    this.currentLanguageArray = this.setCurrentLanguageArray();
    console.log('this.currentLanguageArray: ' + this.currentLanguageArray);
    console.log('this.currentLanguageArray[0]: ' + this.currentLanguageArray[0]);
    this.questionClassManager.chooseCorrectQuestion(this.currentLanguageArray);
    this.questionClassManager.chooseIncorrectQuestion(this.currentLanguageArray);
    this.questionClassManager.assignAudioClipsToSpeechBubbles();
    this.questionAudioManager.assignOrderOfAudioQuestions();
    this.questionAudioManager.assignOnendedFunctions();
    this.questionAudioManager.getAudioClips();

    // this.conversationAudioManager.playAudioClipsInSuccession();
  }

  this.setCurrentLanguageArray = function()
  {
    let currentLanguageArray = undefined;
    if (languageSelectionScreen.languageNum === 0)
    {
      // this.currentLanguageArray = this.conversationPatternManager.arrayOfEnglishConvoPatterns; **doesn't exist yet, use vietnamese
      currentLanguageArray = this.questionClassManager.arrayOfCentralVietnameseQuestions;
    }
    else if (languageSelectionScreen.languageNum === 1)
    {
      // this.currentLanguageArray = this.conversationPatternManager.arrayOfMandarinConvoPatterns; **doesn't exist yet, use vietnamese
      currentLanguageArray = this.questionClassManager.arrayOfMandarinQuestions;
    }
    else if (languageSelectionScreen.languageNum === 2)
    {
      currentLanguageArray = this.questionClassManager.arrayOfCentralVietnameseQuestions;
      console.log('this.questionClassManager: ' + this.questionClassManager);
      console.log('currentLanguageArray: ' + currentLanguageArray);
    }
    return currentLanguageArray;
  }

  this.draw = function()
	{
    this.background.draw();
    this.playerCharacter.draw();
    this.NPC.draw();
    this.playerCharacterSpeechBubbleHW2A.draw();
    this.playerCharacterSpeechBubbleHW2B.draw();
    if (this.imagePrompter.shouldBeDrawingAPrompt === true)
    {
      this.imagePrompter.drawThePrompt();
    }
  }

  this.update = function()
  {
    this.playerCharacterSpeechBubbleHW2A.returnMouseOverStatus();
    this.playerCharacterSpeechBubbleHW2B.returnMouseOverStatus();
    if (this.imagePrompter.shouldBeDrawingAPrompt === true)
    {
      this.imagePrompter.updatePromptImage();
    }
  }

  this.handleClick = function()
  {
    this.playerCharacterSpeechBubbleHW2A.handleClick();
    this.playerCharacterSpeechBubbleHW2B.handleClick();
  }
}

const helloWorld2Game = new helloWorld2GameClass();

function HelloWorld2Background()
{
  this.image = daytimeImage;

  this.draw = function()
  {
    gameCanvasContext.drawImage(this.image, 0,0, gameCanvas.width,gameCanvas.height);
  }
}
