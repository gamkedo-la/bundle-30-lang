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

  this.hasBeenVisitedByGenerationAlgorithm = false;

  this.checkNeighboringCellsToSeeIfTheyveBeenVisited = function()
  {
    var arrayOfCurrentUnvisitedNeighboringCells = [];

    //*** less than 0!!!
    // var topNeighboringCell = arrayOfCells[((rowIndex - 1) * NUMBER_OF_COLUMNS) + columnIndex];
    // var rightNeighboringCell = arrayOfCells[(rowIndex * NUMBER_OF_COLUMNS) + (columnIndex + 1)];
    // var bottomNeighboringCell = arrayOfCells[( (rowIndex + 1) * NUMBER_OF_COLUMNS) + columnIndex];
    // var leftNeighboringCell = arrayOfCells[(rowIndex * NUMBER_OF_COLUMNS) + (columnIndex - 1)];
    //
    // if (!topNeighboringCell.hasBeenVisitedByGenerationAlgorithm)
    // {
    //   arrayOfCurrentUnvisitedNeighboringCells.push(topNeighboringCell);
    // }
    // if (!rightNeighboringCell.hasBeenVisitedByGenerationAlgorithm)
    // {
    //   arrayOfCurrentUnvisitedNeighboringCells.push(rightNeighboringCell);
    // }
    // if (!bottomNeighboringCell.hasBeenVisitedByGenerationAlgorithm)
    // {
    //   arrayOfCurrentUnvisitedNeighboringCells.push(bottomNeighboringCell);
    // }
    // if (!leftNeighboringCell.hasBeenVisitedByGenerationAlgorithm)
    // {
    //   arrayOfCurrentUnvisitedNeighboringCells.push(leftNeighboringCell);
    // }

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
  }
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
}

function drawCells()
{
  for (let currentCellIndex = 0; currentCellIndex < arrayOfCells.length; currentCellIndex++)
  {
    arrayOfCells[currentCellIndex].draw();
  }

  currentCellBeingVisitedByGenerationAlgorithm.hasBeenVisitedByGenerationAlgorithm = true;
  currentCellBeingVisitedByGenerationAlgorithm.checkNeighboringCellsToSeeIfTheyveBeenVisited();
}

function testForArrayOfNeighbors()
{
  arrayOfCells[0].checkNeighboringCellsToSeeIfTheyveBeenVisited();
}
