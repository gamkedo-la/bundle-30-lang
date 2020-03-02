function PromptsAndAnswersManager()
{
  this.arrayOfLogicalPromptAnswerGroupings = [];

  this.currentLogicalPromptAndAnswerGroup = undefined;

  this.pickARandomLogicalPromptAnswerGroup = function()
  {
    let randomIndexForArrayOfGroups = getRandomIntInclusive(0,promptsAndAnswersManager.arrayOfLogicalPromptAnswerGroupings.length - 1);
    this.currentLogicalPromptAndAnswerGroup = promptsAndAnswersManager.arrayOfLogicalPromptAnswerGroupings[randomIndexForArrayOfGroups];
  }

  this.correctTargetPromptAndAnswerPairing = undefined;
  this.pickATargetPromptAndAnswerPairing = function()
  {
    let randomIndexFromCurrentPromptAndAnswerGroup = getRandomIntInclusive(0,this.currentLogicalPromptAndAnswerGroup.arrayOfObjects.length - 1);
    this.correctTargetPromptAndAnswerPairing = this.currentLogicalPromptAndAnswerGroup.arrayOfObjects[randomIndexFromCurrentPromptAndAnswerGroup];
  }


  this.currentPrompt = undefined;
  this.pickARandomPromptFromTargetPromptAndAnswerPairing = function()
  {
    let randomIndexForArrayOfPossiblePrompts = getRandomIntInclusive(0,this.correctTargetPromptAndAnswerPairing.arrayOfPossiblePrompts.length - 1);
    this.currentPrompt = this.correctTargetPromptAndAnswerPairing.arrayOfPossiblePrompts[randomIndexForArrayOfPossiblePrompts];
  }


  this.dataTypeOfCurrentPrompt = undefined;
  this.defineDataTypeOfCurrentPrompt = function()
  {
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
  }


  this.currentCorrectAnswer = undefined;
  this.assignAnAnswerBasedOnPrompt = function()
  {
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
  }//end of answer assignment


  this.currentAnswerDataType = undefined;
  this.definecurrentAnswerDataType = function()
  {
    if (typeof this.currentCorrectAnswer === 'string')
    {
      this.currentAnswerDataType = 'string';
    } else if (this.currentCorrectAnswer.nodeName === 'IMG') {
      this.currentAnswerDataType = 'IMG';
    } else if (this.currentCorrectAnswer.nodeName === 'AUDIO')
    {
      this.currentAnswerDataType = 'AUDIO';
    }
  }


  this.incorrectTargetPromptAndAnswerPairing = undefined;
  this.editedPromptAndAnswerGroup = undefined;
  this.defineIncorrectTargetPromptAndAnswerPairing = function()
  {

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
  }


  this.currentIncorrectAnswer = undefined;
  this.assignCurrentIncorrectAnswer = function()
  {
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
  }

  this.getTextWidthFromFontStyle = function(text, fontStyle){
    gameCanvasContext.font = fontStyle;
    return gameCanvasContext.measureText(text).width;
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

  this.pickRandomCoordinatesWithinCanvasAndAwayFromCharacter = function()
  {
    let randomXCoordinate = undefined;
    let randomYCoordinate = undefined;
    let currentPlayerCharacter = gameClassManager.currentGame.playerCharacter;
    //console.log('currentPlayerCharacter.name: ' + currentPlayerCharacter.name);
    randomXCoordinate = getRandomIntWithExclusionaryRange(0,gameCanvas.width - 100, currentPlayerCharacter.x - 40,currentPlayerCharacter.x + 60);
    //console.log('randomXCoordinate: ' + randomXCoordinate);
    randomYCoordinate = getRandomIntWithExclusionaryRange(0,gameCanvas.height - 100, currentPlayerCharacter.y - 40,currentPlayerCharacter.y + 60);
    return {randomXCoordinate,randomYCoordinate};
  }

  this.defineXAndYCoordinatesForTargets = function()
  {
    if (gameClassManager.currentGame.name === 'Snake Game' || gameClassManager.currentGame === 'birdGame')
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
      this.correctTargetPromptAndAnswerPairing.xCoordinate = getRandomIntWithExclusionaryRange(0,gameCanvas.width - 100, currentPlayerCharacter.x - 40,currentPlayerCharacter.x + 60);
      let randomPlatformIndex = (Math.floor(Math.random() * 7) * 100) + 30;
      this.correctTargetPromptAndAnswerPairing.yCoordinate = randomPlatformIndex;
      console.log(this.correctTargetPromptAndAnswerPairing.xCoordinate);
      console.log(this.correctTargetPromptAndAnswerPairing.yCoordinate);

      this.incorrectTargetPromptAndAnswerPairing.xCoordinate = getRandomIntWithExclusionaryRange(0,gameCanvas.width - 100, currentPlayerCharacter.x - 40,currentPlayerCharacter.x + 60);
      randomPlatformIndex = (Math.floor(Math.random() * 7) * 100) + 30;
      this.incorrectTargetPromptAndAnswerPairing.yCoordinate = randomPlatformIndex;
    }
  }

  this.setOrResetPromptsAndAnswers = function()
  {
    this.pickARandomLogicalPromptAnswerGroup();
    this.pickATargetPromptAndAnswerPairing();
    this.pickARandomPromptFromTargetPromptAndAnswerPairing();
    this.defineDataTypeOfCurrentPrompt();
    this.assignAnAnswerBasedOnPrompt();
    this.definecurrentAnswerDataType();
    this.defineIncorrectTargetPromptAndAnswerPairing();
    this.assignCurrentIncorrectAnswer();
    this.defineXAndYCoordinatesForTargets();
  }
}

let promptsAndAnswersManager = new PromptsAndAnswersManager();
