function CollisionsWithAnswersManager()
{
  let currentPlayerCharacter = undefined;

  this.initialize = function()
  {
    currentPlayerCharacter = this.getCurrentPlayerCharacter();
  }

  this.getCurrentPlayerCharacter = function()
  {
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

  this.insideBoxColliderForCorrectStringAnswer = function(correctAnswerWidth, textAnswerFontSize)
  {
    return (currentPlayerCharacter.x > promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.xCoordinate - 5 - currentPlayerCharacter.width &&
        currentPlayerCharacter.x < promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.xCoordinate + correctAnswerWidth + 5 + currentPlayerCharacter.width &&
        currentPlayerCharacter.y > promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.yCoordinate - textAnswerFontSize - currentPlayerCharacter.height &&
        currentPlayerCharacter.y < promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.yCoordinate + 10 + currentPlayerCharacter.height)
  }

  this.insideBoxColliderForIncorrectStringAnswer = function(incorrectAnswerWidth, textAnswerFontSize)
  {
    return (currentPlayerCharacter.x > promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.xCoordinate - 5 - currentPlayerCharacter.width &&
        currentPlayerCharacter.x < promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.xCoordinate + incorrectAnswerWidth + 5 + currentPlayerCharacter.width &&
        currentPlayerCharacter.y > promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.yCoordinate - textAnswerFontSize - currentPlayerCharacter.height &&
        currentPlayerCharacter.y < promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.yCoordinate + 10 + currentPlayerCharacter.height)
  }

  this.insideBoxColliderForCorrectImageAnswers = function()
  {
    return (currentPlayerCharacter.x > promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.xCoordinate &&
        currentPlayerCharacter.x < promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.xCoordinate + 100 &&
        currentPlayerCharacter.y > promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.yCoordinate &&
        currentPlayerCharacter.y < promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.yCoordinate + 100)
  }

  this.insideBoxColliderForIncorrectImageAnswers = function()
  {
    return (currentPlayerCharacter.x > promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.xCoordinate &&
        currentPlayerCharacter.x < promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.xCoordinate + 100 &&
        currentPlayerCharacter.y > promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.yCoordinate &&
        currentPlayerCharacter.y < promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.yCoordinate + 100)
  }

  this.insideBoxColliderForCorrectAudioAnswer = function()
  {
    return (currentPlayerCharacter.x > promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.xCoordinate &&
        currentPlayerCharacter.x < promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.xCoordinate + 100 &&
        currentPlayerCharacter.y > promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.yCoordinate &&
        currentPlayerCharacter.y < promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.yCoordinate + 100)
  }

  this.insideBoxColliderForIncorrectAudioAnswer = function()
  {
    return (currentPlayerCharacter.x > promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.xCoordinate &&
        currentPlayerCharacter.x < promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.xCoordinate + 100 &&
        currentPlayerCharacter.y > promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.yCoordinate &&
        currentPlayerCharacter.y < promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.yCoordinate + 100)
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

      if (this.insideBoxColliderForCorrectStringAnswer(correctAnswerWidth, textAnswerFontSize))
        {
          this.resetAnswers();
          amountCorrect++;
        }
      else if (this.insideBoxColliderForIncorrectStringAnswer(incorrectAnswerWidth, textAnswerFontSize))
        {
          this.resetAnswers();
          amountIncorrect++;
        }
        calculateAccuracy();
    }
    else if (promptsAndAnswersManager.currentAnswerDataType === 'IMG')
    {
      if (this.insideBoxColliderForCorrectImageAnswers())
        {
          this.resetAnswers();
          amountCorrect++;
        }
      else if (this.insideBoxColliderForIncorrectImageAnswers())
        {
          this.resetAnswers();
          amountIncorrect++;
        }
        calculateAccuracy();

    }
    else if (promptsAndAnswersManager.currentAnswerDataType === 'AUDIO')
    {
      if (this.insideBoxColliderForCorrectAudioAnswer())
        {
            this.resetAnswers();
            amountCorrect++;
        }
      else if (this.insideBoxColliderForIncorrectAudioAnswer())
        {
          this.resetAnswers();
          amountIncorrect++;
        }
        calculateAccuracy();
    }
  }
}

let collisionsWithAnswersManager = new CollisionsWithAnswersManager();
