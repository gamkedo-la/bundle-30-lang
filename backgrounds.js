function drawLoadingOrSplashOrTitleScreenBackground()
{
  gameCanvasContext.fillStyle = 'orange';
  gameCanvasContext.fillRect(0,0, gameCanvas.width,gameCanvas.height);
}

function drawGameSpecificBackground()
{
  if (playerShouldSeeTitleScreen)
  {
    drawLoadingOrSplashOrTitleScreenBackground();
    drawTitleScreen();
  } else if (SNAKE_GAME.isPlaying())
  {
    SNAKE_GAME.drawBackground();
  } else if (birdGame.isPlaying())
  {
    birdGame.drawBackground();
  } else if (laneGame.isPlaying())
  {
    laneGame.drawBackground();
  } else if (jumperGame.isPlaying())
  {
	jumperGame.drawBackground();
  } else if (spaceShooterGame.isPlaying())
  {
      // drawSpaceShooterBackground();
	  spaceShooterGame.drawBackground();
  } else if (runnerGame.isPlaying()) {
	  runnerGame.drawBackground();
  }
}
