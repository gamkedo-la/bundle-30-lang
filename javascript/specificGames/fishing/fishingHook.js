function FishingHook() {
    this.x = undefined;
    this.y = undefined;

    this.width = 10;
    this.height = 10;

    this.isThrown = false;
    this.isFalling = false;
    this.isEatenByFish = false;
    this.isPulledBack = false;

    this.speedX = 5;
    this.speedY = 2;

    this.fishCaught = undefined;

    this.outLocationX = undefined;
    this.outLocationY = undefined;

    this.fishingRodLocationX = undefined;
    this.fishingRodLocationY = undefined;

    this.bezierParameter = 0;
    this.bezierSpeed = 0.05;

    this.draw = function () {
        gameCanvasContext.save();
        gameCanvasContext.fillStyle = "red";
        gameCanvasContext.beginPath();
        gameCanvasContext.arc(
            this.x, this.y, 10, 0, 2*Math.PI, true
        );
        gameCanvasContext.fill();
        gameCanvasContext.restore();
    }

    this.reset = function () {
        this.isThrown = false;
        this.isFalling = false;
        this.isEatenByFish = false;
        this.isPulledBack = false;
        this.fishCaught = undefined;
        this.bezierParameter = 0;
        this.outLocationX = undefined;
        this.outLocationY = undefined;
        this.fishingRodLocationX = undefined;
        this.fishingRodLocationY = undefined;
    }

    this.update = function () {
        if (this.isFalling){
            if (
                this.fishingRodLocationX == undefined &&
                this.fishingRodLocationY == undefined
            ){
                this.fishingRodLocationX = this.x;
                this.fishingRodLocationY = this.y;
            }

            this.y += this.speedY;

            if(this.y > gameCanvas.height){
                this.isFalling = false;
            }
        }
        else if (this.isEatenByFish && this.y > WATER_HEIGHT){
            this.x = this.fishCaught.headX;
            this.y = this.fishCaught.y;
        }
        else if (this.isEatenByFish && this.bezierParameter < 1){
            if (
                this.outLocationX == undefined &&
                this.outLocationY == undefined
            ){
                this.outLocationX = this.x;
                this.outLocationY = this.y;
            }

            this.x = this.getCoordinateOnBezierCurve(
                this.outLocationX, this.outLocationX, this.fishingRodLocationX, this.fishingRodLocationX
            );
            this.y = this.getCoordinateOnBezierCurve(
                this.outLocationY, this.fishingRodLocationY, WATER_HEIGHT/2, this.fishingRodLocationY
            );
            this.bezierParameter += this.bezierSpeed;
        }
    }

    this.getCoordinateOnBezierCurve = function(
        originCoordinate,   // P0
        control1Coordinate, // P1
        control2Coordinate, // P2
        targetCoordinate    // P3
    ){
        //  (1-t)^3*P0 + 3(1-t)^2*t*P1 + 3(1-t)*t^2*P2 + t^3*P3 
        var bezierCoordinate  =     (1 - this.bezierParameter)**3 * originCoordinate;
        bezierCoordinate     += 3 * (1 - this.bezierParameter)**2 * this.bezierParameter * control1Coordinate;
        bezierCoordinate     += 3 * (1 - this.bezierParameter)    * this.bezierParameter**2 * control2Coordinate;
        bezierCoordinate     += this.bezierParameter**3 * targetCoordinate;

        return bezierCoordinate;
    }

    this.moveLeft = function () {
        if (this.isFalling && !this.isEatenByFish){
            this.x -= this.speedX;
        }
    }

    this.moveRight = function () {
        if (this.isFalling && !this.isEatenByFish){
            this.x += this.speedX;
        }
    }
}