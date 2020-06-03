spellingBeesGameClass.prototype = new GameClass();
function spellingBeesGameClass()
{
  this.name = 'spelling bees game';
  this.playerCharacter = undefined;

  this.background = undefined;

  this.beesManager = undefined;

  this.wordsManager = undefined;

  this.initialize = function()
  {
    this.playerCharacter = new BeeCatcher();
    this.background = new SpellingBeesBackground();
  }

  this.LETTER_COLOR = 'black';
  this.textAnswerFontSize = '30';
  this.textAnswerFontStyle = this.textAnswerFontSize + 'px Helvetica';

  this.titleScreenData =
  [
	  {name: 'Spelling', fontSize: 25, spacing: 12, x:418, y: 560},{name: 'Bees', fontSize: 25, spacing: 12, x:436, y: 598}
	];

  this.update = function()
  {
    this.playerCharacter.move();
  }

  this.draw = function()
  {
    this.background.draw();
    this.playerCharacter.draw();
  }

  this.handleLeftArrowDown = function()
	{
		inputManager.leftArrowIsBeingHeld = true;
	}

	this.handleUpArrowDown = function()
	{
		inputManager.upArrowIsBeingHeld = true;
	}

	this.handleRightArrowDown = function()
	{
		inputManager.rightArrowIsBeingHeld = true;
	}

	this.handleDownArrowDown = function()
	{
		inputManager.downArrowIsBeingHeld = true;
	}

  this.handleLeftArrowUp = function()
	{
		inputManager.leftArrowIsBeingHeld = false;
	}

	this.handleUpArrowUp = function()
	{
		inputManager.upArrowIsBeingHeld = false;
	}

	this.handleRightArrowUp = function()
	{
		inputManager.rightArrowIsBeingHeld = false;
	}

	this.handleDownArrowUp = function()
	{
		inputManager.downArrowIsBeingHeld = false;
	}

}

function SpellingBeesBackground()
{
  this.image = spellingBeesBackgroundImage;
  this.draw = function()
  {
    gameCanvasContext.drawImage(this.image, 0,0, gameCanvas.width,gameCanvas.height);
  }
}

const spellingBeesGame = new spellingBeesGameClass();
