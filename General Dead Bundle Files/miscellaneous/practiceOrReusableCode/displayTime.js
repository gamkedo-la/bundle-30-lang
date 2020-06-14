var displayTimeCanvas;
var displayTimeCanvasContext;

window.onload = function()
{
  displayTimeCanvas = document.getElementById('displayTimeCanvas');
  displayTimeCanvasContext = displayTimeCanvas.getContext('2d');

  console.log(parentTimeObject);

  setInterval(gameLoop, 1000/30);
}

function drawBackground()
{
  displayTimeCanvasContext.fillStyle = 'black';
  displayTimeCanvasContext.fillRect(0,0, 640,700);
}

function gameLoop()
{
  updateEverything();
  drawEverything();
}

function updateEverything()
{
  updateParentTimeObject();
  extractHoursMinutesAndSecondsFromDateObject();
}

function drawEverything()
{
  drawBackground();
  drawPastTime();
  drawCurrentTime();
  drawFutureTime();
}

var parentTimeObject = undefined;

function updateParentTimeObject()
{
  parentTimeObject = new Date();
}

var currentHours = undefined;
var currentMinutes = undefined;
var currentSeconds = undefined;
var currentMilliseconds = undefined;

function extractHoursMinutesAndSecondsFromDateObject()
{
  currentHours = parentTimeObject.getHours();

  currentMinutes = parentTimeObject.getMinutes();

  currentSeconds = parentTimeObject.getSeconds();
  if (currentSeconds < 10)
  {
    currentSeconds = '0' + currentSeconds.toString();
  }

  currentMilliseconds = parentTimeObject.getMilliseconds();
  if (currentMilliseconds < 10)
  {
    currentMilliseconds = '00' + currentMilliseconds.toString();
  } else if (currentMilliseconds < 100)
  {
    currentMilliseconds = '0' + currentMilliseconds.toString();
  }
}

function drawCurrentTime()
{
  let fontSize = 30;
  let fillTextOffSet = fontSize;

  displayTimeCanvasContext.fillStyle = 'blue';
  displayTimeCanvasContext.font = fontSize + 'px Helvetica';
  displayTimeCanvasContext.fillText('The current time is: ' + currentHours + ':' + currentMinutes + ':' +
                                    currentSeconds + ':' + currentMilliseconds,
                                    0,350 + fillTextOffSet);
}

function drawFutureTime()
{
  let fontSize = 30;
  let fillTextOffSet = fontSize;

  displayTimeCanvasContext.fillStyle = 'blue';
  displayTimeCanvasContext.font = fontSize + 'px Helvetica';
  displayTimeCanvasContext.fillText('The future is: ' + currentHours + ':' + currentMinutes + ':'
                                    + currentSeconds + ':' + currentMilliseconds + '++',
                                    0,670 + fillTextOffSet);
}

function drawPastTime()
{
  let fontSize = 30;
  let fillTextOffSet = fontSize;

  displayTimeCanvasContext.fillStyle = 'blue';
  displayTimeCanvasContext.font = fontSize + 'px Helvetica';
  displayTimeCanvasContext.fillText('The past is: ' + currentHours + ':' + currentMinutes + ':'
                                    + currentSeconds + ':' + currentMilliseconds + '--',
                                    0,0 + fillTextOffSet);
}
