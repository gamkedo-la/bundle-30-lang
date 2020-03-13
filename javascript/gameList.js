var gameList = [SNAKE_GAME,birdGame,laneGame,jumperGame,null,passOrBlockGame,
                cVcShooterGame,null,runnerGame,pinataGame,null,null,
                MAZE_GAME,null,flowerGame,null,null,null,
                null,null,null,null,null,null,
                null,bubbleWrapGame,null,null,null,null];

var currentlyLoadedGame = -1;
var SINGLE_PLAYER_ENDLESS = 0;
var SINGLE_PLAYER_RANDOM = 1;
var TWO_PLAYER_RANDOM = 2;
var nextGame = SINGLE_PLAYER_ENDLESS;


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
}

function reloadLastGame()
{
  gameClassManager.loadCurrentGame(gameClassManager.currentGame);
}
