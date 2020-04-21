const FISHING_ROD_LENGTH = 70;

function FishingCharacter () {
    this.isInitialized = false;

    this.x = undefined;
    this.y = undefined;

    this.width = 70;
    this.height = 70;

    this.speedX = 5;

    this.fishingHook = undefined;

    this.initialize = function() {
        this.x = gameCanvas.width / 2;
        this.y = WATER_HEIGHT - 30;
        this.isInitialized = true;

        this.fishingHook = new FishingHook();
        this.fishingHook.x = this.x + this.width/2;
        this.fishingHook.y = this.y + 5;
    }

    this.update = function () {
        this.fishingHook.x = this.x + this.width/2;
        this.fishingHook.update();
    }

    this.draw = function () {
        gameCanvasContext.drawImage(
            fishingGameCharacter, 
            this.x - this.width/2, 
            this.y - this.height/2,
            this.width, this.height
        )

        gameCanvasContext.drawImage(
            fishingGameBoat, 
            this.x - 100, 
            WATER_HEIGHT - 15,
            150, 30
        )

        gameCanvasContext.save();
        gameCanvasContext.fillStyle = "black";
        gameCanvasContext.lineWidth = 5;
        gameCanvasContext.beginPath();
        gameCanvasContext.moveTo(this.x + this.width/2, this.y + 5)
        gameCanvasContext.lineTo(this.fishingHook.x, this.fishingHook.y)
        gameCanvasContext.stroke();
        gameCanvasContext.restore();

        this.fishingHook.draw();
    }

    this.throwHook = function () {
        if (!this.fishingHook.isThrown){
            this.fishingHook.isThrown = true;
            console.log("Throwing the hook!!")
        }
    }

    this.moveLeft = function(){
        this.x -= this.speedX;

        if (this.x  < this.width/2){
            this.x += this.speedX;
        }
    }

    this.moveRight = function(){
        this.x += this.speedX;

        if (this.x  > gameCanvas.width - this.width/2){
            this.x -= this.speedX;
        }
    }

    
}