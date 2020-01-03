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
  } else if (playerShouldBePlayingSnake)
  {
    drawSnakeBackground();
  } else if (playerShouldBePlayingBird)
  {
    drawBirdBackground();
  } else if (playerShouldBePlayingLane)
  {
    drawLaneBackground();
  } else if (playerShouldBePlayingJumper)
  {
    drawJumperBackground();
    drawJumperPlatforms();
  } else if (playerShouldBePlayingSpaceShooter)
  {
    drawSpaceShooterBackground();
  } else if (playerShouldBePlayingRunner) {
	  drawRunnerBackground();
  }
}
