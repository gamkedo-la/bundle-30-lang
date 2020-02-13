function GameClass()
{
  let gameIsPlaying = false;

  this.isPlaying = function() {
	return gameIsPlaying;
  };

  this.startPlaying = function() {
	gameIsPlaying = true;
  };

  this.stopPlaying = function() {
	gameIsPlaying = false;
  };

  this.gameFrameRate = undefined;//number
  this.updateEverythingInTheGame = function(){};
  this.drawEverythingInTheGame = function(){};

  this.advanceGameFrame = function()
  {
    // this.updateEverythingInTheGame();
    // this.drawEverythingInTheGame();
  };
}

let testGame1 = new GameClass();

testGame1.background =
{
  color:'black',
  startingX:0,
  startingY:0,
  width:640,
  height:700,
  draw: function()
  {
    gameCanvasContext.fillStyle = this.color;
    gameCanvasContext.fillRect(this.startingX,this.startingY, this.width,this.height);
  }
}

testGame1.sprite =
{
  color: 'blue',
  x:0,
  y:0,
  width:50,
  height:50,

  update: function(){this.x = this.x + 5, this.y = this.y + 5},

  draw: function()
  {
    gameCanvasContext.fillStyle = this.color;
    gameCanvasContext.fillRect(this.x,this.y, this.width,this.height);
  }
}

testGame1.updateEverythingInTheGame = function()
{
  testGame1.sprite.update();
}

testGame1.drawEverythingInTheGame = function()
{
  testGame1.background.draw();
  testGame1.sprite.draw();
}

testGame1.advanceGameFrame = function()
{
  testGame1.updateEverythingInTheGame();
  testGame1.drawEverythingInTheGame();
}

testGame1.gameFrameRate = 1000/30;



let testGame2 = new GameClass();

testGame2.gameFrameRate = 1000/15;
testGame2.background =
{
  color:'blue',
  startingX:0,
  startingY:0,
  width:640,
  height:700,
  draw: function()
  {
    gameCanvasContext.fillStyle = this.color;
    gameCanvasContext.fillRect(this.startingX,this.startingY, this.width,this.height);
  }
}

testGame2.sprite =
{
  color: 'orange',
  x:500,
  y:400,
  width:50,
  height:50,

  update: function(){this.x = this.x - 5, this.y = this.y - 5},

  draw: function()
  {
    gameCanvasContext.fillStyle = this.color;
    gameCanvasContext.fillRect(this.x,this.y, this.width,this.height);
  }
}

testGame2.updateEverythingInTheGame = function()
{
  testGame2.sprite.update();
}

testGame2.drawEverythingInTheGame = function()
{
  testGame2.background.draw();
  testGame2.sprite.draw();
}

testGame2.advanceGameFrame = function()
{
  testGame2.updateEverythingInTheGame();
  testGame2.drawEverythingInTheGame();
}

function GameClassManager()
{
  this.currentGame = undefined;
  this.loadCurrentGame = function(gameToLoad)
  {
    this.currentGame = gameToLoad;
  }
}

// let gameClassManager = new GameClassManager();

// var gameCanvas, gameCanvasContext, statsCanvas, statsCanvasContext, runnerGame;
// window.onload = function()
// {
//   gameCanvas = document.getElementById("gameCanvas");
//   gameCanvasContext = gameCanvas.getContext('2d');

//   let randomNumber = Math.random();
//   if (randomNumber < 0.5)
//   {
//     console.log('should load game 1');
//     gameClassManager.loadCurrentGame(testGame1);
//   } else {
//     console.log('should load game 2');
//     gameClassManager.loadCurrentGame(testGame2);
//   }

//   setInterval(gameClassManager.currentGame.advanceGameFrame, gameClassManager.currentGame.gameFrameRate);
// }
