function CollisionsWithAnswersManager()
{

  this.getCurrentPlayerCharacter = function()
  {
      return gameClassManager.currentGame.player;
  }

  this.handleCollisionsWithAnswers = function()
  {
    let currentPlayerCharacter = this.getCurrentPlayerCharacter();

    if (promptsAndAnswersManager.currentAnswerDataType === 'string')
    {
      // Get answers width
      var correctAnswerWidth = promptsAndAnswersManager.getCorrectAnswerWidthFromFontStyle(
        this.textAnswerFontStyle
      )

      var incorrectAnswerWidth = promptsAndAnswersManager.getIncorrectAnswerWidthFromFontStyle(
        this.textAnswerFontStyle
      )
      if (currentPlayerCharacter.x > promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.xCoordinate - 5 - currentPlayerCharacter.dimension&&
          currentPlayerCharacter.x < promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.xCoordinate + correctAnswerWidth + 5 + currentPlayerCharacter.dimension&&
          currentPlayerCharacter.y > promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.yCoordinate - this.textAnswerFontSize - currentPlayerCharacter.dimension &&
          currentPlayerCharacter.y < promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.yCoordinate + 10 + currentPlayerCharacter.dimension)
        {
          promptersManager.currentPrompter.currentWidth = 150;
          promptersManager.currentPrompter.currentHeight = 150;
            amountCorrect++;
            audioManager.multisoundPlayer.playARandomSoundInAMultisoundArray(audioManager.multisoundPlayer.arrayOfGeneralPositiveFeedbackSounds);
            this.initializePromptAndAnswerObjects();
            this.shuffleAndResetPromptsAndAnswers();
            this.loadPromptsManager();
            this.promptThePlayer();
            currentPlayerCharacter.speedX = 0;
            currentPlayerCharacter.speedY = 0;
        } else if (currentPlayerCharacter.x > promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.xCoordinate - 5 - currentPlayerCharacter.dimension&&
            currentPlayerCharacter.x < promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.xCoordinate + incorrectAnswerWidth + 5 + currentPlayerCharacter.dimension&&
            currentPlayerCharacter.y > promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.yCoordinate - this.textAnswerFontSize - currentPlayerCharacter.dimension &&
            currentPlayerCharacter.y < promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.yCoordinate + 10 + currentPlayerCharacter.dimension)
        {
          promptersManager.currentPrompter.currentWidth = 150;
          promptersManager.currentPrompter.currentHeight = 150;
          amountIncorrect++;
          audioManager.multisoundPlayer.playARandomSoundInAMultisoundArray(audioManager.multisoundPlayer.arrayOfGeneralNegativeFeedbackSounds);
          this.initializePromptAndAnswerObjects();
          this.shuffleAndResetPromptsAndAnswers();
          this.loadPromptsManager();
          this.promptThePlayer();
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
            this.initializePromptAndAnswerObjects();
            this.shuffleAndResetPromptsAndAnswers();
            this.loadPromptsManager();
            this.promptThePlayer();
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
          this.initializePromptAndAnswerObjects();
          this.shuffleAndResetPromptsAndAnswers();
          this.loadPromptsManager();
          this.promptThePlayer();
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
            this.initializePromptAndAnswerObjects();
            this.shuffleAndResetPromptsAndAnswers();
            this.loadPromptsManager();
            this.promptThePlayer();
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
          this.initializePromptAndAnswerObjects();
          this.shuffleAndResetPromptsAndAnswers();
          this.loadPromptsManager();
          this.promptThePlayer();
          currentPlayerCharacter.speedX = 0;
          currentPlayerCharacter.speedY = 0;
        }
        calculateAccuracy();
    }
  }
}

let collisionsWithAnswersManager = new CollisionsWithAnswersManager();
