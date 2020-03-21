function MazePlayer()
{
    this.x = undefined;
    this.y = undefined;
    this.currentCell = undefined;

    this.speedX = 10;
    this.speedY = 10;
    this.isPlaced = false;

    this.placeInMazeAndAvoidAnswersCells = function() {
        this.currentCell = mazeGame.maze.getRandomCell();
        
        while (
            this.currentCell == mazeGame.deadEndCellForCorrectAnswer ||
            this.currentCell == mazeGame.deadEndCellForIncorrectAnswer )
        {
            this.currentCell = getRandomElementFromArray(mazeGame.maze);
        }
        this.placeAtCenteOfCurrentCell();
        this.isPlaced = true;
    }

    this.placeAtCenteOfCurrentCell = function(){
        var centerOfCurrentCell = this.currentCell.getCellCenterPositionInCanvas();
        this.x = centerOfCurrentCell.x;
        this.y = centerOfCurrentCell.y;
    }

    this.draw = function() {
        if (this.isPlaced){
            gameCanvasContext.fillStyle = "red";
            gameCanvasContext.beginPath();
            gameCanvasContext.arc(
                this.x, this.y, 
                Math.min(CELL_HEIGHT, CELL_WIDTH)/2 - WALL_THICKNESS,
                0, 2*Math.PI, true
            );
            gameCanvasContext.fill();
        }
    }
}