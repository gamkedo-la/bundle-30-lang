var playerXCoordinate = undefined;
var playerYCoordinate = undefined;

var playerXSpeed = undefined;
var playerYSpeed = undefined;

function drawGameSpecificPlayer()
{
  if (SNAKE_GAME.isPlaying())
  {
    SNAKE_GAME.drawPlayer();
  } else if (birdGame.isPlaying()) {
    birdGame.drawPlayer();
  } else if (laneGame.isPlaying()) {
	  laneGame.drawPlayer();
  } else if (playerShouldBePlayingJumper){
    drawJumperPlayer();
  } else if (spaceShooterGame.isPlaying())
  {
	  spaceShooterGame.drawPlayer();
  }
}

function moveGameSpecificPlayer()
{
  if (SNAKE_GAME.isPlaying())
  {
    SNAKE_GAME.movePlayer();
  } else if (birdGame.isPlaying())
  {
    birdGame.movePlayer();
  } else if (playerShouldBePlayingJumper)
  {
    moveJumperPlayer();
  } else if (spaceShooterGame.isPlaying())
  {
	  spaceShooterGame.movePlayer();
  } else if (runnerGame.isPlaying()) {
	  runnerGame.movePlayerCharacter()
  }
}
