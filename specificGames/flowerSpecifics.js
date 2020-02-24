//flowerSpecifics
//Two seeds (WORDS or LETTERS) fall from a tree.  Catching the correct seed in the pot makes a flower, catching the wrong seed makes a weed. 

const flowerBackButtonRectangleColor = 'yellow';
const flowerBackButtonTextColor = 'red';
const flowerLetterColor = 'BlueViolet';

flowerGameClass.prototype = new GameClass();
function flowerGameClass(){
    const SEED_ONE_STARTING_X = 100;
    const SEED_ONE_STARTING_Y = 400;
    const SEED_TWO_STARTING_X = 300;
    const SEED_TWO_STARTING_Y = 400;

    const PLAYER_START_X = 200;
    const PLAYER_START_Y = 100;

    const GRAVITY = 4;
    const LEFT_ARROW_SPEED = -5;
    const RIGHT_ARROW_SPEED = 5;

    this.intialize = function(){
        gameInterval.reset(this.frameRate);
    };

    function applyGRAVITY(){
        seedOneYCoordinate += GRAVITY;
        seedTwoYCoordinate += GRAVITY;
    };

    this.handleLeftArrowDown = function(){
        playerXSpeed = LEFT_ARROW_SPEED;
    };

    this.handleRightArrowDown = function(){
        playerXSpeed = RIGHT_ARROW_SPEED;
    };

    this.frameRate = 1000/30;
    this.letterSpawnInterval = 2000;

    this.initialize = function(){
        //initialize player
        playerXCoordiate = PLAYER_START_X;
        playerYCoordinate = PLAYER_START_Y;
        playerXSpeed = 0;
        letterSpeed = 3;

        //initialize seeds
        seedOneXCoordinate = SEED_ONE_STARTING_X;
        seedOneYCoordinate = SEED_ONE_STARTING_Y;
        seedTwoXCoordinate = SEED_TWO_STARTING_X;
        seedTwoYCoordinate = SEED_TWO_STARTING_Y;
    };

    this.update = function(){
        this.movePlayer();

    };

    this.movePlayer = function(){
        applyGRAVITY();
        playerXCoordiate += playerXSpeed;
    };

    this.draw = function(){
        this.drawBackground();
        this.drawPlayer();
        this.drawSeeds();
    }

    this.drawBackground = function(){
        gameCanvasContext.fillStyle = 'cyan';
        gameCanvasContext.fillRect(0,0, gameCanvas.width, gameCanvas.height);
    };

    this.drawPlayer = function(){
        gameCanvasContext.fillStyle = 'red';
        gameCanvasContext.fillRect(playerXCoordiate, playerYCoordinate, 20, 20);
    }

    this.drawSeeds = function(){
        gameCanvasContext.fillStyle = 'brown';
        gameCanvasContext.fillRect(seedOneXCoordinate, seedOneYCoordinate, 10, 10);
        gameCanvasContext.fillRect(seedTwoXCoordinate, seedTwoYCoordinate, 10, 10);

    }

}

var flowerGame = new flowerGameClass();