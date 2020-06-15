helloWorld2GameClass.prototype = new GameClass();
function helloWorld2GameClass()
{
  this.name = 'hello world 2 game';
  this.backgroundMusic = new MusicTrack('audio/backgroundTracks/helloWorldSong.mp3', 16);

  this.playerCharacter = undefined;
  this.NPC = undefined;
  this.defineAndInitializePlayerCharacter = function()
	{
		this.playerCharacter = new HelloWorldCharacter("images\\sprites\\dodgeBall\\Player1.png", gameCanvas.width*0.1);
    this.NPC = new HelloWorldCharacter("images\\sprites\\dodgeBall\\Player4.png", gameCanvas.width*0.8);
		// this.playerCharacter.initialize();

    this.playerCharacterSpeechBubbleHW2A = new CharacterSpeechBubbleHW2("images\\sprites\\dayTime\\speechBubbleFromLeftA.png","images\\sprites\\dayTime\\speechBubbleFromLeftAHighlighted.png", gameCanvas.width*0.1,gameCanvas.height*0.1, gameCanvas.width/3,gameCanvas.height/3);
    this.playerCharacterSpeechBubbleHW2B = new CharacterSpeechBubbleHW2("images\\sprites\\dayTime\\speechBubbleFromLeftB.png","images\\sprites\\dayTime\\speechBubbleFromLeftBHighlighted.png", gameCanvas.width*0.2,gameCanvas.height*0.3, gameCanvas.width/3,gameCanvas.height/3);
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

function CharacterSpeechBubbleHW2(image,highlightedImage, x,y, width,height)
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
      if (this.message === gameClassManager.currentGame.questionClassManager.currentCorrectQuestion.questionAudio)
      {
        amountCorrect++;
        genAudio.playPositive();
      }
      else if (this.message === gameClassManager.currentGame.questionClassManager.incorrectQuestion.questionAudio)
      {
        amountIncorrect++;
        genAudio.playNegative();
      }
      gameClassManager.currentGame.questionClassManager.chooseCorrectQuestion(gameClassManager.currentGame.currentLanguageArray);
      gameClassManager.currentGame.questionClassManager.chooseIncorrectQuestion(gameClassManager.currentGame.currentLanguageArray);
      gameClassManager.currentGame.questionClassManager.assignAudioClipsToSpeechBubbles();
      gameClassManager.currentGame.questionAudioManager.getAudioClips();
      gameClassManager.currentGame.questionAudioManager.assignOrderOfAudioQuestions();
      gameClassManager.currentGame.questionAudioManager.assignOnendedFunctions();
      gameClassManager.currentGame.imagePrompter.promptThePlayer();
    }
  }
}

