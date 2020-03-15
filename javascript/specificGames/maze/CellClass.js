

const CELL_WIDTH  = 80;
const CELL_HEIGHT = 100;

function CellClass(
  rowIndex, columnIndex, 
  numRows=NUMBER_OF_ROWS, 
  numCols=NUMBER_OF_COLUMNS
  )
{
  this.rowIndex = rowIndex;
  this.columnIndex = columnIndex;

  this.cellIndex = (this.rowIndex * numCols) + this.columnIndex;

  this.hasBeenVisitedByGenerationAlgorithm = false;

  this.topNeighboringCellExists    = false;
  this.rightNeighboringCellExists  = false;
  this.bottomNeighboringCellExists = false;
  this.leftNeighboringCellExists   = false;

  this.topNeighboringCellIndex = undefined;
  this.rightNeighboringCellIndex = undefined;
  this.bottomNeighboringCellIndex = undefined;
  this.leftNeighboringCellIndex = undefined;

  this.topNeighboringCell = undefined;
  this.rightNeighboringCell = undefined;
  this.bottomNeighboringCell = undefined;
  this.leftNeighboringCell = undefined;

  this.arrayOfExistentWalls = [true, true, true, true];

  this.checkForExistenceOfNeighboringCells = function(numRows, numCols)
  {
    if (rowIndex > 0)
    {
      this.topNeighboringCellExists = true;
      this.topNeighboringCellIndex = ( (this.rowIndex - 1) * numCols ) + this.columnIndex;
    } 
    
    if (rowIndex < numRows - 1)
    {
      this.bottomNeighboringCellExists = true;
      this.bottomNeighboringCellIndex = ( ( (this.rowIndex + 1 ) * numCols ) + this.columnIndex );
    } 
    
    if (columnIndex > 0)
    {
      this.leftNeighboringCellExists = true;
      this.leftNeighboringCellIndex = ( (this.rowIndex * numCols) + (this.columnIndex - 1) );

    } 
    
    if (columnIndex < numCols - 1)
    {
      this.rightNeighboringCellExists = true;
      this.rightNeighboringCellIndex = (this.rowIndex * numCols ) + this.columnIndex + 1;
    } 
    
  }

  this.defineExistingNeighboringCells = function()
  {
    if (this.topNeighboringCellIndex)
    {
      this.topNeighboringCell = maze.arrayOfCells[this.topNeighboringCellIndex];
    }
    if (this.bottomNeighboringCellIndex)
    {
      this.bottomNeighboringCell = maze.arrayOfCells[this.bottomNeighboringCellIndex];
    }
    if (this.leftNeighboringCellIndex)
    {
      this.leftNeighboringCell = maze.arrayOfCells[this.leftNeighboringCellIndex];
    }
    if (this.rightNeighboringCellIndex)
    {
      this.rightNeighboringCell = maze.arrayOfCells[this.rightNeighboringCellIndex];
    }
  }

  this.returnARandomUnvisitedNeighborIfPossible = function()
  {
    var arrayOfCurrentUnvisitedNeighboringCells = [];

      if (this.topNeighboringCellExists && !this.topNeighboringCell.hasBeenVisitedByGenerationAlgorithm)
      {
        arrayOfCurrentUnvisitedNeighboringCells.push(this.topNeighboringCell);
      }
      if (this.rightNeighboringCellExists && !this.rightNeighboringCell.hasBeenVisitedByGenerationAlgorithm)
      {
        arrayOfCurrentUnvisitedNeighboringCells.push(this.rightNeighboringCell);
      }
      if (this.bottomNeighboringCellExists && !this.bottomNeighboringCell.hasBeenVisitedByGenerationAlgorithm)
      {
        arrayOfCurrentUnvisitedNeighboringCells.push(this.bottomNeighboringCell);
      }
      if (this.leftNeighboringCellExists && !this.leftNeighboringCell.hasBeenVisitedByGenerationAlgorithm)
      {
        arrayOfCurrentUnvisitedNeighboringCells.push(this.leftNeighboringCell);
      }

      // console.log(arrayOfCurrentUnvisitedNeighboringCells);
      if (arrayOfCurrentUnvisitedNeighboringCells.length > 0)
      {
        let randomNeighboringCellIndex = getRandomIntInclusive(0, arrayOfCurrentUnvisitedNeighboringCells.length - 1);
        return arrayOfCurrentUnvisitedNeighboringCells[randomNeighboringCellIndex];
      } else {
        return undefined;
      }
  }

  this.draw = function()
  {
    var xCoordinate = this.columnIndex * CELL_WIDTH;
    var yCoordinate = this.rowIndex * CELL_HEIGHT;

    gameCanvasContext.save();
    gameCanvasContext.lineWidth = 15;
    gameCanvasContext.strokeStyle = 'blue';

    //visitation of algorithm in purple
    if (this.hasBeenVisitedByGenerationAlgorithm)
    {
      gameCanvasContext.fillStyle = 'purple';
      gameCanvasContext.fillRect(xCoordinate,yCoordinate, CELL_WIDTH,CELL_HEIGHT);
    }

    // if (currentCellBeingVisitedByGenerationAlgorithm === this && mazeGenerationAlgorithmShouldAdvance)
    // {
    //   gameCanvasContext.fillStyle = 'orange';
    //   gameCanvasContext.fillRect(xCoordinate,yCoordinate, CELL_WIDTH,CELL_HEIGHT);
    // }

    //top wall
    if (this.arrayOfExistentWalls[0])
    {
      gameCanvasContext.beginPath();
      gameCanvasContext.moveTo(xCoordinate,yCoordinate + 5);
      gameCanvasContext.lineTo(xCoordinate + CELL_WIDTH, yCoordinate + 5);
      gameCanvasContext.stroke();
    }

    //right wall
    if (this.arrayOfExistentWalls[1])
    {
      gameCanvasContext.beginPath();
      gameCanvasContext.moveTo(xCoordinate + CELL_WIDTH - 5,yCoordinate);
      gameCanvasContext.lineTo(xCoordinate + CELL_WIDTH - 5, yCoordinate + CELL_HEIGHT);
      gameCanvasContext.stroke();
    }

    //bottom wall
    if (this.arrayOfExistentWalls[2])
    {
      gameCanvasContext.beginPath();
      gameCanvasContext.moveTo(xCoordinate + CELL_WIDTH,yCoordinate + CELL_HEIGHT - 5);
      gameCanvasContext.lineTo(xCoordinate, yCoordinate + CELL_HEIGHT - 5);
      gameCanvasContext.stroke();
    }

    //left wall
    if (this.arrayOfExistentWalls[3])
    {
      gameCanvasContext.beginPath();
      gameCanvasContext.moveTo(xCoordinate + 5,yCoordinate + CELL_HEIGHT);
      gameCanvasContext.lineTo(xCoordinate + 5, yCoordinate);
      gameCanvasContext.stroke();
    }

    
    gameCanvasContext.restore();
    
  }

  // call methods from constructor
  this.checkForExistenceOfNeighboringCells(numRows, numCols);

}