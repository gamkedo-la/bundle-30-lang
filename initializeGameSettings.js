function initializeSpecificGameSettings()
{
  if (SNAKE_GAME.isPlaying())
  {
    SNAKE_GAME.initialize();
  } else if (birdGame.isPlaying())
  {
	birdGame.initialize();
  } else if (laneGame.isPlaying())
  {
	laneGame.initialize();
  } else if (playerShouldBePlayingJumper)
  {
    playerXCoordinate = jumperStartingXCoordinate;
    playerYCoordinate = jumperStartingYCoordinate;
  } else if (spaceShooterGame.isPlaying())
  {
    // playerXCoordinate = spaceShooterStartingXCoordinate;
      // playerYCoordinate = spaceShooterStartingYCoordinate;
	  spaceShooterGame.initialize();
  } else if (runnerGame.isPlaying()) {
	  runnerGame.initialize();
  }
}
