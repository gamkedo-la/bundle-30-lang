const CELL_WIDTH  = 80;
const CELL_HEIGHT = 100;
const WALL_THICKNESS = 15;

function CellClass(
  rowIndex, columnIndex, 
  numRows=NUMBER_OF_ROWS, 
  numCols=NUMBER_OF_COLUMNS
  )
{
  this.rowIndex = rowIndex;
  this.columnIndex = columnIndex;

  this.index = (this.rowIndex * numCols) + this.columnIndex;

  this.worldCenterX = this.columnIndex * CELL_WIDTH + CELL_WIDTH / 2;
  this.worldCenterY = this.rowIndex * CELL_HEIGHT + CELL_HEIGHT / 2;

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
  this.rightWallExist  = true;

  this.isDeadEnd = false;

  this.isOccupiedByPlayer = false;

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

  this.checkIfIsDeadEnd = function(){
    var numWalls = 0;

    if (this.topWallExist){
      numWalls++;
    }

    if (this.bottomWallExist){
      numWalls++;
    }

    if (this.leftWallExist){
      numWalls++;
    }

    if (this.rightWallExist){
      numWalls++;
    }

    if (numWalls == 3){
      this.isDeadEnd = true;
    }
    else {
      this.isDeadEnd = false;
    }

  }

  this.reset = function() {
    this.topWallExist    = true;
    this.bottomWallExist = true;
    this.leftWallExist   = true;
    this.rightWallExist  = true;
    this.isDeadEnd = false;
    this.isOccupiedByPlayer = false;
    this.hasBeenVisited = false;
    this.isVisitedByGenerationAlgorithm = false;
  }

  this.draw = function()
  {
    var xCoordinate = this.columnIndex * CELL_WIDTH;
    var yCoordinate = this.rowIndex * CELL_HEIGHT;

    gameCanvasContext.save();
    gameCanvasContext.lineWidth = WALL_THICKNESS;
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
        mazeTopWall, xCoordinate, yCoordinate, CELL_WIDTH, WALL_THICKNESS
      );
    }

    //bottom wall
    if (this.bottomWallExist)
    {
      gameCanvasContext.drawImage(
        mazeBottomWall, xCoordinate, 
        yCoordinate + CELL_HEIGHT-WALL_THICKNESS, CELL_WIDTH, WALL_THICKNESS
      );
    }

    //left wall
    if (this.leftWallExist)
    {
      gameCanvasContext.drawImage(
        mazeLeftWall, xCoordinate, yCoordinate, WALL_THICKNESS, CELL_HEIGHT
      );
    }

    //right wall
    if (this.rightWallExist)
    {
      gameCanvasContext.drawImage(
        mazeRightWall, xCoordinate + CELL_WIDTH - WALL_THICKNESS, 
        yCoordinate, WALL_THICKNESS, CELL_HEIGHT
      );
    }

    
    gameCanvasContext.restore();

  }

  // call methods from constructor
  this.checkForExistenceOfNeighboringCells(numRows, numCols);

}