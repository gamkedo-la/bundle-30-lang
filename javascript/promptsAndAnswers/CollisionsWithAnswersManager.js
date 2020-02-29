function CollisionsWithAnswersManager()
{

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

  this.handleCollisionsWithAnswers = function()
  {
    let currentPlayerCharacter = this.getCurrentPlayerCharacter();
    
    if (promptsAndAnswersManager.currentAnswerDataType === 'string')
    {
      // Get answers width
      var correctAnswerWidth = promptsAndAnswersManager.getCorrectAnswerWidthFromFontStyle(
        this.getTextAnswerFontStyle()
      )

      var incorrectAnswerWidth = promptsAndAnswersManager.getIncorrectAnswerWidthFromFontStyle(
        this.getTextAnswerFontStyle()
      )

      var textAnswerFontSize = this.getTextAnswerFontSize();

      if (currentPlayerCharacter.x > promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.xCoordinate - 5 - currentPlayerCharacter.width &&
          currentPlayerCharacter.x < promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.xCoordinate + correctAnswerWidth + 5 + currentPlayerCharacter.width &&
          currentPlayerCharacter.y > promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.yCoordinate - textAnswerFontSize - currentPlayerCharacter.height &&
          currentPlayerCharacter.y < promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.yCoordinate + 10 + currentPlayerCharacter.height)
        {
          promptersManager.currentPrompter.currentWidth = 150;
          promptersManager.currentPrompter.currentHeight = 150;
            amountCorrect++;
            audioManager.multisoundPlayer.playARandomSoundInAMultisoundArray(audioManager.multisoundPlayer.arrayOfGeneralPositiveFeedbackSounds);
            gameClassManager.currentGame.initializePromptAndAnswerObjects();
            gameClassManager.currentGame.shuffleAndResetPromptsAndAnswers();
            gameClassManager.currentGame.loadPromptsManager();
            gameClassManager.currentGame.promptThePlayer();
            currentPlayerCharacter.speedX = 0;
            currentPlayerCharacter.speedY = 0;
        } else if (currentPlayerCharacter.x > promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.xCoordinate - 5 - currentPlayerCharacter.width &&
            currentPlayerCharacter.x < promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.xCoordinate + incorrectAnswerWidth + 5 + currentPlayerCharacter.width &&
            currentPlayerCharacter.y > promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.yCoordinate - textAnswerFontSize - currentPlayerCharacter.height &&
            currentPlayerCharacter.y < promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.yCoordinate + 10 + currentPlayerCharacter.height)
        {
          promptersManager.currentPrompter.currentWidth = 150;
          promptersManager.currentPrompter.currentHeight = 150;
          amountIncorrect++;
          audioManager.multisoundPlayer.playARandomSoundInAMultisoundArray(audioManager.multisoundPlayer.arrayOfGeneralNegativeFeedbackSounds);
          gameClassManager.currentGame.initializePromptAndAnswerObjects();
          gameClassManager.currentGame.shuffleAndResetPromptsAndAnswers();
          gameClassManager.currentGame.loadPromptsManager();
          gameClassManager.currentGame.promptThePlayer();
          currentPlayerCharacter.speedX = 0;
          currentPlayerCharacter.speedY = 0;
        }
        calculateAccuracy();

    }
    else if (promptsAndAnswersManager.currentAnswerDataType === 'IMG')
    {
      if (currentPlayerCharacter.x > promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.xCoordinate &&
          currentPlayerCharacter.x < promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.xCoordinate + 100 &&
          currentPlayerCharacter.y > promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.yCoordinate &&
          currentPlayerCharacter.y < promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.yCoordinate + 100)
        {
          promptersManager.currentPrompter.currentWidth = 150;
          promptersManager.currentPrompter.currentHeight = 150;
            amountCorrect++;
            audioManager.multisoundPlayer.playARandomSoundInAMultisoundArray(audioManager.multisoundPlayer.arrayOfGeneralPositiveFeedbackSounds);
            gameClassManager.currentGame.initializePromptAndAnswerObjects();
            gameClassManager.currentGame.shuffleAndResetPromptsAndAnswers();
            gameClassManager.currentGame.loadPromptsManager();
            gameClassManager.currentGame.promptThePlayer();
            currentPlayerCharacter.speedX = 0;
            currentPlayerCharacter.speedY = 0;
        } else if ((currentPlayerCharacter.x > promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.xCoordinate &&
            currentPlayerCharacter.x < promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.xCoordinate + 100 &&
            currentPlayerCharacter.y > promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.yCoordinate &&
            currentPlayerCharacter.y < promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.yCoordinate + 100))
        {
          promptersManager.currentPrompter.currentWidth = 150;
          promptersManager.currentPrompter.currentHeight = 150;
          amountIncorrect++;
          audioManager.multisoundPlayer.playARandomSoundInAMultisoundArray(audioManager.multisoundPlayer.arrayOfGeneralNegativeFeedbackSounds);
          gameClassManager.currentGame.initializePromptAndAnswerObjects();
          gameClassManager.currentGame.shuffleAndResetPromptsAndAnswers();
          gameClassManager.currentGame.loadPromptsManager();
          gameClassManager.currentGame.promptThePlayer();
          currentPlayerCharacter.speedX = 0;
          currentPlayerCharacter.speedY = 0;
        }
        calculateAccuracy();

    }
    else if (promptsAndAnswersManager.currentAnswerDataType === 'AUDIO')
    {
      if (currentPlayerCharacter.x > promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.xCoordinate &&
          currentPlayerCharacter.x < promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.xCoordinate + 100 &&
          currentPlayerCharacter.y > promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.yCoordinate &&
          currentPlayerCharacter.y < promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.yCoordinate + 100)
        {
            promptersManager.currentPrompter.currentWidth = 150;
            promptersManager.currentPrompter.currentHeight = 150;
            amountCorrect++;
            audioManager.multisoundPlayer.playARandomSoundInAMultisoundArray(audioManager.multisoundPlayer.arrayOfGeneralPositiveFeedbackSounds);
            gameClassManager.currentGame.initializePromptAndAnswerObjects();
            gameClassManager.currentGame.shuffleAndResetPromptsAndAnswers();
            gameClassManager.currentGame.loadPromptsManager();
            gameClassManager.currentGame.promptThePlayer();
            currentPlayerCharacter.speedX = 0;
            currentPlayerCharacter.speedY = 0;
        } else if ((currentPlayerCharacter.x > promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.xCoordinate &&
            currentPlayerCharacter.x < promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.xCoordinate + 100 &&
            currentPlayerCharacter.y > promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.yCoordinate &&
            currentPlayerCharacter.y < promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.yCoordinate + 100))
        {
          promptersManager.currentPrompter.currentWidth = 150;
          promptersManager.currentPrompter.currentHeight = 150;
          amountIncorrect++;
          audioManager.multisoundPlayer.playARandomSoundInAMultisoundArray(audioManager.multisoundPlayer.arrayOfGeneralNegativeFeedbackSounds);
          gameClassManager.currentGame.initializePromptAndAnswerObjects();
          gameClassManager.currentGame.shuffleAndResetPromptsAndAnswers();
          gameClassManager.currentGame.loadPromptsManager();
          gameClassManager.currentGame.promptThePlayer();
          currentPlayerCharacter.speedX = 0;
          currentPlayerCharacter.speedY = 0;
        }
        calculateAccuracy();
    }
  }
}

let collisionsWithAnswersManager = new CollisionsWithAnswersManager();
