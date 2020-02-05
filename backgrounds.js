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
  } else if (playerShouldBePlayingBird)
  {
    drawBirdBackground();
  } else if (laneGame.isPlaying())
  {
    laneGame.drawBackground();
  } else if (playerShouldBePlayingJumper)
  {
    drawJumperBackground();
    drawJumperPlatforms();
  } else if (playerShouldBePlayingSpaceShooter)
  {
    drawSpaceShooterBackground();
  } else if (runnerGame.isPlaying()) {
	  runnerGame.drawBackground();
  }
}
