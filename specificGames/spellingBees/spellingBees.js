function SpellingBeesGame()
{
  this.canvas = undefined;
  this.canvasContext = undefined;

  this.background = undefined;

  this.beeCatcher = undefined;

  this.beesManager = undefined;

  this.wordsManager = undefined;

  this.initializeCanvas = function()
  {
    this.canvas = document.getElementById("spellingBeesCanvas");
    this.canvasContext = spellingBeesGame.canvas.getContext('2d');
  }

  this.updateEverything = function()
  {
    this.beesManager.updateBees();
  }

  this.drawEverything = function()
  {
    this.background.draw();
    this.beeCatcher.draw();
    this.beesManager.drawBees();
  }

  this.advanceGameFrame = function()
  {
    spellingBeesGame.updateEverything();
    spellingBeesGame.drawEverything();
  }

  this.initialize = function()
  {
    this.initializeCanvas();
    this.beeCatcher.initialize();
    this.beesManager.initialize();
    this.background.initialize();
  }
}

let spellingBeesGame = new SpellingBeesGame();

function getRandomIntInclusive(min, max)
{
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}


window.onload = function()
{
  spellingBeesGame.initialize();
  setInterval(spellingBeesGame.advanceGameFrame,1000/30);
}
