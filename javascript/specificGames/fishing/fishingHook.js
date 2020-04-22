function FishingHook() {
    this.x = undefined;
    this.y = undefined;

    this.isThrown = false;
    this.isFalling = false;

    this.speedX = 5;
    this.speedY = 0.5;

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