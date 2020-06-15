helloWorldGameClass.prototype = new GameClass();
function helloWorldGameClass()
{
  this.name = 'hello world game';
  this.backgroundMusic = new MusicTrack('audio/backgroundTracks/helloWorldSong.mp3', 16);

  this.playerCharacter = undefined;
  this.NPC = undefined;
  this.defineAndInitializePlayerCharacter = function()
	{
		this.playerCharacter = new HelloWorldCharacter("images\\sprites\\dodgeBall\\Player1.png", gameCanvas.width*0.1);
    this.NPC = new HelloWorldCharacter("images\\sprites\\dodgeBall\\Player4.png", gameCanvas.width*0.8);
		// this.playerCharacter.initialize();

    this.playerCharacterSpeechBubbleHW1A = new CharacterSpeechBubbleHW1("images\\sprites\\dayTime\\speechBubbleFromLeftA.png","images\\sprites\\dayTime\\speechBubbleFromLeftAHighlighted.png", gameCanvas.width*0.1,gameCanvas.height*0.1, gameCanvas.width/3,gameCanvas.height/3);
    this.playerCharacterSpeechBubbleHW1B = new CharacterSpeechBubbleHW1("images\\sprites\\dayTime\\speechBubbleFromLeftB.png","images\\sprites\\dayTime\\speechBubbleFromLeftBHighlighted.png", gameCanvas.width*0.2,gameCanvas.height*0.3, gameCanvas.width/3,gameCanvas.height/3);
    this.NPCSpeechBubble = new CharacterSpeechBubbleHW1("images\\sprites\\dayTime\\speechBubbleFromRIght.png","images\\sprites\\dayTime\\speechBubbleFromRIght.png", gameCanvas.width*0.5,gameCanvas.height*0.2, gameCanvas.width/3,gameCanvas.width/3);
  }

  this.drawTransitionText = function()
  {
    customFontFillText(['Click the correct '], 35,30, 100,50);
    customFontFillText(['reply!', symbolExclamationPointImage], 35,30, gameCanvas.width/2 - 150,100);
    customFontFillText(['Mouse Click ', symbolEqualsImage, ' Choose Reply'], 30,15, 110,gameCanvas.height/2);
  }

  this.FRAME_RATE = 1000/30;

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


  this.startGameSpecialCode = function()
  {
    gameClassManager.currentGame.conversationAudioManager.assignOrderOfAudioAnswers();
    musicManager.startDuck();
    gameClassManager.currentGame.conversationAudioManager.assignOnendedFunctions();

    gameClassManager.currentGame.conversationAudioManager.promptBubble.message.play();
    gameClassManager.currentGame.conversationAudioManager.promptBubble.isBeingHeard = true;
  }

  this.initialize = function()
	{
    this.defineAndInitializePlayerCharacter();
    this.conversationPatternManager = new ConversationPatternManager();
    this.conversationAudioManager = new ConversationAudioManager();
    this.conversationPatternManager.initializeArraysOfConvoPatterns();
    this.currentLanguageArray = this.setCurrentLanguageArray();
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
    this.playerCharacterSpeechBubbleHW1A.draw();
    this.playerCharacterSpeechBubbleHW1B.draw();
    this.NPCSpeechBubble.draw();
  }

  this.update = function()
  {
    this.playerCharacterSpeechBubbleHW1A.returnMouseOverStatus();
    this.playerCharacterSpeechBubbleHW1B.returnMouseOverStatus();
    this.NPCSpeechBubble.returnMouseOverStatus();
  }

  this.handleClick = function()
  {
    this.playerCharacterSpeechBubbleHW1A.handleClick();
    this.playerCharacterSpeechBubbleHW1B.handleClick();
    this.NPCSpeechBubble.handleClick();
  }
}

const helloWorldGame = new helloWorldGameClass();

function HelloWorldBackground()
{
  this.image = "images\\Backgrounds\\daytimeBackground.png";

  this.draw = function()
  {
    drawFromSheet(this.image, 0,0, gameCanvas.width,gameCanvas.height);
    //gameCanvasContext.drawImage(this.image, 0,0, gameCanvas.width,gameCanvas.height);
  }
}

