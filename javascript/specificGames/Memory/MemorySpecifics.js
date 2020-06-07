memoryGameClass.prototype = new GameClass();
function memoryGameClass()
{
  this.name = 'memory game';

  this.backgroundMusic = undefined;

  this.titleScreenData =
  [
    {name: "Memory", fontSize: 27, spacing: 15, x: 122, y: 385}
  ];

  this.LETTER_COLOR = 'lightCoral';
  this.textAnswerFontSize = '30';
  this.textAnswerFontStyle = this.textAnswerFontSize + 'px Helvetica';

  this.simon = undefined;
  this.phonicClassManager = undefined;

  this.initialize = function()
  {
    this.simon = new Simon();
    this.simon.currentPhonicToPlayIndex = 0;
    this.phonicClassManager = new PhonicClassManager();
    this.phonicClassManager.initializeArraysOfPhonics();
    this.phonicClassManager.setCurrentLanguageArray(languageSelectionScreen.languageNum);
    this.phonicClassManager.populateTemporaryArrayOfPhonics();
  }

  this.startGameSpecialCode = function()
  {
    this.simon.grabLeftAndRightPhonics();
    this.simon.chooseCorrectPhonicAndAddToArray();
    this.simon.playPatternOfPhonics();
    console.log('memoryGame.simon.currentPatternOfCorrectPhonics: ' + memoryGame.simon.currentPatternOfCorrectPhonics);

  }

  this.draw = function()
  {
    this.drawBackground();
    this.simon.draw();
  }

  this.drawBackground = function()
  {
    gameCanvasContext.fillStyle = 'black';
    gameCanvasContext.fillRect(0,0, gameCanvas.width,gameCanvas.height);
  }

  this.handleClick = function()
  {
    this.simon.handleClick();
  }
}

const memoryGame = new memoryGameClass();
