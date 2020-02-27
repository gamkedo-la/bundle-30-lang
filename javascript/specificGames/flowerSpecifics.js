//flowerSpecifics
//Two seeds (WORDS or LETTERS) fall from a tree.  Catching the correct seed in the pot makes a flower, catching the wrong seed makes a weed.

const flowerBackButtonRectangleColor = 'yellow';
const flowerBackButtonTextColor = 'red';
const flowerLetterColor = 'BlueViolet';

flowerGameClass.prototype = new GameClass();
function flowerGameClass(){
    this.name = 'flowerGame';
    const SEED_ONE_STARTING_X = 100;
    const SEED_ONE_STARTING_Y = 10;
    const SEED_TWO_STARTING_X = 300;
    const SEED_TWO_STARTING_Y = 10;
    const SEED_WIDTH = 15;
    const SEED_HEIGHT = 15;

    const PLAYER_START_X = 200;
    const PLAYER_START_Y = 600;
    const PLAYER_WIDTH = 20;
    const PLAYER_HEIGHT = 20;

    const GRAVITY = 2;
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
        handleCollisions();
    };

    this.movePlayer = function(){
        applyGRAVITY();
        playerXCoordiate += playerXSpeed;
        handleBoundaries();
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
        gameCanvasContext.fillRect(playerXCoordiate, playerYCoordinate, PLAYER_WIDTH, PLAYER_HEIGHT);
    }

    this.drawSeeds = function(){
        gameCanvasContext.fillStyle = 'brown';
        gameCanvasContext.fillRect(seedOneXCoordinate, seedOneYCoordinate, SEED_WIDTH, SEED_HEIGHT);
        gameCanvasContext.fillRect(seedTwoXCoordinate, seedTwoYCoordinate, SEED_WIDTH, SEED_HEIGHT);
    }

    function handleCollisions() {
        if ((playerXCoordiate + PLAYER_WIDTH / 2) >= (seedOneXCoordinate - SEED_WIDTH / 2) &&
            (playerXCoordiate - PLAYER_WIDTH / 2) <= (seedOneXCoordinate + SEED_WIDTH / 2) &&
            (playerYCoordinate + PLAYER_HEIGHT / 2) >= (seedOneYCoordinate - SEED_WIDTH / 2) &&
            (playerYCoordinate - PLAYER_HEIGHT / 2) <= (seedOneYCoordinate + SEED_HEIGHT / 2)) {
            console.log("collision detected");
            seedOneYCoordinate = 200;
        }

        if ((playerXCoordiate + PLAYER_WIDTH / 2) >= (seedTwoXCoordinate - SEED_WIDTH / 2) &&
        (playerXCoordiate - PLAYER_WIDTH / 2) <= (seedTwoXCoordinate + SEED_WIDTH / 2) &&
        (playerYCoordinate + PLAYER_HEIGHT / 2) >= (seedTwoYCoordinate - SEED_WIDTH / 2) &&
        (playerYCoordinate - PLAYER_HEIGHT / 2) <= (seedTwoYCoordinate + SEED_HEIGHT / 2)) {
        console.log("collision detected");
        seedTwoYCoordinate = 200;
    }
    }

    function handleBoundaries() {
        if (playerXCoordiate >= 600) {
            playerXCoordiate = 600;
        }
        if (playerXCoordiate <= 30) {
            playerXCoordiate = 30;
        }
    }
}

var flowerGame = new flowerGameClass();
