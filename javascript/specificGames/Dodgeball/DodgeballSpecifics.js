dodgeballGameClass.prototype = new GameClass();
function dodgeballGameClass()
{
  this.name = 'dodge ball game';
  this.backgroundMusic = new MusicTrack('audio/backgroundTracks/dodgeballWeebleWobble(3).mp3', 21.2);
  this.playerCharacter = undefined;

  this.drawTransitionText = function()
  {
    customFontFillText(['Catch the '], 25,30, gameCanvas.width/2 - 150,30);
    customFontFillText(['correct answer!', symbolExclamationPointImage], 25,30, gameCanvas.width/2 - 250,60);
    customFontFillText(['Avoid the wrong ones!', symbolExclamationPointImage], 25,30, 0,90);
    customFontFillText([upArrowImage, ' ', symbolEqualsImage, ' Move up'], 30,15, 210,200);
    customFontFillText([rightArrowImage, ' ', symbolEqualsImage, ' Move right'], 30,15, 350,350);
    customFontFillText([downArrowImage, ' ', symbolEqualsImage, ' Move down'], 30,15, 200,500);
    customFontFillText([leftArrowImage, ' ', symbolEqualsImage, ' Move left'], 30,15, 50,350);
  }

  this.NPC1 = undefined;
  this.NPC2 = undefined;
  this.NPC3 = undefined;
  this.NPC4 = undefined;
  this.arrayOfNPCs = [];

  this.dodgeball1 = undefined;
  this.dodgeball2 = undefined;
  this.dodgeball3 = undefined;
  this.dodgeball4 = undefined;
  this.arrayOfDodgeballs = [];

  this.phonicClassManager = undefined;

  this.background = new DodgeballBackground();

  this.startGameSpecialCode = function()
  {
    gameClassManager.currentGame.throwTheBallsAfterTimeouts();
    gameClassManager.currentGame.phonicClassManager.currentCorrectPhonic.promptAudio.sfx.play();
    gameAudio.dodgeballHit = new sfxOneShot('audio/V/ballHit2.mp3', 0.75);
    gameAudio.dodgeballCatch = new sfxOneShot('audio/V/ballCatch2.mp3', 0.75);
    gameAudio.dodgeballThrow = new sfxOneShot('audio/V/ballMiss.mp3', 0.75);
  }

  this.defineAndInitializePlayerCharacter = function()
  {
    this.playerCharacter = new DodgeballPlayerCharacter();

    let oscillationVelocityYForBallAndCharacter1 = getRandomArbitrary(-0.05,0.05);
    let oscillationVelocityXForBallAndCharacter2 = getRandomArbitrary(-0.05,0.05);
    let oscillationVelocityYForBallAndCharacter3 = getRandomArbitrary(-0.05,0.05);
    let oscillationVelocityXForBallAndCharacter4 = getRandomArbitrary(-0.05,0.05);

    this.NPC1 = new DodgeballNPC(russianDollImage2, 0,gameCanvas.height/2 - gameCanvas.height/20, undefined,oscillationVelocityYForBallAndCharacter1);//left side of screen
    this.NPC2 = new DodgeballNPC(russianDollImage3, gameCanvas.width/2 - gameCanvas.width/24,0,  oscillationVelocityXForBallAndCharacter2,undefined);//top center
    this.NPC3 = new DodgeballNPC(russianDollImage4, gameCanvas.width - gameCanvas.width/12,gameCanvas.height/2 - gameCanvas.height/20, undefined,oscillationVelocityYForBallAndCharacter3);//right side
    this.NPC4 = new DodgeballNPC(russianDollImage5, gameCanvas.width/2 - gameCanvas.width/24,gameCanvas.height - gameCanvas.height/10,  oscillationVelocityXForBallAndCharacter4,undefined);//bottom center
    this.arrayOfNPCs.push(this.NPC1);
    this.arrayOfNPCs.push(this.NPC2);
    this.arrayOfNPCs.push(this.NPC3);
    this.arrayOfNPCs.push(this.NPC4);

    this.dodgeball1 = new ActualDodgeball('1', this.NPC1.x + this.NPC1.width/2,this.NPC1.y + this.NPC1.height/2, undefined,oscillationVelocityYForBallAndCharacter1);
    this.dodgeball2 = new ActualDodgeball('2', this.NPC2.x + this.NPC2.width/2,this.NPC2.y + this.NPC2.height/2, oscillationVelocityXForBallAndCharacter2,undefined);
    this.dodgeball3 = new ActualDodgeball('3', this.NPC3.x,this.NPC3.y + this.NPC3.height/2, undefined,oscillationVelocityYForBallAndCharacter3);
    this.dodgeball4 = new ActualDodgeball('4', this.NPC4.x + this.NPC4.width/2,this.NPC4.y + this.NPC4.height/4, oscillationVelocityXForBallAndCharacter4,undefined);
    this.arrayOfDodgeballs.push(this.dodgeball1);
    this.arrayOfDodgeballs.push(this.dodgeball2);
    this.arrayOfDodgeballs.push(this.dodgeball3);
    this.arrayOfDodgeballs.push(this.dodgeball4);
  }

  this.textAnswerFontSize = '30';
  this.textAnswerFontStyle = this.textAnswerFontSize + 'px Helvetica';
	this.titleScreenData =
  [
	  {name: "Dodgeball", fontSize: 25, spacing: 12, x: 22, y: 480}
	];


  this.initialize = function()
  {
    this.defineAndInitializePlayerCharacter();
    this.phonicClassManager = new PhonicClassManager();
    this.phonicClassManager.initializeArraysOfPhonics();
    this.phonicClassManager.setCurrentLanguageArray(languageSelectionScreen.languageNum);
    this.phonicClassManager.populateTemporaryArrayOfPhonics();
    this.phonicClassManager.chooseCorrectPhonic();
    this.phonicClassManager.assignPhonicsToDodgeballs();
    this.jumpDistanceX = gameCanvas.width*0.2;
    this.jumpDistanceY = gameCanvas.height*0.3;
  }

  this.draw = function()
  {
    this.background.draw();


    this.playerCharacter.draw();

    for (let i = 0; i < this.arrayOfNPCs.length; i++)
    {
      this.arrayOfNPCs[i].draw();
    }
    for (let i = 0; i < this.arrayOfDodgeballs.length; i++)
    {
      this.arrayOfDodgeballs[i].draw();
    }
  }

  this.throwTheBallsAfterTimeouts = function()
  {
    throwTheBallAfterTimeout(this.arrayOfDodgeballs[0]);
    throwTheBallAfterTimeout(this.arrayOfDodgeballs[1]);
    throwTheBallAfterTimeout(this.arrayOfDodgeballs[2]);
    throwTheBallAfterTimeout(this.arrayOfDodgeballs[3]);
  }

  this.update = function()
  {

    this.playerCharacter.updateAngle();
    this.playerCharacter.updatePivotsForWeebleWobble();
    this.playerCharacter.move();

    for (let i = 0; i < this.arrayOfDodgeballs.length; i++)
    {
      this.arrayOfDodgeballs[i].move();
      this.arrayOfDodgeballs[i].detectCollisionWithPlayer();
      this.arrayOfDodgeballs[i].detectOffScreen();
    }

    this.playerCharacter.updateCenterCoordinates();

    for (let i = 0; i < this.arrayOfNPCs.length; i++)
    {
      this.arrayOfNPCs[i].updateAngle();
      this.arrayOfNPCs[i].updateCenterCoordinates();
      this.arrayOfNPCs[i].move();
      this.arrayOfNPCs[i].updatePivots();
    }

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

  this.jumpDistanceX = undefined;
  this.jumpDistanceY = undefined;
  this.handleSpaceBarDown = function()//jump/teleport
  {
    if (inputManager.leftArrowIsBeingHeld && !inputManager.upArrowIsBeingHeld &&
        !inputManager.downArrowIsBeingHeld)//walking left
        {
          this.playerCharacter.x -= this.jumpDistanceX;
        }
    else if (inputManager.rightArrowIsBeingHeld && !inputManager.upArrowIsBeingHeld &&
        !inputManager.downArrowIsBeingHeld)//walking right
        {
          this.playerCharacter.x += this.jumpDistanceX;
        }
    else if (inputManager.upArrowIsBeingHeld && !inputManager.rightArrowIsBeingHeld &&
            !inputManager.leftArrowIsBeingHeld)//walking up
        {
          this.playerCharacter.y -= this.jumpDistanceY;
        }
    else if (inputManager.downArrowIsBeingHeld && !inputManager.rightArrowIsBeingHeld &&
            !inputManager.leftArrowIsBeingHeld)//walking down
        {
          this.playerCharacter.y += this.jumpDistanceY;
        }
    else if (inputManager.downArrowIsBeingHeld && inputManager.rightArrowIsBeingHeld)//walking down/right
        {
          this.playerCharacter.x += this.jumpDistanceX;
          this.playerCharacter.y += this.jumpDistanceY;
        }
    else if (inputManager.downArrowIsBeingHeld && inputManager.leftArrowIsBeingHeld)//walking down/left
        {
          this.playerCharacter.x -= this.jumpDistanceX;
          this.playerCharacter.y += this.jumpDistanceY;
        }
    else if (inputManager.upArrowIsBeingHeld && inputManager.rightArrowIsBeingHeld)//walking up/right
        {
          this.playerCharacter.x += this.jumpDistanceX;
          this.playerCharacter.y -= this.jumpDistanceY;
        }
    else if (inputManager.upArrowIsBeingHeld && inputManager.leftArrowIsBeingHeld)//walking up/left
        {
          this.playerCharacter.x -= this.jumpDistanceX;
          this.playerCharacter.y -= this.jumpDistanceY;
        }
    else {
      return;
    }
  }
}

const dodgeballGame = new dodgeballGameClass();

function DodgeballBackground()
{
  this.image = dodgeBallBackgroundImage;

  this.draw = function()
  {
    gameCanvasContext.drawImage(this.image, 150,70,700,630, 0,0,gameCanvas.width,gameCanvas.height);
  }
}