function HelloWorldCharacter(image, x)
{
  this.image = image;

  this.x = x;
  this.y = gameCanvas.height*0.5;

  this.width = 100;
  this.height = 200;

  this.draw = function()
  {
    drawFromSheet(this.image, this.x,this.y, this.width,this.height);
    //gameCanvasContext.drawImage(this.image, this.x,this.y, this.width,this.height);
  }
}

function CharacterSpeechBubbleHW1(image,highlightedImage, x,y, width,height)
{
  this.image = image;
  this.highlightedImage = highlightedImage;
  this.arrowImage = "images\\sprites\\dayTime\\arrow.png";
  this.arrowImageWidth = 50;
  this.arrowImageHeight = 100;

  this.isBeingHeard = false;

  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;

  this.message = undefined;

  this.highlighted = false;

  this.draw = function()
  {
    if (this.highlighted === true)
    {
      drawFromSheet(this.highlightedImage, this.x,this.y, this.width,this.height);
      //gameCanvasContext.drawImage(this.highlightedImage, this.x,this.y, this.width,this.height);
    }
    else if (this.highlighted === false)
    {
      drawFromSheet(this.image, this.x,this.y, this.width,this.height);
      //gameCanvasContext.drawImage(this.image, this.x,this.y, this.width,this.height);
    }

    if (this.isBeingHeard === true)
    {
      let arrowImageStartingX = this.x + this.width/2 - this.arrowImageWidth/2;
      let arrowImageStartingY = this.y - this.arrowImageHeight;
      // let arrowImageStartingX = gameCanvas.width/2;
      // let arrowImageStartingY = gameCanvas.height/2;
      drawFromSheet(this.arrowImage, arrowImageStartingX,arrowImageStartingY, this.arrowImageWidth,this.arrowImageHeight);
      //gameCanvasContext.drawImage(this.arrowImage, arrowImageStartingX,arrowImageStartingY, this.arrowImageWidth,this.arrowImageHeight);
    }
  }

  this.highlightBoundaryLeftX = this.x;
  this.highlightBoundaryTopY = this.y;
  this.highlightBoundaryRightX = this.x + this.width;
  this.highlightBoundaryBottomY = (this.y + this.height)*0.725;

  this.returnMouseOverStatus = function()
  {
    if (inputManager.mouseCoordinates.x > this.highlightBoundaryLeftX && inputManager.mouseCoordinates.x < this.highlightBoundaryRightX &&
        inputManager.mouseCoordinates.y > this.highlightBoundaryTopY && inputManager.mouseCoordinates.y < this.highlightBoundaryBottomY)
        {
          this.highlighted = true;
        }
        else {
          this.highlighted = false;
        }
  }

  this.handleClick = function()
  {
    if (!this.highlighted)
    {
      return
    }
    else
    {
      if (this.message === gameClassManager.currentGame.conversationPatternManager.currentCorrectConversationPattern.answerAudio)
      {
        amountCorrect++;
        genAudio.playPositive();
      }
      else if (this.message === gameClassManager.currentGame.conversationPatternManager.incorrectConversationPattern.answerAudio)
      {
        amountIncorrect++;
        genAudio.playNegative();
      }
      gameClassManager.currentGame.conversationPatternManager.chooseCorrectConversationPattern(gameClassManager.currentGame.currentLanguageArray);
      gameClassManager.currentGame.conversationPatternManager.promptAudio = gameClassManager.currentGame.conversationPatternManager.currentCorrectConversationPattern.promptAudio;
      gameClassManager.currentGame.conversationPatternManager.chooseIncorrectConversationPattern(gameClassManager.currentGame.currentLanguageArray);
      gameClassManager.currentGame.conversationPatternManager.assignAudioClipsToSpeechBubbles();
      gameClassManager.currentGame.conversationAudioManager.getAudioClips();
      gameClassManager.currentGame.conversationAudioManager.assignOrderOfAudioAnswers();
      gameClassManager.currentGame.conversationAudioManager.assignOnendedFunctions();
      gameClassManager.currentGame.conversationAudioManager.promptAudio.play();
      gameClassManager.currentGame.partyGuestSpeechBubble.isBeingHeard = true;
    }
  }
}

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
  }

  this.assignAudioClipsToSpeechBubbles = function()
  {
    let npcGuestSpeechBubble = gameClassManager.currentGame.NPCSpeechBubble;
    npcGuestSpeechBubble.message = this.currentCorrectConversationPattern.promptAudio;

    let playerCharacterSpeechBubbleHW1A = gameClassManager.currentGame.playerCharacterSpeechBubbleHW1A;
    let playerCharacterSpeechBubbleHW1B = gameClassManager.currentGame.playerCharacterSpeechBubbleHW1B;

    let fiftyFiftyChance = Math.random();
    if (fiftyFiftyChance < 0.5)
    {
      playerCharacterSpeechBubbleHW1A.message = this.currentCorrectConversationPattern.answerAudio;

      playerCharacterSpeechBubbleHW1B.message = this.incorrectConversationPattern.answerAudio;
    }
    else
    {
      playerCharacterSpeechBubbleHW1B.message = this.currentCorrectConversationPattern.answerAudio;

      playerCharacterSpeechBubbleHW1A.message = this.incorrectConversationPattern.answerAudio;

    }
  }

}

