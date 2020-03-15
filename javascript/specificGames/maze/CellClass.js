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

    //visitation of algorithm in purple
    if (this.hasBeenVisited)
    {
      gameCanvasContext.fillStyle = 'purple';
      gameCanvasContext.fillRect(xCoordinate,yCoordinate, CELL_WIDTH,CELL_HEIGHT);
    }

    if (this.isVisitedByGenerationAlgorithm)
    {
      gameCanvasContext.fillStyle = 'orange';
      gameCanvasContext.fillRect(xCoordinate,yCoordinate, CELL_WIDTH,CELL_HEIGHT);
    }

    //top wall
    if (this.topWallExist)
    {
      gameCanvasContext.beginPath();
      gameCanvasContext.moveTo(xCoordinate,yCoordinate + 5);
      gameCanvasContext.lineTo(xCoordinate + CELL_WIDTH, yCoordinate + 5);
      gameCanvasContext.stroke();
    }

    //bottom wall
    if (this.bottomWallExist)
    {
      gameCanvasContext.beginPath();
      gameCanvasContext.moveTo(xCoordinate + CELL_WIDTH,yCoordinate + CELL_HEIGHT - 5);
      gameCanvasContext.lineTo(xCoordinate, yCoordinate + CELL_HEIGHT - 5);
      gameCanvasContext.stroke();
    }

    //left wall
    if (this.leftWallExist)
    {
      gameCanvasContext.beginPath();
      gameCanvasContext.moveTo(xCoordinate + 5,yCoordinate + CELL_HEIGHT);
      gameCanvasContext.lineTo(xCoordinate + 5, yCoordinate);
      gameCanvasContext.stroke();
    }

    //right wall
    if (this.rightWallExist)
    {
      gameCanvasContext.beginPath();
      gameCanvasContext.moveTo(xCoordinate + CELL_WIDTH - 5,yCoordinate);
      gameCanvasContext.lineTo(xCoordinate + CELL_WIDTH - 5, yCoordinate + CELL_HEIGHT);
      gameCanvasContext.stroke();
    }

    
    gameCanvasContext.restore();

  }

  // call methods from constructor
  this.checkForExistenceOfNeighboringCells(numRows, numCols);

}