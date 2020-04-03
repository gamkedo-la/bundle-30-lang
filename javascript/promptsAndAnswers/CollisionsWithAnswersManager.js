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


  this.getImageAnswerSize = function()
  {
    return {
      width : gameClassManager.currentGame.imageAnswerWidth,
      height: gameClassManager.currentGame.imageAnswerHeight
    }
  }

  this.getAudioImageAnswerSize = function()
  {
    return {
      width : gameClassManager.currentGame.audioImageAnswerWidth,
      height: gameClassManager.currentGame.audioImageAnswerHeight
    }
  }

  this.insideBoxColliderForCorrectStringAnswer = function(collidingObject, correctAnswerWidth, textAnswerFontSize)
  {
    if (gameClassManager.currentGame.name = 'laneGame')
    {
      return (promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.yCoordinate + correctAnswerWidth/2 > collidingObject.y)
    }
    else
    {
      return (collidingObject.x > promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.xCoordinate - 5 - collidingObject.width &&
          collidingObject.x < promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.xCoordinate + correctAnswerWidth + 5 + collidingObject.width &&
          collidingObject.y > promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.yCoordinate - textAnswerFontSize - collidingObject.height &&
          collidingObject.y < promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.yCoordinate + 10 + collidingObject.height)
    }

  }

  this.insideBoxColliderForIncorrectStringAnswer = function(collidingObject, incorrectAnswerWidth, textAnswerFontSize)
  {
    if (gameClassManager.currentGame.name = 'laneGame')
    {
      return (promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.yCoordinate + incorrectAnswerWidth/2 > collidingObject.y)
    }
    else
    {
    return (collidingObject.x > promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.xCoordinate - 5 - collidingObject.width &&
        collidingObject.x < promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.xCoordinate + incorrectAnswerWidth + 5 + collidingObject.width &&
        collidingObject.y > promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.yCoordinate - textAnswerFontSize - collidingObject.height &&
        collidingObject.y < promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.yCoordinate + 10 + collidingObject.height)
    }
  }

  this.insideBoxColliderForCorrectImageAnswers = function(collidingObject)
  {
    var imageAnswerSize = this.getImageAnswerSize();

    return (collidingObject.x > promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.xCoordinate &&
        collidingObject.x < promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.xCoordinate + imageAnswerSize.width &&
        collidingObject.y > promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.yCoordinate &&
        collidingObject.y < promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.yCoordinate + imageAnswerSize.height)
  }

  this.insideBoxColliderForIncorrectImageAnswers = function(collidingObject)
  {
    var imageAnswerSize = this.getImageAnswerSize()

    return (collidingObject.x > promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.xCoordinate &&
        collidingObject.x < promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.xCoordinate + imageAnswerSize.width &&
        collidingObject.y > promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.yCoordinate &&
        collidingObject.y < promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.yCoordinate + imageAnswerSize.height)
  }

  this.insideBoxColliderForCorrectAudioAnswer = function(collidingObject)
  {
    var audioImageSize = this.getAudioImageAnswerSize();

    return (collidingObject.x > promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.xCoordinate &&
        collidingObject.x < promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.xCoordinate + audioImageSize.width &&
        collidingObject.y > promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.yCoordinate &&
        collidingObject.y < promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.yCoordinate + audioImageSize.height)
  }

  this.insideBoxColliderForIncorrectAudioAnswer = function(collidingObject)
  {
    var audioImageSize = this.getAudioImageAnswerSize();

    return (collidingObject.x > promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.xCoordinate &&
        collidingObject.x < promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.xCoordinate + audioImageSize.width &&
        collidingObject.y > promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.yCoordinate &&
        collidingObject.y < promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.yCoordinate + audioImageSize.height)
  }

  this.resetAnswers = function()
  {
    console.log('inside reset answers of collisionsWithAnswersManager');
    promptersManager.currentPrompter.currentWidth = 150;
    promptersManager.currentPrompter.currentHeight = 150;
    promptsAndAnswersManager.setOrResetPromptsAndAnswers();
    promptersManager.loadAppropriatePrompterBasedOnCurrentPromptsDataType();
    promptersManager.promptThePlayer();
    currentPlayerCharacter.speedX = 0;
    currentPlayerCharacter.speedY = 0;

    if (gameClassManager.currentGame.name === 'spaceShooter')
    {
      gameClassManager.currentGame.arrayOfBullets = [];
    }
    else if (gameClassManager.currentGame.name == "MazeGame")
    {
      gameClassManager.currentGame.reset();
    }
  }

  let correctAnswerWidth = undefined;
  let incorrectAnswerWidth = undefined;
  let textAnswerFontSize = undefined;

  this.handleCollisionsWithAnswers = function(collidingObject, correctAnswerWidth, incorrectAnswerWidth, textAnswerFontSize)
  {

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
          if (gameClassManager.currentGame === passOrBlockGame)
          {
            console.log('inside collision for an answer');

            gameClassManager.currentGame.correctAnswersYSpeed *= -1;
            return;
          }
          console.log('collidingObject.y: ' + collidingObject.y);
          console.log('promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.yCoordinate: ' + promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.yCoordinate);
          this.resetAnswers();
          console.log('******');
          genAudio.playPositive();
          amountCorrect++;
          if (nextGame === SINGLE_PLAYER_RANDOM || nextGame === TWO_PLAYER_RANDOM)
          {
            cycleCount++;
          }
        }
      else if (this.insideBoxColliderForIncorrectStringAnswer(collidingObject, incorrectAnswerWidth, textAnswerFontSize))
        {
          if (gameClassManager.currentGame === passOrBlockGame)
          {
            console.log('inside collision for an answer');
            gameClassManager.currentGame.incorrectAnswersYSpeed *= -1;
            return;
          }
          promptsAndAnswersManager.recordWrongAnswer();
          this.resetAnswers();
          console.log('******');
          genAudio.playNegative();

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
          if (gameClassManager.currentGame === passOrBlockGame)
          {
            console.log('inside collision for an answer');

            gameClassManager.currentGame.correctAnswersYSpeed *= -1;
            return;
          }
          this.resetAnswers();
          console.log('******');
          genAudio.playPositive();
          amountCorrect++;
          if (nextGame === SINGLE_PLAYER_RANDOM || nextGame === TWO_PLAYER_RANDOM)
          {
            cycleCount++;
          }
        }
      else if (this.insideBoxColliderForIncorrectImageAnswers(collidingObject))
        {
          if (gameClassManager.currentGame === passOrBlockGame)
          {
            console.log('inside collision for an answer');

            gameClassManager.currentGame.incorrectAnswersYSpeed *= -1;
            return;
          }
          promptsAndAnswersManager.recordWrongAnswer();
          this.resetAnswers();
          console.log('******');
          genAudio.playNegative();
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
          if (gameClassManager.currentGame === passOrBlockGame)
          {
            console.log('inside collision for an answer');

            gameClassManager.currentGame.correctAnswersYSpeed *= -1;
            return;
          }
            this.resetAnswers();
            console.log('******');
            genAudio.playPositive();
            amountCorrect++;
            if (nextGame === SINGLE_PLAYER_RANDOM || nextGame === TWO_PLAYER_RANDOM)
            {
              cycleCount++;
            }
        }
      else if (this.insideBoxColliderForIncorrectAudioAnswer(collidingObject))
        {
          if (gameClassManager.currentGame === passOrBlockGame)
          {
            console.log('inside collision for an answer');

            gameClassManager.currentGame.incorrectAnswersYSpeed *= -1;
            return;
          }
          promptsAndAnswersManager.recordWrongAnswer();
          this.resetAnswers();


          console.log('******');
          genAudio.playNegative();
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
