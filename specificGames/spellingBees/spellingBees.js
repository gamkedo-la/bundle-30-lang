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
    if (!spellingBeesGame.pauseButton.isEngaged && !spellingBeesGame.splashScreen.shouldBeSplashing)
    {
      if (spellingBeesGame.audioPrompter.shouldBeDrawingAPrompt)
      {
        spellingBeesGame.audioPrompter.updatePromptImage();
      }
      this.beesManager.updateBees();
      this.beeCatcher.moveWhenAppropriate();
      this.beeCatcher.checkForBeeCollisions();
    }
  }

  this.drawEverything = function()
  {
    if (spellingBeesGame.splashScreen.shouldBeSplashing)
    {
      spellingBeesGame.splashScreen.draw();
    }
    else
    {
      if (spellingBeesGame.audioPrompter.shouldBeDrawingAPrompt)
      {
        spellingBeesGame.audioPrompter.drawThePrompt();
      }
      this.background.draw();
      this.beeCatcher.draw();
      this.beesManager.drawBees();
      this.beeBoxes.draw();
    }
  }

  this.advanceGameFrame = function()
  {
    spellingBeesGame.updateEverything();
    spellingBeesGame.drawEverything();
  }

  this.initialize = function()
  {
    this.initializeCanvas();
    spellingBeesGame.splashScreen = new SplashScreen();
    this.beeCatcher.initialize();
    this.beesManager.initialize();
    this.background.initialize();
    spellingBeesGame.beeBoxes = new BeeBoxes();
    spellingBeesGame.caughtBeesManager = new CaughtBeesManager();
    spellingBeesGame.audioPrompter = new AudioPrompter();
    spellingBeesGame.audioTagsManager = new AudioTagsManager();
    this.beeBoxes.initialize();
    spellingBeesGame.answersManager = new AnswersManager();
    spellingBeesGame.answersManager.defineCurrentAnswer();
    spellingBeesGame.audioPrompter.loadCurrentAudioPrompt();
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

  document.addEventListener('keydown', spellingBeesGame.inputManager.handlePlayerKeyDowns);
  document.addEventListener('keyup', spellingBeesGame.inputManager.handlePlayerKeyUps);
  spellingBeesGame.canvas.addEventListener('click', spellingBeesGame.inputManager.handleCanvasClick);
}
