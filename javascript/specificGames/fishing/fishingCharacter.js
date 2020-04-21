function FishingCharacter () {

    this.x = undefined;
    this.y = undefined;

    this.width = 70;
    this.height = 70;

    this.initialize = function() {
        this.x = gameCanvas.width / 2;
        this.y = WATER_HEIGHT - 30;
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
}