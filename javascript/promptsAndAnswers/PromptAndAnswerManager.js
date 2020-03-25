function PromptsAndAnswersManager()
{
  this.arrayOfLanguagePromptAndAnswerGroupings = [];

  this.arrayOfLogicalEnglishPromptAnswerGroupings = [];
  this.arrayOfLogicalMandarinPromptAnswerGroupings = [];
  this.arrayOfLogicalVietnamesePromptAnswerGroupings = [];

  this.currentArrayOfLogicalPromptAnswerGroupings = undefined;

  this.arrayOfCVCPromptAnswerGroupings = [];

  this.currentLogicalPromptAndAnswerGroup = undefined;

  this.assignCurrentLanguageArray = function()
  {
    this.currentArrayOfLogicalPromptAnswerGroupings = this.arrayOfLanguagePromptAndAnswerGroupings[languageSelectionScreen.languageNum];
    console.log('this.currentArrayOfLogicalPromptAnswerGroupings: ' + this.currentArrayOfLogicalPromptAnswerGroupings);
  }

  this.pickARandomLogicalPromptAnswerGroup = function()
  {
    let randomIndexForArrayOfGroups = getRandomIntInclusive(0,promptsAndAnswersManager.currentArrayOfLogicalPromptAnswerGroupings.length - 1);
    this.currentLogicalPromptAndAnswerGroup = promptsAndAnswersManager.currentArrayOfLogicalPromptAnswerGroupings[randomIndexForArrayOfGroups];
    console.log('this.currentLogicalPromptAndAnswerGroup.name: ' + this.currentLogicalPromptAndAnswerGroup.name);
    console.log('this.currentLogicalPromptAndAnswerGroup.arrayOfObjects: ' + this.currentLogicalPromptAndAnswerGroup.arrayOfObjects);
  }

  this.correctTargetPromptAndAnswerPairing = undefined;
  this.pickATargetPromptAndAnswerPairing = function()
  {
    if(typeof this.currentLogicalPromptAndAnswerGroup === 'undefined') {
      console.log("PromptsAndAnswersManager not set up yet -- how do we fill this in with functional (even placeholder) data when this happens?");
      return;
    }
    let randomIndexFromCurrentPromptAndAnswerGroup = getRandomIntInclusive(0,this.currentLogicalPromptAndAnswerGroup.arrayOfObjects.length - 1);
    this.correctTargetPromptAndAnswerPairing = this.currentLogicalPromptAndAnswerGroup.arrayOfObjects[randomIndexFromCurrentPromptAndAnswerGroup];
    console.log('this.correctTargetPromptAndAnswerPairing: ' + this.correctTargetPromptAndAnswerPairing);
  }


  this.currentPrompt = undefined;
  this.pickARandomPromptFromTargetPromptAndAnswerPairing = function()
  {
    if(typeof this.correctTargetPromptAndAnswerPairing === 'undefined') {
        console.log("correctTargetPromptAndAnswerPairing not set up yet");
        return;
      }
    let randomIndexForArrayOfPossiblePrompts = getRandomIntInclusive(0,this.correctTargetPromptAndAnswerPairing.arrayOfPossiblePrompts.length - 1);
    this.currentPrompt = this.correctTargetPromptAndAnswerPairing.arrayOfPossiblePrompts[randomIndexForArrayOfPossiblePrompts];
    console.log('this.currentPrompt: ' + this.currentPrompt);
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
    else if (this.currentPrompt.nodeName === 'AUDIO')
    {
      this.dataTypeOfCurrentPrompt = 'AUDIO';
      audioPrompter.loadCurrentAudioPrompt(this.currentPrompt);
    }
    else
    {
      console.log("unknown data type for current prompt");
    }
    console.log('this.dataTypeOfCurrentPrompt: ' + this.dataTypeOfCurrentPrompt);
  }


  this.currentCorrectAnswer = undefined;
  this.assignAnAnswerBasedOnPrompt = function()
  {
    if (typeof this.correctTargetPromptAndAnswerPairing === 'undefined') {
        console.log("correctTargetPromptAndAnswerPairing not set up.");
        return;
    }

    let temporaryArrayOfPossibleAnswers = this.correctTargetPromptAndAnswerPairing.arrayOfPossibleAnswers;

    let randomIndexForTemporaryArray = undefined;

    for (let arrayOfTemporaryAnswersIndex = 0; arrayOfTemporaryAnswersIndex < temporaryArrayOfPossibleAnswers.length; arrayOfTemporaryAnswersIndex++)
    {
      if (temporaryArrayOfPossibleAnswers[arrayOfTemporaryAnswersIndex] === this.currentPrompt)
      {
        temporaryArrayOfPossibleAnswers.splice(arrayOfTemporaryAnswersIndex,1);
        randomIndexToChooseAnswerInTemporaryArray = getRandomIntInclusive(0, temporaryArrayOfPossibleAnswers.length - 1);
        this.currentCorrectAnswer = temporaryArrayOfPossibleAnswers[randomIndexToChooseAnswerInTemporaryArray];
      }//end of checking for prompt/answer overlap
    }//end of for loop through temporary answers array
    console.log('this.currentCorrectAnswer: ' + this.currentCorrectAnswer);
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
    } else if (this.currentCorrectAnswer.nodeName === 'IMG') {
      this.currentAnswerDataType = 'IMG';
    } else if (this.currentCorrectAnswer.nodeName === 'AUDIO')
    {
      this.currentAnswerDataType = 'AUDIO';
    }
    console.log('this.currentAnswerDataType: ' + this.currentAnswerDataType);
  }


  this.incorrectTargetPromptAndAnswerPairing = undefined;
  this.editedPromptAndAnswerGroup = undefined;
  this.defineIncorrectTargetPromptAndAnswerPairing = function()
  {
    if (typeof this.currentLogicalPromptAndAnswerGroup === 'undefined') {
        console.log("currentLogicalPromptAndAnswerGroup not set up.");
        return;
    }

    let editablePromptAndAnswerGroup = this.currentLogicalPromptAndAnswerGroup;

    for (let editablePromptAndAnswerGroupIndex = 0; editablePromptAndAnswerGroupIndex < editablePromptAndAnswerGroup.arrayOfObjects.length; editablePromptAndAnswerGroupIndex++)
    {
      if (this.correctTargetPromptAndAnswerPairing === editablePromptAndAnswerGroup.arrayOfObjects[editablePromptAndAnswerGroupIndex])
      {
        editablePromptAndAnswerGroup.arrayOfObjects.splice(editablePromptAndAnswerGroupIndex,1);
        this.editedPromptAndAnswerGroup = editablePromptAndAnswerGroup;
      }
    }

    let randomIndexForEditedPromptAndAnswerGroup = getRandomIntInclusive(0,this.editedPromptAndAnswerGroup.arrayOfObjects.length - 1);
    this.incorrectTargetPromptAndAnswerPairing = this.editedPromptAndAnswerGroup.arrayOfObjects[randomIndexForEditedPromptAndAnswerGroup];
    console.log("this.incorrectTargetPromptAndAnswerPairing: " + this.incorrectTargetPromptAndAnswerPairing);
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
      this.correctTargetPromptAndAnswerPairing.width = this.getCorrectAnswerWidthFromFontStyle(drawAnswersManager.fontStyle);
      this.incorrectTargetPromptAndAnswerPairing.width = this.getIncorrectAnswerWidthFromFontStyle(drawAnswersManager.fontStyle);
      this.correctTargetPromptAndAnswerPairing.height = 20;//measureText does not provide height
      this.incorrectTargetPromptAndAnswerPairing.height = 20;//measureText does not provide height
    }
  }

  this.currentIncorrectAnswer = undefined;
  this.assignCurrentIncorrectAnswer = function()
  {
    //console.log('inside assignCurrentIncorrectAnswer()');
    if (typeof this.editedPromptAndAnswerGroup === 'undefined') {
        console.log("editedPromptAndAnswerGroup not set up");
        return;
    }

    let randomIndexForEditedPromptAndAnswerGroup = getRandomIntInclusive(0,this.editedPromptAndAnswerGroup.length - 1);

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
        else if (this.incorrectTargetPromptAndAnswerPairing.arrayOfPossibleAnswers[arrayOfPossibleAnswersIndex].nodeName === 'AUDIO')
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
    console.log('this.currentIncorrectAnswer: ' + this.currentIncorrectAnswer);
  }

  this.getTextWidthFromFontStyle = function(text, fontStyle){
    gameCanvasContext.save();
    gameCanvasContext.font = fontStyle;
    var textWidth = gameCanvasContext.measureText(text).width
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
      console.log("This answer is not a string, cannot measure for text width");
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
    else if (gameClassManager.currentGame.name === 'laneGame')
    {
      let randomNumber = Math.random();
      if (randomNumber < 0.5)
      {
        this.correctTargetPromptAndAnswerPairing.xCoordinate = laneGame.carLeftLanePosition - 25;
        this.correctTargetPromptAndAnswerPairing.yCoordinate = -10;
        this.incorrectTargetPromptAndAnswerPairing.xCoordinate = laneGame.carRightLanePosition - 25;
        this.incorrectTargetPromptAndAnswerPairing.yCoordinate = -10;
      }
      else
      {
        this.correctTargetPromptAndAnswerPairing.xCoordinate = laneGame.carRightLanePosition - 25;
        this.correctTargetPromptAndAnswerPairing.yCoordinate = -10;
        this.incorrectTargetPromptAndAnswerPairing.xCoordinate = laneGame.carLeftLanePosition - 25;
        this.incorrectTargetPromptAndAnswerPairing.yCoordinate = -10;
      }
    }
    else if (gameClassManager.currentGame.name === 'jumperGame')
    {
      let audioAnswerOffset = -20;
      let imageAnswerOffset = -45;
      let stringAnswerOffset = -50;
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
      gameClassManager.currentGame.playerCharacter.x - 40,gameClassManager.currentGame.playerCharacter.x + 60);
      let randomPlatformIndex = (Math.floor(Math.random() * 7) * 100) + currentOffset;
      this.correctTargetPromptAndAnswerPairing.yCoordinate = randomPlatformIndex;

      this.incorrectTargetPromptAndAnswerPairing.xCoordinate =
      getRandomIntWithExclusionaryRange(0,gameCanvas.width - 100,
      gameClassManager.currentGame.playerCharacter.x - 40,gameClassManager.currentGame.playerCharacter.x + 60);
      randomPlatformIndex = (Math.floor(Math.random() * 7) * 100) + currentOffset;
      this.incorrectTargetPromptAndAnswerPairing.yCoordinate = randomPlatformIndex;
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
    }
    else if (gameClassManager.currentGame.name === 'Pass or Block Game')
    {
      this.correctTargetPromptAndAnswerPairing.xCoordinate = getRandomIntInclusive(0,gameCanvas.width - 100);
      this.incorrectTargetPromptAndAnswerPairing.xCoordinate = getRandomIntInclusive(0,gameCanvas.width - 100);
      while(
        this.checkIfObjectsXCoordinatesAreTooCloseToEachOther(this.correctTargetPromptAndAnswerPairing.xCoordinate,this.incorrectTargetPromptAndAnswerPairing.xCoordinate, 100)
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
  }

  this.setOrResetPromptsAndAnswers = function()
  {
    if (gameClassManager.currentGame === cVcShooterGame)
    {
      return;
    }
    else
    {
      this.assignCurrentLanguageArray();
      this.pickARandomLogicalPromptAnswerGroup();
      this.pickATargetPromptAndAnswerPairing();
      this.pickARandomPromptFromTargetPromptAndAnswerPairing();
      this.defineDataTypeOfCurrentPrompt();
      this.assignAnAnswerBasedOnPrompt();
      this.definecurrentAnswerDataType();
      this.defineIncorrectTargetPromptAndAnswerPairing();
      this.assignCurrentIncorrectAnswer();
      this.defineWidthAndHeightForTargetAnswers();
      this.defineXAndYCoordinatesForTargets();
      if (gameClassManager.currentGame.name === 'birdGame'){
        birdGame.assignLeftOrRightDirectionToAnswers();
      }
      promptersManager.loadAppropriatePrompterBasedOnCurrentPromptsDataType();
      repopulatePromptAndAnswerArrays();
    }
  }
}

let promptsAndAnswersManager = new PromptsAndAnswersManager();
