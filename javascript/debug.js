var debugOn = false;

function drawDebugStuff()
{
  console.log('inside draw debug stuff');
  if (fullGameStateMachine.currentState === fullGameStateMachine.FULL_GAME_ENUMERABLE_STATES.titleScreen)
  {
    console.log('inside current state check of drawDebugStuff()');
    gameCanvasContext.fillStyle = 'black';
    gameCanvasContext.fillText(inputManager.mouseCoordinates.x + "," + inputManager.mouseCoordinates.y,
                                inputManager.mouseCoordinates.x,inputManager.mouseCoordinates.y);
  } else if (fullGameStateMachine.playingAGameState)
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