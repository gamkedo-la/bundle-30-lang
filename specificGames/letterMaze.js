var letterMazeCanvas;
var letterMazeCanvasContext;

function drawBackground()
{
  letterMazeCanvasContext.fillStyle = 'black';
  letterMazeCanvasContext.fillRect(0,0, 640,700);
}

var playerShouldSeeSplashScreen = true;

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

var gameFrameRate = 1000/30;
var frameCount = 0;

window.onload = function()
{
  letterMazeCanvas = document.getElementById('letterMazeCanvas');
  letterMazeCanvasContext = letterMazeCanvas.getContext('2d');

  letterMazeCanvas.addEventListener('click', handleSplashScreenClick);

  initializeArrayOfCells();
  console.log(arrayOfCells);
  currentCellBeingVisitedByGenerationAlgorithm = arrayOfCells[0];

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
  if (playerShouldSeeSplashScreen)
  {
    drawSplashScreen();
  } else {
    drawGame();
  }
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
const NUMBER_OR_ROWS = 7;

const CELL_WIDTH = 80;
const CELL_HEIGHT = 100;

var arrayOfCells = [];
var currentCellBeingVisitedByGenerationAlgorithm;

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
    if (rowIndex < NUMBER_OR_ROWS - 2)
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
    if (columnIndex < NUMBER_OF_COLUMNS - 2)
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

      console.log(arrayOfCurrentUnvisitedNeighboringCells);
      if (arrayOfCurrentUnvisitedNeighboringCells.length > 0)
      {
        let randomNeighboringCellIndex = getRandomIntInclusive(0, arrayOfCurrentUnvisitedNeighboringCells.length - 1);
        console.log('randomNeighboringCellIndex: ' + randomNeighboringCellIndex);
        console.log('arrayOfCurrentUnvisitedNeighboringCells[randomNeighboringCellIndex]: ' + arrayOfCurrentUnvisitedNeighboringCells[randomNeighboringCellIndex]);
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

    letterMazeCanvasContext.strokeStyle = 'blue';
    letterMazeCanvasContext.lineWidth = 10;

    //top wall
    if (this.arrayOfExistentWalls[0] === true)
    {
      letterMazeCanvasContext.moveTo(xCoordinate,yCoordinate);
      letterMazeCanvasContext.lineTo(xCoordinate + CELL_WIDTH, yCoordinate);
      letterMazeCanvasContext.stroke();
    }

    //right wall
    if (this.arrayOfExistentWalls[1] === true)
    {
      letterMazeCanvasContext.moveTo(xCoordinate + CELL_WIDTH,yCoordinate);
      letterMazeCanvasContext.lineTo(xCoordinate + CELL_WIDTH, yCoordinate + CELL_HEIGHT);
      letterMazeCanvasContext.stroke();
    }

    //bottom wall
    if (this.arrayOfExistentWalls[2] === true)
    {
      letterMazeCanvasContext.moveTo(xCoordinate + CELL_WIDTH,yCoordinate + CELL_HEIGHT);
      letterMazeCanvasContext.lineTo(xCoordinate, yCoordinate + CELL_HEIGHT);
      letterMazeCanvasContext.stroke();
    }

    //left wall
    if (this.arrayOfExistentWalls[3] === true)
    {
      letterMazeCanvasContext.moveTo(xCoordinate,yCoordinate + CELL_HEIGHT);
      letterMazeCanvasContext.lineTo(xCoordinate, yCoordinate);
      letterMazeCanvasContext.stroke();
    }

    if (this.hasBeenVisitedByGenerationAlgorithm)
    {
      letterMazeCanvasContext.fillStyle = 'purple';
      letterMazeCanvasContext.fillRect(xCoordinate,yCoordinate, xCoordinate + CELL_WIDTH,yCoordinate + CELL_HEIGHT);
    }

    letterMazeCanvasContext.fillStyle = 'green';
    letterMazeCanvasContext.font = '30px Helvetica';
    letterMazeCanvasContext.fillText(this.cellIndex, this.columnIndex*CELL_WIDTH+30,this.rowIndex*CELL_HEIGHT+30);
  }
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

function initializeArrayOfCells()
{
  for (let rowIndex = 0; rowIndex < NUMBER_OR_ROWS; rowIndex++)
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
  returnARandomUnvisitedNeighborIfPossibleForAllCells();
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

function returnARandomUnvisitedNeighborIfPossibleForAllCells()
{
  for (let arrayOfCellsIndex = 0; arrayOfCellsIndex < arrayOfCells.length; arrayOfCellsIndex++)
  {
    arrayOfCells[arrayOfCellsIndex].returnARandomUnvisitedNeighborIfPossible();
  }
}

function drawCells()
{
  for (let currentCellIndex = 0; currentCellIndex < arrayOfCells.length; currentCellIndex++)
  {
    arrayOfCells[currentCellIndex].draw();
  }

  currentCellBeingVisitedByGenerationAlgorithm.hasBeenVisitedByGenerationAlgorithm = true;
  var nextCellToBeVisitedByGenerationAlgorithm = currentCellBeingVisitedByGenerationAlgorithm.returnARandomUnvisitedNeighborIfPossible();

  if (nextCellToBeVisitedByGenerationAlgorithm)
  {
    nextCellToBeVisitedByGenerationAlgorithm.hasBeenVisitedByGenerationAlgorithm = true;
    currentCellBeingVisitedByGenerationAlgorithm = nextCellToBeVisitedByGenerationAlgorithm;//setting up next frame
  }
}

function advanceGenerationAlgorithm()
{

}
