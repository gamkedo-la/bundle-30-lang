const MIN_DISTANCE_PLAYER_TO_WALL = 10;

function MazePlayer()
{
    this.width = Math.min(CELL_WIDTH, CELL_HEIGHT) - 2*WALL_THICKNESS - 5;
    this.height = Math.min(CELL_WIDTH, CELL_HEIGHT) - 2*WALL_THICKNESS - 5;

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
        this.currentCell.isOccupiedByPlayer = true;
        this.placeAtCenteOfCurrentCell();
        this.isPlaced = true;
    }

    this.placeAtCenteOfCurrentCell = function(){
        this.x = this.currentCell.worldCenterX;
        this.y = this.currentCell.worldCenterY;
    }

    this.draw = function() {
        if (this.isPlaced){
            gameCanvasContext.save()
            gameCanvasContext.fillStyle = "red";
            gameCanvasContext.fillRect(
                this.x - this.width / 2,
                this.y - this.height / 2,
                this.width, this.height
            )
            gameCanvasContext.restore();
        }
    }

    this.moveUp = function(){
        if (!this.currentCell.topWallExist)
        {
            this.movePlayerToCellAtIndex(
                this.currentCell.topNeighboringCellIndex
            );
            this.placeAtCenteOfCurrentCell();
        }
    }

    this.moveDown = function(){
        if (!this.currentCell.bottomWallExist)
        {
            this.movePlayerToCellAtIndex(
                this.currentCell.bottomNeighboringCellIndex
            );
            this.placeAtCenteOfCurrentCell();
        }
    }

    this.moveLeft = function(){
        if (!this.currentCell.leftWallExist)
        {
            this.movePlayerToCellAtIndex(
                this.currentCell.leftNeighboringCellIndex
            );
            this.placeAtCenteOfCurrentCell();
        }
    }

    this.moveRight = function(){
        if (!this.currentCell.rightWallExist)
        {
            this.movePlayerToCellAtIndex(
                this.currentCell.rightNeighboringCellIndex
            );
            this.placeAtCenteOfCurrentCell();
        }
    }

    this.movePlayerToCellAtIndex = function(index){
        this.currentCell.isOccupiedByPlayer = false;
        this.currentCell = mazeGame.maze.getCellAtIndex(index);
        this.currentCell.isOccupiedByPlayer = true;
    }

}