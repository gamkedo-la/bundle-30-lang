var letterMazeCanvas;
var letterMazeCanvasContext;

function drawBackground()
{
  letterMazeCanvasContext.fillStyle = 'black';
  letterMazeCanvasContext.fillRect(0,0, 640,700);
}

// var playerShouldSeeSplashScreen = true;

function drawSplashScreen()
{
  let fontSize = 30;
  let fillTextYPositionOffset = fontSize;//fillRect, drawArc, drawImage, etc start from top left corner but fillText starts
  //from bottom left corner

  drawBackground();
  letterMazeCanvasContext.fillStyle = 'blue';
  letterMazeCanvasContext.font = fontSize + 'px Helvetica';
  letterMazeCanvasContext.fillText('Downloading. Click to start when finished.', 0,0 + fillTextYPositionOffset);
}

var gameFrameRate = 1000/15;
var frameCount = 0;

window.onload = function()
{
  letterMazeCanvas = document.getElementById('letterMazeCanvas');
  letterMazeCanvasContext = letterMazeCanvas.getContext('2d');

  letterMazeCanvas.addEventListener('click', handleSplashScreenClick);

  initializeArrayOfCells();

  var randomStartingIndexForMazeGeneration = getRandomIntInclusive(0,arrayOfCells.length - 1);
  console.log(randomStartingIndexForMazeGeneration);
  currentCellBeingVisitedByGenerationAlgorithm = arrayOfCells[randomStartingIndexForMazeGeneration];
  currentCellBeingVisitedByGenerationAlgorithm.hasBeenVisitedByGenerationAlgorithm = true;
  setInterval(gameLoop, gameFrameRate);
}

function gameLoop()
{
  frameCount++;
  updateEverything();
  drawEverything();
}

function updateEverything()
{
  advanceGenerationAlgorithm();
}

function drawEverything()
{
  // if (playerShouldSeeSplashScreen)
  // {
  //   drawSplashScreen();
  // } else {
    drawGame();
  // }
}

function drawGame()
{
  drawBackground();
  drawCells();
}

function handleSplashScreenClick()
{
  playerShouldSeeSplashScreen = false;
}

const NUMBER_OF_COLUMNS = 8;
const NUMBER_OF_ROWS = 7;

const CELL_WIDTH = 80;
const CELL_HEIGHT = 100;

var arrayOfCells = [];
var currentCellBeingVisitedByGenerationAlgorithm;

var backtrackStack = [];