function ConversationPattern(name,promptAudio,answerAudio)
{

  this.name = name;
  this.image = "images\\placeholderPlayButtonImage.png";

  this.promptAudioX = undefined;
  this.promptAudioY = undefined;

  this.answerAudioX = undefined;
  this.answerAudioY = undefined;

  this.promptAudio = promptAudio;

  this.answerAudio = answerAudio;

  this.draw = function()
  {
    if (this.promptAudioX !== undefined)
    {
      drawFromSheet(this.image, this.promptAudioX,this.promptAudioY, 100,100);
      //gameCanvasContext.drawImage(this.image, this.promptAudioX,this.promptAudioY, 100,100);
    }

    if (this.answerAudioX !== undefined)
    {
      drawFromSheet(this.image, this.answerAudioX,this.answerAudioY, 100,100);
      //gameCanvasContext.drawImage(this.image, this.answerAudioX,this.answerAudioY, 100,100);
    }
  }
}

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

    scopingProblemThis.promptBubble = gameClassManager.currentGame.NPCSpeechBubble;


    let fiftyFiftyChance = Math.random();
    if (fiftyFiftyChance < 0.5)
    {
      scopingProblemThis.firstAnswerBubble = gameClassManager.currentGame.playerCharacterSpeechBubbleHW1A;
      scopingProblemThis.secondAnswerBubble = gameClassManager.currentGame.playerCharacterSpeechBubbleHW1B;
    }
    else
    {
      scopingProblemThis.firstAnswerBubble = gameClassManager.currentGame.playerCharacterSpeechBubbleHW1B;
      scopingProblemThis.secondAnswerBubble = gameClassManager.currentGame.playerCharacterSpeechBubbleHW1A;
    }
  }

  this.assignOnendedFunctions = function()
  {
    let scopingProblemThis = gameClassManager.currentGame.conversationAudioManager;
    scopingProblemThis.promptBubble.message.sfx.onended = function()
    {
      scopingProblemThis.firstAnswerBubble.message.play();
      scopingProblemThis.promptBubble.isBeingHeard = false;
      scopingProblemThis.firstAnswerBubble.isBeingHeard = true;
    }

    scopingProblemThis.firstAnswerBubble.message.sfx.onended = function()
    {
      scopingProblemThis.secondAnswerBubble.message.play();
      scopingProblemThis.firstAnswerBubble.isBeingHeard = false;
      scopingProblemThis.secondAnswerBubble.isBeingHeard = true;
    }

    scopingProblemThis.secondAnswerBubble.message.sfx.onended = function()
    {
      scopingProblemThis.secondAnswerBubble.isBeingHeard = false;
      musicManager.endDuck();
    }
  }
}
