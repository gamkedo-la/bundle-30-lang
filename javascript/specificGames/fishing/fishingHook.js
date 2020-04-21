function FishingHook() {
    this.x = undefined;
    this.y = undefined;

    this.isThrown = false;

    this.fallingSpeed = 2;

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
        if (
            this.isThrown &&
            this.y < gameCanvas.height
        ) {
            this.y += this.fallingSpeed;
        }
    }
}