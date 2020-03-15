
const NUMBER_OF_COLUMNS = 8;
const NUMBER_OF_ROWS    = 7;

function MazeClass(){

    this.arrayOfCells = [];
    this.currentCellBeingVisitedByGenerationAlgorithm = undefined;

    this.initializeArrayOfCells = function ()
    {
        for (let rowIndex = 0; rowIndex < NUMBER_OF_ROWS; rowIndex++)
        {
            for (let columnIndex = 0; columnIndex < NUMBER_OF_COLUMNS; columnIndex++)
            {
                let cell = new CellClass(rowIndex, columnIndex);
                this.arrayOfCells.push(cell);
            }
        }

        this.defineExistingNeighboringCellsForAllCells();
    }

    this.defineExistingNeighboringCellsForAllCells = function()
    {
        for (let arrayOfCellsIndex = 0; arrayOfCellsIndex < this.arrayOfCells.length; arrayOfCellsIndex++)
        {
            this.arrayOfCells[arrayOfCellsIndex].defineExistingNeighboringCells();
        }
    }

    this.generateMaze = function () 
    {
        this.initializeMazeGeneration();
    }

    this.initializeMazeGeneration = function () 
    {
        var randomStartingIndexForMazeGeneration = getRandomIntInclusive(0, this.arrayOfCells.length - 1);
        this.currentCellBeingVisitedByGenerationAlgorithm = this.arrayOfCells[randomStartingIndexForMazeGeneration];
        this.currentCellBeingVisitedByGenerationAlgorithm.hasBeenVisitedByGenerationAlgorithm = true;
    }

    this.drawCells = function ()
    {
        for (let currentCellIndex = 0; currentCellIndex < this.arrayOfCells.length; currentCellIndex++)
        {
            this.arrayOfCells[currentCellIndex].draw();
        }
    }
}

var maze = new MazeClass();