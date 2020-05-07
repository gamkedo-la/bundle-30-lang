var accuracy = 0;
var amountCorrect = 0;
var amountIncorrect = 0;

function calculateAccuracy()
{
    accuracy = 100 * ( amountCorrect/(amountCorrect + amountIncorrect) );
    accuracy = Math.floor(accuracy);
}

function drawStats()
{
  statsCanvasContext.font = '30px Helvetica';
  statsCanvasContext.fillStyle = 'black';
  statsCanvasContext.fillText("Correct: " + amountCorrect, statsCanvas.width/2 - 60+1, statsCanvas.height/2 - 180+1);
  statsCanvasContext.fillText("Incorrect: " + amountIncorrect, statsCanvas.width/2 - 60+1, statsCanvas.height/2 + 12+1);
  statsCanvasContext.fillText("Accuracy: " + accuracy + "%", statsCanvas.width/2 - 65+1, statsCanvas.height/2 + 204+1);
  statsCanvasContext.fillStyle = '#FFEEBB';
  statsCanvasContext.fillText("Correct: " + amountCorrect, statsCanvas.width/2 - 60, statsCanvas.height/2 - 180);
  statsCanvasContext.fillText("Incorrect: " + amountIncorrect, statsCanvas.width/2 - 60, statsCanvas.height/2 + 12);
  statsCanvasContext.fillText("Accuracy: " + accuracy + "%", statsCanvas.width/2 - 65, statsCanvas.height/2 + 204);
}

function drawStatsBackground()
{
  statsCanvasContext.fillStyle = 'purple';
  statsCanvasContext.fillRect(0,0, statsCanvas.width,statsCanvas.height);
  statsCanvasContext.drawImage(scoreboard_overlayImage,0,0);
}
