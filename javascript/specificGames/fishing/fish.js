const FISH_SIZE_FACTOR = 0.5;
const FISH_MIN_SPEED = 0.5;
const FISH_MAX_SPEED = 2.0;

const MIN_DISTANCE_BETWEEN_FISHES = 50;

function Fish() {
    this.x = undefined;
    this.y = undefined;

    this.speedX = undefined;
    this.speedY = 0.5;

    this.width = undefined;
    this.height = undefined;

    this.sprite = undefined;
    this.orientation = undefined;

    this.initialize = function () {
        this.orientation = getRandomElementFromArray([-1, 1]);

        this.sprite = getRandomElementFromArray(fishSprites);
        this.width  = FISH_SIZE_FACTOR * this.sprite.width;
        this.height = FISH_SIZE_FACTOR * this.sprite.height;

        this.x = getRandomArbitrary(
            this.width/2, gameCanvas.width - this.width/2
        );

        while (this.scanForOtherFishesTooClose()){
            this.y = getRandomArbitrary(
                300 + this.height/2, gameCanvas.height - this.height/2
            );
        }

        this.speedX = getRandomArbitrary(FISH_MIN_SPEED, FISH_MAX_SPEED);
    }

    this.update = function () {
        this.x += this.orientation * this.speedX;
        if (this.x > gameCanvas.width - this.width / 2){
            this.orientation = -1;
        }
        else if (this.x < this.width / 2){
            this.orientation = 1;
        }
    }

    this.draw = function () {
        gameCanvasContext.save();
        gameCanvasContext.translate(this.x, this.y);
        gameCanvasContext.scale(this.orientation, 1);
        gameCanvasContext.drawImage(
            this.sprite,
            -this.width/2, 
            -this.height/2,
            this.width, 
            this.height
        );
        gameCanvasContext.restore();
    }

    this.scanForOtherFishesTooClose = function() {

        if (this.y == undefined){
            return true;
        }

        var otherFishesInWater = gameClassManager.currentGame.fishes;

        for (var i=0 ; i < otherFishesInWater.length ; i++){
            if (Math.abs(this.y - otherFishesInWater[i].y) < 
                MIN_DISTANCE_BETWEEN_FISHES
            ){
                return true;
            }
        }

        return false;
    }
}