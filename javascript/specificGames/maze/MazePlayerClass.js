const MIN_DISTANCE_PLAYER_TO_WALL = 10;

function MazePlayer()
{
    this.width  = 0; //Math.min(CELL_WIDTH, CELL_HEIGHT) - 2*WALL_THICKNESS - 5;
    this.height = 0; //Math.min(CELL_WIDTH, CELL_HEIGHT) - 2*WALL_THICKNESS - 5;

    this.drawWidth = 80;
    this.drawHeight = 80;

    this.x = undefined;
    this.y = undefined;
    this.currentCell = undefined;

    this.speedX = 10;
    this.speedY = 10;
    this.isPlaced = false;

    this.orientation = 0;

    this.resetPosition = function (){
        this.x = undefined;
        this.y = undefined;
        this.currentCell = undefined;

        this.isPlaced = false;
    }


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
            gameCanvasContext.save();
            gameCanvasContext.translate(
                this.x, this.y
            )
            switch(this.orientation){
                case 0:
                    break;
                case 1:
                    gameCanvasContext.rotate(-Math.PI / 2);
                    break;
                case 2:
                    gameCanvasContext.rotate(Math.PI);
                    break;
                case 3:
                    gameCanvasContext.rotate(Math.PI / 2);
                    break;
            }

            gameCanvasContext.drawImage(
                mazeCharacter,
                - this.drawWidth / 2,
                - this.drawHeight / 2,
                this.drawWidth, this.drawHeight
            )
            gameCanvasContext.restore();
        }
    }

    this.moveUp = function(){
        if (this.orientation != 0){
            this.orientation = 0;
        }
        if (!this.currentCell.topWallExist)
        {
            this.movePlayerToCellAtIndex(
                this.currentCell.topNeighboringCellIndex
            );
            this.placeAtCenteOfCurrentCell();
        }
    }

    this.moveLeft = function(){
        if (this.orientation != 1){
            this.orientation = 1;
        }
        if (!this.currentCell.leftWallExist)
        {
            this.movePlayerToCellAtIndex(
                this.currentCell.leftNeighboringCellIndex
            );
            this.placeAtCenteOfCurrentCell();
        }
    }

    this.moveDown = function(){
        if (this.orientation != 2){
            this.orientation = 2;
        }
        if (!this.currentCell.bottomWallExist)
        {
            this.movePlayerToCellAtIndex(
                this.currentCell.bottomNeighboringCellIndex
            );
            this.placeAtCenteOfCurrentCell();
        }
    }

    this.moveRight = function(){
        if (this.orientation != 3){
            this.orientation = 3;
        }
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

function MoleFoodAnswerHolder(image)
{
  this.image = image;
}