function CellPrototype(rowIndex, columnIndex)
{
  this.rowIndex = rowIndex;
  this.columnIndex = columnIndex;

  this.cellIndex = (this.rowIndex * NUMBER_OF_COLUMNS) + columnIndex;

  this.hasBeenVisitedByGenerationAlgorithm = false;

  this.topNeighboringCellExists = undefined;
  this.rightNeighboringCellExists = undefined;
  this.bottomNeighboringCellExists = undefined;
  this.leftNeighboringCellExists = undefined;

  this.topNeighboringCellIndex = undefined;
  this.rightNeighboringCellIndex = undefined;
  this.bottomNeighboringCellIndex = undefined;
  this.leftNeighboringCellIndex = undefined;

  this.topNeighboringCell = undefined;
  this.rightNeighboringCell = undefined;
  this.bottomNeighboringCell = undefined;
  this.leftNeighboringCell = undefined;

  this.checkForExistenceOfNeighboringCells = function()
  {
    if (rowIndex > 0)
    {
      this.topNeighboringCellExists = true;
    } else {
      this.topNeighboringCellExists = false;
    }
    if (rowIndex < NUMBER_OF_ROWS - 1)
    {
      this.bottomNeighboringCellExists = true;
    } else {
      this.bottomNeighboringCellExists = false;
    }
    if (columnIndex > 0)
    {
      this.leftNeighboringCellExists = true;

    } else {
      this.leftNeighboringCellExists = false;
    }
    if (columnIndex < NUMBER_OF_COLUMNS - 1)
    {
      this.rightNeighboringCellExists = true;
    } else {
      this.rightNeighboringCellExists = false;
    }
  }

  this.calculateAndAssignIndicesForExistingNeighbors = function()
  {
    if (this.topNeighboringCellExists)
    {
      this.topNeighboringCellIndex = ( (this.rowIndex - 1) * NUMBER_OF_COLUMNS ) + this.columnIndex;
    }
    if (this.rightNeighboringCellExists)
    {
      this.rightNeighboringCellIndex = (this.rowIndex * NUMBER_OF_COLUMNS ) + this.columnIndex + 1;
    }
    if (this.bottomNeighboringCellExists)
    {
      this.bottomNeighboringCellIndex = ( ( (this.rowIndex + 1 ) * NUMBER_OF_COLUMNS ) + this.columnIndex );
    }
    if (this.leftNeighboringCellExists)
    {
      this.leftNeighboringCellIndex = ( (this.rowIndex * NUMBER_OF_COLUMNS) + (this.columnIndex - 1) );
    }
  }

  this.defineExistingNeighboringCells = function()
  {
    if (this.topNeighboringCellExists)
    {
      this.topNeighboringCell = arrayOfCells[this.topNeighboringCellIndex];
    }
    if (this.rightNeighboringCellExists)
    {
      this.rightNeighboringCell = arrayOfCells[this.rightNeighboringCellIndex];
    }
    if (this.bottomNeighboringCellExists)
    {
      this.bottomNeighboringCell = arrayOfCells[this.bottomNeighboringCellIndex];
    }
    if (this.leftNeighboringCellExists)
    {
      this.leftNeighboringCell = arrayOfCells[this.leftNeighboringCellIndex];
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

  this.arrayOfExistentWalls = [true, true, true, true];

  this.draw = function()
  {
    var xCoordinate = this.columnIndex * CELL_WIDTH;
    var yCoordinate = this.rowIndex * CELL_HEIGHT;

    letterMazeCanvasContext.lineWidth = 15;
    letterMazeCanvasContext.strokeStyle = 'blue';

    //visitation of algorithm in purple
    if (this.hasBeenVisitedByGenerationAlgorithm)
    {
      letterMazeCanvasContext.fillStyle = 'purple';
      letterMazeCanvasContext.fillRect(xCoordinate,yCoordinate, CELL_WIDTH,CELL_HEIGHT);
    }

    if (currentCellBeingVisitedByGenerationAlgorithm === this)
    {
      letterMazeCanvasContext.fillStyle = 'orange';
      letterMazeCanvasContext.fillRect(xCoordinate,yCoordinate, CELL_WIDTH,CELL_HEIGHT);
    }

    //top wall
    if (this.arrayOfExistentWalls[0])
    {
      letterMazeCanvasContext.beginPath();
      letterMazeCanvasContext.moveTo(xCoordinate,yCoordinate + 5);
      letterMazeCanvasContext.lineTo(xCoordinate + CELL_WIDTH, yCoordinate + 5);
      letterMazeCanvasContext.stroke();
    }

    //right wall
    if (this.arrayOfExistentWalls[1])
    {
      letterMazeCanvasContext.beginPath();
      letterMazeCanvasContext.moveTo(xCoordinate + CELL_WIDTH - 5,yCoordinate);
      letterMazeCanvasContext.lineTo(xCoordinate + CELL_WIDTH - 5, yCoordinate + CELL_HEIGHT);
      letterMazeCanvasContext.stroke();
    }

    //bottom wall
    if (this.arrayOfExistentWalls[2])
    {
      letterMazeCanvasContext.beginPath();
      letterMazeCanvasContext.moveTo(xCoordinate + CELL_WIDTH,yCoordinate + CELL_HEIGHT - 5);
      letterMazeCanvasContext.lineTo(xCoordinate, yCoordinate + CELL_HEIGHT - 5);
      letterMazeCanvasContext.stroke();
    }

    //left wall
    if (this.arrayOfExistentWalls[3])
    {
      letterMazeCanvasContext.beginPath();
      letterMazeCanvasContext.moveTo(xCoordinate + 5,yCoordinate + CELL_HEIGHT);
      letterMazeCanvasContext.lineTo(xCoordinate + 5, yCoordinate);
      letterMazeCanvasContext.stroke();
    }

    // letterMazeCanvasContext.fillStyle = 'green';
    // letterMazeCanvasContext.font = '30px Helvetica';
    // letterMazeCanvasContext.fillText(this.cellIndex, this.columnIndex*CELL_WIDTH+30,this.rowIndex*CELL_HEIGHT+30);
  }
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

function initializeArrayOfCells()
{
  for (let rowIndex = 0; rowIndex < NUMBER_OF_ROWS; rowIndex++)
  {
    for (let columnIndex = 0; columnIndex < NUMBER_OF_COLUMNS; columnIndex++)
    {
      let cell = new CellPrototype(rowIndex,columnIndex);
      arrayOfCells.push(cell);
    }
  }

  checkExtistenceOfNeighboringCellsForAllCells();
  calculateAndAssignIndicesForExistingNeighborsForAllCells();
  defineExistingNeighboringCellsForAllCells();
}

function checkExtistenceOfNeighboringCellsForAllCells()
{
  for (let arrayOfCellsIndex = 0; arrayOfCellsIndex < arrayOfCells.length; arrayOfCellsIndex++)
  {
    arrayOfCells[arrayOfCellsIndex].checkForExistenceOfNeighboringCells();
  }
}

function calculateAndAssignIndicesForExistingNeighborsForAllCells()
{
  for (let arrayOfCellsIndex = 0; arrayOfCellsIndex < arrayOfCells.length; arrayOfCellsIndex++)
  {
    arrayOfCells[arrayOfCellsIndex].calculateAndAssignIndicesForExistingNeighbors();
  }
}

function defineExistingNeighboringCellsForAllCells()
{
  for (let arrayOfCellsIndex = 0; arrayOfCellsIndex < arrayOfCells.length; arrayOfCellsIndex++)
  {
    arrayOfCells[arrayOfCellsIndex].defineExistingNeighboringCells();
  }
}

function drawCells()
{
  for (let currentCellIndex = 0; currentCellIndex < arrayOfCells.length; currentCellIndex++)
  {
    arrayOfCells[currentCellIndex].draw();
  }
}

function filterArrayOfVisitedCells()
{
  var arrayOfAllVisitedCells = [];
  for (let arrayOfCellsIndex = 0; arrayOfCellsIndex < arrayOfCells.length; arrayOfCellsIndex++)
  {
    if (arrayOfCells[arrayOfCellsIndex].hasBeenVisitedByGenerationAlgorithm)
    {
      arrayOfAllVisitedCells.push(arrayOfCells[arrayOfCellsIndex]);
    }
  }
  for (let arrayOfVisitedCellsIndex = 0; arrayOfVisitedCellsIndex < arrayOfAllVisitedCells.length; arrayOfVisitedCellsIndex++)
  {
    // console.log('arrayOfVisitedCellsIndex: ' + arrayOfVisitedCellsIndex);
    // console.log('arrayOfAllVisitedCells: ' + arrayOfAllVisitedCells[arrayOfVisitedCellsIndex].cellIndex);
  }
}

function advanceGenerationAlgorithm()
{
  console.log('currentCellBeingVisitedByGenerationAlgorithm: ' + currentCellBeingVisitedByGenerationAlgorithm.cellIndex);
  var nextCellToBeVisitedByGenerationAlgorithm = currentCellBeingVisitedByGenerationAlgorithm.returnARandomUnvisitedNeighborIfPossible();


  if (nextCellToBeVisitedByGenerationAlgorithm)
  {
    removeWallsBetweenNeighboringVisitedCellsDuringGeneration(currentCellBeingVisitedByGenerationAlgorithm.cellIndex,nextCellToBeVisitedByGenerationAlgorithm.cellIndex);
    backtrackStack.push(currentCellBeingVisitedByGenerationAlgorithm);
    currentCellBeingVisitedByGenerationAlgorithm = nextCellToBeVisitedByGenerationAlgorithm;//setting up next frame
    currentCellBeingVisitedByGenerationAlgorithm.hasBeenVisitedByGenerationAlgorithm = true;
  } else if (backtrackStack.length > 0)
  {
    console.log('hello backtrack');
    var cellToBacktrackTo = backtrackStack.pop();
    console.log(cellToBacktrackTo);
    currentCellBeingVisitedByGenerationAlgorithm = cellToBacktrackTo;
  }

}

function removeWallsBetweenNeighboringVisitedCellsDuringGeneration(currentCellIndex,neighboringCellIndex)
{
  var differenceBetweenCellIndices = currentCellIndex - neighboringCellIndex;
  //the neighboring cell is above the current cell
  if (differenceBetweenCellIndices == 8)
  {
    arrayOfCells[currentCellIndex].arrayOfExistentWalls[0] = false;
    arrayOfCells[neighboringCellIndex].arrayOfExistentWalls[2] = false;
  }
  //the neighboring cell is on the right of the current cell
  if (differenceBetweenCellIndices == -1)
  {
    arrayOfCells[currentCellIndex].arrayOfExistentWalls[1] = false;
    arrayOfCells[neighboringCellIndex].arrayOfExistentWalls[3] = false;
  }
  //the neighboring cell is below the current cell
  if (differenceBetweenCellIndices == -8)
  {
    arrayOfCells[currentCellIndex].arrayOfExistentWalls[2] = false;
    arrayOfCells[neighboringCellIndex].arrayOfExistentWalls[0] = false;
  }
  //the neighboring cell is on the left of the current cell
  if (differenceBetweenCellIndices == 1)
  {
    arrayOfCells[currentCellIndex].arrayOfExistentWalls[3] = false;
    arrayOfCells[neighboringCellIndex].arrayOfExistentWalls[1] = false;
  }
}
