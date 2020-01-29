var letterMazeCanvas;
var letterMazeCanvasContext;

var letterMazeCanvas2;
var letterMazeCanvasContext2;

function drawBackground()
{
  letterMazeCanvasContext.fillStyle = 'black';
  letterMazeCanvasContext.fillRect(0,0, 640,700);
}

function drawBackground2()
{
  letterMazeCanvasContext2.fillStyle = 'black';
  letterMazeCanvasContext2.fillRect(0,0, 640,700);
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

var gameFrameRate = 1000/15;
var frameCount = 0;

window.onload = function()
{
  letterMazeCanvas = document.getElementById('letterMazeCanvas');
  letterMazeCanvasContext = letterMazeCanvas.getContext('2d');

  letterMazeCanvas2 = document.getElementById('letterMazeCanvas2');
  letterMazeCanvasContext2 = letterMazeCanvas2.getContext('2d');

  letterMazeCanvas.addEventListener('click', handleSplashScreenClick);
  document.addEventListener('keydown', handleKeyDowns);

  initializeArrayOfCells();

  var randomStartingIndexForMazeGeneration = getRandomIntInclusive(0,arrayOfCells.length - 1);

  currentCellBeingVisitedByGenerationAlgorithm = arrayOfCells[randomStartingIndexForMazeGeneration];
  currentCellBeingVisitedByGenerationAlgorithm.hasBeenVisitedByGenerationAlgorithm = true;

  initializeCorrectLetterAudioTag();
  setOrResetCorrectLetter();

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
  if (!playerShouldSeeSplashScreen && mazeGenerationAlgorithmShouldAdvance)
  {
    advanceGenerationAlgorithm();
  }
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
  drawBackground2();
  drawCells();
  if (!mazeGenerationAlgorithmShouldAdvance)
  {
    drawLetters();
    drawPlayers();
  }
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

    letterMazeCanvasContext2.lineWidth = 15;
    letterMazeCanvasContext2.strokeStyle = 'blue';

    //visitation of algorithm in purple
    if (this.hasBeenVisitedByGenerationAlgorithm)
    {
      letterMazeCanvasContext.fillStyle = 'purple';
      letterMazeCanvasContext.fillRect(xCoordinate,yCoordinate, CELL_WIDTH,CELL_HEIGHT);

      letterMazeCanvasContext2.fillStyle = 'purple';
      letterMazeCanvasContext2.fillRect(xCoordinate,yCoordinate, CELL_WIDTH,CELL_HEIGHT);
    }

    if (currentCellBeingVisitedByGenerationAlgorithm === this && mazeGenerationAlgorithmShouldAdvance)
    {
      letterMazeCanvasContext.fillStyle = 'orange';
      letterMazeCanvasContext.fillRect(xCoordinate,yCoordinate, CELL_WIDTH,CELL_HEIGHT);

      letterMazeCanvasContext2.fillStyle = 'orange';
      letterMazeCanvasContext2.fillRect(xCoordinate,yCoordinate, CELL_WIDTH,CELL_HEIGHT);
    }

    //top wall
    if (this.arrayOfExistentWalls[0])
    {
      letterMazeCanvasContext.beginPath();
      letterMazeCanvasContext.moveTo(xCoordinate,yCoordinate + 5);
      letterMazeCanvasContext.lineTo(xCoordinate + CELL_WIDTH, yCoordinate + 5);
      letterMazeCanvasContext.stroke();

      letterMazeCanvasContext2.beginPath();
      letterMazeCanvasContext2.moveTo(xCoordinate,yCoordinate + 5);
      letterMazeCanvasContext2.lineTo(xCoordinate + CELL_WIDTH, yCoordinate + 5);
      letterMazeCanvasContext2.stroke();
    }

    //right wall
    if (this.arrayOfExistentWalls[1])
    {
      letterMazeCanvasContext.beginPath();
      letterMazeCanvasContext.moveTo(xCoordinate + CELL_WIDTH - 5,yCoordinate);
      letterMazeCanvasContext.lineTo(xCoordinate + CELL_WIDTH - 5, yCoordinate + CELL_HEIGHT);
      letterMazeCanvasContext.stroke();

      letterMazeCanvasContext2.beginPath();
      letterMazeCanvasContext2.moveTo(xCoordinate + CELL_WIDTH - 5,yCoordinate);
      letterMazeCanvasContext2.lineTo(xCoordinate + CELL_WIDTH - 5, yCoordinate + CELL_HEIGHT);
      letterMazeCanvasContext2.stroke();
    }

    //bottom wall
    if (this.arrayOfExistentWalls[2])
    {
      letterMazeCanvasContext.beginPath();
      letterMazeCanvasContext.moveTo(xCoordinate + CELL_WIDTH,yCoordinate + CELL_HEIGHT - 5);
      letterMazeCanvasContext.lineTo(xCoordinate, yCoordinate + CELL_HEIGHT - 5);
      letterMazeCanvasContext.stroke();

      letterMazeCanvasContext2.beginPath();
      letterMazeCanvasContext2.moveTo(xCoordinate + CELL_WIDTH,yCoordinate + CELL_HEIGHT - 5);
      letterMazeCanvasContext2.lineTo(xCoordinate, yCoordinate + CELL_HEIGHT - 5);
      letterMazeCanvasContext2.stroke();
    }

    //left wall
    if (this.arrayOfExistentWalls[3])
    {
      letterMazeCanvasContext.beginPath();
      letterMazeCanvasContext.moveTo(xCoordinate + 5,yCoordinate + CELL_HEIGHT);
      letterMazeCanvasContext.lineTo(xCoordinate + 5, yCoordinate);
      letterMazeCanvasContext.stroke();

      letterMazeCanvasContext2.beginPath();
      letterMazeCanvasContext2.moveTo(xCoordinate + 5,yCoordinate + CELL_HEIGHT);
      letterMazeCanvasContext2.lineTo(xCoordinate + 5, yCoordinate);
      letterMazeCanvasContext2.stroke();
    }

    // letterMazeCanvasContext.fillStyle = 'green';
    // letterMazeCanvasContext.font = '30px Helvetica';
    // letterMazeCanvasContext.fillText(this.cellIndex, this.columnIndex*CELL_WIDTH+30,this.rowIndex*CELL_HEIGHT+30);

    // letterMazeCanvasContext2.fillStyle = 'green';
    // letterMazeCanvasContext2.font = '30px Helvetica';
    // letterMazeCanvasContext2.fillText(this.cellIndex, this.columnIndex*CELL_WIDTH+30,this.rowIndex*CELL_HEIGHT+30);
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

var mazeGenerationAlgorithmShouldAdvance = true;
var finalCellVisitedByGenerationAlgorithm = undefined;

function advanceGenerationAlgorithm()
{
  var nextCellToBeVisitedByGenerationAlgorithm = currentCellBeingVisitedByGenerationAlgorithm.returnARandomUnvisitedNeighborIfPossible();


  if (nextCellToBeVisitedByGenerationAlgorithm)
  {
    removeWallsBetweenNeighboringVisitedCellsDuringGeneration(currentCellBeingVisitedByGenerationAlgorithm.cellIndex,nextCellToBeVisitedByGenerationAlgorithm.cellIndex);
    backtrackStack.push(currentCellBeingVisitedByGenerationAlgorithm);
    currentCellBeingVisitedByGenerationAlgorithm = nextCellToBeVisitedByGenerationAlgorithm;//setting up next frame
    currentCellBeingVisitedByGenerationAlgorithm.hasBeenVisitedByGenerationAlgorithm = true;
  } else if (backtrackStack.length > 0)
  {
    var cellToBacktrackTo = backtrackStack.pop();
    currentCellBeingVisitedByGenerationAlgorithm = cellToBacktrackTo;
    finalCellVisitedByGenerationAlgorithm = cellToBacktrackTo;
  } else if (backtrackStack.length === 0)
  {
    mazeGenerationAlgorithmShouldAdvance = false;
    populateArrayOfDeadEndCellsNotIncludingPlayerStartingLocation();
    initializeLetters();
    console.log('currentCellBeingVisitedByGenerationAlgorithm: ' + currentCellBeingVisitedByGenerationAlgorithm);
    initializePlayers();
    correctLetterAudioTag.play();
    console.log(arrayOfCurrentDeadEndCellsNotIncludingPlayerStartingLocation);
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

var arrayOfCurrentDeadEndCellsNotIncludingPlayerStartingLocation = [];

function populateArrayOfDeadEndCellsNotIncludingPlayerStartingLocation()
{
  //cycle through all the cells
  for (let cellIndex = 0; cellIndex < arrayOfCells.length; cellIndex++)
  {
    let existentWallsCount = 0;
    //at each cell count the number of existing walls
    for (let arrayOfExistentWallsIndex = 0; arrayOfExistentWallsIndex < arrayOfCells[cellIndex].arrayOfExistentWalls.length; arrayOfExistentWallsIndex++)
    {
      if (arrayOfCells[cellIndex].arrayOfExistentWalls[arrayOfExistentWallsIndex] === true)
      {
        existentWallsCount++;
      }
    }//end of counting existent walls
    if (existentWallsCount === 3)
    {
      arrayOfCurrentDeadEndCellsNotIncludingPlayerStartingLocation.push(arrayOfCells[cellIndex]);
    }//end of pushing dead ends into dead end array
  }//end of cycling through all the cells
  console.log('finalCellVisitedByGenerationAlgorithm: ' + finalCellVisitedByGenerationAlgorithm);
  for (let deadEndCellsIndex = 0; deadEndCellsIndex < arrayOfCurrentDeadEndCellsNotIncludingPlayerStartingLocation.length; deadEndCellsIndex++)
  {
    if (arrayOfCurrentDeadEndCellsNotIncludingPlayerStartingLocation[deadEndCellsIndex] === finalCellVisitedByGenerationAlgorithm)
    {
      arrayOfCurrentDeadEndCellsNotIncludingPlayerStartingLocation.splice(deadEndCellsIndex,1);
    }
  }
}//end of function

var currentCorrectLetter = undefined;
var correctLetterAudioTag = undefined;

function setOrResetCorrectLetter()
{
  let randomNumber = Math.random()*10;

  if (randomNumber < 5)
  {
    currentCorrectLetter = 'm';
  } else {
    currentCorrectLetter = 'n';
  }
  correctLetterAudioTag.src = currentCorrectLetter + '.mp3';
}

function playCorrectLetterAudioTag()
{
  correctLetterAudioTag.play();
}

function initializeCorrectLetterAudioTag()
{
  correctLetterAudioTag = document.getElementById('correctLetterAudioTag');
}

var arrayOfAnswers = [];
let letterM;
let letterN;

function LetterClass(nameString)
{
  this.name = nameString;
  this.cellIndex = undefined;
  this.cell = undefined;

  this.assignCell = function()
  {
    let randomDeadEndIndex = getRandomIntInclusive(0,arrayOfCurrentDeadEndCellsNotIncludingPlayerStartingLocation.length - 1);
    console.log('random dead end index: ' + randomDeadEndIndex);
    this.cell = arrayOfCurrentDeadEndCellsNotIncludingPlayerStartingLocation[randomDeadEndIndex];
    arrayOfCurrentDeadEndCellsNotIncludingPlayerStartingLocation.splice(randomDeadEndIndex,1);
    console.log('letter cell index: letter ' + this.name + ': ' + this.cellIndex);
  }

  this.draw = function()
  {
    letterMazeCanvasContext.fillStyle = 'black';
    letterMazeCanvasContext.font = '30px Helvetica';
    letterMazeCanvasContext.fillText(this.name, this.cell.columnIndex*CELL_WIDTH + CELL_WIDTH/2,this.cell.rowIndex*CELL_HEIGHT + CELL_HEIGHT/2 + 30);

    letterMazeCanvasContext2.fillStyle = 'black';
    letterMazeCanvasContext2.font = '30px Helvetica';
    letterMazeCanvasContext2.fillText(this.name, this.cell.columnIndex*CELL_WIDTH + CELL_WIDTH/2,this.cell.rowIndex*CELL_HEIGHT + CELL_HEIGHT/2 + 30);
  }
}

function initializeLetters()
{
  letterM = new LetterClass('m');
  arrayOfAnswers.push(letterM);
  letterN = new LetterClass('n');
  arrayOfAnswers.push(letterN);
  assignLetterCellIndices();
}

function assignLetterCellIndices()
{
  for (let arrayOfAnswersIndex = 0; arrayOfAnswersIndex < arrayOfAnswers.length; arrayOfAnswersIndex++)
  {
    arrayOfAnswers[arrayOfAnswersIndex].assignCell();
  }
}

function drawLetters()
{
  for (let arrayOfAnswersIndex = 0; arrayOfAnswersIndex < arrayOfAnswers.length; arrayOfAnswersIndex++)
  {
    arrayOfAnswers[arrayOfAnswersIndex].draw();
  }
}

function PlayerClass(nameString)
{
  this.name = nameString;

  this.cell = undefined;
  this.cellIndex = undefined;

  this.initialize = function()
  {
    this.cell = finalCellVisitedByGenerationAlgorithm;
  }

  this.draw = function()
  {
    if (this.name === 'player1')
    {
      letterMazeCanvasContext.fillStyle = 'orange';
      letterMazeCanvasContext.fillRect(this.cell.columnIndex*CELL_WIDTH + 13,this.cell.rowIndex*CELL_HEIGHT + 13,
                                       CELL_WIDTH - 25,CELL_HEIGHT - 25);
    } else if (this.name === 'player2')
    {
      letterMazeCanvasContext2.fillStyle = 'orange';
      letterMazeCanvasContext2.fillRect(this.cell.columnIndex*CELL_WIDTH + 13,this.cell.rowIndex*CELL_HEIGHT + 13,
                                       CELL_WIDTH - 25,CELL_HEIGHT - 25);
    }
  }
}

let player1;
let player2;
let arrayOfPlayers = [];

function initializePlayers()
{
  player1 = new PlayerClass('player1');
  arrayOfPlayers.push(player1);
  player2 = new PlayerClass('player2');
  arrayOfPlayers.push(player2);

  for (let arrayOfPlayersIndex = 0; arrayOfPlayersIndex < arrayOfPlayers.length; arrayOfPlayersIndex++)
  {
    arrayOfPlayers[arrayOfPlayersIndex].initialize();
  }
}

function drawPlayers()
{
  for (let arrayOfPlayersIndex = 0; arrayOfPlayersIndex < arrayOfPlayers.length; arrayOfPlayersIndex++)
  {
    arrayOfPlayers[arrayOfPlayersIndex].draw();
  }
}

function handleKeyDowns(builtInDocumentEventObject)
{
  builtInDocumentEventObject.preventDefault();
  if (!playerShouldSeeSplashScreen && !mazeGenerationAlgorithmShouldAdvance)
  {
  switch(builtInDocumentEventObject.keyCode)
    {
      case 87://w
      console.log('recognizing w press');
      movePlayer1UpIfPossible();
      break;

      case 68://d
      console.log('recognizing d press');
      moverPlayer1RightIfPossible();
      break;

      case 83://s
      console.log('recognizing s press');
      moverPlayer1DownIfPossible();
      break;

      case 65://a
      console.log('recognizing a press');
      moverPlayer1LeftIfPossible();
      break;

      case 37://left arrow
      moverPlayer2LeftIfPossible();
      break;

      case 38://up arrow
      movePlayer2UpIfPossible();
      break;

      case 39://right arrow
      moverPlayer2RightIfPossible();
      break;

      case 40://down arrow
      moverPlayer2DownIfPossible();
      break;
    }//end of switch
  }//end of if not on splash screen check
}//end of handleKeyDowns

function movePlayer1UpIfPossible()
{
  if (player1.cell.topNeighboringCellExists && !player1.cell.arrayOfExistentWalls[0])
  {
    player1.cell = player1.cell.topNeighboringCell;
    checkForLetterCollisions();
  } else {
    player1.cell = player1.cell;
  }
}

function movePlayer2UpIfPossible()
{
  if (player2.cell.topNeighboringCellExists && !player2.cell.arrayOfExistentWalls[0])
  {
    player2.cell = player2.cell.topNeighboringCell;
    checkForLetterCollisions();
  } else {
    player2.cell = player2.cell;
  }
}

function moverPlayer1RightIfPossible()
{
  if (player1.cell.rightNeighboringCellExists && !player1.cell.arrayOfExistentWalls[1])
  {
    player1.cell = player1.cell.rightNeighboringCell;
    checkForLetterCollisions();
  }
  else {
    player1.cell = player1.cell;
  }
}

function moverPlayer2RightIfPossible()
{
  if (player2.cell.rightNeighboringCellExists && !player2.cell.arrayOfExistentWalls[1])
  {
    player2.cell = player2.cell.rightNeighboringCell;
    checkForLetterCollisions();
  }
  else {
    player2.cell = player2.cell;
  }
}

function moverPlayer1DownIfPossible()
{
  if (player1.cell.bottomNeighboringCellExists && !player1.cell.arrayOfExistentWalls[2])
  {
    player1.cell = player1.cell.bottomNeighboringCell;
    checkForLetterCollisions();
  }
  else {
    player1.cell = player1.cell;
  }
}

function moverPlayer2DownIfPossible()
{
  if (player2.cell.bottomNeighboringCellExists && !player2.cell.arrayOfExistentWalls[2])
  {
    player2.cell = player2.cell.bottomNeighboringCell;
    checkForLetterCollisions();
  }
  else {
    player2.cell = player2.cell;
  }
}

function moverPlayer1LeftIfPossible()
{
  if (player1.cell.leftNeighboringCellExists && !player1.cell.arrayOfExistentWalls[3])
  {
    player1.cell = player1.cell.leftNeighboringCell;
    checkForLetterCollisions();
  }
  else {
    player1.cell = player1.cell;
  }
}

function moverPlayer2LeftIfPossible()
{
  if (player2.cell.leftNeighboringCellExists && !player2.cell.arrayOfExistentWalls[3])
  {
    player2.cell = player2.cell.leftNeighboringCell;
    checkForLetterCollisions();
  }
  else {
    player2.cell = player2.cell;
  }
}

function checkForLetterCollisions()
{
  for (let arrayOfAnswersIndex = 0; arrayOfAnswersIndex < arrayOfAnswers.length; arrayOfAnswersIndex++)
  {
    for (let arrayOfPlayersIndex = 0; arrayOfPlayersIndex < arrayOfPlayers.length; arrayOfPlayersIndex++)
    {
      if (arrayOfPlayers[arrayOfPlayersIndex].cell === arrayOfAnswers[arrayOfAnswersIndex].cell &&
          arrayOfAnswers[arrayOfAnswersIndex].name === currentCorrectLetter)
          {
            resetGame();
            console.log('correct letter choice');
          }
      else if (arrayOfPlayers[arrayOfPlayersIndex].cell === arrayOfAnswers[arrayOfAnswersIndex].cell &&
               arrayOfAnswers[arrayOfAnswersIndex].name !== currentCorrectLetter)
               {
                 // resetGame();
                 console.log('incorrect letter choice');
               }//end of checking for incorrect letter choice
    }//end of checking the players positions and if letter was correct/incorrect
  }//end of check all the letters
}//end of correct letter check

function resetGame()
{
  arrayOfAnswers = [];
  randomStartingIndexForMazeGeneration = getRandomIntInclusive(0,arrayOfCells.length - 1);

  clearCellsOfHavingBeenVisitedByGenerationAlgorithm();
  resetExistenceOfWalls();
  arrayOfCurrentDeadEndCellsNotIncludingPlayerStartingLocation = [];

  currentCellBeingVisitedByGenerationAlgorithm = arrayOfCells[randomStartingIndexForMazeGeneration];
  currentCellBeingVisitedByGenerationAlgorithm.hasBeenVisitedByGenerationAlgorithm = true;


  mazeGenerationAlgorithmShouldAdvance = true;
}

function clearCellsOfHavingBeenVisitedByGenerationAlgorithm()
{
  for (let arrayOfCellsIndex = 0; arrayOfCellsIndex < arrayOfCells.length; arrayOfCellsIndex++)
  {
    arrayOfCells[arrayOfCellsIndex].hasBeenVisitedByGenerationAlgorithm = false;
  }
}

function resetExistenceOfWalls()
{
  for (let arrayOfCellsIndex = 0; arrayOfCellsIndex < arrayOfCells.length; arrayOfCellsIndex++)
  {
    for (let arrayOfExistentWallsIndex = 0; arrayOfExistentWallsIndex < arrayOfCells[arrayOfCellsIndex].arrayOfExistentWalls.length; arrayOfExistentWallsIndex++)
    {
      if (arrayOfCells[arrayOfCellsIndex].arrayOfExistentWalls[arrayOfExistentWallsIndex] === false)
      {
        arrayOfCells[arrayOfCellsIndex].arrayOfExistentWalls[arrayOfExistentWallsIndex] = true;
      }
    }
  }
}
