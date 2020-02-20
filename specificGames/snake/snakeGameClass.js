function getRandomIntInclusive(min, max)
{
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

snakeGameClass.prototype = new GameClass();
function snakeGameClass()
{
  this.name = 'Snake Game';
  const FRAME_RATE = 1000/10;

  this.snake = undefined;
  this.background = undefined;
  this.backButtonColor = 'yellow';
  this.backButtonTextColor = 'blueViolet';

  this.isTransitioningIn = false;

  this.initialize = function()
  {
    this.snake = new SnakeClass();
    this.background = new SnakeBackground();
    this.snake.initialize();
    gameInterval.reset(FRAME_RATE);
    this.shuffleAndResetPromptsAndAnswers();
    this.loadPromptsManager();
  }

  //update section
  this.update = function()
  {
    if (!promptersManager.shouldBeDrawingAPrompt)
    {
      this.snake.update();
      this.handleCollisionsWithAnswers();
    }
  }

  //draw section
  this.draw = function()
  {
    this.background.draw();
    this.snake.draw();
    this.drawAnswers();
    this.drawPromptsWhenAppropriate();
    backButton.draw();
  }

  this.drawPromptsWhenAppropriate = function()
  {
    if (promptersManager.shouldBeDrawingAPrompt)
    {
      promptersManager.currentPrompter.updatePromptImage();
      promptersManager.currentPrompter.drawThePrompt();
    }
  }

  this.drawTransitionText = function()
  {
    customFontFillText(['Eat the answers', symbolExclamationPointImage], 60,30, 100,50);
    customFontFillText([upArrowImage, ' ', symbolEqualsImage, ' move up'], 30,15, 210,200);
    customFontFillText([rightArrowImage, ' ', symbolEqualsImage, ' move right'], 30,15, 350,350);
    customFontFillText([downArrowImage, ' ', symbolEqualsImage, ' move down'], 30,15, 200,500);
    customFontFillText([leftArrowImage, ' ', symbolEqualsImage, ' move left'], 30,15, 50,350);
  }

  this.shuffleAndResetPromptsAndAnswers = function()
  {
    promptsAndAnswersManager.setOrResetPromptsAndAnswers();
  }

  this.loadPromptsManager = function()
  {
    promptersManager.loadAppropriatePrompterBasedOnCurrentPromptsDataType();
  }

  this.promptThePlayer = function()
  {
    promptersManager.promptThePlayer();
  }

  this.LETTER_COLOR = 'cyan';

  this.drawAnswers = function()
  {
    if (promptsAndAnswersManager.currentAnswerDataType === 'string')
    {
      gameCanvasContext.fillStyle = this.LETTER_COLOR;
      // for (var arrayOfAnswersAnswerIndex = 0; arrayOfAnswersAnswerIndex < arrayOfAnswers.length; arrayOfAnswersAnswerIndex++)
      // {
        //draw correct answer
        gameCanvasContext.font = '30px Helvetica';
        gameCanvasContext.fillText(promptsAndAnswersManager.currentCorrectAnswer,
        promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.xCoordinate,
        promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.yCoordinate);

        //collider box
        gameCanvasContext.strokeStyle = 'white';
        gameCanvasContext.strokeRect(promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.xCoordinate - 5,
                                    promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.yCoordinate - 35,//fill text offset
                                    75,50);

        //draw incorrect answer
        gameCanvasContext.fillStyle = this.LETTER_COLOR;
        gameCanvasContext.fillText(promptsAndAnswersManager.currentIncorrectAnswer,
        promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.xCoordinate,
        promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.yCoordinate);

        //collider collider box
        gameCanvasContext.strokeStyle = 'white';
        gameCanvasContext.strokeRect(promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.xCoordinate - 5,
                                    promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.yCoordinate - 35,//fill text offset
                                    75,50);
      //}
    } else if (promptsAndAnswersManager.currentAnswerDataType === 'IMG')
    {
      // for (var arrayOfAnswersAnswerIndex = 0; arrayOfAnswersAnswerIndex < arrayOfAnswers.length; arrayOfAnswersAnswerIndex++)
      // {
        gameCanvasContext.drawImage(promptsAndAnswersManager.currentCorrectAnswer,
        promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.xCoordinate,
        promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.yCoordinate, 100,100);

        gameCanvasContext.drawImage(promptsAndAnswersManager.currentIncorrectAnswer,
        promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.xCoordinate,
        promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.yCoordinate, 100,100);
      //}
    } else if (promptsAndAnswersManager.currentAnswerDataType === "AUDIO")
    {
      // for (var arrayOfAnswersAnswerIndex = 0; arrayOfAnswersAnswerIndex < arrayOfAnswers.length; arrayOfAnswersAnswerIndex++)
      // {
      if (promptsAndAnswersManager.currentCorrectAnswer.shouldBeFlashing)
      {
        gameCanvasContext.globalCompositeOperation = promptersManager.globalCompositeOperationForCanvasContext;
        gameCanvasContext.globalAlpha = promptersManager.highlightedAnswerCurrentAlpha;
      }
      //gameCanvasContext.globalAlpha = 0;
      gameCanvasContext.drawImage(placeholderPlayButtonImage,
      promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.xCoordinate,
      promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.yCoordinate, 100,100);
      gameCanvasContext.globalCompositeOperation = 'source-over';
      gameCanvasContext.globalAlpha = 1;

      if (promptsAndAnswersManager.currentIncorrectAnswer.shouldBeFlashing)
      {
        gameCanvasContext.globalCompositeOperation = promptersManager.globalCompositeOperationForCanvasContext;
        gameCanvasContext.globalAlpha = promptersManager.highlightedAnswerCurrentAlpha;
      }
      //gameCanvasContext.globalAlpha = 0;
      gameCanvasContext.drawImage(placeholderPlayButtonImage,
      promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.xCoordinate,
      promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.yCoordinate, 100,100);
      gameCanvasContext.globalCompositeOperation = 'source-over';
      gameCanvasContext.globalAlpha = 1;
      //}
    }
  }

  this.handleCollisionsWithAnswers = function()
  {
    if (promptsAndAnswersManager.currentAnswerDataType === 'string')
    {
      if (this.snake.x > promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.xCoordinate - 5 &&
          this.snake.x < promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.xCoordinate + 70 &&
          this.snake.y > promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.yCoordinate - 35 &&
          this.snake.y < promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.yCoordinate + 15)
        {
          promptersManager.currentPrompter.currentWidth = 150;
          promptersManager.currentPrompter.currentHeight = 150;
            console.log('inside collision with correct string answer');
            amountCorrect++;
            playARandomSoundInAMultisoundArray(arrayOfGeneralPositiveFeedbackSounds);
            initializePromptAndAnswerObjects();
            this.shuffleAndResetPromptsAndAnswers();
            this.loadPromptsManager();
            this.promptThePlayer();
            this.snake.speedX = 0;
            this.snake.speedY = 0;
        } else if (this.snake.x > promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.xCoordinate - 5 &&
            this.snake.x < promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.xCoordinate + 70 &&
            this.snake.y > promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.yCoordinate - 35 &&
            this.snake.y < promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.yCoordinate + 15)
        {
          promptersManager.currentPrompter.currentWidth = 150;
          promptersManager.currentPrompter.currentHeight = 150;
          console.log('inside collision with incorrect string answer');
          amountIncorrect++;
          playARandomSoundInAMultisoundArray(arrayOfGeneralNegativeFeedbackSounds);
          initializePromptAndAnswerObjects();
          this.shuffleAndResetPromptsAndAnswers();
          this.loadPromptsManager();
          this.promptThePlayer();
          this.snake.speedX = 0;
          this.snake.speedY = 0;
        }
        calculateAccuracy();

    }
    else if (promptsAndAnswersManager.currentAnswerDataType === 'IMG')
    {
      if (this.snake.x > promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.xCoordinate &&
          this.snake.x < promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.xCoordinate + 100 &&
          this.snake.y > promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.yCoordinate &&
          this.snake.y < promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.yCoordinate + 100)
        {
          console.log('inside collision with correct image answer');
          promptersManager.currentPrompter.currentWidth = 150;
          promptersManager.currentPrompter.currentHeight = 150;
            amountCorrect++;
            playARandomSoundInAMultisoundArray(arrayOfGeneralPositiveFeedbackSounds);
            initializePromptAndAnswerObjects();
            this.shuffleAndResetPromptsAndAnswers();
            this.loadPromptsManager();
            this.promptThePlayer();
            this.snake.speedX = 0;
            this.snake.speedY = 0;
        } else if ((this.snake.x > promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.xCoordinate &&
            this.snake.x < promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.xCoordinate + 100 &&
            this.snake.y > promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.yCoordinate &&
            this.snake.y < promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.yCoordinate + 100))
        {
          promptersManager.currentPrompter.currentWidth = 150;
          promptersManager.currentPrompter.currentHeight = 150;
          console.log('inside collision with incorrect image answer');
          amountIncorrect++;
          playARandomSoundInAMultisoundArray(arrayOfGeneralNegativeFeedbackSounds);
          initializePromptAndAnswerObjects();
          this.shuffleAndResetPromptsAndAnswers();
          this.loadPromptsManager();
          this.promptThePlayer();
          this.snake.speedX = 0;
          this.snake.speedY = 0;
        }
        calculateAccuracy();

    }
    else if (promptsAndAnswersManager.currentAnswerDataType === 'AUDIO')
    {
      if (this.snake.x > promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.xCoordinate &&
          this.snake.x < promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.xCoordinate + 100 &&
          this.snake.y > promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.yCoordinate &&
          this.snake.y < promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.yCoordinate + 100)
        {
          console.log('inside collision with correct audio answer');
            promptersManager.currentPrompter.currentWidth = 150;
            promptersManager.currentPrompter.currentHeight = 150;
            amountCorrect++;
            playARandomSoundInAMultisoundArray(arrayOfGeneralPositiveFeedbackSounds);
            initializePromptAndAnswerObjects();
            this.shuffleAndResetPromptsAndAnswers();
            this.loadPromptsManager();
            this.promptThePlayer();
            this.snake.speedX = 0;
            this.snake.speedY = 0;
        } else if ((this.snake.x > promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.xCoordinate &&
            this.snake.x < promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.xCoordinate + 100 &&
            this.snake.y > promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.yCoordinate &&
            this.snake.y < promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.yCoordinate + 100))
        {
          console.log('inside collision with incorrect audio answer');
          promptersManager.currentPrompter.currentWidth = 150;
          promptersManager.currentPrompter.currentHeight = 150;
          amountIncorrect++;
          playARandomSoundInAMultisoundArray(arrayOfGeneralNegativeFeedbackSounds);
          initializePromptAndAnswerObjects();
          this.shuffleAndResetPromptsAndAnswers();
          this.loadPromptsManager();
          this.promptThePlayer();
          this.snake.speedX = 0;
          this.snake.speedY = 0;
        }
        calculateAccuracy();

    }
  }

  this.assignUsableAnswerCoordinates = function()
  {
    let randomXCoordinate = undefined;
    let randomYCoordinate = undefined;

    randomXCoordinate = getRandomIntWithExclusionaryRange(0,540, this.snake.x - 40,this.snake.x + 60);
    randomYCoordinate = getRandomIntWithExclusionaryRange(0,600, this.snake.y - 40,this.snake.y + 60);

    return {randomXCoordinate,randomYCoordinate};
  }

  this.handleLeftArrowDown = function()
  {
    this.snake.speedX = -20;
    this.snake.speedY = 0;
    console.log('this.snake.speedX: ' + this.snake.speedX);
  }

  this.handleUpArrowDown = function()
  {
    this.snake.speedX = 0;
    this.snake.speedY = -20;
    console.log('this.snake.speedY: ' + this.snake.speedY);
  }

  this.handleRightArrowDown = function()
  {
    this.snake.speedX = 20;
    this.snake.speedY = 0;
    console.log('this.snake.speedX: ' + this.snake.speedX);
  }

  this.handleDownArrowDown = function()
  {
    this.snake.speedX = 0;
    this.snake.speedY = 20;
    console.log('this.snake.speedY: ' + this.snake.speedY);
  }
}

const SNAKE_GAME = new snakeGameClass();
