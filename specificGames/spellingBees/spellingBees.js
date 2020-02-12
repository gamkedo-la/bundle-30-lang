function SpellingBeesGame()
{
  this.canvas = undefined;
  this.canvasContext = undefined;

  this.background = undefined;

  this.beeCatcher = undefined;

  this.bee1 = undefined;

  this.initializeCanvas = function()
  {
    this.canvas = document.getElementById("spellingBeesCanvas");
    this.canvasContext = spellingBeesGame.canvas.getContext('2d');
  }

  this.update = function()
  {

  }

  this.drawEverything = function()
  {
    this.background.draw();
    this.beeCatcher.draw();
    this.bee1.draw();
  }

  this.initialize = function()
  {
    this.initializeCanvas();
    this.beeCatcher.initialize();
    this.bee1.initialize();
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
  spellingBeesGame.drawEverything();
}
