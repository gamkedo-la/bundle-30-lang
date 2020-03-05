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

    this.textAnswerFontSize = 30;
	this.textAnswerFontStyle = 'px Helvetica';

    this.playerCharacter = undefined;
    const SEED_ONE_STARTING_X = 100;
    const SEED_ONE_STARTING_Y = 10;
    const SEED_TWO_STARTING_X = 300;
    const SEED_TWO_STARTING_Y = 10;
    const SEED_WIDTH = 15;
    const SEED_HEIGHT = 15;

    const GRAVITY = 6;

    this.seedOneXCoordinate = undefined;
    this.seedOneYCoordinate = undefined;
    this.seedTwoXCoordinate = undefined;
    this.seedTwoYCoordinate = undefined;   

    this.initialize = function(){
        gameInterval.reset(this.FRAME_RATE);
        this.playerCharacter = new FlowerClass();
        initializePromptAndAnswerObjects();       
		promptsAndAnswersManager.setOrResetPromptsAndAnswers();
        promptersManager.loadAppropriatePrompterBasedOnCurrentPromptsDataType();
        console.log(this.playerCharacter);
        //letterSpeed = 3;

        //initialize seeds
        this.seedOneXCoordinate = SEED_ONE_STARTING_X;
        this.seedOneYCoordinate = SEED_ONE_STARTING_Y;
        this.seedTwoXCoordinate = SEED_TWO_STARTING_X;
        this.seedTwoYCoordinate = SEED_TWO_STARTING_Y;
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
        this.handleAnswersOffScreen();
        collisionsWithAnswersManager.handleCollisionsWithAnswers();
      }
    };

    this.draw = function(){
        this.drawBackground();
        this.playerCharacter.draw();
        drawAnswersManager.draw();
        promptersManager.drawPromptsWhenAppropriate();
        //this.drawSeeds();
    }

    this.movePlayer = function(){
        this.playerCharacter.x += this.playerCharacter.xSpeed;
        this.handleBoundaries();
    };

    this.moveAnswers = function(){
        promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.yCoordinate += GRAVITY;
        promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.yCoordinate +=GRAVITY;
    }

    this.drawBackground = function(){
        gameCanvasContext.fillStyle = 'cyan';
        gameCanvasContext.fillRect(0,0, gameCanvas.width, gameCanvas.height);
    };

    this.drawSeeds = function(){
        gameCanvasContext.fillStyle = 'brown';
        gameCanvasContext.fillRect(this.seedOneXCoordinate, this.seedOneYCoordinate, SEED_WIDTH, SEED_HEIGHT);
        gameCanvasContext.fillRect(this.seedTwoXCoordinate, this.seedTwoYCoordinate, SEED_WIDTH, SEED_HEIGHT);
    }

   /* this.handleCollisions = function() {
        if ((this.playerCharacter.x + this.playerCharacter.width / 2) >= (this.seedOneXCoordinate - SEED_WIDTH / 2) &&
            (this.playerCharacter.x - this.playerCharacter.width / 2) <= (this.seedOneXCoordinate + SEED_WIDTH / 2) &&
            (this.playerCharacter.y + this.playerCharacter.height / 2) >= (this.seedOneYCoordinate - SEED_WIDTH / 2) &&
            (this.playerCharacter.y - this.playerCharacter.height / 2) <= (this.seedOneYCoordinate + SEED_HEIGHT / 2)) {
            console.log("collision detected");
            seedOneYCoordinate = 200;
        }

        if ((this.playerCharacter.x + this.playerCharacter.width / 2) >= (this.seedTwoXCoordinate - SEED_WIDTH / 2) &&
        (this.playerCharacter.x - this.playerCharacter.width / 2) <= (this.seedTwoXCoordinate + SEED_WIDTH / 2) &&
        (this.playerCharacter.y + this.playerCharacter.height / 2) >= (this.seedTwoYCoordinate - SEED_WIDTH / 2) &&
        (this.playerCharacter.y - this.playerCharacter.height / 2) <= (this.seedTwoYCoordinate + SEED_HEIGHT / 2)) {
        console.log("collision detected");
        seedTwoYCoordinate = 200;
    }
    }*/

    this.handleBoundaries = function() {
        if (this.playerCharacter.x >= 600) {
            this.playerCharacter.x = 600;
        }
        if (this.playerCharacter.x <= 30) {
            this.playerCharacter.x = 30;
        }
    }
    this.initializePromptAndAnswerObjects =function(){
        initializePromptAndAnswerObjects();
    }

    this.shuffleAndResetPromptsAndAnswers = function(){
        promptsAndAnswersManager.setOrResetPromptsAndAnswers();
    }

    this.loadPromptsManager = function(){
        promptersManager.loadAppropriatePrompterBasedOnCurrentPromptsDataType();
    }

    this.promptThePlayer = function(){
        promptersManager.promptThePlayer();
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
}

const flowerGame = new flowerGameClass();