function HelloWorld2ImagePrompter()
{
  this.name = 'hello world 2 image prompter';
  this.image = undefined;
  this.loadCurrentImage = function(imageToLoad)
  {
    this.image = imageToLoad;
  }

  this.backgroundColor = 'rgb(224,224,224)';
  this.currentWidth = 150;
  this.currentHeight = 150;

  this.updatePromptImage = function()
  {
    this.currentWidth += gameClassManager.currentGame.FRAME_RATE/5;
    this.currentHeight += gameClassManager.currentGame.FRAME_RATE/5;
  }

  this.drawThePrompt = function()
  {
    if (this.image !== undefined)
    {
      gameCanvasContext.fillStyle = this.backgroundColor;
      gameCanvasContext.fillRect(gameCanvas.width/2 - this.currentWidth/2,gameCanvas.height/2 - this.currentHeight/2,
                                 this.currentWidth,this.currentHeight);

     customFontFillText(["Ask this question", symbolQuestionMarkImage],
                         this.currentWidth*0.15 /*font size*/,this.currentWidth*0.055 /*spacing*/,
                         gameCanvas.width/2 - this.currentWidth/2  + this.currentWidth*0.0175,//xCoordinate
                         gameCanvas.height/2 - this.currentHeight/2);//yCoordinate
      //(img,
      //sourceImageStartingX,SourceImageStartingY,SourceImageWidthToCrop,SourceImageHeightToCrop,
      //targetCanvasXCoordinateToStartDrawing,targetCanvasYCoordinateToStartDrawing,
      //widthOfImageToDrawOnTargetCanvas,heightOfImageToDrawOnTargetCanvas);
      gameCanvasContext.drawImage(this.image,
                           0,0, 1000,750,
                           gameCanvas.width/2 - this.currentWidth/2 + this.currentWidth*0.225,
                           gameCanvas.height/2 - this.currentHeight/2 + this.currentHeight*0.2,
                           this.currentWidth*0.6,this.currentHeight*0.7);
    }

    dateAndTime.checkForNecessityOfUsingDatesForImagePrompter();
    if (dateAndTime.shouldDrawADate)
    {
      customFontFillText( (dateAndTime.dateToDraw.month + 1).toString(), this.currentWidth*0.1 /*font size*/, this.currentWidth*0.055 /*spacing*/,
                         gameCanvas.width/2 - 20, /*- this.currentWidth/2  + this.currentWidth*0.0175,*///xCoordinate)
                         gameCanvas.height/2 - this.currentHeight/2 + this.currentHeight*0.3);/* - this.currentHeight/2 + this.currentHeight*0.1);*///yCoordinate

      customFontFillText(dateAndTime.dateToDraw.day.toString(), this.currentWidth*0.15 /*font size*/,this.currentWidth*0.055 /*spacing*/,
                         gameCanvas.width/2 - 20,//xCoordinate)
                         gameCanvas.height/2);//yCoordinate
    }
  }

  this.shouldBeDrawingAPrompt = false;
  this.togglePromptingBoolean = function()
  {
    if (gameClassManager.currentGame.imagePrompter.shouldBeDrawingAPrompt === true)
    {
      gameClassManager.currentGame.imagePrompter.shouldBeDrawingAPrompt = false;
      gameClassManager.currentGame.imagePrompter.currentWidth = 150;
      gameClassManager.currentGame.imagePrompter.currentHeight = 150;
      gameClassManager.currentGame.questionAudioManager.firstQuestionBubble.message.sfx.play();
      // gameClassManager.currentGame.questionAudioManager.secondQuestionBubble.message.sfx.onended = function()
      // {
      //   console.log('second question bubble audio onended triggering');
      //   scopingProblemThis.secondQuestionBubble.isBeingHeard = false;
      //   scopingProblemThis.firstQuestionBubble.isBeingHeard = false;
      // }
			gameClassManager.currentGame.questionAudioManager.firstQuestionBubble.isBeingHeard = true;
      gameClassManager.currentGame.questionAudioManager.secondQuestionBubble.isBeingHeard = false;
    }
    else if (gameClassManager.currentGame.imagePrompter.shouldBeDrawingAPrompt === false)
    {
      gameClassManager.currentGame.imagePrompter.shouldBeDrawingAPrompt = true;
      gameClassManager.currentGame.imagePrompter.currentHeight = 150;
      gameClassManager.currentGame.imagePrompter.currentHeight = 150;
    }
  }

  this.promptThePlayer = function()
  {
    this.togglePromptingBoolean();
    setTimeout(this.togglePromptingBoolean,2000);
  }
}

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
      scopingProblemThis.secondQuestionBubble.isBeingHeard = false;
      scopingProblemThis.firstQuestionBubble.isBeingHeard = false;
    }

  }
}

function QuestionClass(name, questionAudio,promptImage)
{
  this.name = name;
  this.questionAudio = questionAudio;
  this.promptImage = promptImage;

  this.promptImageX = gameCanvas.width/2;
  this.promptImageY = gameCanvas.height/2;

  this.drawPrompt = function()
  {
    if (this.promptImageX !== undefined)
    {
      gameCanvasContext.drawImage(this.promptImage, this.promptAudioX,this.promptAudioY, 100,100);
    }
  }
}

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
