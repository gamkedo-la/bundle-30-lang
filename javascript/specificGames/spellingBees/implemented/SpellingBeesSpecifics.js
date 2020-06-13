spellingBeesGameClass.prototype = new GameClass();
function spellingBeesGameClass()
{
  this.name = 'spelling bees game';
  this.playerCharacter = undefined;

  this.background = undefined;
  this.backgroundMusic = new MusicTrack('audio/backgroundTracks/flyingBeeSong.mp3', 14.1);

  this.drawTransitionText = function()
  {
    customFontFillText(['Spell the Words!', symbolExclamationPointImage], 60,30, 75,50);
    customFontFillText([upArrowImage, ' ', symbolEqualsImage, ' Move up'], 30,15, 210,200);
    customFontFillText([rightArrowImage, ' ', symbolEqualsImage, ' Move right'], 30,15, 350,350);
    customFontFillText([downArrowImage, ' ', symbolEqualsImage, ' Move down'], 30,15, 200,500);
    customFontFillText([leftArrowImage, ' ', symbolEqualsImage, ' Move left'], 30,15, 50,350);
  }

  this.beesManager = undefined;

  this.wordsManager = undefined;

  this.initialize = function()
  {
    this.playerCharacter = new BeeCatcher();
    this.background = new SpellingBeesBackground();
    this.background.initializeBoxes();

    this.wordsManager = new WordsManager();
    this.wordsManager.initialize();
    this.wordsManager.defineCurrentAnswer();

    this.beesManager = new BeesManager();
    this.beesManager.initialize();
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
    this.beesManager.updateBees();
    this.playerCharacter.checkForBeeCollisions();
  }

  this.draw = function()
  {
    this.background.draw();
    this.background.drawBoxes();
    this.playerCharacter.draw();
    this.beesManager.drawBees();
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
  this.image = 'images\\Backgrounds\\spellingBee.png';
  this.draw = function()
  {
    drawFromSheet(this.image, 0,0, gameCanvas.width,gameCanvas.height);
    //gameCanvasContext.drawImage(this.image, 0,0, gameCanvas.width,gameCanvas.height);
  }

  this.playingFieldLeftXBoundary = 75;
  this.playingFieldRightXBoundary = 570;
  this.playingFieldTopYBoundary = 75;
  this.playingFieldBottomYBoundary = 625;

  this.arrayOfBoxes = [];

  this.initializeBoxes = function()
  {
    this.box1 = new Box(100);
    this.box2 = new Box(250);
    this.box3 = new Box(400);

    this.arrayOfBoxes.push(this.box1);
    this.arrayOfBoxes.push(this.box2);
    this.arrayOfBoxes.push(this.box3);
  }

  this.currentBoxToBeFilledIndex = 0;
  this.drawBoxes = function()
  {
    for (let i = 0; i < this.arrayOfBoxes.length; i++)
    {
      this.arrayOfBoxes[i].draw();
    }
  }
}

function Box(x)
{
  this.x = x;
  this.y = 5;

  this.width = 150;
  this.height = 65;

  this.letter = undefined;

  this.draw = function()
  {
    gameCanvasContext.save();
    gameCanvasContext.strokeStyle = 'brown';
    gameCanvasContext.lineWidth = 7;
    gameCanvasContext.strokeRect(this.x,this.y, this.width,this.height);
    gameCanvasContext.stroke();
    gameCanvasContext.restore();
  }
}

const spellingBeesGame = new spellingBeesGameClass();
