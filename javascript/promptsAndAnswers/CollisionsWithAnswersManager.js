function CollisionsWithAnswersManager()
{
  let currentPlayerCharacter = undefined;

  this.initialize = function()
  {
    currentPlayerCharacter = this.getCurrentPlayerCharacter();
  }

  this.getCurrentPlayerCharacter = function()
  {

    //////////////////////////////////////////////////
    // quick fix for external temp projects TODO FIXME
    if (gameClassManager.currentGame==bubbleWrapGame)
        location.href = "javascript/specificGames/bubbleWrap/index.html";
    if (gameClassManager.currentGame==pinataGame)
        location.href = "javascript/specificGames/pinata/index.html";
    if (gameClassManager.currentGame==balloonPopGame)
        location.href = "javascript/specificGames/balloonPop/index.html";
    //////////////////////////////////////////////////

    console.log(typeof gameClassManager.currentGame);
    if(typeof gameClassManager.currentGame === 'undefined') {
      console.log("COULD NOT FIND currentGame - adding a crude empty placeholder to unblock code");
      gameClassManager.currentGame = snakeGame;
    }
    if(typeof gameClassManager.currentGame.playerCharacter === 'undefined') {
      console.log("COULD NOT FIND playerCharacter - adding a crude empty placeholder to unblock code - may be related to collision issues");
      gameClassManager.currentGame.playerCharacter = {x:50,y:50};
    }
    return gameClassManager.currentGame.playerCharacter;
  }

  this.getTextAnswerFontSize = function()
  {
    return gameClassManager.currentGame.textAnswerFontSize;
  }

  this.getTextAnswerFontStyle = function()
  {
    return gameClassManager.currentGame.textAnswerFontStyle;
  }

  this.insideBoxColliderForCorrectStringAnswer = function(collidingObject, correctAnswerWidth, textAnswerFontSize)
  {
    return (collidingObject.x > promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.xCoordinate - 5 - currentPlayerCharacter.width &&
        collidingObject.x < promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.xCoordinate + correctAnswerWidth + 5 + currentPlayerCharacter.width &&
        collidingObject.y > promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.yCoordinate - textAnswerFontSize - currentPlayerCharacter.height &&
        collidingObject.y < promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.yCoordinate + 10 + currentPlayerCharacter.height)
  }

  this.insideBoxColliderForIncorrectStringAnswer = function(collidingObject, incorrectAnswerWidth, textAnswerFontSize)
  {
    return (collidingObject.x > promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.xCoordinate - 5 - currentPlayerCharacter.width &&
        collidingObject.x < promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.xCoordinate + incorrectAnswerWidth + 5 + currentPlayerCharacter.width &&
        collidingObject.y > promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.yCoordinate - textAnswerFontSize - currentPlayerCharacter.height &&
        collidingObject.y < promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.yCoordinate + 10 + currentPlayerCharacter.height)
  }

  this.insideBoxColliderForCorrectImageAnswers = function(collidingObject)
  {
    return (collidingObject.x > promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.xCoordinate &&
        collidingObject.x < promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.xCoordinate + 100 &&
        collidingObject.y > promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.yCoordinate &&
        collidingObject.y < promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.yCoordinate + 100)
  }

  this.insideBoxColliderForIncorrectImageAnswers = function(collidingObject)
  {
    return (collidingObject.x > promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.xCoordinate &&
        collidingObject.x < promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.xCoordinate + 100 &&
        collidingObject.y > promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.yCoordinate &&
        collidingObject.y < promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.yCoordinate + 100)
  }

  this.insideBoxColliderForCorrectAudioAnswer = function(collidingObject)
  {
    return (collidingObject.x > promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.xCoordinate &&
        collidingObject.x < promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.xCoordinate + 100 &&
        collidingObject.y > promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.yCoordinate &&
        collidingObject.y < promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.yCoordinate + 100)
  }

  this.insideBoxColliderForIncorrectAudioAnswer = function(collidingObject)
  {
    return (collidingObject.x > promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.xCoordinate &&
        collidingObject.x < promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.xCoordinate + 100 &&
        collidingObject.y > promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.yCoordinate &&
        collidingObject.y < promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.yCoordinate + 100)
  }

  this.resetAnswers = function()
  {
    promptersManager.currentPrompter.currentWidth = 150;
    promptersManager.currentPrompter.currentHeight = 150;
    audioManager.multisoundPlayer.playARandomSoundInAMultisoundArray(audioManager.multisoundPlayer.arrayOfGeneralPositiveFeedbackSounds);
    initializePromptAndAnswerObjects();
    promptsAndAnswersManager.setOrResetPromptsAndAnswers();
    promptersManager.loadAppropriatePrompterBasedOnCurrentPromptsDataType();
    promptersManager.promptThePlayer();
    currentPlayerCharacter.speedX = 0;
    currentPlayerCharacter.speedY = 0;
  }

  let correctAnswerWidth = undefined;
  let incorrectAnswerWidth = undefined;
  let textAnswerFontSize = undefined;

  this.handleCollisionsWithAnswers = function(correctAnswerWidth, incorrectAnswerWidth, textAnswerFontSize)
  {
    let collidingObject = undefined;

    if (gameClassManager.currentGame.collidingObject)
    {
      collidingObject = gameClassManager.currentGame.collidingObject;
    }

    //if ()

    if (promptsAndAnswersManager.currentAnswerDataType === 'string')
    {
      // Get answers width
       correctAnswerWidth = promptsAndAnswersManager.getCorrectAnswerWidthFromFontStyle(
        this.getTextAnswerFontStyle()
      );
       incorrectAnswerWidth = promptsAndAnswersManager.getIncorrectAnswerWidthFromFontStyle(
        this.getTextAnswerFontStyle()
      );
      textAnswerFontSize = this.getTextAnswerFontSize();

      if (this.insideBoxColliderForCorrectStringAnswer(collidingObject, correctAnswerWidth, textAnswerFontSize))
        {
          this.resetAnswers();
          amountCorrect++;
          if (nextGame === SINGLE_PLAYER_RANDOM || nextGame === TWO_PLAYER_RANDOM)
          {
            cycleCount++;
          }
        }
      else if (this.insideBoxColliderForIncorrectStringAnswer(collidingObject, incorrectAnswerWidth, textAnswerFontSize))
        {
          this.resetAnswers();
          amountIncorrect++;
          if (nextGame === SINGLE_PLAYER_RANDOM || nextGame === TWO_PLAYER_RANDOM)
          {
            cycleCount++;
          }
        }
        calculateAccuracy();

    }
    else if (promptsAndAnswersManager.currentAnswerDataType === 'IMG')
    {
      if (this.insideBoxColliderForCorrectImageAnswers(collidingObject))
        {
          this.resetAnswers();
          amountCorrect++;
          if (nextGame === SINGLE_PLAYER_RANDOM || nextGame === TWO_PLAYER_RANDOM)
          {
            cycleCount++;
          }
        }
      else if (this.insideBoxColliderForIncorrectImageAnswers(collidingObject))
        {
          this.resetAnswers();
          amountIncorrect++;
          if (nextGame === SINGLE_PLAYER_RANDOM || nextGame === TWO_PLAYER_RANDOM)
          {
            cycleCount++;
          }
        }
        calculateAccuracy();
    }
    else if (promptsAndAnswersManager.currentAnswerDataType === 'AUDIO')
    {
      if (this.insideBoxColliderForCorrectAudioAnswer(collidingObject))
        {
            this.resetAnswers();
            amountCorrect++;
            if (nextGame === SINGLE_PLAYER_RANDOM || nextGame === TWO_PLAYER_RANDOM)
            {
              cycleCount++;
            }
        }
      else if (this.insideBoxColliderForIncorrectAudioAnswer(collidingObject))
        {
          this.resetAnswers();
          amountIncorrect++;
          if (nextGame === SINGLE_PLAYER_RANDOM || nextGame === TWO_PLAYER_RANDOM)
          {
            cycleCount++;
          }
        }
        calculateAccuracy();
    }//end of else if for data type checks;
    if ( (nextGame === SINGLE_PLAYER_RANDOM || nextGame === TWO_PLAYER_RANDOM) &&
          cycleCount === CYCLE_LIMIT_FOR_RANDOM_GAME_RELOAD )
    {
      loadRandomGame();
      cycleCount = 0;
    }
  }//end of handleCollisionsWithAnswers();
}//end of CollisionsWithAnswersManager();

let collisionsWithAnswersManager = new CollisionsWithAnswersManager();
