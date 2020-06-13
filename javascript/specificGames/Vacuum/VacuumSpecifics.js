vacuumGameClass.prototype = new GameClass();
function vacuumGameClass()
{
  this.name = 'vacuum game';
  this.background = undefined;
  this.backgroundMusic = undefined;
  this.playerCharacter = undefined;

  this.defineAndInitializePlayerCharacter = function()
  {
    this.background = new VacuumBackground();
    this.playerCharacter = new Vacuum();
  }

  this.drawTransitionText = function()
  {
    customFontFillText(['Suck up the answers', symbolExclamationPointImage], 60,30, 25,50);
    customFontFillText([upArrowImage, ' ', symbolEqualsImage, ' Move up'], 30,15, 210,200);
    customFontFillText([rightArrowImage, ' ', symbolEqualsImage, ' Move right'], 30,15, 350,350);
    customFontFillText([downArrowImage, ' ', symbolEqualsImage, ' Move down'], 30,15, 200,500);
    customFontFillText([leftArrowImage, ' ', symbolEqualsImage, ' Move left'], 30,15, 50,350);
  }

  this.phonicClassManager = undefined;

  this.startGameSpecialCode = function()
  {
    gameClassManager.currentGame.phonicClassManager.currentCorrectPhonic.promptAudio.sfx.play();
  }

  this.textAnswerFontSize = '30';
  this.textAnswerFontStyle = this.textAnswerFontSize + 'px Helvetica';
	this.titleScreenData =
  [
	  {name: "Vacuum", fontSize: 25, spacing: 12, x: 327, y: 580}
	];

  this.initialize = function()
  {
    this.defineAndInitializePlayerCharacter();
    this.phonicClassManager = new PhonicClassManager();
    this.phonicClassManager.initializeArraysOfPhonics();
    this.phonicClassManager.setCurrentLanguageArray(languageSelectionScreen.languageNum);
    this.phonicClassManager.populateTemporaryArrayOfPhonics();
    this.phonicClassManager.chooseCorrectPhonic();
    this.defineXAndYCoordinatesForLetters();
  }

  this.draw = function()
  {
    this.background.draw();
    this.playerCharacter.draw();
    this.drawLetters();
  }

  this.update = function()
  {
    this.playerCharacter.move();
    this.handleCollisions();
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

  this.defineXAndYCoordinatesForLetters = function()
  {
    for (let temporaryArrayOfPhonicsIndex = 0; temporaryArrayOfPhonicsIndex < this.phonicClassManager.temporaryArrayOfPhonics.length; temporaryArrayOfPhonicsIndex++)
    {
      let currentPhonic = this.phonicClassManager.temporaryArrayOfPhonics[temporaryArrayOfPhonicsIndex];
      currentPhonic.x = getRandomArbitrary(100,gameCanvas.width - 100);
      currentPhonic.y = getRandomArbitrary(100,gameCanvas.height - 100);

      while (currentPhonic.x + 30 > this.playerCharacter.x && currentPhonic.x < this.playerCharacter.x + this.playerCharacter.width &&
          currentPhonic.y + 30 > this.playerCharacter.y && currentPhonic.y < this.playerCharacter.y + this.playerCharacter.height)
          {
            currentPhonic.x = getRandomArbitrary(100,gameCanvas.width - 100);
            currentPhonic.y = getRandomArbitrary(100,gameCanvas.height - 100);
          }
    }
  }

  this.drawLetters = function()
  {
    for (let temporaryArrayOfPhonicsIndex = 0; temporaryArrayOfPhonicsIndex < this.phonicClassManager.temporaryArrayOfPhonics.length; temporaryArrayOfPhonicsIndex++)
      {
        gameCanvasContext.fillStyle = 'black';
        gameCanvasContext.font = '30px Helvetica';
        gameCanvasContext.fillText
        (
          this.phonicClassManager.temporaryArrayOfPhonics[temporaryArrayOfPhonicsIndex].textAssociation,
          this.phonicClassManager.temporaryArrayOfPhonics[temporaryArrayOfPhonicsIndex].x,
          this.phonicClassManager.temporaryArrayOfPhonics[temporaryArrayOfPhonicsIndex].y
        )
      }
  }

  this.handleCollisions = function()
  {
    for (let temporaryArrayOfPhonicsIndex = 0; temporaryArrayOfPhonicsIndex < this.phonicClassManager.temporaryArrayOfPhonics.length; temporaryArrayOfPhonicsIndex++)
    {
      let currentPhonic = this.phonicClassManager.temporaryArrayOfPhonics[temporaryArrayOfPhonicsIndex];
      if (currentPhonic.x + 30 > this.playerCharacter.x && currentPhonic.x < this.playerCharacter.x + this.playerCharacter.width &&
          currentPhonic.y + 30 > this.playerCharacter.y && currentPhonic.y < this.playerCharacter.y + this.playerCharacter.height)
          {
            if (currentPhonic.isTheCorrectChoice === true)
            {
              genAudio.positive.play();
            }
            else if (currentPhonic.isTheCorrectChoice === false)
            {
              genAudio.negative.play();
            }
            this.phonicClassManager.temporaryArrayOfPhonics = [];
            this.phonicClassManager.populateTemporaryArrayOfPhonics();
            this.phonicClassManager.chooseCorrectPhonic();
            this.defineXAndYCoordinatesForLetters();
            gameClassManager.currentGame.phonicClassManager.currentCorrectPhonic.promptAudio.sfx.play();
          }
    }
  }
}

const vacuumGame = new vacuumGameClass();

function VacuumBackground()
{
  this.image = 'images\\Backgrounds\\vacuumBackground.png';

  this.draw = function()
  {
    drawFromSheet(this.image, 0,0, gameCanvas.width,gameCanvas.height);
    //gameCanvasContext.drawImage(this.image, 0,0, gameCanvas.width,gameCanvas.height);
  }
}
