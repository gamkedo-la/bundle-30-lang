function PromptsAndAnswersManager()
{
  this.arrayOfLanguagePromptAndAnswerGroupings = [];

  this.arrayOfLogicalEnglishPromptAnswerGroupings = [];
  this.arrayOfLogicalMandarinPromptAnswerGroupings = [];
  this.arrayOfLogicalVietnamesePromptAnswerGroupings = [];

  this.customizedLanguageArray = [];

  this.currentArrayOfLogicalPromptAnswerGroupings = undefined;

  this.arrayOfCVCPromptAnswerGroupings = [];

  this.currentLogicalPromptAndAnswerGroup = undefined;

  this.assignCurrentLanguageArray = function()
  {
    this.currentArrayOfLogicalPromptAnswerGroupings = this.arrayOfLanguagePromptAndAnswerGroupings[languageSelectionScreen.languageNum];
  }

  this.pickARandomLogicalPromptAnswerGroup = function()
  {

    let randomIndexForArrayOfGroups = getRandomIntInclusive(0,promptsAndAnswersManager.currentArrayOfLogicalPromptAnswerGroupings.length - 1);
    this.currentLogicalPromptAndAnswerGroup = promptsAndAnswersManager.currentArrayOfLogicalPromptAnswerGroupings[randomIndexForArrayOfGroups];
    // console.log('*****');
    // console.log('this.currentLogicalPromptAndAnswerGroup.name: ' + this.currentLogicalPromptAndAnswerGroup.name);
  }

  this.correctTargetPromptAndAnswerPairing = {};
  this.pickATargetPromptAndAnswerPairing = function()
  {
    if(typeof this.currentLogicalPromptAndAnswerGroup === 'undefined') {
      console.log("PromptsAndAnswersManager not set up yet -- how do we fill this in with functional (even placeholder) data when this happens?");
      return;
    }
    let randomIndexFromCurrentPromptAndAnswerGroup = getRandomIntInclusive(0,this.currentLogicalPromptAndAnswerGroup.arrayOfObjects.length - 1);
    this.correctTargetPromptAndAnswerPairing = this.currentLogicalPromptAndAnswerGroup.arrayOfObjects[randomIndexFromCurrentPromptAndAnswerGroup];
    // console.log('this.correctTargetPromptAndAnswerPairing: ' + this.correctTargetPromptAndAnswerPairing.name);
    // console.log('this.currentLogicalPromptAndAnswerGroup.arrayOfObjects: ' + this.currentLogicalPromptAndAnswerGroup.arrayOfObjects);
  }

  this.assignAnswerHolderToAnswer = function(answer)
  {
    if (typeof gameClassManager.currentGame.assignAnswerHolder === 'undefined')
    {
      return;
    }
    answer.answerHolder = gameClassManager.currentGame.assignAnswerHolder();
  }

  this.currentPrompt = {};
  this.pickARandomPromptFromTargetPromptAndAnswerPairing = function()
  {
    if(typeof this.correctTargetPromptAndAnswerPairing === 'undefined' ||
        typeof this.correctTargetPromptAndAnswerPairing.arrayOfPossiblePrompts === 'undefined') {
        console.log("correctTargetPromptAndAnswerPairing not set up yet");
        return;
      }
    let randomIndexForArrayOfPossiblePrompts = getRandomIntInclusive(0,this.correctTargetPromptAndAnswerPairing.arrayOfPossiblePrompts.length - 1);
    this.currentPrompt = this.correctTargetPromptAndAnswerPairing.arrayOfPossiblePrompts[randomIndexForArrayOfPossiblePrompts];
    // console.log('this.currentPrompt: ' + this.currentPrompt);
  }


  this.dataTypeOfCurrentPrompt = undefined;
  this.defineDataTypeOfCurrentPrompt = function()
  {
    if (typeof this.currentPrompt === 'undefined') {
        console.log("currentPrompt not set up yet");
        return;
    }
    if (typeof this.currentPrompt === 'string')
    {
      this.dataTypeOfCurrentPrompt = 'string';
      textPrompter.loadCurrentText(this.currentPrompt);
    }
    else if (this.currentPrompt.nodeName === 'IMG')
    {
      this.dataTypeOfCurrentPrompt = 'IMG';
      imagePrompter.loadCurrentImage(this.currentPrompt);
    }
    else if (this.currentPrompt.type === 'AUDIO')
    {
      this.dataTypeOfCurrentPrompt = 'AUDIO';
      audioPrompter.loadCurrentAudioPrompt(this.currentPrompt);
    }
    else
    {
      console.log("unknown data type for current prompt");
    }
    // console.log('this.dataTypeOfCurrentPrompt: ' + this.dataTypeOfCurrentPrompt);
  }


  this.currentCorrectAnswer = {};
  this.removedPromptMatchToReinsertLater = undefined;
  this.assignAnAnswerBasedOnPrompt = function()
  {
    if (typeof this.correctTargetPromptAndAnswerPairing === 'undefined' ||
        typeof this.correctTargetPromptAndAnswerPairing.arrayOfPossibleAnswers === 'undefined'
    ) {
        console.log("correctTargetPromptAndAnswerPairing not set up.");
        return;
    }

    let randomIndexForPossibleAnswersArray = undefined;

    for (let arrayOfAnswersIndex = 0; arrayOfAnswersIndex < this.correctTargetPromptAndAnswerPairing.arrayOfPossibleAnswers.length; arrayOfAnswersIndex++)
    {
      if (this.correctTargetPromptAndAnswerPairing.arrayOfPossibleAnswers[arrayOfAnswersIndex] === this.currentPrompt)
      {
        this.removedPromptMatchToReinsertLater = this.correctTargetPromptAndAnswerPairing.arrayOfPossibleAnswers.splice(arrayOfAnswersIndex,1);
        randomIndexForPossibleAnswersArray = getRandomIntInclusive(0, this.correctTargetPromptAndAnswerPairing.arrayOfPossibleAnswers.length - 1);
        this.currentCorrectAnswer = this.correctTargetPromptAndAnswerPairing.arrayOfPossibleAnswers[randomIndexForPossibleAnswersArray];
      }//end of checking for prompt/answer overlap
    }//end of for loop through temporary answers array
    //console.log('this.correctTargetPromptAndAnswerPairing.arrayOfPossibleAnswers: ' + this.correctTargetPromptAndAnswerPairing.arrayOfPossibleAnswers);
    // console.log('this.currentCorrectAnswer: ' + this.currentCorrectAnswer);
  }//end of answer assignment


  this.currentAnswerDataType = undefined;
  this.definecurrentAnswerDataType = function()
  {

    if (typeof this.currentCorrectAnswer === 'undefined') {
        console.log("currentCorrectAnswer not set up.");
        return;
    }


    if (typeof this.currentCorrectAnswer === 'string')
    {
      this.currentAnswerDataType = 'string';
        let correctAnswerWidth = promptsAndAnswersManager.getCorrectAnswerWidthFromFontStyle(
            gameClassManager.currentGame.textAnswerFontStyle
        );

        //console.log('correctAnswerWidth: ' + correctAnswerWidth);
        gameClassManager.currentGame.correctTextAnswerHolderWidth = correctAnswerWidth + 20;
        //console.log('gameClassManager.currentGame.correctTextAnswerHolderWidth: ' + gameClassManager.currentGame.correctTextAnswerHolderWidth);

    } else if (this.currentCorrectAnswer.nodeName === 'IMG') {
      this.currentAnswerDataType = 'IMG';
    } else if (this.currentCorrectAnswer.type === 'AUDIO')
    {
      this.currentAnswerDataType = 'AUDIO';
    }
    // console.log('this.currentAnswerDataType: ' + this.currentAnswerDataType);
  }


  this.incorrectTargetPromptAndAnswerPairing = {};
  this.removedCorrectAnswerToReinsertLater = undefined;
  this.defineIncorrectTargetPromptAndAnswerPairing = function()
  {
    if (typeof this.currentLogicalPromptAndAnswerGroup === 'undefined') {
        console.log("currentLogicalPromptAndAnswerGroup not set up.");
        return;
    }

    // console.log('this.currentLogicalPromptAndAnswerGroup: ' + this.currentLogicalPromptAndAnswerGroup.name);
    for (let logicalPromptAndAnswerGroupIndex = 0; logicalPromptAndAnswerGroupIndex < this.currentLogicalPromptAndAnswerGroup.arrayOfObjects.length; logicalPromptAndAnswerGroupIndex++)
    {
      if (this.correctTargetPromptAndAnswerPairing === this.currentLogicalPromptAndAnswerGroup.arrayOfObjects[logicalPromptAndAnswerGroupIndex])
      {
        // console.log('inside splice call for editable group');
        this.removedCorrectAnswerToReinsertLater = this.currentLogicalPromptAndAnswerGroup.arrayOfObjects.splice(logicalPromptAndAnswerGroupIndex,1);
        // console.log('this.removedCorrectAnswerToReinsertLater[0].name: ' + this.removedCorrectAnswerToReinsertLater[0].name);
      }
    }

    let randomIndexForEditedPromptAndAnswerGroup = getRandomIntInclusive(0,this.currentLogicalPromptAndAnswerGroup.arrayOfObjects.length - 1);
    this.incorrectTargetPromptAndAnswerPairing = this.currentLogicalPromptAndAnswerGroup.arrayOfObjects[randomIndexForEditedPromptAndAnswerGroup];
  }

  this.reinsertAnswersIntoEditedArrayForNextShuffle = function()
  {
    if (!this.correctTargetPromptAndAnswerPairing || !this.correctTargetPromptAndAnswerPairing.arrayOfPossibleAnswers) return; // can be undefined here!

    this.correctTargetPromptAndAnswerPairing.arrayOfPossibleAnswers.push(this.removedPromptMatchToReinsertLater[0]);
    // console.log('this.removedPromptMatchToReinsertLater: ' + this.removedPromptMatchToReinsertLater[0].name);
    this.currentLogicalPromptAndAnswerGroup.arrayOfObjects.push(this.removedCorrectAnswerToReinsertLater[0]);
    // console.log('this.removedCorrectAnswerToReinsertLater.name: ' + this.removedCorrectAnswerToReinsertLater[0].name);
  }

  this.defineWidthAndHeightForTargetAnswers = function()
  {
    if (this.currentAnswerDataType === "AUDIO")
    {
      this.correctTargetPromptAndAnswerPairing.width = drawAnswersManager.audioImageAnswerWidth;
      this.incorrectTargetPromptAndAnswerPairing.width = drawAnswersManager.audioImageAnswerWidth;
      this.correctTargetPromptAndAnswerPairing.height = drawAnswersManager.audioImageAnswerHeight;
      this.incorrectTargetPromptAndAnswerPairing.height = drawAnswersManager.audioImageAnswerHeight;
    }
    else if (this.currentAnswerDataType === "IMG")
    {
      this.correctTargetPromptAndAnswerPairing.width = drawAnswersManager.imageAnswerWidth;
      this.incorrectTargetPromptAndAnswerPairing.width = drawAnswersManager.imageAnswerWidth;
      this.correctTargetPromptAndAnswerPairing.height = drawAnswersManager.imageAnswerHeight;
      this.incorrectTargetPromptAndAnswerPairing.height = drawAnswersManager.imageAnswerHeight;
    }
    else if (this.currentAnswerDataType === 'string')
    {
      // this.correctTargetPromptAndAnswerPairing.width = this.getCorrectAnswerWidthFromFontStyle(drawAnswersManager.fontStyle);
      // this.incorrectTargetPromptAndAnswerPairing.width = this.getIncorrectAnswerWidthFromFontStyle(drawAnswersManager.fontStyle);
      // this.correctTargetPromptAndAnswerPairing.height = 20;//measureText does not provide height
      // this.incorrectTargetPromptAndAnswerPairing.height = 20;//measureText does not provide height
    }
  }

  this.currentIncorrectAnswer = {};
  this.assignCurrentIncorrectAnswer = function()
  {
    //console.log('inside assignCurrentIncorrectAnswer()');
    if (typeof this.incorrectTargetPromptAndAnswerPairing === 'undefined' ||
        typeof this.incorrectTargetPromptAndAnswerPairing.arrayOfPossibleAnswers === 'undefined'
    ) {
        console.log("this.incorrectTargetPromptAndAnswerPairing not set up");
        return;
    }

    let randomIndexForEditedPromptAndAnswerGroup = getRandomIntInclusive(0,this.incorrectTargetPromptAndAnswerPairing.arrayOfPossibleAnswers.length - 1);

    for (let arrayOfPossibleAnswersIndex = 0; arrayOfPossibleAnswersIndex < this.incorrectTargetPromptAndAnswerPairing.arrayOfPossibleAnswers.length; arrayOfPossibleAnswersIndex++)
    {
        let currentIncorrectAnswerDataType = undefined;
        if (typeof this.incorrectTargetPromptAndAnswerPairing.arrayOfPossibleAnswers[arrayOfPossibleAnswersIndex] === 'string')
        {
          currentIncorrectAnswerDataType = 'string';
          if (currentIncorrectAnswerDataType !== undefined)
          {
            if (this.currentAnswerDataType === currentIncorrectAnswerDataType)
            {
              this.currentIncorrectAnswer = this.incorrectTargetPromptAndAnswerPairing.arrayOfPossibleAnswers[arrayOfPossibleAnswersIndex];
            }
          }

            gameClassManager.currentGame.incorrectTextAnswerHolderWidth =
            promptsAndAnswersManager.getIncorrectAnswerWidthFromFontStyle(
                gameClassManager.currentGame.textAnswerFontStyle
            ) + 20;

        }
        else if (this.incorrectTargetPromptAndAnswerPairing.arrayOfPossibleAnswers[arrayOfPossibleAnswersIndex].nodeName === 'IMG')
        {
          currentIncorrectAnswerDataType = 'IMG';
          if (currentIncorrectAnswerDataType !== undefined)
          {
            if (this.currentAnswerDataType === currentIncorrectAnswerDataType)
            {
              this.currentIncorrectAnswer = this.incorrectTargetPromptAndAnswerPairing.arrayOfPossibleAnswers[arrayOfPossibleAnswersIndex];
            }
          }
        }
        else if (this.incorrectTargetPromptAndAnswerPairing.arrayOfPossibleAnswers[arrayOfPossibleAnswersIndex].type === 'AUDIO')
        {
          currentIncorrectAnswerDataType = 'AUDIO';
          if (currentIncorrectAnswerDataType !== undefined)
          {
            if (this.currentAnswerDataType === currentIncorrectAnswerDataType)
            {
              this.currentIncorrectAnswer = this.incorrectTargetPromptAndAnswerPairing.arrayOfPossibleAnswers[arrayOfPossibleAnswersIndex];
            }
          }
        }
    }
    // console.log('this.currentIncorrectAnswer: ' + this.currentIncorrectAnswer);
  }

  this.getTextWidthFromFontStyle = function(text, fontStyle){
    gameCanvasContext.save();
    gameCanvasContext.font = fontStyle;
    var textWidth = gameCanvasContext.measureText(text).width;
    gameCanvasContext.restore();
    return textWidth;
  }

  this.getCorrectAnswerWidthFromFontStyle = function(fontStyle){
    if (this.currentAnswerDataType != 'string'){
      console.log("This answer is not a string, cannot measure for text width");
      return;
    }

    return this.getTextWidthFromFontStyle(this.currentCorrectAnswer, fontStyle);
  }

  this.getIncorrectAnswerWidthFromFontStyle = function(fontStyle){
    if (this.currentAnswerDataType != 'string'){
      // console.log("This answer is not a string, cannot measure for text width");
      return;
    }

    return this.getTextWidthFromFontStyle(this.currentIncorrectAnswer, fontStyle);
  }

  this.checkIfObjectsAreTooCloseToEachOther = function(
    firstObjectX,firstObjectY, secondObjectX,secondObjectY, minDistanceFromEachOther)
  {
  return (
      Math.abs(firstObjectX - secondObjectX) < minDistanceFromEachOther &&
      Math.abs(firstObjectY - secondObjectY) < minDistanceFromEachOther
    )
  }

  this.checkIfObjectsXCoordinatesAreTooCloseToEachOther = function(firstObjectX,secondObjectX, minDistanceFromEachOther)
  {
    return (Math.abs(firstObjectX - secondObjectX) < minDistanceFromEachOther)
  }

  this.pickRandomCoordinatesWithinCanvasAndAwayFromCharacter = function()
  {
    let randomXCoordinate = undefined;
    let randomYCoordinate = undefined;
    let currentPlayerCharacter = gameClassManager.currentGame.playerCharacter;
    //console.log('currentPlayerCharacter.name: ' + currentPlayerCharacter.name);
    randomXCoordinate = getRandomIntWithExclusionaryRange(0,gameCanvas.width - 100, currentPlayerCharacter.x - 40,currentPlayerCharacter.x + 60);
    randomYCoordinate = getRandomIntWithExclusionaryRange(0,gameCanvas.height - 100, currentPlayerCharacter.y - 40,currentPlayerCharacter.y + 60);
    return {randomXCoordinate,randomYCoordinate};
  }

  this.defineXAndYCoordinatesForTargets = function()
  {
    if (gameClassManager.currentGame.name === 'Snake Game' || gameClassManager.currentGame.name === 'birdGame'
        || gameClassManager.currentGame.name === 'spaceShooter')
    {
      let correctAnswerCoordinates = this.pickRandomCoordinatesWithinCanvasAndAwayFromCharacter();
      let incorrectAnswerCoordinates = this.pickRandomCoordinatesWithinCanvasAndAwayFromCharacter();
      let currentPlayerCharacter = gameClassManager.currentGame.playerCharacter;
      while(
        this.checkIfObjectsAreTooCloseToEachOther(
          incorrectAnswerCoordinates.randomXCoordinate,incorrectAnswerCoordinates.randomYCoordinate,
          correctAnswerCoordinates.randomXCoordinate,correctAnswerCoordinates.randomYCoordinate, 300)

          ||

        this.checkIfObjectsAreTooCloseToEachOther(
          incorrectAnswerCoordinates.randomXCoordinate,incorrectAnswerCoordinates.randomYCoordinate,
          currentPlayerCharacter.x,currentPlayerCharacter.y, 60)
      )
      {
        incorrectAnswerCoordinates = this.pickRandomCoordinatesWithinCanvasAndAwayFromCharacter();
      }
      this.correctTargetPromptAndAnswerPairing.xCoordinate = correctAnswerCoordinates.randomXCoordinate;
      this.correctTargetPromptAndAnswerPairing.yCoordinate = correctAnswerCoordinates.randomYCoordinate;

      this.incorrectTargetPromptAndAnswerPairing.xCoordinate = incorrectAnswerCoordinates.randomXCoordinate;
      this.incorrectTargetPromptAndAnswerPairing.yCoordinate = incorrectAnswerCoordinates.randomYCoordinate;
    }
    else if (gameClassManager.currentGame.name === 'airGrabGame')
    {
      let correctAnswerCoordinates = {x:getRandomIntInclusive(120,480),y:getRandomIntInclusive(120,520)};
      let incorrectAnswerCoordinates = {x:getRandomIntInclusive(120,480),y:getRandomIntInclusive(120,520)};

      this.correctTargetPromptAndAnswerPairing.xCoordinate = correctAnswerCoordinates.x;
      this.correctTargetPromptAndAnswerPairing.yCoordinate = correctAnswerCoordinates.y;

      this.incorrectTargetPromptAndAnswerPairing.xCoordinate = incorrectAnswerCoordinates.x;
      this.incorrectTargetPromptAndAnswerPairing.yCoordinate = incorrectAnswerCoordinates.y;
    }
    else if (gameClassManager.currentGame.name === 'laneGame')
    {
      let randomNumber = Math.random();
      if (randomNumber < 0.5)
      {
        this.correctTargetPromptAndAnswerPairing.xCoordinate = laneGame.carLeftLanePosition - 25;
        this.correctTargetPromptAndAnswerPairing.yCoordinate = -75;
        this.incorrectTargetPromptAndAnswerPairing.xCoordinate = laneGame.carRightLanePosition - 25;
        this.incorrectTargetPromptAndAnswerPairing.yCoordinate = -75;
      }
      else
      {
        this.correctTargetPromptAndAnswerPairing.xCoordinate = laneGame.carRightLanePosition - 25;
        this.correctTargetPromptAndAnswerPairing.yCoordinate = -75;
        this.incorrectTargetPromptAndAnswerPairing.xCoordinate = laneGame.carLeftLanePosition - 25;
        this.incorrectTargetPromptAndAnswerPairing.yCoordinate = -75;
      }
    }
    else if (gameClassManager.currentGame.name === 'jumperGame')
    {
      let audioAnswerOffset = -110;
      let imageAnswerOffset = -120;
      let stringAnswerOffset = -40;
      let currentOffset = undefined;

      if (this.currentAnswerDataType === 'AUDIO')
      {
        currentOffset = audioAnswerOffset;
      }
      else if (this.currentAnswerDataType === 'IMG')
      {
        currentOffset = imageAnswerOffset;
      }
      else if (this.currentAnswerDataType === 'string')
      {
        currentOffset = stringAnswerOffset;
      }


      this.correctTargetPromptAndAnswerPairing.xCoordinate =
      getRandomIntWithExclusionaryRange(0,gameCanvas.width - 100,
      Math.floor(gameClassManager.currentGame.playerCharacter.x - 40),Math.floor(gameClassManager.currentGame.playerCharacter.x + 100));
      let randomPlatformIndex = (getRandomIntInclusive(1,7)*100) + currentOffset;
      this.correctTargetPromptAndAnswerPairing.yCoordinate = randomPlatformIndex;


      this.incorrectTargetPromptAndAnswerPairing.xCoordinate =
      getRandomIntWithExclusionaryRange(0,gameCanvas.width - 100,
      Math.floor(gameClassManager.currentGame.playerCharacter.x - 40),Math.floor(gameClassManager.currentGame.playerCharacter.x + 100));
      randomPlatformIndex = (getRandomIntInclusive(1,7)*100) + currentOffset;
      this.incorrectTargetPromptAndAnswerPairing.yCoordinate = randomPlatformIndex;



      while(
        this.checkIfObjectsAreTooCloseToEachOther(
          this.incorrectTargetPromptAndAnswerPairing.xCoordinate,this.incorrectTargetPromptAndAnswerPairing.yCoordinate,
          this.correctTargetPromptAndAnswerPairing.xCoordinate,this.correctTargetPromptAndAnswerPairing.yCoordinate, 100)

          ||

        this.checkIfObjectsAreTooCloseToEachOther(
          this.incorrectTargetPromptAndAnswerPairing.xCoordinate,this.incorrectTargetPromptAndAnswerPairing.yCoordinate,
          gameClassManager.currentGame.playerCharacter.x,gameClassManager.currentGame.playerCharacter.y, 100)
      )
      {
        this.incorrectTargetPromptAndAnswerPairing.xCoordinate =
        getRandomIntWithExclusionaryRange(0,gameCanvas.width - 100,
        Math.floor(gameClassManager.currentGame.playerCharacter.x - 40),Math.floor(gameClassManager.currentGame.playerCharacter.x + 100));
        randomPlatformIndex = (getRandomIntInclusive(1,7)*100) + currentOffset;
        this.incorrectTargetPromptAndAnswerPairing.yCoordinate = randomPlatformIndex;
      }


    }
    else if (gameClassManager.currentGame.name === 'finder game')
    {
      let fiftyFiftyResult = Math.random();
      if (fiftyFiftyResult <= 0.5)
      {
        this.incorrectTargetPromptAndAnswerPairing.xCoordinate = 0;
        this.incorrectTargetPromptAndAnswerPairing.yCoordinate = 50;

        this.correctTargetPromptAndAnswerPairing.xCoordinate = 0;
        this.correctTargetPromptAndAnswerPairing.yCoordinate = gameCanvas.height/2 + 50;
      }
      else if (fiftyFiftyResult > 0.5)
      {
        this.correctTargetPromptAndAnswerPairing.xCoordinate = 0;
        this.correctTargetPromptAndAnswerPairing.yCoordinate = 50;

        this.incorrectTargetPromptAndAnswerPairing.xCoordinate = 0;
        this.incorrectTargetPromptAndAnswerPairing.yCoordinate = gameCanvas.height/2 + 50;
      }
    }
    else if (gameClassManager.currentGame.name === 'frogRiverGame')
    {
      let answerCount = frogRiverGame.answerCount;
      let additive = frogRiverGame.additiveToAnswers;

      let randomNumber = Math.random();
      if (randomNumber < 0.5)
      {
        frogRiverGame.lilyPadManager.arrayOfLilyPads[answerCount + additive].answer = this.correctTargetPromptAndAnswerPairing;
        frogRiverGame.lilyPadManager.arrayOfLilyPads[answerCount + additive + 1].answer = this.incorrectTargetPromptAndAnswerPairing;

        this.correctTargetPromptAndAnswerPairing.xCoordinate = frogRiverGame.lilyPadManager.arrayOfLilyPads[answerCount + additive].xCoordinate;
        this.correctTargetPromptAndAnswerPairing.yCoordinate = frogRiverGame.lilyPadManager.arrayOfLilyPads[answerCount + additive].yCoordinate;
        this.incorrectTargetPromptAndAnswerPairing.xCoordinate = frogRiverGame.lilyPadManager.arrayOfLilyPads[answerCount + additive + 1].xCoordinate;
        this.incorrectTargetPromptAndAnswerPairing.yCoordinate = frogRiverGame.lilyPadManager.arrayOfLilyPads[answerCount + additive + 1].yCoordinate;
      }
      else
      {
        frogRiverGame.lilyPadManager.arrayOfLilyPads[answerCount + additive].answer = this.incorrectTargetPromptAndAnswerPairing;
        frogRiverGame.lilyPadManager.arrayOfLilyPads[answerCount + additive + 1].answer = this.correctTargetPromptAndAnswerPairing;

        this.incorrectTargetPromptAndAnswerPairing.xCoordinate = frogRiverGame.lilyPadManager.arrayOfLilyPads[answerCount + additive + 1].xCoordinate;
        this.incorrectTargetPromptAndAnswerPairing.yCoordinate = frogRiverGame.lilyPadManager.arrayOfLilyPads[answerCount + additive + 1].yCoordinate;
        this.correctTargetPromptAndAnswerPairing.xCoordinate = frogRiverGame.lilyPadManager.arrayOfLilyPads[answerCount + additive].xCoordinate;
        this.correctTargetPromptAndAnswerPairing.yCoordinate = frogRiverGame.lilyPadManager.arrayOfLilyPads[answerCount + additive].yCoordinate;
      }

      // Center the y coordinate
      var lilyPadHeight = frogRiverGame.lilyPadManager.arrayOfLilyPads[0].height;
      var yCoordinateOffset = lilyPadHeight / 2;

      if (this.currentAnswerDataType === 'string'){
        yCoordinateOffset += frogRiverGame.textAnswerFontSize / 4;
      }
      else if (this.currentAnswerDataType === 'IMG'){
        yCoordinateOffset -= frogRiverGame.imageAnswerHeight / 2;
      }
      else if (this.currentAnswerDataType === 'AUDIO'){
        yCoordinateOffset -= frogRiverGame.audioImageAnswerWidth / 2;
      }
      
      this.incorrectTargetPromptAndAnswerPairing.yCoordinate += yCoordinateOffset;
      this.correctTargetPromptAndAnswerPairing.yCoordinate += yCoordinateOffset;

    }
    else if (gameClassManager.currentGame.name === 'Pass or Block Game')
    {
      this.correctTargetPromptAndAnswerPairing.xCoordinate = getRandomIntInclusive(0,gameCanvas.width - 100);
      this.incorrectTargetPromptAndAnswerPairing.xCoordinate = getRandomIntInclusive(0,gameCanvas.width - 100);
      while(
        this.checkIfObjectsXCoordinatesAreTooCloseToEachOther(this.correctTargetPromptAndAnswerPairing.xCoordinate,this.incorrectTargetPromptAndAnswerPairing.xCoordinate, 130)
      )
      {
        this.incorrectTargetPromptAndAnswerPairing.xCoordinate = getRandomIntInclusive(0,gameCanvas.width - 100);
      }


      this.correctTargetPromptAndAnswerPairing.yCoordinate = 0;
      this.incorrectTargetPromptAndAnswerPairing.yCoordinate = 0;
    }
    else if(gameClassManager.currentGame.name === "flowerGame"){
      let randomNumber = Math.random();
      if (randomNumber < 0.5)
      {
        this.correctTargetPromptAndAnswerPairing.xCoordinate = flowerGame.seedOneXCoordinate -25;
        this.correctTargetPromptAndAnswerPairing.yCoordinate = -10;
        this.incorrectTargetPromptAndAnswerPairing.xCoordinate = flowerGame.seedTwoXCoordinate-25;
        this.incorrectTargetPromptAndAnswerPairing.yCoordinate = -10;


      }
      else
      {
        this.correctTargetPromptAndAnswerPairing.xCoordinate = flowerGame.seedTwoXCoordinate-25;
        this.correctTargetPromptAndAnswerPairing.yCoordinate = -10;
        this.incorrectTargetPromptAndAnswerPairing.xCoordinate = flowerGame.seedOneXCoordinate-25;
        this.incorrectTargetPromptAndAnswerPairing.yCoordinate = -10;
      }
    }
    else if(gameClassManager.currentGame.name === "MazeGame"){
      this.correctTargetPromptAndAnswerPairing.xCoordinate = getRandomIntInclusive(0,gameCanvas.width - 1);
      this.correctTargetPromptAndAnswerPairing.yCoordinate = getRandomIntInclusive(0,gameCanvas.height - 1);
      this.incorrectTargetPromptAndAnswerPairing.xCoordinate = getRandomIntInclusive(0,gameCanvas.width - 1);
      this.incorrectTargetPromptAndAnswerPairing.yCoordinate = getRandomIntInclusive(0,gameCanvas.height - 1);
    }
	else if (gameClassManager.currentGame == runnerGame)
	{
	  const pairingsCoords = runnerGame.getPromptAndAnswerPairingsCoordinates();
	  this.correctTargetPromptAndAnswerPairing.xCoordinate = pairingsCoords.correct.x;
	  this.correctTargetPromptAndAnswerPairing.yCoordinate = pairingsCoords.correct.y;
	  this.incorrectTargetPromptAndAnswerPairing.xCoordinate = pairingsCoords.incorrect.x;
	  this.incorrectTargetPromptAndAnswerPairing.yCoordinate = pairingsCoords.incorrect.y;
	}
  else if (gameClassManager.currentGame === nighttimeGame)
  {
    let fiftyFiftyResult = Math.random();
    let ghost1 = gameClassManager.currentGame.ghost1;
    let ghost2 = gameClassManager.currentGame.ghost2;
    {
      if (fiftyFiftyResult <= 0.5)
      {
        ghost1.isCorrectAnswer = true;
        this.correctTargetPromptAndAnswerPairing.xCoordinate = ghost1.answerX;
        this.correctTargetPromptAndAnswerPairing.yCoordinate = ghost1.answerY;

        ghost2.isCorrectAnswer = false;
        this.incorrectTargetPromptAndAnswerPairing.xCoordinate = ghost2.answerX;
        this.incorrectTargetPromptAndAnswerPairing.yCoordinate = ghost2.answerY;
      }
      else if (fiftyFiftyResult > 0.5)
      {
        ghost2.isCorrectAnswer = true;
        this.correctTargetPromptAndAnswerPairing.xCoordinate = ghost2.answerX;
        this.correctTargetPromptAndAnswerPairing.yCoordinate = ghost2.answerY;

        ghost1.isCorrectAnswer = false;
        this.incorrectTargetPromptAndAnswerPairing.xCoordinate = ghost1.answerX;
        this.incorrectTargetPromptAndAnswerPairing.yCoordinate = ghost1.answerY;
      }
    }
  }
  else if (gameClassManager.currentGame.name === 'frog crate game')
  {
    let fiftyFiftyResult = Math.random();
    let fly1 = gameClassManager.currentGame.fly1;
    let fly2 = gameClassManager.currentGame.fly2;
    {
      if (fiftyFiftyResult <= 0.5)
      {
        fly1.isCorrectAnswer = true;
        this.correctTargetPromptAndAnswerPairing.xCoordinate = fly1.answerX;
        this.correctTargetPromptAndAnswerPairing.yCoordinate = fly1.answerY;

        fly2.isCorrectAnswer = false;
        this.incorrectTargetPromptAndAnswerPairing.xCoordinate = fly2.answerX;
        this.incorrectTargetPromptAndAnswerPairing.yCoordinate = fly2.answerY;
      }
      else if (fiftyFiftyResult > 0.5)
      {
        fly2.isCorrectAnswer = true;
        this.correctTargetPromptAndAnswerPairing.xCoordinate = fly2.answerX;
        this.correctTargetPromptAndAnswerPairing.yCoordinate = fly2.answerY;

        fly1.isCorrectAnswer = false;
        this.incorrectTargetPromptAndAnswerPairing.xCoordinate = fly1.answerX;
        this.incorrectTargetPromptAndAnswerPairing.yCoordinate = fly1.answerY;
      }
    }
  }
  else if (gameClassManager.currentGame.name === 'egg catch game')
  {
    let fiftyFiftyResult = Math.random();
    let chicken1 = gameClassManager.currentGame.chicken1;
    let chicken2 = gameClassManager.currentGame.chicken2;

    if (fiftyFiftyResult < 0.5)
    {
      this.correctTargetPromptAndAnswerPairing.xCoordinate = chicken1.eggStartingX;
      this.correctTargetPromptAndAnswerPairing.yCoordinate = chicken1.eggStartingY;
      this.incorrectTargetPromptAndAnswerPairing.xCoordinate = chicken2.eggStartingX;
      this.incorrectTargetPromptAndAnswerPairing.yCoordinate = chicken2.eggStartingY;
    }
    else if (fiftyFiftyResult >= 0.5)
    {
      this.correctTargetPromptAndAnswerPairing.xCoordinate = chicken2.eggStartingX;
      this.correctTargetPromptAndAnswerPairing.yCoordinate = chicken2.eggStartingY;
      this.incorrectTargetPromptAndAnswerPairing.xCoordinate = chicken1.eggStartingX;
      this.incorrectTargetPromptAndAnswerPairing.yCoordinate = chicken1.eggStartingY;
    }
  }
    else if (gameClassManager.currentGame.name === 'whack an answer game')
    {
      let randomGridIndex1 = getRandomIntInclusive(0,8);
      let randomGridIndex2 = getRandomIntInclusive(0,8);
      while (randomGridIndex1 === randomGridIndex2)
      {
        randomGridIndex2 = getRandomIntInclusive(0,8);
      }

      this.correctTargetPromptAndAnswerPairing.whackAnAnswerGridIndex = randomGridIndex1;
      this.incorrectTargetPromptAndAnswerPairing.whackAnAnswerGridIndex = randomGridIndex2;

      let randomDirectionNumber = Math.random();
      console.log('randomDirectionNumber: ' + randomDirectionNumber);
      if (randomDirectionNumber >= 0.75)
      {
        this.correctTargetPromptAndAnswerPairing.whackAnAnswerPositionName = 'left';
      }
      else if (randomDirectionNumber >= 0.5 && randomDirectionNumber < 0.75)
      {
        this.correctTargetPromptAndAnswerPairing.whackAnAnswerPositionName = 'below';
      }
      else if (randomDirectionNumber >= 0.25 && randomDirectionNumber < 0.5)
      {
        this.correctTargetPromptAndAnswerPairing.whackAnAnswerPositionName = 'right';
      }
      else if (randomDirectionNumber < 0.25)
      {
        this.correctTargetPromptAndAnswerPairing.whackAnAnswerPositionName = 'above';
      }

      randomDirectionNumber = Math.random();
      console.log('randomDirectionNumber: ' + randomDirectionNumber);

      if (randomDirectionNumber >= 0.75)
      {
        this.incorrectTargetPromptAndAnswerPairing.whackAnAnswerPositionName = 'left';
      }
      else if (randomDirectionNumber >= 0.5 && randomDirectionNumber < 0.75)
      {
        this.incorrectTargetPromptAndAnswerPairing.whackAnAnswerPositionName = 'below';
      }
      else if (randomDirectionNumber >= 0.25 && randomDirectionNumber < 0.5)
      {
        this.incorrectTargetPromptAndAnswerPairing.whackAnAnswerPositionName = 'right';
      }
      else if (randomDirectionNumber < 0.25)
      {
        this.incorrectTargetPromptAndAnswerPairing.whackAnAnswerPositionName = 'above';
      }

      let correctAnswerXOffSet = undefined;
      let correctAnswerYOffSet = undefined;
      let incorrectAnswerXOffSet = undefined;
      let incorrectAnswerYOffSet = undefined;

      if (this.currentAnswerDataType === "AUDIO" &&
          this.correctTargetPromptAndAnswerPairing.whackAnAnswerPositionName === 'left')
      {
        correctAnswerXOffSet = -55;
        correctAnswerYOffSet = 20;
      }
      else if (this.currentAnswerDataType === "AUDIO" &&
               this.correctTargetPromptAndAnswerPairing.whackAnAnswerPositionName === 'above')
      {
        correctAnswerXOffSet = 35;
        correctAnswerYOffSet = -75;
      }
      else if (this.currentAnswerDataType === "AUDIO" &&
               this.correctTargetPromptAndAnswerPairing.whackAnAnswerPositionName === 'right')
      {
        correctAnswerXOffSet = 140;
        correctAnswerYOffSet = 30;
      }
      else if (this.currentAnswerDataType === "AUDIO" &&
               this.correctTargetPromptAndAnswerPairing.whackAnAnswerPositionName === 'below')
      {
        correctAnswerXOffSet = 35;
        correctAnswerYOffSet = 125;
      }
      else if (this.currentAnswerDataType === "IMG" &&
               this.correctTargetPromptAndAnswerPairing.whackAnAnswerPositionName === 'left')
      {
        correctAnswerXOffSet = -45;
        correctAnswerYOffSet = 30;
      }
      else if (this.currentAnswerDataType === "IMG" &&
               this.correctTargetPromptAndAnswerPairing.whackAnAnswerPositionName === 'above')
      {
        correctAnswerXOffSet = 25;
        correctAnswerYOffSet = -75;
      }
      else if (this.currentAnswerDataType === "IMG" &&
               this.correctTargetPromptAndAnswerPairing.whackAnAnswerPositionName === 'right')
      {
        correctAnswerXOffSet = 145;
        correctAnswerYOffSet = 25;
      }
      else if (this.currentAnswerDataType === "IMG" &&
               this.correctTargetPromptAndAnswerPairing.whackAnAnswerPositionName === 'below')
      {
        correctAnswerXOffSet = 30;
        correctAnswerYOffSet = 125;
      }
      else if (this.currentAnswerDataType === "string" &&
               this.correctTargetPromptAndAnswerPairing.whackAnAnswerPositionName === 'left')
      {
        correctAnswerXOffSet = -35;
        correctAnswerYOffSet = 85;
      }
      else if (this.currentAnswerDataType === "string" &&
               this.correctTargetPromptAndAnswerPairing.whackAnAnswerPositionName === 'above')
      {
        correctAnswerXOffSet = 50;
        correctAnswerYOffSet = -30;
      }
      else if (this.currentAnswerDataType === "string" &&
               this.correctTargetPromptAndAnswerPairing.whackAnAnswerPositionName === 'right')
      {
        correctAnswerXOffSet = 150;
        correctAnswerYOffSet = 80;
      }
      else if (this.currentAnswerDataType === "string" &&
               this.correctTargetPromptAndAnswerPairing.whackAnAnswerPositionName === 'below')
      {
        correctAnswerXOffSet = 60;
        correctAnswerYOffSet = 175;
      }


      if (this.currentAnswerDataType === "AUDIO" &&
          this.incorrectTargetPromptAndAnswerPairing.whackAnAnswerPositionName === 'left')
      {
        incorrectAnswerXOffSet = -55;
        incorrectAnswerYOffSet = 20;
      }
      else if (this.currentAnswerDataType === "AUDIO" &&
               this.incorrectTargetPromptAndAnswerPairing.whackAnAnswerPositionName === 'above')
      {
        incorrectAnswerXOffSet = 35;
        incorrectAnswerYOffSet = -75;
      }
      else if (this.currentAnswerDataType === "AUDIO" &&
               this.incorrectTargetPromptAndAnswerPairing.whackAnAnswerPositionName === 'right')
      {
        incorrectAnswerXOffSet = 140;
        incorrectAnswerYOffSet = 30;
      }
      else if (this.currentAnswerDataType === "AUDIO" &&
               this.incorrectTargetPromptAndAnswerPairing.whackAnAnswerPositionName === 'below')
      {
        incorrectAnswerXOffSet = 35;
        incorrectAnswerYOffSet = 125;
      }
      else if (this.currentAnswerDataType === "IMG" &&
               this.incorrectTargetPromptAndAnswerPairing.whackAnAnswerPositionName === 'left')
      {
        incorrectAnswerXOffSet = -45;
        incorrectAnswerYOffSet = 30;
      }
      else if (this.currentAnswerDataType === "IMG" &&
               this.incorrectTargetPromptAndAnswerPairing.whackAnAnswerPositionName === 'above')
      {
        incorrectAnswerXOffSet = 25;
        incorrectAnswerYOffSet = -75;
      }
      else if (this.currentAnswerDataType === "IMG" &&
               this.incorrectTargetPromptAndAnswerPairing.whackAnAnswerPositionName === 'right')
      {
        incorrectAnswerXOffSet = 145;
        incorrectAnswerYOffSet = 25;
      }
      else if (this.currentAnswerDataType === "IMG" &&
               this.incorrectTargetPromptAndAnswerPairing.whackAnAnswerPositionName === 'below')
      {
        incorrectAnswerXOffSet = 30;
        incorrectAnswerYOffSet = 125;
      }
      else if (this.currentAnswerDataType === "string" &&
               this.incorrectTargetPromptAndAnswerPairing.whackAnAnswerPositionName === 'left')
      {
        incorrectAnswerXOffSet = -35;
        incorrectAnswerYOffSet = 80;
      }
      else if (this.currentAnswerDataType === "string" &&
               this.incorrectTargetPromptAndAnswerPairing.whackAnAnswerPositionName === 'above')
      {
        incorrectAnswerXOffSet = 50;
        incorrectAnswerYOffSet = -30;
      }
      else if (this.currentAnswerDataType === "string" &&
               this.incorrectTargetPromptAndAnswerPairing.whackAnAnswerPositionName === 'right')
      {
        incorrectAnswerXOffSet = 150;
        incorrectAnswerYOffSet = 80;
      }
      else if (this.currentAnswerDataType === "string" &&
               this.incorrectTargetPromptAndAnswerPairing.whackAnAnswerPositionName === 'below')
      {
        incorrectAnswerXOffSet = 60;
        incorrectAnswerYOffSet = 175;
      }


      this.correctTargetPromptAndAnswerPairing.oscillationVelocity = getRandomArbitrary(0.1,0.3);
      this.incorrectTargetPromptAndAnswerPairing.oscillationVelocity = getRandomArbitrary(0.1,0.3);

      this.correctTargetPromptAndAnswerPairing.whackAnAnswerXStartingPosition = gameClassManager.currentGame.background.grid[randomGridIndex1].x + correctAnswerXOffSet;
      this.correctTargetPromptAndAnswerPairing.xCoordinate = this.correctTargetPromptAndAnswerPairing.whackAnAnswerXStartingPosition;
      this.correctTargetPromptAndAnswerPairing.whackAnAnswerYStartingPosition = gameClassManager.currentGame.background.grid[randomGridIndex1].y + correctAnswerYOffSet;
      this.correctTargetPromptAndAnswerPairing.yCoordinate = this.correctTargetPromptAndAnswerPairing.whackAnAnswerYStartingPosition;

      this.incorrectTargetPromptAndAnswerPairing.whackAnAnswerXStartingPosition = gameClassManager.currentGame.background.grid[randomGridIndex2].x + incorrectAnswerXOffSet;
      this.incorrectTargetPromptAndAnswerPairing.xCoordinate = this.incorrectTargetPromptAndAnswerPairing.whackAnAnswerXStartingPosition;
      this.incorrectTargetPromptAndAnswerPairing.whackAnAnswerYStartingPosition = gameClassManager.currentGame.background.grid[randomGridIndex2].y + incorrectAnswerYOffSet;
      this.incorrectTargetPromptAndAnswerPairing.yCoordinate = this.incorrectTargetPromptAndAnswerPairing.whackAnAnswerYStartingPosition;
    }
    else if (gameClassManager.currentGame.name === "flying bee game")
    {
      let leftBoundaryX = 150;
      let leftBoundaryY = 550;
      let rightBoundaryX = 475;
      let rightBoundaryTopY = 50;
      let rightBoundaryBottomY = 435;
      let fiftyFiftyResult = Math.random();

      if (gameClassManager.currentGame.answersOnLeftSide === true)
      {
        this.correctTargetPromptAndAnswerPairing.xCoordinate = getRandomArbitrary(0,leftBoundaryX);
        this.correctTargetPromptAndAnswerPairing.yCoordinate = getRandomArbitrary(0,leftBoundaryY);

        this.incorrectTargetPromptAndAnswerPairing.xCoordinate = getRandomArbitrary(0,leftBoundaryX);
        this.incorrectTargetPromptAndAnswerPairing.yCoordinate = getRandomArbitrary(0,leftBoundaryY);
        while(
          this.checkIfObjectsAreTooCloseToEachOther
                (
                  this.correctTargetPromptAndAnswerPairing.xCoordinate,this.correctTargetPromptAndAnswerPairing.yCoordinate,
                  this.incorrectTargetPromptAndAnswerPairing.xCoordinate,this.incorrectTargetPromptAndAnswerPairing.yCoordinate,
                  100
                )
              )
            {
              this.incorrectTargetPromptAndAnswerPairing.xCoordinate = getRandomArbitrary(0,leftBoundaryX);
              this.incorrectTargetPromptAndAnswerPairing.yCoordinate = getRandomArbitrary(0,leftBoundaryY);
            }
      }
      else if (gameClassManager.currentGame.answersOnRightSide === true)
      {
        this.correctTargetPromptAndAnswerPairing.xCoordinate = getRandomArbitrary(rightBoundaryX,gameCanvas.width - 50);
        this.correctTargetPromptAndAnswerPairing.yCoordinate = getRandomArbitrary(rightBoundaryTopY,rightBoundaryBottomY);

        this.incorrectTargetPromptAndAnswerPairing.xCoordinate = getRandomArbitrary(rightBoundaryX,gameCanvas.width - 50);
        this.incorrectTargetPromptAndAnswerPairing.yCoordinate = getRandomArbitrary(rightBoundaryTopY,rightBoundaryBottomY);
        while
        (
          this.checkIfObjectsAreTooCloseToEachOther
                (
                  this.correctTargetPromptAndAnswerPairing.xCoordinate,this.correctTargetPromptAndAnswerPairing.yCoordinate,
                  this.incorrectTargetPromptAndAnswerPairing.xCoordinate,this.incorrectTargetPromptAndAnswerPairing.yCoordinate,
                  100
                )
        )
            {
              this.incorrectTargetPromptAndAnswerPairing.xCoordinate = getRandomArbitrary(rightBoundaryX,gameCanvas.width - 50);
              this.incorrectTargetPromptAndAnswerPairing.yCoordinate = getRandomArbitrary(rightBoundaryTopY,rightBoundaryBottomY);
            }
      }

      gameClassManager.currentGame.toggleAnswerPlacements();
    }
    else if(gameClassManager.currentGame.name === "fishingGame"){
      this.correctTargetPromptAndAnswerPairing.xCoordinate = getRandomArbitrary(0,gameCanvas.width - 1);
      this.correctTargetPromptAndAnswerPairing.yCoordinate = getRandomArbitrary(WATER_HEIGHT,gameCanvas.height - 1);
      this.incorrectTargetPromptAndAnswerPairing.xCoordinate = getRandomArbitrary(0,gameCanvas.width - 1);
      this.incorrectTargetPromptAndAnswerPairing.yCoordinate = getRandomArbitrary(WATER_HEIGHT,gameCanvas.height - 1);
    }
  }

  this.setOrResetPromptsAndAnswers = function()
  {
    if (gameClassManager.currentGame === cVcShooterGame || gameClassManager.currentGame.name === 'hello world 2 game' ||
        gameClassManager.currentGame.name === 'hello world game' || gameClassManager.currentGame.name === 'dodge ball game' ||
        gameClassManager.currentGame.name === 'pinataGame' ||
        gameClassManager.currentGame.name === 'bubbleWrap' ||
        gameClassManager.currentGame.name === 'balloonPop')
    {
      return;
    }
    else
    {
      // console.log('inside setOrResetPromptsAndAnswers() of promptsAndAnswersManager');
      //this.assignCurrentLanguageArray();
      this.pickARandomLogicalPromptAnswerGroup();
      this.pickATargetPromptAndAnswerPairing();
      this.pickARandomPromptFromTargetPromptAndAnswerPairing();
      this.defineDataTypeOfCurrentPrompt();
      this.assignAnAnswerBasedOnPrompt();
      this.definecurrentAnswerDataType();
      this.defineIncorrectTargetPromptAndAnswerPairing();
      this.assignAnswerHolderToAnswer(this.correctTargetPromptAndAnswerPairing);
      this.assignAnswerHolderToAnswer(this.incorrectTargetPromptAndAnswerPairing);
      this.assignCurrentIncorrectAnswer();
      this.defineWidthAndHeightForTargetAnswers();
      this.defineXAndYCoordinatesForTargets();
      if (gameClassManager.currentGame.name === 'birdGame'){
        birdGame.assignLeftOrRightDirectionToAnswers();
      } else if (gameClassManager.currentGame.name === 'airGrabGame')
      {
        gameClassManager.currentGame.initializeAnswerSettings();
      }
      promptersManager.loadAppropriatePrompterBasedOnCurrentPromptsDataType();
      this.reinsertAnswersIntoEditedArrayForNextShuffle();
    }
  }


  this.arrayOfWrongAnswers = [];
  this.recordWrongAnswer = function()
  {
    this.arrayOfWrongAnswers.push(this.currentLogicalPromptAndAnswerGroup.name);

    var tally = [];
    for (let wrongAnswerIndex = 0; wrongAnswerIndex < this.arrayOfWrongAnswers.length; wrongAnswerIndex++)
    {
      if (tally[this.arrayOfWrongAnswers[wrongAnswerIndex]] === undefined)
      {
        tally[this.arrayOfWrongAnswers[wrongAnswerIndex]] = 0;
      }
      tally[this.arrayOfWrongAnswers[wrongAnswerIndex]]++;
      if (tally[this.arrayOfWrongAnswers[wrongAnswerIndex]] >= 3)
      {
        helperPrompt.popUp(this.arrayOfWrongAnswers[wrongAnswerIndex]);
        this.arrayOfWrongAnswers = [];
      }
    }
  }
}

let promptsAndAnswersManager = new PromptsAndAnswersManager();
