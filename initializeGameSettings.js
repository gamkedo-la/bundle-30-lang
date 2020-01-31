function initializeSpecificGameSettings()
{
  if (playerShouldBePlayingSnake)
  {
    playerXCoordinate = snakeStartingX;
    playerYCoordinate = snakeStartingY;
    playerSpeedX = STARTING_SNAKE_SPEED_X;
    playerSpeedY = STARTING_SNAKE_SPEED_Y;
    letterSpeed = SNAKE_LETTER_SPEED;
    SNAKE_GAME.populateArrayOfAnswers();
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
