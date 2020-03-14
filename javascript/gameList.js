var gameList = [snakeGame,birdGame,laneGame,jumperGame,null,passOrBlockGame,
                cVcShooterGame,spaceShooterGame,runnerGame,null/*pinataGame*/,null,null,
                mazeGame,null,flowerGame,null,null/*balloonPop*/,null,
                null,null,null,null,null,null,
                null,/*bubbleWrapGame*/,null,null,null,null];

var currentlyLoadedGame = -1;
var SINGLE_PLAYER_ENDLESS = 0;
var SINGLE_PLAYER_RANDOM = 1;
var TWO_PLAYER_RANDOM = 2;
var nextGame = SINGLE_PLAYER_ENDLESS;

var CYCLE_LIMIT_FOR_RANDOM_GAME_RELOAD = 3;
var cycleCount = 0;


// switch (nextGame)
// {
//   case SINGLE_PLAYER_ENDLESS:
//     break;
//   case SINGLE_PLAYER_RANDOM:
//     break;
//   case TWO_PLAYER_RANDOM:
//     break;
// }

function loadGameNum(gameListIndex)
{
  gameClassManager.loadCurrentGame(gameList[gameListIndex]);
}

function loadRandomGame()
{
  do
  {
    gameListIndex = Math.floor(Math.random()*30);
  } while (gameList[gameListIndex] == null)
  gameClassManager.loadCurrentGame(gameList[gameListIndex]);
  gameClassManager.initializeCurrentGame();
}

function reloadLastGame()
{
  gameClassManager.loadCurrentGame(gameClassManager.currentGame);
}
