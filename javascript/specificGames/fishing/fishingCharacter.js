const FISHING_ROD_LENGTH = 70;

function FishingCharacter () {
    this.isInitialized = false;

    this.x = undefined;
    this.y = undefined;

    this.width = 70;
    this.height = 70;

    this.speedX = 5;

    this.fishingHook = undefined;

    this.fishingBucket = undefined;

    this.caughtFish = false;

    this.initialize = function() {
        this.x = gameCanvas.width / 2;
        this.y = WATER_HEIGHT - 30;
        this.isInitialized = true;

        this.fishingHook = new FishingHook();
        this.fishingHook.x = this.x + this.width/2;
        this.fishingHook.y = this.y + 5;

        this.fishingBucket = new FishingBucket();
        this.fishingBucket.initialize(this.x - this.width/2);

        this.caughtFish = false
    }

    this.resetHook = function() {
        this.fishingHook.x = this.x + this.width/2;;
        this.fishingHook.y = this.y + 5;
        this.fishingHook.reset();
    }

    this.update = function () {
        if (this.isInitialized){
            if (!this.fishingHook.isThrown){
                this.fishingHook.x = this.x + this.width/2;
                this.fishingBucket.updateXPosition(this.x - this.width/2);
            }
            this.fishingHook.update();
        }
    }

    this.draw = function () {

        this.drawCharacter();
        this.fishingBucket.draw();
        this.drawBoat();
        this.drawFishingLine();
        this.fishingHook.draw();
    }

    this.drawCharacter = function(){
        gameCanvasContext.drawImage(
            fishingGameCharacter,
            this.x - this.width/2,
            this.y - this.height/2,
            this.width, this.height
        )
    }

    this.drawBoat = function() {
        gameCanvasContext.drawImage(
            fishingGameBoat,
            this.x - 100,
            WATER_HEIGHT - 15,
            150, 30
        )
    }

    this.drawFishingLine = function() {
        if (this.fishingHook.isThrown){
            gameCanvasContext.save();
            gameCanvasContext.strokeStyle = "black";
            gameCanvasContext.lineWidth = 2;
            gameCanvasContext.beginPath();
            gameCanvasContext.moveTo(this.x + this.width/2, this.y + 5)
            gameCanvasContext.bezierCurveTo(
                this.x + this.width/2, WATER_HEIGHT,
                this.fishingHook.x, WATER_HEIGHT,
                this.fishingHook.x, this.fishingHook.y
            );
            gameCanvasContext.stroke();
            gameCanvasContext.restore();
        }
    }

    this.throwHook = function () {
        if (!this.fishingHook.isThrown){
            this.fishingHook.isThrown = true;
            this.fishingHook.isFalling = true;
            gameAudio.rodCasting.play();
        }
        else if (this.fishingHook.isEatenByFish){
            this.fishingHook.isPulledBack = true;
            gameAudio.rodCasting.play();
        }
    }

    this.moveLeft = function(){
        if (!this.fishingHook.isThrown){
            this.x -= this.speedX;

            if (this.x  < this.width/2){
                this.x += this.speedX;
            }
        }
        else {
            this.fishingHook.moveLeft()
        }
    }

    this.moveRight = function(){
        if (!this.fishingHook.isThrown){
            this.x += this.speedX;

            if (this.x  > gameCanvas.width - this.width/2){
                this.x -= this.speedX;
            }
        }
        else {
            this.fishingHook.moveRight()
        }
    }
}
