function initializeSpecificGameSettings()
{
  if (SNAKE_GAME.isPlaying())
  {
    SNAKE_GAME.initialize();
  } else if (playerShouldBePlayingBird)
  {
    playerXCoordinate = birdStartingX;
    playerYCoordinate = birdStartingY;
    playerSpeedX = birdSpeed;
    letterSpeed = birdLetterSpeed;
  } else if (playerShouldBePlayingLane)
  {
    playerXCoordinate = laneStartingX;
    playerYCoordinate = laneStartingY;
    letterSpeed = laneLetterSpeed;
  } else if (playerShouldBePlayingJumper)
  {
    playerXCoordinate = jumperStartingXCoordinate;
    playerYCoordinate = jumperStartingYCoordinate;
  } else if (playerShouldBePlayingSpaceShooter)
  {
    playerXCoordinate = spaceShooterStartingXCoordinate;
    playerYCoordinate = spaceShooterStartingYCoordinate;
  } else if (runnerGame.isPlaying()) {
	  runnerGame.initialize();
  }
}
