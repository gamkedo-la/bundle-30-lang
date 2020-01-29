var debugOn = false;

function drawDebugStuff()
{
  if (playerShouldSeeTitleScreen)
  {
    gameCanvasContext.fillText(mouseCoordinates.mouseX + "," + mouseCoordinates.mouseY,
                                mouseCoordinates.mouseX,mouseCoordinates.mouseY);
  } else if (playerIsPlayingAnyGame)
  {
    drawLetterCoordinates();
    drawPlayerCoordinates();
    drawLetterColliders();
  }
}

function drawLetterCoordinates()
{
  for (let letterIndex = 0; letterIndex < arrayOfAnswers.length; letterIndex++)
  {
    gameCanvasContext.fillStyle = 'black';
    gameCanvasContext.fillText(arrayOfAnswers[letterIndex].xCoordinate + ',' + arrayOfAnswers[letterIndex].yCoordinate,
                              arrayOfAnswers[letterIndex].xCoordinate, arrayOfAnswers[letterIndex].yCoordinate - 27);
  }
}

function drawPlayerCoordinates()
{
  gameCanvasContext.fillStyle = 'black';
  gameCanvasContext.font = '27px Helvetica';
  gameCanvasContext.fillText(playerXCoordinate + ',' + playerYCoordinate, playerXCoordinate,playerYCoordinate);
}

function drawLetterColliders()
{
  for(let letterIndex = 0; letterIndex < arrayOfAnswers.length; letterIndex++)
  {
    gameCanvasContext.strokeStyle = 'black';
    gameCanvasContext.strokeRect(arrayOfAnswers[letterIndex].xCoordinate,arrayOfAnswers[letterIndex].yCoordinate - 20,
                                27,27);
  }
}
