//flowerSpecifics
//Two seeds (WORDS or LETTERS) fall from a tree.  Catching the correct seed in the pot makes a flower, catching the wrong seed makes a weed.

const flowerBackButtonRectangleColor = 'yellow';
const flowerBackButtonTextColor = 'red';
const flowerLetterColor = 'BlueViolet';

flowerGameClass.prototype = new GameClass();
function flowerGameClass(){
    this.name = 'flowerGame';

    this.FRAME_RATE = 1000/50;
    this.letterSpawnInterval = 2000;
	this.titleScreenData = [{
	  name: "Flower",
	  fontSize: 27,
	  spacing: 15,
	  x: 222, y: 385
	}];
    this.textAnswerFontSize = 30;
	this.textAnswerFontStyle = 'px Helvetica';

    this.playerCharacter = undefined;
    this.background = undefined;
    const SEED_ONE_STARTING_X = 100;
    const SEED_ONE_STARTING_Y = 10;
    const SEED_TWO_STARTING_X = 300;
    const SEED_TWO_STARTING_Y = 10;
    const SEED_WIDTH = 15;
    const SEED_HEIGHT = 15;

    const GRAVITY = 3;

    this.seedOneXCoordinate = undefined;
    this.seedOneYCoordinate = undefined;
    this.seedTwoXCoordinate = undefined;
    this.seedTwoYCoordinate = undefined;

    var amountCorrectAtStartOfThisGame = undefined;

    this.superInitialize = this.initialize;
    this.initialize = function()
    {
      this.playerCharacter = new FlowerClass();
      this.background = new FlowerBackgroundClass();
      amountCorrectAtStartOfThisGame = amountCorrect;
      //initialize seeds
      this.seedOneXCoordinate = SEED_ONE_STARTING_X;
      this.seedOneYCoordinate = SEED_ONE_STARTING_Y;
      this.seedTwoXCoordinate = SEED_TWO_STARTING_X;
      this.seedTwoYCoordinate = SEED_TWO_STARTING_Y;
      initializePromptAndAnswerObjects();
      promptsAndAnswersManager.setOrResetPromptsAndAnswers();
      promptersManager.loadAppropriatePrompterBasedOnCurrentPromptsDataType();
      console.log(this.playerCharacter);
	  this.superInitialize();
    };

    this.handleLeftArrowDown = function(){
        this.playerCharacter.xSpeed = this.playerCharacter.LEFT_ARROW_SPEED;
    };

    this.handleRightArrowDown = function(){
        this.playerCharacter.xSpeed = this.playerCharacter.RIGHT_ARROW_SPEED;
    };

    this.update = function()
    {
      if (!promptersManager.shouldBeDrawingAPrompt &&
          fullGameStateMachine.currentState === fullGameStateMachine.FULL_GAME_ENUMERABLE_STATES.playingMiniGame)
      {
        this.movePlayer();
        this.moveAnswers();
        this.moveSeeds();
        this.handleAnswersOffScreen();
        collisionsWithAnswersManager.handleCollisionsWithAnswers();

      }
    };

    this.draw = function(){
        this.background.draw();
        this.playerCharacter.draw();
        drawAnswersManager.draw();
        promptersManager.drawPromptsWhenAppropriate();
        this.drawSeeds();
        this.sproutFlowers();
    }

    this.movePlayer = function(){
        this.playerCharacter.x += this.playerCharacter.xSpeed;
        this.handleBoundaries();
    };

    this.moveAnswers = function(){
        promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.yCoordinate += GRAVITY;
        promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.yCoordinate +=GRAVITY;
    }

    this.drawSeeds = function(){
        gameCanvasContext.fillStyle = 'brown';
        gameCanvasContext.fillRect(this.seedOneXCoordinate, this.seedOneYCoordinate, SEED_WIDTH, SEED_HEIGHT);
        gameCanvasContext.fillRect(this.seedTwoXCoordinate, this.seedTwoYCoordinate, SEED_WIDTH, SEED_HEIGHT);
    }

    this.moveSeeds = function()
    {
      this.seedOneYCoordinate += GRAVITY;
      this.seedTwoYCoordinate += GRAVITY;
    }

    this.handleBoundaries = function() {
        if (this.playerCharacter.x >= 600) {
            this.playerCharacter.x = 600;
        }
        if (this.playerCharacter.x <= 30) {
            this.playerCharacter.x = 30;
        }
    }

    this.handleAnswersOffScreen = function()
    {
      if (promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.yCoordinate > gameCanvas.height)
      {
        promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.yCoordinate = -10;
      }

      if (promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.yCoordinate > gameCanvas.height)
      {
        promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.yCoordinate = -10;
      }
    }

    this.sproutFlowers = function(){
      this.width = 30;
      this.height = 60;
      if(amountCorrect > amountCorrectAtStartOfThisGame){
        gameCanvasContext.drawImage(simpleFlower, this.playerCharacter.x,(this.playerCharacter.y - this.height), this.width, this.height);
        console.log("sprouting flower");
      }


    }
}

const flowerGame = new flowerGameClass();
