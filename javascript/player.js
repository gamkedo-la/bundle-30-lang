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
  } else if (jumperGame.isPlaying()){
    jumperGame.drawPlayer();
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
  } else if (jumperGame.isPlaying())
  {
	jumperGame.movePlayer()
  } else if (spaceShooterGame.isPlaying())
  {
	  spaceShooterGame.movePlayer();
  } else if (runnerGame.isPlaying()) {
	  runnerGame.movePlayerCharacter()
  }
}
