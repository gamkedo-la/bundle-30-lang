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

  this.index = (this.rowIndex * numCols) + this.columnIndex;

  this.hasBeenVisited = false;
  this.isVisitedByGenerationAlgorithm = false;

  this.topNeighboringCellIndex = undefined;
  this.bottomNeighboringCellIndex = undefined;
  this.leftNeighboringCellIndex = undefined;
  this.rightNeighboringCellIndex = undefined;

  this.neighborIdx = [];

  this.topWallExist    = true;
  this.bottomWallExist = true;
  this.leftWallExist   = true;
  this.rightWallExist   = true;

  this.checkForExistenceOfNeighboringCells = function(numRows, numCols)
  {
    if (rowIndex > 0)
    {
      this.topNeighboringCellIndex = ( (this.rowIndex - 1) * numCols ) + this.columnIndex;
      this.neighborIdx.push(this.topNeighboringCellIndex);
    } 
    
    if (rowIndex < numRows - 1)
    {
      this.bottomNeighboringCellIndex = ( ( (this.rowIndex + 1 ) * numCols ) + this.columnIndex );
      this.neighborIdx.push(this.bottomNeighboringCellIndex);
    } 
    
    if (columnIndex > 0)
    {
      this.leftNeighboringCellIndex = ( (this.rowIndex * numCols) + (this.columnIndex - 1) );
      this.neighborIdx.push(this.leftNeighboringCellIndex);
    } 
    
    if (columnIndex < numCols - 1)
    {
      this.rightNeighboringCellIndex = (this.rowIndex * numCols ) + this.columnIndex + 1;
      this.neighborIdx.push(this.rightNeighboringCellIndex);
    } 
    
  }

  this.draw = function()
  {
    var xCoordinate = this.columnIndex * CELL_WIDTH;
    var yCoordinate = this.rowIndex * CELL_HEIGHT;

    gameCanvasContext.save();
    gameCanvasContext.lineWidth = 15;
    gameCanvasContext.strokeStyle = 'blue';

    if (this.isVisitedByGenerationAlgorithm)
    {
      gameCanvasContext.fillStyle = 'orange';
      gameCanvasContext.fillRect(xCoordinate,yCoordinate, CELL_WIDTH, CELL_HEIGHT);
    }

    //top wall
    if (this.topWallExist)
    {
      gameCanvasContext.drawImage(
        mazeTopWall, xCoordinate, yCoordinate, CELL_WIDTH, 15
      );
    }

    //bottom wall
    if (this.bottomWallExist)
    {
      gameCanvasContext.drawImage(
        mazeBottomWall, xCoordinate, 
        yCoordinate + CELL_HEIGHT-15, CELL_WIDTH, 15
      );
    }

    //left wall
    if (this.leftWallExist)
    {
      gameCanvasContext.drawImage(
        mazeLeftWall, xCoordinate, yCoordinate, 15, CELL_HEIGHT
      );
    }

    //right wall
    if (this.rightWallExist)
    {
      gameCanvasContext.drawImage(
        mazeRightWall, xCoordinate + CELL_WIDTH - 15, 
        yCoordinate, 15, CELL_HEIGHT
      );
    }

    
    gameCanvasContext.restore();

  }

  // call methods from constructor
  this.checkForExistenceOfNeighboringCells(numRows, numCols);

}