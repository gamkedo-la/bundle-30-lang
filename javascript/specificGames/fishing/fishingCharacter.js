function FishingCharacter () {
    this.isInitialized = false;

    this.x = undefined;
    this.y = undefined;

    this.width = 70;
    this.height = 70;

    this.speedX = 5;

    this.initialize = function() {
        this.x = gameCanvas.width / 2;
        this.y = WATER_HEIGHT - 30;
        this.isInitialized = true;
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