function getRandomIntInclusive(min, max)
{
min = Math.ceil(min);
max = Math.floor(max);
return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

var snakeStartingX = getRandomIntInclusive(0,640);
var snakeStartingY = getRandomIntInclusive(0,700);

var snakeTail = [];


const STARTING_SNAKE_SPEED_X = 0;
const STARTING_SNAKE_SPEED_Y = 0;

const SNAKE_TAIL_MAX_LENGTH = 5;
const SNAKE_DIMENSION = 20;

const SNAKE_GAME_FRAME_RATE = 1000/10;

const SNAKE_BACK_BUTTON_RECTANGLE_COLOR = 'yellow';
const SNAKE_BACK_BUTTON_TEXT_COLOR = 'blueviolet';

const SNAKE_LETTER_COLOR = 'cyan';

const SNAKE_LETTER_SPEED = 0;

const SNAKE_BACKGROUND_COLOR = 'brown';

const SNAKE_PLAYER_COLOR = 'lime';

function snakeGameClass()
{
  let gameIsPlaying = false;

  this.isPlaying = function()
  {
    return gameIsPlaying;
  };

  this.startPlaying = function()
  {
    gameIsPlaying = true;
  }

  this.stopPlaying = function()
  {
    gameIsPlaying = false;
  }

  this.initialize = function()
  {
    playerXCoordinate = snakeStartingX;
    playerYCoordinate = snakeStartingY;
    gameInterval.reset(SNAKE_GAME_FRAME_RATE);
    playerSpeedX = 0;
    playerSpeedY = 0;
    letterSpeed = SNAKE_LETTER_SPEED;
    this.shuffleAndResetPromptsAndAnswers();
    this.loadPromptsManager();
  }


  //update section
  this.update = function()
  {
    if (!promptersManager.shouldBeDrawingAPrompt)
    {
      this.updateSnakeTail();
      this.movePlayer();
      this.handleCollisionsWithAnswers();
    }
  }

  this.updateSnakeTail = function()
  {
    this.populateSnakeTail();
    this.deleteExcessTail();
  }

  this.populateSnakeTail = function()
  {
    snakeTail.push({x:playerXCoordinate,y:playerYCoordinate});
  }

  this.deleteExcessTail = function()
  {
    while (snakeTail.length > SNAKE_TAIL_MAX_LENGTH)
    {
      snakeTail.shift();
    }
  }

  this.movePlayer = function()
  {
    playerXCoordinate += playerSpeedX;
    playerYCoordinate += playerSpeedY;
    this.wrapSnakeIfOffScreen();
  }

  this.wrapSnakeIfOffScreen = function()
  {
    if (playerXCoordinate > gameCanvas.width)
    {
      playerXCoordinate = 0;
    } else if (playerXCoordinate < 0)
    {
      playerXCoordinate = gameCanvas.width;
    } else if (playerYCoordinate > gameCanvas.height)
    {
      playerYCoordinate = 0;
    } else if (playerYCoordinate < 0)
    {
      playerYCoordinate = gameCanvas.height;
    }
  }

  //draw section
  this.draw = function()
  {
    this.drawBackground();
    this.drawPlayer();
    this.drawAnswers();
    this.drawPromptsWhenAppropriate();
  }

  this.drawBackground = function()
  {
    gameCanvasContext.fillStyle = SNAKE_BACKGROUND_COLOR;
    gameCanvasContext.fillRect(0,0, gameCanvas.width,gameCanvas.height);
  }

  this.drawPlayer = function()
  {
    gameCanvasContext.fillStyle = SNAKE_PLAYER_COLOR;

    for(let snakeTailIndex = 0; snakeTailIndex < snakeTail.length; snakeTailIndex++)
    {
      gameCanvasContext.fillRect(snakeTail[snakeTailIndex].x,snakeTail[snakeTailIndex].y,
      SNAKE_DIMENSION - 2,SNAKE_DIMENSION - 2);

      // if (snakeTrail[i].x === playerX && snakeTrail[i].y == playerY)
      // {
      //   tail = 5;
      // }
    }
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

  this.drawAnswers = function()
  {
    if (promptsAndAnswersManager.currentAnswerDataType === 'string')
    {
      gameCanvasContext.fillStyle = SNAKE_LETTER_COLOR;
      // for (var arrayOfAnswersAnswerIndex = 0; arrayOfAnswersAnswerIndex < arrayOfAnswers.length; arrayOfAnswersAnswerIndex++)
      // {
        //draw correct answer
        gameCanvasContext.font = '30px Helvetica';
        gameCanvasContext.fillText(promptsAndAnswersManager.currentCorrectAnswer,
        promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.xCoordinate,
        promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.yCoordinate);

        //draw incorrect answer
        gameCanvasContext.fillText(promptsAndAnswersManager.currentIncorrectAnswer,
        promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.xCoordinate,
        promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.yCoordinate);
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
      if (playerXCoordinate > promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.xCoordinate &&
          playerXCoordinate < promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.xCoordinate + 30 &&
          playerYCoordinate > promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.yCoordinate &&
          playerYCoordinate < promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.yCoordinate + 30)
        {
            console.log('inside collision with correct string answer');
            amountCorrect++;
            playARandomSoundInAMultisoundArray(arrayOfGeneralPositiveFeedbackSounds);
            initializePromptAndAnswerObjects();
            this.shuffleAndResetPromptsAndAnswers();
            this.loadPromptsManager();
            this.promptThePlayer();
            playerSpeedX = 0;
            playerSpeedY = 0;
            textPrompter.currentWidth = 150;
            textPrompter.currentHeight = 150;
        } else if (playerXCoordinate > promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.xCoordinate &&
            playerXCoordinate < promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.xCoordinate + 30 &&
            playerYCoordinate > promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.yCoordinate &&
            playerYCoordinate < promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.yCoordinate + 30)
        {
          console.log('inside collision with incorrect string answer');
          amountIncorrect++;
          playARandomSoundInAMultisoundArray(arrayOfGeneralNegativeFeedbackSounds);
          initializePromptAndAnswerObjects();
          this.shuffleAndResetPromptsAndAnswers();
          this.loadPromptsManager();
          this.promptThePlayer();
          playerSpeedX = 0;
          playerSpeedY = 0;
          textPrompter.currentWidth = 150;
          textPrompter.currentHeight = 150;
        }
        calculateAccuracy();

    }
    else if (promptsAndAnswersManager.currentAnswerDataType === 'IMG')
    {
      if (playerXCoordinate > promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.xCoordinate &&
          playerXCoordinate < promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.xCoordinate + 100 &&
          playerYCoordinate > promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.yCoordinate &&
          playerYCoordinate < promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.yCoordinate + 100)
        {
          console.log('inside collision with correct image answer');
            amountCorrect++;
            playARandomSoundInAMultisoundArray(arrayOfGeneralPositiveFeedbackSounds);
            initializePromptAndAnswerObjects();
            this.shuffleAndResetPromptsAndAnswers();
            this.loadPromptsManager();
            this.promptThePlayer();
            playerSpeedX = 0;
            playerSpeedY = 0;
            imagePrompter.currentWidth = 150;
            imagePrompter.currentHeight = 150;
        } else if ((playerXCoordinate > promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.xCoordinate &&
            playerXCoordinate < promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.xCoordinate + 100 &&
            playerYCoordinate > promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.yCoordinate &&
            playerYCoordinate < promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.yCoordinate + 100))
        {
          console.log('inside collision with incorrect image answer');
          amountIncorrect++;
          playARandomSoundInAMultisoundArray(arrayOfGeneralNegativeFeedbackSounds);
          initializePromptAndAnswerObjects();
          this.shuffleAndResetPromptsAndAnswers();
          this.loadPromptsManager();
          this.promptThePlayer();
          playerSpeedX = 0;
          playerSpeedY = 0;
          imagePrompter.currentWidth = 150;
          imagePrompter.currentHeight = 150;
        }
        calculateAccuracy();

    }
    else if (promptsAndAnswersManager.currentAnswerDataType === 'AUDIO')
    {
      if (playerXCoordinate > promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.xCoordinate &&
          playerXCoordinate < promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.xCoordinate + 100 &&
          playerYCoordinate > promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.yCoordinate &&
          playerYCoordinate < promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.yCoordinate + 100)
        {
          console.log('inside collision with correct audio answer');
            amountCorrect++;
            playARandomSoundInAMultisoundArray(arrayOfGeneralPositiveFeedbackSounds);
            initializePromptAndAnswerObjects();
            this.shuffleAndResetPromptsAndAnswers();
            this.loadPromptsManager();
            this.promptThePlayer();
            playerSpeedX = 0;
            playerSpeedY = 0;
            audioPrompter.width = 150;
            audioPrompter.height = 150;
        } else if ((playerXCoordinate > promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.xCoordinate &&
            playerXCoordinate < promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.xCoordinate + 100 &&
            playerYCoordinate > promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.yCoordinate &&
            playerYCoordinate < promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.yCoordinate + 100))
        {
          console.log('inside collision with incorrect audio answer');
          amountIncorrect++;
          playARandomSoundInAMultisoundArray(arrayOfGeneralNegativeFeedbackSounds);
          initializePromptAndAnswerObjects();
          this.shuffleAndResetPromptsAndAnswers();
          this.loadPromptsManager();
          this.promptThePlayer();
          playerSpeedX = 0;
          playerSpeedY = 0;
          audioPrompter.width = 150;
          audioPrompter.height = 150;
        }
        calculateAccuracy();

    }
  }
}

const SNAKE_GAME = new snakeGameClass();
