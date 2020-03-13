var gameList = [SNAKE_GAME,birdGame,laneGame,jumperGame,null,passOrBlockGame,
                cVcShooterGame,null,runnerGame,pinataGame,null,null,
                null,null,flowerGame,null,null,null,
                null,null,null,null,null,null,
                null,bubbleWrapGame,null,null,null,null];

var currentlyLoadedGame = -1;
var NEXT_GAME_NONE = 0;
var NEXT_GAME_REPEAT = 1;
var NEXT_GAME_RANDOM = 2;
var nextGame = NEXT_GAME_NONE;

function loadGameNum(whichGame)
{
  currentlyLoadedGame = whichGame;
  gameClassManager.loadCurrentGame(gameList[currentlyLoadedGame]);
}

function loadRandomGame()
{
  do
  {
    currentlyLoadedGame = Math.floor(Math.random()*30);
  } while (gameList[currentlyLoadedGame] == null)
  reloadLastGame();
}

function reloadLastGame()
{
  gameClassManager.loadCurrentGame(gameList[currentlyLoadedGame]);
}
