//flowerSpecifics
//Two seeds (WORDS or LETTERS) fall from a tree.  Catching the correct seed in the pot makes a flower, catching the wrong seed makes a weed.

const flowerBackButtonRectangleColor = 'yellow';
const flowerBackButtonTextColor = 'red';
const flowerLetterColor = 'BlueViolet';

flowerGameClass.prototype = new GameClass();
function flowerGameClass(){
    this.name = 'flowerGame';
    this.playerCharacter = undefined;
    const SEED_ONE_STARTING_X = 100;
    const SEED_ONE_STARTING_Y = 10;
    const SEED_TWO_STARTING_X = 300;
    const SEED_TWO_STARTING_Y = 10;
    const SEED_WIDTH = 15;
    const SEED_HEIGHT = 15;

    const GRAVITY = 2;


    this.initialize = function(){
        gameInterval.reset(this.FRAME_RATE);
        this.playerCharacter = new FlowerClass();
        console.log(this.playerCharacter);
        letterSpeed = 3;

        //initialize seeds
        seedOneXCoordinate = SEED_ONE_STARTING_X;
        seedOneYCoordinate = SEED_ONE_STARTING_Y;
        seedTwoXCoordinate = SEED_TWO_STARTING_X;
        seedTwoYCoordinate = SEED_TWO_STARTING_Y;
    };

    function applyGRAVITY(){
        seedOneYCoordinate += GRAVITY;
        seedTwoYCoordinate += GRAVITY;
    };

    this.handleLeftArrowDown = function(){
        this.playerCharacter.xSpeed = this.playerCharacter.LEFT_ARROW_SPEED;
    };

    this.handleRightArrowDown = function(){
        this.playerCharacter.xSpeed = this.playerCharacter.RIGHT_ARROW_SPEED;
    };

    this.FRAME_RATE = 1000/30;
    this.letterSpawnInterval = 2000;

    this.update = function()
    {
      if (!promptersManager.shouldBeDrawingAPrompt &&
          fullGameStateMachine.currentState === fullGameStateMachine.FULL_GAME_ENUMERABLE_STATES.playingMiniGame)
      {
        this.movePlayer();
        this.handleCollisions();
      }
    };

    this.movePlayer = function(){
        applyGRAVITY();
        this.playerCharacter.x += this.playerCharacter.xSpeed;
        this.handleBoundaries();
    };

    this.draw = function(){
        this.drawBackground();
        this.playerCharacter.draw();
        this.drawSeeds();
    }

    this.drawBackground = function(){
        gameCanvasContext.fillStyle = 'cyan';
        gameCanvasContext.fillRect(0,0, gameCanvas.width, gameCanvas.height);
    };

    this.drawSeeds = function(){
        gameCanvasContext.fillStyle = 'brown';
        gameCanvasContext.fillRect(seedOneXCoordinate, seedOneYCoordinate, SEED_WIDTH, SEED_HEIGHT);
        gameCanvasContext.fillRect(seedTwoXCoordinate, seedTwoYCoordinate, SEED_WIDTH, SEED_HEIGHT);
    }

    this.handleCollisions = function() {
        if ((this.playerCharacter.x + this.playerCharacter.width / 2) >= (seedOneXCoordinate - SEED_WIDTH / 2) &&
            (this.playerCharacter.x - this.playerCharacter.width / 2) <= (seedOneXCoordinate + SEED_WIDTH / 2) &&
            (this.playerCharacter.y + this.playerCharacter.height / 2) >= (seedOneYCoordinate - SEED_WIDTH / 2) &&
            (this.playerCharacter.y - this.playerCharacter.height / 2) <= (seedOneYCoordinate + SEED_HEIGHT / 2)) {
            console.log("collision detected");
            seedOneYCoordinate = 200;
        }

        if ((this.playerCharacter.x + this.playerCharacter.width / 2) >= (seedTwoXCoordinate - SEED_WIDTH / 2) &&
        (this.playerCharacter.x - this.playerCharacter.width / 2) <= (seedTwoXCoordinate + SEED_WIDTH / 2) &&
        (this.playerCharacter.y + this.playerCharacter.height / 2) >= (seedTwoYCoordinate - SEED_WIDTH / 2) &&
        (this.playerCharacter.y - this.playerCharacter.height / 2) <= (seedTwoYCoordinate + SEED_HEIGHT / 2)) {
        console.log("collision detected");
        seedTwoYCoordinate = 200;
    }
    }

    this.handleBoundaries = function() {
        if (this.playerCharacter.x >= 600) {
            this.playerCharacter.x = 600;
        }
        if (this.playerCharacter.x <= 30) {
            this.playerCharacter.x = 30;
        }
    }

}

var flowerGame = new flowerGameClass();
