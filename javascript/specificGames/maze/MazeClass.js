
const NUMBER_OF_COLUMNS = 8;
const NUMBER_OF_ROWS    = 7;

function MazeClass(){

    this.arrayOfCells = [];
    this.currentCellVisitedByGenerationAlgo = undefined;
    this.previousCellsVisitedByGenerationAlgo = [];

    this.isGenerationInitialized = false;
    this.isGenerationRunning = true;

    this.numVisitedCellsByGenerationAlgo = 0;

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
    }

    this.generate = function () 
    {
        if (!this.isGenerationInitialized){
            this.initializeGeneration();
        }
        else{
            this.generateOneStep();
        }

        this.checkIfAllCellsHaveBeenVisited()
    }

    this.checkIfAllCellsHaveBeenVisited = function() {
        if (this.numVisitedCellsByGenerationAlgo == this.arrayOfCells.length){
            console.log(this.numVisitedCellsByGenerationAlgo);
            console.log(this.arrayOfCells.length);
            this.isGenerationRunning = false;
        }
    }

    this.generateOneStep = function() {
        // Get next cell to visit
        var nextCellToVisit = this.getNextCellToVisit();
        if (!nextCellToVisit.hasBeenVisited){
            this.tearDownTheWallBetweenCells(
                this.currentCellVisitedByGenerationAlgo, nextCellToVisit
            ); 
        }
        this.markCurrentCellAsVisited();
        this.moveFromCurrentCellTo(nextCellToVisit);
    }

    this.moveFromCurrentCellTo = function(nextCellToVisit){
        this.currentCellVisitedByGenerationAlgo.isVisitedByGenerationAlgorithm = false;
        this.currentCellVisitedByGenerationAlgo = nextCellToVisit;
        this.currentCellVisitedByGenerationAlgo.isVisitedByGenerationAlgorithm = true;
    }

    this.markCurrentCellAsVisited = function() {
        if (!this.currentCellVisitedByGenerationAlgo.hasBeenVisited) {
            this.currentCellVisitedByGenerationAlgo.hasBeenVisited = true;
            this.numVisitedCellsByGenerationAlgo++;
            this.previousCellsVisitedByGenerationAlgo.push(this.currentCellVisitedByGenerationAlgo);
        }
    }

    this.tearDownTheWallBetweenCells = function(cell1, cell2){
        var cell1ToCell2Distance = cell1.index - cell2.index;
        
        switch(cell1ToCell2Distance)
        {
            case NUMBER_OF_COLUMNS:
                cell1.topWallExist    = false;
                cell2.bottomWallExist = false;
                break;
            
            case -NUMBER_OF_COLUMNS:
                cell1.bottomWallExist = false;
                cell2.topWallExist    = false;
                break;
            
            case 1:
                cell1.leftWallExist  = false;
                cell2.rightWallExist = false;
                break;
            
            case -1:
                cell1.rightWallExist = false;
                cell2.leftWallExist  = false;
                break;
        }
    }

    this.getNextCellToVisit = function() {
        var arrayOfNextCandidates = this.getArrayOfNextPossibleCandidates();

        if (!arrayOfNextCandidates.length){
            return this.previousCellsVisitedByGenerationAlgo.pop();
        }

        return this.getRandomElementFromArray(arrayOfNextCandidates);
    }

    this.getArrayOfNextPossibleCandidates = function () {
        var arrayOfNextCandidates = [];

        var arrayOfCurrentCellNeighborsIdx = this.currentCellVisitedByGenerationAlgo.neighborIdx;
        for (var idx = 0 ; idx < arrayOfCurrentCellNeighborsIdx.length ; idx++){
            var neighborIdx = arrayOfCurrentCellNeighborsIdx[idx];
            var neighbor = this.arrayOfCells[neighborIdx];
            if (!neighbor.hasBeenVisited){
                arrayOfNextCandidates.push(neighbor);
            }
        }

        return arrayOfNextCandidates;
    }


    this.initializeGeneration = function () 
    {
        this.currentCellVisitedByGenerationAlgo = this.getRandomElementFromArray(this.arrayOfCells);
        this.currentCellVisitedByGenerationAlgo.isVisitedByGenerationAlgorithm = true;
        this.isGenerationInitialized = true;
    }

    this.drawCells = function ()
    {
        for (let currentCellIndex = 0; currentCellIndex < this.arrayOfCells.length; currentCellIndex++)
        {
            this.arrayOfCells[currentCellIndex].draw();
        }
    }

    
    this.getRandomElementFromArray = function(myArray){
        var randomIdx = getRandomIntInclusive(0, myArray.length - 1);
        return myArray[randomIdx];
    }
}

var maze = new MazeClass();