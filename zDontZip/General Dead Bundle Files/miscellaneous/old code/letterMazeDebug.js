var letterMazeCanvas;
var letterMazeCanvasContext;

function drawBackground()
{
  letterMazeCanvasContext.fillStyle = 'black';
  letterMazeCanvasContext.fillRect(0,0, 640,700);
}

function drawFrameCount()
{
  letterMazeCanvasContext.fillStyle = 'blue';
  letterMazeCanvasContext.font = '30px Helvetica';
  letterMazeCanvasContext.fillText('Frame Count: ' + frameCount, 0,30);
}

window.onload = function()
{
  letterMazeCanvas = document.getElementById('letterMazeCanvas');
  letterMazeCanvasContext = letterMazeCanvas.getContext('2d');

  initializeArrayOfCells();
  let randomCellIndex = getRandomIntInclusive(0, arrayOfCells.length - 1);
  currentCellBeingVisitedByGenerationAlgorithm = arrayOfCells[randomCellIndex];
  currentCellBeingVisitedByGenerationAlgorithm.hasBeenVisitedByGenerationAlgorithm = true;
  //console.log(currentCellBeingVisitedByGenerationAlgorithm);
  //console.log(currentCellBeingVisitedByGenerationAlgorithm.hasBeenVisitedByGenerationAlgorithm);

  setInterval(gameLoop, 1000);
}

var frameCount = 0;

function gameLoop()
{
  updateEverything();
  drawEverything();
}

function updateEverything()
{
  frameCount++;
}

function drawEverything()
{
  drawBackground();
  drawFrameCount();
  drawCells();
  // console.log('frameCount: ' + frameCount);
}

function drawCells()
{
  for (let cellIndex = 0; cellIndex < arrayOfCells.length; cellIndex++)
  {
    arrayOfCells[cellIndex].draw();
  }
}

const NUMBER_OF_COLUMNS = 8;
const NUMBER_OF_ROWS = 7;

const CELL_WIDTH = 80;
const CELL_HEIGHT = 100;

function CellPrototype(rowIndex, columnIndex)
{
  this.rowIndex = rowIndex;
  this.columnIndex = columnIndex;

  this.cellIndex = (rowIndex * NUMBER_OF_COLUMNS) + columnIndex;

  this.hasBeenVisitedByGenerationAlgorithm = false;

  this.draw = function()
  {

    if (this.hasBeenVisitedByGenerationAlgorithm)
    {
      letterMazeCanvasContext.fillStyle = 'purple';
      letterMazeCanvasContext.fillRect(columnIndex*CELL_WIDTH + 5,rowIndex*CELL_HEIGHT + CELL_HEIGHT + 5,
                                       CELL_WIDTH - 10,CELL_HEIGHT - 10);
    }

    letterMazeCanvasContext.strokeStyle = 'green';

    //top wall
    letterMazeCanvasContext.beginPath();
    letterMazeCanvasContext.moveTo(columnIndex*CELL_WIDTH + 5,rowIndex*CELL_HEIGHT + 5);
    letterMazeCanvasContext.lineTo(columnIndex*CELL_WIDTH + CELL_WIDTH - 5,rowIndex*CELL_HEIGHT + 5);
    letterMazeCanvasContext.stroke();

    //right wall
    letterMazeCanvasContext.beginPath();
    letterMazeCanvasContext.moveTo(columnIndex*CELL_WIDTH + CELL_WIDTH - 5,rowIndex*CELL_HEIGHT + 5);
    letterMazeCanvasContext.lineTo(columnIndex*CELL_WIDTH + CELL_WIDTH - 5,rowIndex*CELL_HEIGHT + CELL_HEIGHT - 5);
    letterMazeCanvasContext.stroke();

    //bottom wall
    letterMazeCanvasContext.beginPath();
    letterMazeCanvasContext.moveTo(columnIndex*CELL_WIDTH + CELL_WIDTH - 5,rowIndex*CELL_HEIGHT + CELL_HEIGHT - 5);
    letterMazeCanvasContext.lineTo(columnIndex*CELL_WIDTH + 5,rowIndex*CELL_HEIGHT + CELL_HEIGHT - 5);
    letterMazeCanvasContext.stroke();

    //left wall
    letterMazeCanvasContext.beginPath();
    letterMazeCanvasContext.moveTo(columnIndex*CELL_WIDTH + 5,rowIndex*CELL_HEIGHT + CELL_HEIGHT - 5);
    letterMazeCanvasContext.lineTo(columnIndex*CELL_WIDTH + 5,rowIndex*CELL_HEIGHT + 5);
    letterMazeCanvasContext.stroke();

    //cell index
    letterMazeCanvasContext.fillStyle = 'yellow';
    letterMazeCanvasContext.font = '30px Helvetica';
    letterMazeCanvasContext.fillText(this.cellIndex, (columnIndex*CELL_WIDTH) + 30,(rowIndex*CELL_HEIGHT) + 50);


  }
}

var arrayOfCells = [];

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
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

let currentCellBeingVisitedByGenerationAlgorithm;
