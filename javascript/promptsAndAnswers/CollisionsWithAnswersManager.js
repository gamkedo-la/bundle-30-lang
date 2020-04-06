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
    if (gameClassManager.currentGame.name === 'laneGame')
    {
      return (promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.yCoordinate + correctAnswerWidth/2 > collidingObject.y)
    }
    else
    {
      return (collidingObject.x < promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.xCoordinate - 5 + correctAnswerWidth &&
          collidingObject.x + collidingObject.width > promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.xCoordinate + 5  &&
          collidingObject.y < promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.yCoordinate + 10 &&
          collidingObject.y + collidingObject.height > promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.yCoordinate - 10)

          // (rect1.x < rect2.x + rect2.width &&
          //    rect1.x + rect1.width > rect2.x &&
          //    rect1.y < rect2.y + rect2.height &&
          //    rect1.y + rect1.height > rect2.y)
          //
          // return (collidingObject.x < promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.xCoordinate - 5 + incorrectAnswerWidth &&
          //     collidingObject.x + collidingObject.width > promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.xCoordinate + 5  &&
          //     collidingObject.y < promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.yCoordinate - 5 + incorrectAnswerWidth &&
          //     collidingObject.y + collidingObject.height < promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.yCoordinate + incorrectAnswerWidth)
      // return (collidingObject.x > promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.xCoordinate + promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.width &&
      //         collidingObject.x - collidingObject.width < promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.xCoordinate &&
      //         collidingObject.y > promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.yCoordinate + promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.height &&
      //         collidingObject.y + collidingObject.height < promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.yCoordinate)
    }

  }

  this.insideBoxColliderForIncorrectStringAnswer = function(collidingObject, incorrectAnswerWidth, textAnswerFontSize)
  {
    if (gameClassManager.currentGame.name === 'laneGame')
    {
      return (promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.yCoordinate + incorrectAnswerWidth/2 > collidingObject.y)
    }
    else
    {
      return (collidingObject.x < promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.xCoordinate - 5 + incorrectAnswerWidth &&
          collidingObject.x + collidingObject.width > promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.xCoordinate + 5  &&
          collidingObject.y < promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.yCoordinate + 10 &&
          collidingObject.y + collidingObject.height > promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.yCoordinate - 10 )
    // return (collidingObject.x > promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.xCoordinate + promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.width &&
    //         collidingObject.x - collidingObject.width < promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.xCoordinate &&
    //         collidingObject.y > promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.yCoordinate + promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.height &&
    //         collidingObject.y + collidingObject.height < promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.yCoordinate)
    }
  }

  this.insideBoxColliderForCorrectImageAnswers = function(collidingObject)
  {
    var imageAnswerSize = this.getImageAnswerSize();
    let correctAnswerRightSide = promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.xCoordinate + imageAnswerSize.width;
    let correctAnswerLeftSide = promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.xCoordinate;
    let correctAnswerBottomSide = promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.yCoordinate + imageAnswerSize.height;
    let correctAnswerTopSide = promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.yCoordinate;
    let collidingObjectLeftSide = collidingObject.x;
    let collidingObjectRightSide = collidingObject.x + collidingObject.width;
    let collidingObjectTopSide = collidingObject.y;
    let collidingObjectBottomSide = collidingObject.y + collidingObject.height;

    return (collidingObjectLeftSide < correctAnswerRightSide &&
            collidingObjectRightSide > correctAnswerLeftSide &&
            collidingObjectTopSide < correctAnswerBottomSide &&
            collidingObjectBottomSide > correctAnswerTopSide)
    // return (collidingObject.x > promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.xCoordinate + imageAnswerSize.width &&
    //         collidingObject.x - collidingObject.width < promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.xCoordinate &&
    //         collidingObject.y > promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.yCoordinate + imageAnswerSize.height &&
    //         collidingObject.y + collidingObject.height < promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.yCoordinate)
  }

  this.insideBoxColliderForIncorrectImageAnswers = function(collidingObject)
  {
    var imageAnswerSize = this.getImageAnswerSize()

    let incorrectAnswerRightSide = promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.xCoordinate + imageAnswerSize.width;
    let incorrectAnswerLeftSide = promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.xCoordinate;
    let incorrectAnswerBottomSide = promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.yCoordinate + imageAnswerSize.height;
    let incorrectAnswerTopSide = promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.yCoordinate;
    let collidingObjectLeftSide = collidingObject.x;
    let collidingObjectRightSide = collidingObject.x + collidingObject.width;
    let collidingObjectTopSide = collidingObject.y;
    let collidingObjectBottomSide = collidingObject.y + collidingObject.height;

    return (collidingObjectLeftSide < incorrectAnswerRightSide &&
            collidingObjectRightSide > incorrectAnswerLeftSide &&
            collidingObjectTopSide < incorrectAnswerBottomSide &&
            collidingObjectBottomSide > incorrectAnswerTopSide)
    // return (collidingObject.x > promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.xCoordinate + imageAnswerSize.width &&
    //         collidingObject.x - collidingObject.width < promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.xCoordinate &&
    //         collidingObject.y > promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.yCoordinate + imageAnswerSize.height &&
    //         collidingObject.y + collidingObject.height < promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.yCoordinate)
  }

  this.insideBoxColliderForCorrectAudioAnswer = function(collidingObject)
  {
    var audioImageSize = this.getAudioImageAnswerSize();

    let correctAnswerRightSide = promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.xCoordinate + audioImageSize.width;
    let correctAnswerLeftSide = promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.xCoordinate;
    let correctAnswerBottomSide = promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.yCoordinate + audioImageSize.height;
    let correctAnswerTopSide = promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.yCoordinate;
    let collidingObjectLeftSide = collidingObject.x;
    let collidingObjectRightSide = collidingObject.x + collidingObject.width;
    let collidingObjectTopSide = collidingObject.y;
    let collidingObjectBottomSide = collidingObject.y + collidingObject.height;

    return (collidingObjectLeftSide < correctAnswerRightSide &&
            collidingObjectRightSide > correctAnswerLeftSide &&
            collidingObjectTopSide < correctAnswerBottomSide &&
            collidingObjectBottomSide > correctAnswerTopSide)
    // return (collidingObject.x > promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.xCoordinate + audioImageSize.width &&
    //         collidingObject.x - collidingObject.width < promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.xCoordinate &&
    //         collidingObject.y > promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.yCoordinate + audioImageSize.height &&
    //         collidingObject.y + collidingObject.height < promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.yCoordinate)
  }

  this.insideBoxColliderForIncorrectAudioAnswer = function(collidingObject)
  {
    var audioImageSize = this.getAudioImageAnswerSize();

    let incorrectAnswerRightSide = promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.xCoordinate + audioImageSize.width;
    let incorrectAnswerLeftSide = promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.xCoordinate;
    let incorrectAnswerBottomSide = promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.yCoordinate + audioImageSize.height;
    let incorrectAnswerTopSide = promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.yCoordinate;
    let collidingObjectLeftSide = collidingObject.x;
    let collidingObjectRightSide = collidingObject.x + collidingObject.width;
    let collidingObjectTopSide = collidingObject.y;
    let collidingObjectBottomSide = collidingObject.y + collidingObject.height;

    return (collidingObjectLeftSide < incorrectAnswerRightSide &&
            collidingObjectRightSide > incorrectAnswerLeftSide &&
            collidingObjectTopSide < incorrectAnswerBottomSide &&
            collidingObjectBottomSide > incorrectAnswerTopSide)
    // return (collidingObject.x > promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.xCoordinate + audioImageSize.width &&
    //         collidingObject.x - collidingObject.width < promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.xCoordinate &&
    //         collidingObject.y > promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.yCoordinate + audioImageSize.height &&
    //         collidingObject.y + collidingObject.height < promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.yCoordinate)
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
          console.log('promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.yCoordinate: ' + promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.yCoordinate);

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
