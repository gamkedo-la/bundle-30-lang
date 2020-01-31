var playerXCoordinate = undefined;
var playerYCoordinate = undefined;

var playerXSpeed = undefined;
var playerYSpeed = undefined;

function drawGameSpecificPlayer()
{
  if (playerShouldBePlayingSnake)
  {
    SNAKE_GAME.drawPlayer();
  } else if (playerShouldBePlayingBird) {
    drawBirdPlayer();
  } else if (playerShouldBePlayingLane) {
    drawCarPlayer();
  } else if (playerShouldBePlayingJumper){
    drawJumperPlayer();
  } else if (playerShouldBePlayingSpaceShooter)
  {
    drawSpaceShooterPlayer();
  }
}

function moveGameSpecificPlayer()
{
  if (playerShouldBePlayingSnake)
  {
    SNAKE_GAME.movePlayer();
  } else if (playerShouldBePlayingBird)
  {
    moveBirdPlayer();
  } else if (playerShouldBePlayingJumper)
  {
    moveJumperPlayer();
  } else if (playerShouldBePlayingSpaceShooter)
  {
    moveSpaceShooterPlayer();
  } else if (runnerGame.isPlaying()) {
	  runnerGame.movePlayerCharacter()
  }
}
