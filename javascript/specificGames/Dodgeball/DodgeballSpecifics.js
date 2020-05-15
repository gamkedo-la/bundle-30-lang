dodgeballGameClass.prototype = new GameClass();
function dodgeballGameClass()
{
  this.name = 'dodge ball game';

  this.playerCharacter = undefined;

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
    console.log('throw the balls after timeout... from parent game, is being called');
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
