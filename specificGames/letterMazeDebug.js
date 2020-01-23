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

  setInterval(gameLoop, 1000/30);
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
  console.log('frameCount: ' + frameCount);
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

  this.draw = function()
  {
    letterMazeCanvasContext.strokeStyle = 'green';

    letterMazeCanvasContext.beginPath();
  }
}

let testCell = new CellPrototype(0,0);
