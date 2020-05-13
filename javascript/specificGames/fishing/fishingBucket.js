const BUCKET_SPACE_TO_CHAR = 10;

function FishingBucket() {

    this.x = undefined;
    this.y = undefined;

    this.width  = 40;
    this.height = 15;

    this.initialize = function(x){
        this.updateXPosition(x);
        this.y = WATER_HEIGHT - 20;
    }

    this.updateXPosition = function(x){
        this.x = x - this.width/2 - BUCKET_SPACE_TO_CHAR;
    }

    this.draw = function(){
        gameCanvasContext.save();
        gameCanvasContext.fillStyle = "green";
        gameCanvasContext.fillRect(
            this.x - this.width/2, this.y - this.height/2, 
            this.width, this.height
        );
        gameCanvasContext.restore();
    }
}