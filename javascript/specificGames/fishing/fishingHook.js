function FishingHook() {
    this.x = undefined;
    this.y = undefined;

    this.width = 10;
    this.height = 10;

    this.isThrown = false;
    this.isFalling = false;

    this.speedX = 5;
    this.speedY = 10;

    this.draw = function () {
        gameCanvasContext.save();
        gameCanvasContext.fillStyle = "red";
        gameCanvasContext.beginPath();
        gameCanvasContext.arc(
            this.x, this.y, this.width, 0, 2*Math.PI, true
        );
        gameCanvasContext.fill();
        gameCanvasContext.restore();
    }

    this.update = function () {
        if (this.isFalling){
            this.y += this.speedY;

            if(this.y > gameCanvas.height){
                this.isFalling = false;
            }
        }
    }

    this.moveLeft = function () {
        if (this.isFalling){
            this.x -= this.speedX;
        }
    }

    this.moveRight = function () {
        if (this.isFalling){
            this.x += this.speedX;
        }
    }
}