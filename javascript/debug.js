var debugOn = false;

function drawDebugStuff()
{

  if (fullGameStateMachine.currentState === fullGameStateMachine.FULL_GAME_ENUMERABLE_STATES.titleScreen ||
      fullGameStateMachine.currentState === fullGameStateMachine.FULL_GAME_ENUMERABLE_STATES.playingMiniGame ||
    fullGameStateMachine.currentState === fullGameStateMachine.FULL_GAME_ENUMERABLE_STATES.mandarinCustomizationScreen)
  {

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
  gameCanvasContext.fillText(gameClassManager.currentGame.playerCharacter.x + ',' + gameClassManager.currentGame.playerCharacter.y, gameClassManager.currentGame.playerCharacter.x,gameClassManager.currentGame.playerCharacter.y);
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
