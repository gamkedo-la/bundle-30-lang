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

    this.NPC1 = new DodgeballNPC("images\\sprites\\dodgeBall\\Player2.png", 0,gameCanvas.height/2 - gameCanvas.height/20, undefined,oscillationVelocityYForBallAndCharacter1);//left side of screen
    this.NPC2 = new DodgeballNPC("images\\sprites\\dodgeBall\\Player3.png", gameCanvas.width/2 - gameCanvas.width/24,0,  oscillationVelocityXForBallAndCharacter2,undefined);//top center
    this.NPC3 = new DodgeballNPC("images\\sprites\\dodgeBall\\Player4.png", gameCanvas.width - gameCanvas.width/12,gameCanvas.height/2 - gameCanvas.height/20, undefined,oscillationVelocityYForBallAndCharacter3);//right side
    this.NPC4 = new DodgeballNPC("images\\sprites\\dodgeBall\\Player5.png", gameCanvas.width/2 - gameCanvas.width/24,gameCanvas.height - gameCanvas.height/10,  oscillationVelocityXForBallAndCharacter4,undefined);//bottom center
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
  this.image = "images\\Backgrounds\\dodgeball.png";

  this.draw = function()
  {
    drawFromSheet(this.image, 0,0, gameCanvas.width,gameCanvas.height);
    //gameCanvasContext.drawImage(this.image, 150,70,700,630, 0,0,gameCanvas.width,gameCanvas.height);
  }
}

function DodgeballPlayerCharacter()
{
  this.image = "images\\sprites\\dodgeBall\\Player1.png";

  this.width = gameCanvas.width/12;
  this.height = gameCanvas.height/10;

  this.x = gameCanvas.width/2 - this.width/2;
  this.y = gameCanvas.height/2 - this.height/2;

  this.centerX = this.x + this.width/2;
  this.centerY = this.x + this.height/2;

  this.updateCenterCoordinates = function()
  {
    this.centerX = this.x + this.width/2;
    this.centerY = this.y + this.height/2;
  }

  this.pivotX = this.x + this.width/2;
  this.pivotY = this.y + this.height*0.9;

  this.angle = getRandomIntInclusive(-10,10);

  this.draw = function()
  {
    let angleInRadians = (this.angle-90) * 0.01745;

    drawFromSheet(this.image, this.x,this.y, this.width,this.height, undefined, angleInRadians,this.pivotX,this.pivotY);
    // gameCanvasContext.save();
    // gameCanvasContext.translate(this.pivotX,this.pivotY);
    // gameCanvasContext.rotate(angleInRadians);
    // gameCanvasContext.translate(-this.pivotX,-this.pivotY);
    // gameCanvasContext.drawImage(this.image, this.x,this.y, this.width,this.height);
    // gameCanvasContext.restore();
  }

  this.velocity = 7;

  this.weebleWobbleRate = 2.5;
  this.updateAngle = function()
  {
    this.angle += this.weebleWobbleRate;
    if (this.angle > 14 || this.angle < -14)
    {
      this.weebleWobbleRate *= -1;
    }
  }

  this.updatePivotsForWeebleWobble = function()
  {
    this.pivotX = this.x + this.width/2;
    this.pivotY = this.y + this.height*0.9;
  }

  this.move = function()
	{
		//console.log('inside space shooter movePlayer');
		if (inputManager.upArrowIsBeingHeld)
		{
			gameClassManager.currentGame.playerCharacter.y -= this.velocity;
		}
		if (inputManager.rightArrowIsBeingHeld)
		{
			gameClassManager.currentGame.playerCharacter.x += this.velocity;
		}
		if (inputManager.downArrowIsBeingHeld)
		{
			gameClassManager.currentGame.playerCharacter.y += this.velocity;
		}
		if (inputManager.leftArrowIsBeingHeld)
		{
			gameClassManager.currentGame.playerCharacter.x -= this.velocity;
		}
		// this.handleShipAtCanvasBoundaries();
	};
}

function DodgeballNPC(image, x,y, oscillationVelocityX,oscillationVelocityY)
{
  this.image = image;

  this.width = gameCanvas.width/12;
  this.height = gameCanvas.height/10;

  this.x = x;
  this.y = y;

  this.pivotX = this.x + this.width/2;
  this.pivotY = this.y + this.height*0.9;

  this.oscillationVelocityX = oscillationVelocityX;
  this.oscillationVelocityY = oscillationVelocityY;

  this.angle = getRandomIntInclusive(-10,10);

  this.draw = function()
  {
    let angleInRadians = (this.angle-90) * 0.01745;

    drawFromSheet(this.image, this.x,this.y, this.width,this.height, undefined, angleInRadians,this.pivotX,this.pivotY);
    // gameCanvasContext.save();
    // gameCanvasContext.translate(this.pivotX,this.pivotY);
    // gameCanvasContext.rotate(angleInRadians);
    // gameCanvasContext.translate(-this.pivotX,-this.pivotY);
    // gameCanvasContext.drawImage(this.image, this.x,this.y, this.width,this.height);
    // gameCanvasContext.restore();
  }

  this.weebleWobbleRate = 2.5;
  this.updateAngle = function()
  {
    this.angle += this.weebleWobbleRate;
    if (this.angle > 14 || this.angle < -14)
    {
      this.weebleWobbleRate *= -1;
    }
  }


  this.circlePathRadius = 250;
  this.circleAngleInRadians = 0;
  this.centerX = this.x + this.width/2;
  this.centerY = this.y + this.height/2;

  this.move = function()
  {
    if (this.oscillationVelocityX !== undefined)
    {
      this.circleAngleInRadians += this.oscillationVelocityX;
      this.x = x + Math.cos(this.circleAngleInRadians)*200;
    }
    if (this.oscillationVelocityY !== undefined)
    {
      this.circleAngleInRadians += this.oscillationVelocityY;
      this.y = y + Math.sin(this.circleAngleInRadians)*200;
    }

  }

  this.updateCenterCoordinates = function()
  {
    this.centerX = this.x + this.width/2;
    this.centerY = this.y + this.height/2;
  }

  this.updatePivots = function()
  {
    this.pivotX = this.x + this.width/2;
    this.pivotY = this.y + this.height*0.9;
  }

  this.dodgeball = undefined;
}

function ActualDodgeball(number, startingX,startingY, oscillationVelocityX,oscillationVelocityY)
{
  this.number = number;
  this.image = "images\\sprites\\dodgeBall\\dodgeBall.png";

  this.x = startingX;
  this.y = startingY;

  this.startingX = startingX;
  this.startingY = startingY;

  this.oscillationVelocityX = oscillationVelocityX;
  this.oscillationVelocityY = oscillationVelocityY;

  this.width = gameCanvas.width/18;
  this.height = gameCanvas.height/18;

  this.phonicClass = undefined;

  this.draw = function()
  {
    drawFromSheet(this.image, this.x,this.y, this.width,this.height);
    //gameCanvasContext.drawImage(this.image, this.x,this.y, this.width,this.height);
    gameCanvasContext.fillStyle = 'white';
    gameCanvasContext.fillText(this.phonicClass.textAssociation, this.x + this.width/3,this.y + this.height*0.75);
  }

  this.velocityX = undefined;
  this.velocityY = undefined;
  this.deltaXFromPlayer = undefined;
  this.deltaYFromPlayer = undefined;
  this.angleFromPlayer = undefined;
  this.angleFromPlayerInRadians = undefined;
  this.calculateVelocitiesBetweenBallAndPlayer = function()
  {
    this.deltaXFromPlayer =  gameClassManager.currentGame.playerCharacter.centerX - this.x;
    this.deltaYFromPlayer =  gameClassManager.currentGame.playerCharacter.centerY - this.y;
    this.angleFromPlayerInRadians = Math.atan2(this.deltaYFromPlayer,this.deltaXFromPlayer);
    this.velocityX = 5 * Math.cos(this.angleFromPlayerInRadians);
    this.velocityY = 5 * Math.sin(this.angleFromPlayerInRadians);
  }

  this.isBeingThrown = false;
  this.circlePathRadius = 250;
  this.circleAngleInRadians = 0;
  this.move = function()
  {
    if (this.isBeingThrown === true)
    {
      this.x += this.velocityX;
      this.y += this.velocityY;
    }
    else if (this.isBeingThrown === false)
    {
      let npc1 = gameClassManager.currentGame.arrayOfNPCs[0];
      let npc2 = gameClassManager.currentGame.arrayOfNPCs[1];
      let npc3 = gameClassManager.currentGame.arrayOfNPCs[2];
      let npc4 = gameClassManager.currentGame.arrayOfNPCs[3];

      if (this.number === '1')
      {
        this.x = npc1.x + npc1.width/2;
        this.y = npc1.y + npc1.height/2;
      }
      else if (this.number === '2')
      {
        this.x = npc2.x + npc2.width/2;
        this.y = npc2.y + npc2.height/2;
      }
      else if (this.number === '3')
      {
        this.x = npc3.x + npc3.width/2;
        this.y = npc3.y + npc3.height/2;
      }
      else if (this.number === '4')
      {
        this.x = npc4.x + npc4.width/2;
        this.y = npc4.y + npc4.height/4;
      }
    }
  }

  this.currentTimeoutLength = undefined;
  this.setRandomTimeoutLength = function()
  {
    this.currentTimeoutLength = getRandomArbitrary(0,2000);
  }


  this.throwTheBallAfterTimeout = function()
  {
    // this.setRandomTimeoutLength();
    setTimeout(this.toggleIsBeingThrown,5000);
  }

  this.detectCollisionWithPlayer = function()
  {
    let playerCharacter = gameClassManager.currentGame.playerCharacter;
    if (this.x < playerCharacter.x + playerCharacter.width && this.x + this.width > playerCharacter.x &&
        this.y < playerCharacter.y + playerCharacter.height && this.y + this.height > playerCharacter.y)
        {
          this.isBeingThrown = false;

          if (this.phonicClass.isTheCorrectChoice === true)
          {
            genAudio.playPositive();
            gameAudio.dodgeballCatch.play();
            amountCorrect++;
          }
          else if (this.phonicClass.isTheCorrectChoice === false)
          {
            genAudio.playNegative();
            gameAudio.dodgeballHit.play();
            amountIncorrect++;
          }


          gameClassManager.currentGame.phonicClassManager.setOrResetPhonicsOnDodgeballsAndPlayPromptAudio();
          for (let i = 0; i < gameClassManager.currentGame.arrayOfDodgeballs.length; i++)
          {
            gameClassManager.currentGame.arrayOfDodgeballs[i].x = gameClassManager.currentGame.arrayOfDodgeballs[i].startingX;
            gameClassManager.currentGame.arrayOfDodgeballs[i].y = gameClassManager.currentGame.arrayOfDodgeballs[i].startingY;
            gameClassManager.currentGame.arrayOfDodgeballs[i].isBeingThrown = false;
            gameClassManager.currentGame.throwTheBallsAfterTimeouts();
          }


        }

   }

   this.wentOffScreenThisPromptingRound = false;
   this.detectOffScreen = function()
   {
     if (this.x > gameCanvas.width || this.x + this.width < 0 || this.y > gameCanvas.height || this.y - this.height < -5)
     {
       this.x = startingX;
       this.y = startingY;
       this.isBeingThrown = false;
       this.wentOffScreenThisPromptingRound = true;
     }

     let numberOfBallsThatWentOffScreen;
     for (let i = 0; i < gameClassManager.currentGame.arrayOfDodgeballs.length; i++)
     {
       if (gameClassManager.currentGame.arrayOfDodgeballs[i].wentOffScreenThisPromptingRound === true)
       {
         numberOfBallsThatWentOffScreen++;
       }
     }
     if (numberOfBallsThatWentOffScreen === 4)
     {
       gameClassManager.currentGame.phonicClassManager.setOrResetPhonicsOnDodgeballsAndPlayPromptAudio();
       gameClassManager.currentGame.arrayOfDodgeballs[i].x = gameClassManager.currentGame.arrayOfDodgeballs[i].startingX;
       gameClassManager.currentGame.arrayOfDodgeballs[i].y = gameClassManager.currentGame.arrayOfDodgeballs[i].startingY;
       gameClassManager.currentGame.arrayOfDodgeballs[i].isBeingThrown = false;
       genAudio.playNegative();
       gameClassManager.currentGame.throwTheBallsAfterTimeouts();
       for (let i = 0; i < gameClassManager.currentGame.arrayOfDodgeballs.length; i++)
       {
         gameClassManager.currentGame.arrayOfDodgeballs[i].wentOffScreenThisPromptingRound = false;
       }
     }
   }
}



function throwTheBallAfterTimeout(dodgeball)
{
  setTimeout(toggleIsBeingThrown,Math.random()*3000,dodgeball);
}

function toggleIsBeingThrown(dodgeball)
{
  if (dodgeball.isBeingThrown === false)
  {
    dodgeball.calculateVelocitiesBetweenBallAndPlayer();
    dodgeball.isBeingThrown = true;
    // gameAudio.dodgeballThrow.play();
  }
}

function PhonicClass(name, promptAudio,textAssociation)
{
  this.name = name;

  this.isTheCorrectChoice = false;

  this.promptAudio = promptAudio;
  this.textAssociation = textAssociation;
}

function PhonicClassManager()
{
  this.centralVietnameseStraightToneA = new PhonicClass('central vietnamese a', promptAudio.centralVietnameseStraightToneA,'a');
  this.centralVietnameseFallingToneA = new PhonicClass('central vietnamese à', promptAudio.centralVietnameseFallingToneA,'à');
  this.centralVietnameseRisingToneA = new PhonicClass('central vietnamese á', promptAudio.centralVietnameseRisingToneA,'á');
  this.centralVietnameseRisingStutterToneA = new PhonicClass('central vietnamese ã', promptAudio.centralVietnameseRisingStutterToneA,'ã');
  this.centralVietnameseLowStaccatoToneA = new PhonicClass('central vietnamese ạ', promptAudio.centralVietnameseLowStaccatoToneA,'ạ');
  this.centralVietnameseRisingHatAU = new PhonicClass('central vietnamese â', promptAudio.centralVietnameseRisingHatAU,'â');
  this.centralVietnameseStraightI = new PhonicClass('central vietnamese i', promptAudio.centralVietnameseStraightI, 'i');
  this.centralVietnameseHatE = new PhonicClass('central vietnamese hat e', promptAudio.centralVietnameseHatE, 'ê');
  this.centralVietnameseE = new PhonicClass('central vietnamese e', promptAudio.centralVietnameseE, 'e');
  this.centralVietnameseFallingI = new PhonicClass('central vietnamese falling i', promptAudio.centralVietnameseFallingI, 'ì');
  this.centralVietnameseU = new PhonicClass('central vietnamese u', promptAudio.centralVietnameseU, 'u');
  this.centralVietnameseHatO = new PhonicClass('central vietnamese ô', promptAudio.centralVietnameseHatO, 'ô');
  this.centralVietnameseO = new PhonicClass('central vietnamese ô', promptAudio.centralVietnameseO, 'o');
  this.centralVietnameseQuestionU = new PhonicClass('central vietnamese ư', promptAudio.centralVietnameseQuestionU, 'ư');
  this.centralVietnameseQuestionO = new PhonicClass('central vietnamese ơ', promptAudio.centralVietnameseQuestionO, 'ơ');
  this.centralVietnameseFallingE = new PhonicClass('central vietnamese è', promptAudio.centralVietnameseFallingE, 'è');
  this.centralVietnameseFallingO = new PhonicClass('central vietnamese ò', promptAudio.centralVietnameseFallingO, 'ò');
  this.centralVietnameseFallingU = new PhonicClass('central vietnamese ù', promptAudio.centralVietnameseFallingU, 'ù');
  this.centralVietnameseStutterE = new PhonicClass('central vietnamese ẽ', promptAudio.centralVietnameseStutterE, 'ẽ');
  this.centralVietnameseStutterI = new PhonicClass('central vietnamese ĩ', promptAudio.centralVietnameseStutterI, 'ĩ');
  this.centralVietnameseStutterO = new PhonicClass('central vietnamese õ', promptAudio.centralVietnameseStutterO, 'õ');
  this.centralVietnameseStutterU = new PhonicClass('central vietnamese ũ', promptAudio.centralVietnameseStutterU, 'ũ');
  this.centralVietnameseYoYoA = new PhonicClass('central vietnamese ả', promptAudio.centralVietnameseYoYoA, 'ả');
  this.centralVietnameseYoYoE = new PhonicClass('central vietnamese ẻ', promptAudio.centralVietnameseYoYoE, 'ẻ');
  this.centralVietnameseYoYoI = new PhonicClass('central vietnamese ỉ', promptAudio.centralVietnameseYoYoI, 'ỉ');
  this.centralVietnameseYoYoO = new PhonicClass('central vietnamese ỏ', promptAudio.centralVietnameseYoYoO, 'ỏ');
  this.centralVietnameseYoYoU = new PhonicClass('central vietnamese ủ', promptAudio.centralVietnameseYoYoU, 'ủ');
  this.centralVietnameseRisingE = new PhonicClass('central vietnamese é', promptAudio.centralVietnameseRisingE, 'é');
  this.centralVietnameseRisingO = new PhonicClass('central vietnamese ó', promptAudio.centralVietnameseRisingO, 'ó');
  this.centralVietnameseRisingI = new PhonicClass('central vietnamese í', promptAudio.centralVietnameseRisingI, 'í');
  this.centralVietnameseRisingU = new PhonicClass('central vietnamese ú', promptAudio.centralVietnameseRisingU, 'ú');
  this.centralVietnameseStaccatoE = new PhonicClass('central vietnamese ẹ', promptAudio.centralVietnameseStaccatoE, 'ẹ');
  this.centralVietnameseStaccatoO = new PhonicClass('central vietnamese ọ', promptAudio.centralVietnameseStaccatoO, 'ọ');
  this.centralVietnameseStaccatoI = new PhonicClass('central vietnamese ị', promptAudio.centralVietnameseStaccatoI, 'ị');
  this.centralVietnameseStaccatoU = new PhonicClass('central vietnamese ụ', promptAudio.centralVietnameseStaccatoU, 'ụ');
  this.centralVietnameseHookO = new PhonicClass('central vietnamese ơ', promptAudio.centralVietnameseHookO, 'ơ');
  this.centralVietnameseHalfPipeA = new PhonicClass('central vietnamese ă', promptAudio.centralVietnameseHalfPipeA, 'ă');
  this.centralVietnameseRisingHatA = new PhonicClass('central vietnamese ấ', promptAudio.centralVietnameseRisingHatA, 'ấ');
  this.centralVietnameseFallingHatA = new PhonicClass('central vietnamese ầ', promptAudio.centralVietnameseFallingHatA, 'ầ');
  this.centralVietnameseYoYoHatA = new PhonicClass('central vietnamese ẩ', promptAudio.centralVietnameseYoYoHatA, 'ẩ');
  this.centralVietnameseStutterHatA = new PhonicClass('central vietnamese ẫ', promptAudio.centralVietnameseStutterHatA, 'ẫ');
  this.centralVietnameseStaccatoHatA = new PhonicClass('central vietnamese ậ', promptAudio.centralVietnameseStaccatoHatA, 'ậ');
  this.centralVietnameseFallingHatE = new PhonicClass('central vietnamese ề', promptAudio.centralVietnameseFallingHatE, 'ề');
  this.centralVietnameseYoYoHatE = new PhonicClass('central vietnamese ể', promptAudio.centralVietnameseYoYoHatE, 'ể');
  this.centralVietnameseStutterHatE = new PhonicClass('central vietnamese ễ', promptAudio.centralVietnameseStutterHatE, 'ễ');
  this.centralVietnameseStaccatoHatE = new PhonicClass('central vietnamese ệ', promptAudio.centralVietnameseStaccatoHatE, 'ệ');
  this.centralVietnameseRisingHatO = new PhonicClass('central vietnamese ố', promptAudio.centralVietnameseRisingHatO, 'ố');
  this.centralVietnameseFallingHatO = new PhonicClass('central vietnamese ồ', promptAudio.centralVietnameseFallingHatO, 'ồ');
  this.centralVietnameseYoYoHatO = new PhonicClass('central vietnamese ổ', promptAudio.centralVietnameseYoYoHatO, 'ổ');
  this.centralVietnameseStutterHatO = new PhonicClass('central vietnamese ỗ', promptAudio.centralVietnameseStutterHatO, 'ỗ');

  //consonants
  this.centralVietnameseB = new PhonicClass('central vietnamese b', promptAudio.centralVietnameseB, 'b');
  this.centralVietnameseC = new PhonicClass('central vietnamese c', promptAudio.centralVietnameseC, 'c');
  this.centralVietnameseD = new PhonicClass('central vietnamese d', promptAudio.centralVietnameseD, 'd');
  this.centralVietnameseTh = new PhonicClass('central vietnamese th', promptAudio.centralVietnameseTh, 'th');
  this.centralVietnameseNg = new PhonicClass('central vietnamese ng', promptAudio.centralVietnameseNg, 'ng');
  this.centralVietnameseLinedD = new PhonicClass('central vietnamese linedD', promptAudio.centralVietnameseLinedD, 'đ');
  this.centralVietnameseG = new PhonicClass('central vietnamese g', promptAudio.centralVietnameseG, 'g');
  this.centralVietnameseH = new PhonicClass('central vietnamese h', promptAudio.centralVietnameseH, 'h');
  this.centralVietnameseK = new PhonicClass('central vietnamese k', promptAudio.centralVietnameseK, 'k');
  this.centralVietnameseL = new PhonicClass('central vietnamese l', promptAudio.centralVietnameseL, 'l');
  this.centralVietnameseM = new PhonicClass('central vietnamese m', promptAudio.centralVietnameseM, 'm');
  this.centralVietnameseN = new PhonicClass('central vietnamese n', promptAudio.centralVietnameseN, 'n');
  this.centralVietnameseP = new PhonicClass('central vietnamese p', promptAudio.centralVietnameseP, 'p');
  this.centralVietnameseQ = new PhonicClass('central vietnamese q', promptAudio.centralVietnameseQ, 'q');
  this.centralVietnameseR = new PhonicClass('central vietnamese r', promptAudio.centralVietnameseR, 'r');
  this.centralVietnameseS = new PhonicClass('central vietnamese s', promptAudio.centralVietnameseS, 's');
  this.centralVietnameseT = new PhonicClass('central vietnamese t', promptAudio.centralVietnameseT, 't');
  this.centralVietnameseV = new PhonicClass('central vietnamese v', promptAudio.centralVietnameseV, 'v');
  this.centralVietnameseX = new PhonicClass('central vietnamese x', promptAudio.centralVietnameseX, 'x');

  this.pinyinA = new PhonicClass('pinyin a', promptAudio.pinyinA, 'a');
  this.pinyinO = new PhonicClass('pinyin o', promptAudio.pinyinO, 'o');
  this.pinyinE = new PhonicClass('pinyin e', promptAudio.pinyinE, 'e');
  this.pinyinI = new PhonicClass('pinyin i', promptAudio.pinyinI, 'i');
  this.pinyinU = new PhonicClass('pinyin u', promptAudio.pinyinU, 'u');
  this.pinyinÜ = new PhonicClass('pinyin ü', promptAudio.pinyinU, 'ü');
  this.pinyinEr = new PhonicClass('pinyin er', promptAudio.pinyinEr, 'er');
  this.pinyinB = new PhonicClass('pinyin b', promptAudio.pinyinB, 'b');
  this.pinyinP = new PhonicClass('pinyin p', promptAudio.pinyinP, 'p');
  this.pinyinM = new PhonicClass('pinyin m', promptAudio.pinyinM, 'm');
  this.pinyinF = new PhonicClass('pinyin f', promptAudio.pinyinF, 'f');
  this.pinyinD = new PhonicClass('pinyin d', promptAudio.pinyinD, 'd');
  this.pinyinT = new PhonicClass('pinyin t', promptAudio.pinyinT, 't');
  this.pinyinN = new PhonicClass('pinyin n', promptAudio.pinyinN, 'n');
  this.pinyinL = new PhonicClass('pinyin l', promptAudio.pinyinL, 'l');
  this.pinyinC = new PhonicClass('pinyin c', promptAudio.pinyinC, 'c');
  this.pinyinS = new PhonicClass('pinyin s', promptAudio.pinyinS, 's');
  this.pinyinH = new PhonicClass('pinyin h', promptAudio.pinyinH, 'h');
  this.pinyinK = new PhonicClass('pinyin k', promptAudio.pinyinK, 'k');
  this.pinyinG = new PhonicClass('pinyin g', promptAudio.pinyinG, 'g');
  this.pinyinSi = new PhonicClass('pinyin si', promptAudio.pinyinSi, 'si');
  this.pinyinZi = new PhonicClass('pinyin zi', promptAudio.pinyinZi, 'zi');
  this.pinyinSh = new PhonicClass('pinyin sh', promptAudio.pinyinSh, 'sh');
  this.pinyinCh = new PhonicClass('pinyin ch', promptAudio.pinyinCh, 'ch');
  this.pinyinZh = new PhonicClass('pinyin zh', promptAudio.pinyinZh, 'zh');
  this.pinyinR = new PhonicClass('pinyin r', promptAudio.pinyinR, 'r');
  this.pinyinShi = new PhonicClass('pinyin shi', promptAudio.pinyinShi, 'shi');
  this.pinyinChi = new PhonicClass('pinyin chi', promptAudio.pinyinChi, 'chi');
  this.pinyinZhi = new PhonicClass('pinyin zhi', promptAudio.pinyinZhi, 'zhi');
  this.pinyinRi = new PhonicClass('pinyin ri', promptAudio.pinyinRi, 'ri');
  this.pinyinX = new PhonicClass('pinyin x', promptAudio.pinyinX, 'x');
  this.pinyinQ = new PhonicClass('pinyin q', promptAudio.pinyinQ, 'q');
  this.pinyinJ = new PhonicClass('pinyin j', promptAudio.pinyinJ, 'j');
  this.pinyinWa = new PhonicClass('pinyin wa', promptAudio.pinyinWa, 'wa');
  this.pinyinYa = new PhonicClass('pinyin ya', promptAudio.pinyinWa, 'ya');
  this.pinyinWo = new PhonicClass('pinyin wo', promptAudio.pinyinWo, 'wo');
  this.pinyinYe = new PhonicClass('pinyin ye', promptAudio.pinyinYe, 'ye');
  this.pinyinYi = new PhonicClass('pinyin yi', promptAudio.pinyinYi, 'yi');
  this.pinyinWu = new PhonicClass('pinyin wu', promptAudio.pinyinWu, 'wu');
  this.pinyinYu = new PhonicClass('pinyin yu', promptAudio.pinyinYu, 'yu');
  this.pinyinYue = new PhonicClass('pinyin yue', promptAudio.pinyinYue, 'yue');
  this.pinyinAo = new PhonicClass('pinyin ao', promptAudio.pinyinAo, 'ao');
  this.pinyinAi = new PhonicClass('pinyin ai', promptAudio.pinyinAi, 'ai');
  this.pinyinEi = new PhonicClass('pinyin ei', promptAudio.pinyinEi, 'ei');
  this.pinyinIe = new PhonicClass('pinyin ie', promptAudio.pinyinIe, 'ie');
  this.pinyinUo = new PhonicClass('pinyin uo', promptAudio.pinyinUo, 'uo');
  this.pinyinUa = new PhonicClass('pinyin ua', promptAudio.pinyinUa, 'ua');
  this.pinyinIa = new PhonicClass('pinyin ia', promptAudio.pinyinIa, 'ia');
  this.pinyinUe = new PhonicClass('pinyin ue', promptAudio.pinyinUe, 'ue');
  this.pinyinIao = new PhonicClass('pinyin iao', promptAudio.pinyinIao, 'iao');
  this.pinyinIou = new PhonicClass('pinyin iou', promptAudio.pinyinIou, 'iou');
  this.pinyinUai = new PhonicClass('pinyin uai', promptAudio.pinyinUai, 'uai');
  this.pinyinUei = new PhonicClass('pinyin uei', promptAudio.pinyinUei, 'uei');

  // English
  this.englishA = new PhonicClass('english a', promptAudio.a, 'a');
  this.englishB = new PhonicClass('english b', promptAudio.b, 'b');
  this.englishC = new PhonicClass('english c', promptAudio.c, 'c');
  this.englishD = new PhonicClass('english d', promptAudio.d, 'd');
  this.englishE = new PhonicClass('english e', promptAudio.e, 'e');
  this.englishF = new PhonicClass('english f', promptAudio.f, 'f');
  this.englishG = new PhonicClass('english g', promptAudio.g, 'g');
  this.englishH = new PhonicClass('english h', promptAudio.h, 'h');
  this.englishI = new PhonicClass('english i', promptAudio.i, 'i');
  this.englishJ = new PhonicClass('english j', promptAudio.j, 'j');
  this.englishK = new PhonicClass('english k', promptAudio.k, 'k');
  this.englishL = new PhonicClass('english l', promptAudio.l, 'l');
  this.englishM = new PhonicClass('english m', promptAudio.m, 'm');
  this.englishN = new PhonicClass('english n', promptAudio.n, 'n');
  this.englishO = new PhonicClass('english o', promptAudio.o, 'o');
  this.englishP = new PhonicClass('english p', promptAudio.p, 'p');
  this.englishQ = new PhonicClass('english q', promptAudio.q, 'q');
  this.englishR = new PhonicClass('english r', promptAudio.r, 'r');
  this.englishS = new PhonicClass('english s', promptAudio.s, 's');
  this.englishT = new PhonicClass('english t', promptAudio.t, 't');
  this.englishU = new PhonicClass('english u', promptAudio.u, 'u');
  this.englishV = new PhonicClass('english v', promptAudio.v, 'v');
  this.englishW = new PhonicClass('english w', promptAudio.w, 'w');
  this.englishX = new PhonicClass('english x', promptAudio.x, 'x');
  this.englishY = new PhonicClass('english y', promptAudio.y, 'y');
  this.englishZ = new PhonicClass('english z', promptAudio.z, 'z');

  this.arrayOfEnglishPhonics = [];
  this.arrayOfPinyinPhonics = [];
  this.arrayOfCentralVietnamesePhonics = [];

  this.initializeArraysOfPhonics = function()
  {
    this.arrayOfCentralVietnamesePhonics.push(this.centralVietnameseStraightToneA);
    this.arrayOfCentralVietnamesePhonics.push(this.centralVietnameseFallingToneA);
    this.arrayOfCentralVietnamesePhonics.push(this.centralVietnameseRisingToneA);
    this.arrayOfCentralVietnamesePhonics.push(this.centralVietnameseRisingStutterToneA);
    this.arrayOfCentralVietnamesePhonics.push(this.centralVietnameseLowStaccatoToneA);
    this.arrayOfCentralVietnamesePhonics.push(this.centralVietnameseRisingHatAU);
    this.arrayOfCentralVietnamesePhonics.push(this.centralVietnameseStraightI);
    this.arrayOfCentralVietnamesePhonics.push(this.centralVietnameseHatE);
    this.arrayOfCentralVietnamesePhonics.push(this.centralVietnameseE);
    this.arrayOfCentralVietnamesePhonics.push(this.centralVietnameseFallingI);
    this.arrayOfCentralVietnamesePhonics.push(this.centralVietnameseU);
    this.arrayOfCentralVietnamesePhonics.push(this.centralVietnameseHatO);
    this.arrayOfCentralVietnamesePhonics.push(this.centralVietnameseO);
    this.arrayOfCentralVietnamesePhonics.push(this.centralVietnameseQuestionU);
    this.arrayOfCentralVietnamesePhonics.push(this.centralVietnameseQuestionO);
    this.arrayOfCentralVietnamesePhonics.push(this.centralVietnameseFallingE);
    this.arrayOfCentralVietnamesePhonics.push(this.centralVietnameseFallingO);
    this.arrayOfCentralVietnamesePhonics.push(this.centralVietnameseFallingU);
    this.arrayOfCentralVietnamesePhonics.push(this.centralVietnameseStutterE);
    this.arrayOfCentralVietnamesePhonics.push(this.centralVietnameseStutterI);
    this.arrayOfCentralVietnamesePhonics.push(this.centralVietnameseStutterO);
    this.arrayOfCentralVietnamesePhonics.push(this.centralVietnameseStutterU);
    this.arrayOfCentralVietnamesePhonics.push(this.centralVietnameseYoYoA);
    this.arrayOfCentralVietnamesePhonics.push(this.centralVietnameseYoYoE);
    this.arrayOfCentralVietnamesePhonics.push(this.centralVietnameseYoYoI);
    this.arrayOfCentralVietnamesePhonics.push(this.centralVietnameseYoYoO);
    this.arrayOfCentralVietnamesePhonics.push(this.centralVietnameseYoYoU);
    this.arrayOfCentralVietnamesePhonics.push(this.centralVietnameseRisingE);
    this.arrayOfCentralVietnamesePhonics.push(this.centralVietnameseRisingO);
    this.arrayOfCentralVietnamesePhonics.push(this.centralVietnameseRisingI);
    this.arrayOfCentralVietnamesePhonics.push(this.centralVietnameseRisingU);
    this.arrayOfCentralVietnamesePhonics.push(this.centralVietnameseStaccatoE);
    this.arrayOfCentralVietnamesePhonics.push(this.centralVietnameseStaccatoO);
    this.arrayOfCentralVietnamesePhonics.push(this.centralVietnameseHookO);
    this.arrayOfCentralVietnamesePhonics.push(this.centralVietnameseHalfPipeA);
    this.arrayOfCentralVietnamesePhonics.push(this.centralVietnameseRisingHatA);
    this.arrayOfCentralVietnamesePhonics.push(this.centralVietnameseFallingHatA);
    this.arrayOfCentralVietnamesePhonics.push(this.centralVietnameseYoYoHatA);
    this.arrayOfCentralVietnamesePhonics.push(this.centralVietnameseStutterHatA);
    this.arrayOfCentralVietnamesePhonics.push(this.centralVietnameseStaccatoHatA);
    this.arrayOfCentralVietnamesePhonics.push(this.centralVietnameseFallingHatE);
    this.arrayOfCentralVietnamesePhonics.push(this.centralVietnameseYoYoHatE);
    this.arrayOfCentralVietnamesePhonics.push(this.centralVietnameseStutterHatE);
    this.arrayOfCentralVietnamesePhonics.push(this.centralVietnameseStaccatoHatE);
    this.arrayOfCentralVietnamesePhonics.push(this.centralVietnameseRisingHatO);
    this.arrayOfCentralVietnamesePhonics.push(this.centralVietnameseFallingHatO);
    this.arrayOfCentralVietnamesePhonics.push(this.centralVietnameseYoYoHatO);
    this.arrayOfCentralVietnamesePhonics.push(this.centralVietnameseStutterHatO);

    //consonants
    this.arrayOfCentralVietnamesePhonics.push(this.centralVietnameseB);
    this.arrayOfCentralVietnamesePhonics.push(this.centralVietnameseC);
    this.arrayOfCentralVietnamesePhonics.push(this.centralVietnameseD);
    this.arrayOfCentralVietnamesePhonics.push(this.centralVietnameseTh);
    this.arrayOfCentralVietnamesePhonics.push(this.centralVietnameseNg);
    this.arrayOfCentralVietnamesePhonics.push(this.centralVietnameseLinedD);
    this.arrayOfCentralVietnamesePhonics.push(this.centralVietnameseG);
    this.arrayOfCentralVietnamesePhonics.push(this.centralVietnameseH);
    this.arrayOfCentralVietnamesePhonics.push(this.centralVietnameseK);
    this.arrayOfCentralVietnamesePhonics.push(this.centralVietnameseL);
    this.arrayOfCentralVietnamesePhonics.push(this.centralVietnameseM);
    this.arrayOfCentralVietnamesePhonics.push(this.centralVietnameseN);
    this.arrayOfCentralVietnamesePhonics.push(this.centralVietnameseP);
    this.arrayOfCentralVietnamesePhonics.push(this.centralVietnameseQ);
    this.arrayOfCentralVietnamesePhonics.push(this.centralVietnameseR);
    this.arrayOfCentralVietnamesePhonics.push(this.centralVietnameseS);
    this.arrayOfCentralVietnamesePhonics.push(this.centralVietnameseT);
    this.arrayOfCentralVietnamesePhonics.push(this.centralVietnameseV);
    this.arrayOfCentralVietnamesePhonics.push(this.centralVietnameseX);

    //pinyin
    this.arrayOfPinyinPhonics.push(this.pinyinA);
    this.arrayOfPinyinPhonics.push(this.pinyinO);
    this.arrayOfPinyinPhonics.push(this.pinyinE);
    this.arrayOfPinyinPhonics.push(this.pinyinI);
    this.arrayOfPinyinPhonics.push(this.pinyinU);
    this.arrayOfPinyinPhonics.push(this.pinyinU);
    this.arrayOfPinyinPhonics.push(this.pinyinEr);
    this.arrayOfPinyinPhonics.push(this.pinyinB);
    this.arrayOfPinyinPhonics.push(this.pinyinP);
    this.arrayOfPinyinPhonics.push(this.pinyinM);
    this.arrayOfPinyinPhonics.push(this.pinyinF);
    this.arrayOfPinyinPhonics.push(this.pinyinD);
    this.arrayOfPinyinPhonics.push(this.pinyinT);
    this.arrayOfPinyinPhonics.push(this.pinyinN);
    this.arrayOfPinyinPhonics.push(this.pinyinL);
    this.arrayOfPinyinPhonics.push(this.pinyinC);
    this.arrayOfPinyinPhonics.push(this.pinyinS);
    this.arrayOfPinyinPhonics.push(this.pinyinH);
    this.arrayOfPinyinPhonics.push(this.pinyinK);
    this.arrayOfPinyinPhonics.push(this.pinyinG);
    this.arrayOfPinyinPhonics.push(this.pinyinSi);
    this.arrayOfPinyinPhonics.push(this.pinyinZi);
    this.arrayOfPinyinPhonics.push(this.pinyinSh);
    this.arrayOfPinyinPhonics.push(this.pinyinZh);
    this.arrayOfPinyinPhonics.push(this.pinyinR);
    this.arrayOfPinyinPhonics.push(this.pinyinShi);
    this.arrayOfPinyinPhonics.push(this.pinyinChi);
    this.arrayOfPinyinPhonics.push(this.pinyinZhi);
    this.arrayOfPinyinPhonics.push(this.pinyinRi);
    this.arrayOfPinyinPhonics.push(this.pinyinX);
    this.arrayOfPinyinPhonics.push(this.pinyinQ);
    this.arrayOfPinyinPhonics.push(this.pinyinJ);
    this.arrayOfPinyinPhonics.push(this.pinyinWa);
    this.arrayOfPinyinPhonics.push(this.pinyinYa);
    this.arrayOfPinyinPhonics.push(this.pinyinWo);
    this.arrayOfPinyinPhonics.push(this.pinyinYe);
    this.arrayOfPinyinPhonics.push(this.pinyinYi);
    this.arrayOfPinyinPhonics.push(this.pinyinWu);
    this.arrayOfPinyinPhonics.push(this.pinyinYu);
    this.arrayOfPinyinPhonics.push(this.pinyinYue);

    this.arrayOfPinyinPhonics.push(this.pinyinAo);
    this.arrayOfPinyinPhonics.push(this.pinyinAi);
    this.arrayOfPinyinPhonics.push(this.pinyinEi);
    this.arrayOfPinyinPhonics.push(this.pinyinIe);
    this.arrayOfPinyinPhonics.push(this.pinyinUo);
    this.arrayOfPinyinPhonics.push(this.pinyinUa);
    this.arrayOfPinyinPhonics.push(this.pinyinIa);
    this.arrayOfPinyinPhonics.push(this.pinyinUe);
    this.arrayOfPinyinPhonics.push(this.pinyinIao);
    this.arrayOfPinyinPhonics.push(this.pinyinIou);
    this.arrayOfPinyinPhonics.push(this.pinyinUai);
    this.arrayOfPinyinPhonics.push(this.pinyinUei);

    // english
    this.arrayOfEnglishPhonics.push(this.englishA);
    this.arrayOfEnglishPhonics.push(this.englishB);
    this.arrayOfEnglishPhonics.push(this.englishC);
    this.arrayOfEnglishPhonics.push(this.englishD);
    this.arrayOfEnglishPhonics.push(this.englishE);
    this.arrayOfEnglishPhonics.push(this.englishF);
    this.arrayOfEnglishPhonics.push(this.englishG);
    this.arrayOfEnglishPhonics.push(this.englishH);
    this.arrayOfEnglishPhonics.push(this.englishI);
    this.arrayOfEnglishPhonics.push(this.englishJ);
    this.arrayOfEnglishPhonics.push(this.englishK);
    this.arrayOfEnglishPhonics.push(this.englishL);
    this.arrayOfEnglishPhonics.push(this.englishM);
    this.arrayOfEnglishPhonics.push(this.englishN);
    this.arrayOfEnglishPhonics.push(this.englishO);
    this.arrayOfEnglishPhonics.push(this.englishP);
    this.arrayOfEnglishPhonics.push(this.englishQ);
    this.arrayOfEnglishPhonics.push(this.englishR);
    this.arrayOfEnglishPhonics.push(this.englishS);
    this.arrayOfEnglishPhonics.push(this.englishT);
    this.arrayOfEnglishPhonics.push(this.englishU);
    this.arrayOfEnglishPhonics.push(this.englishV);
    this.arrayOfEnglishPhonics.push(this.englishW);
    this.arrayOfEnglishPhonics.push(this.englishX);
    this.arrayOfEnglishPhonics.push(this.englishY);
    this.arrayOfEnglishPhonics.push(this.englishZ);
  }

  this.currentLanguageArray = [];
  this.setCurrentLanguageArray = function(languageNumFromLanguageScreen)
  {
    if (languageNumFromLanguageScreen === 0)
    {
      this.currentLanguageArray = this.arrayOfEnglishPhonics;
    }
    else if (languageNumFromLanguageScreen === 1)
    {
      this.currentLanguageArray = this.arrayOfPinyinPhonics;
    }
    else if (languageNumFromLanguageScreen === 2)
    {
      this.currentLanguageArray = this.arrayOfCentralVietnamesePhonics;
    }
  }

  this.temporaryArrayOfPhonics = [];
  this.populateTemporaryArrayOfPhonics = function()
  {
    let randomArrayOfPhonicsIndex = undefined;
    randomArrayOfPhonicsIndex = getRandomIntInclusive(0,this.currentLanguageArray.length - 1);
    let phonicToMoveAndReturn1 = this.currentLanguageArray.splice(randomArrayOfPhonicsIndex,1);
    this.temporaryArrayOfPhonics.push(phonicToMoveAndReturn1[0]);


    randomArrayOfPhonicsIndex = getRandomIntInclusive(0,this.currentLanguageArray.length - 1);
    let phonicToMoveAndReturn2 = this.currentLanguageArray.splice(randomArrayOfPhonicsIndex,1);
    this.temporaryArrayOfPhonics.push(phonicToMoveAndReturn2[0]);
    this.examplePhonic2 = phonicToMoveAndReturn2;

    randomArrayOfPhonicsIndex = getRandomIntInclusive(0,this.currentLanguageArray.length - 1);
    let phonicToMoveAndReturn3 = this.currentLanguageArray.splice(randomArrayOfPhonicsIndex,1);
    this.temporaryArrayOfPhonics.push(phonicToMoveAndReturn3[0]);
    this.examplePhonic3 = phonicToMoveAndReturn3;

    randomArrayOfPhonicsIndex = getRandomIntInclusive(0,this.currentLanguageArray.length - 1);
    let phonicToMoveAndReturn4 = this.currentLanguageArray.splice(randomArrayOfPhonicsIndex,1);
    this.temporaryArrayOfPhonics.push(phonicToMoveAndReturn4[0]);
    this.examplePhonic4 = phonicToMoveAndReturn4;

    this.currentLanguageArray.push(phonicToMoveAndReturn1[0]);
    this.currentLanguageArray.push(phonicToMoveAndReturn2[0]);
    this.currentLanguageArray.push(phonicToMoveAndReturn3[0]);
    this.currentLanguageArray.push(phonicToMoveAndReturn4[0]);
  }

  this.currentCorrectPhonic = undefined;
  this.chooseCorrectPhonic = function()
  {
    let randomArrayOfPhonicsIndex = getRandomIntInclusive(0,this.temporaryArrayOfPhonics.length - 1);
    this.temporaryArrayOfPhonics[randomArrayOfPhonicsIndex].isTheCorrectChoice = true;
    this.currentCorrectPhonic = this.temporaryArrayOfPhonics[randomArrayOfPhonicsIndex];
  }

  this.assignPhonicsToDodgeballs = function()
  {
    let randomArrayOfPhonicsIndex = getRandomIntInclusive(0,this.temporaryArrayOfPhonics - 1);
    let phonic1ArrayResultFromSplice = this.temporaryArrayOfPhonics.splice(randomArrayOfPhonicsIndex,1);
    gameClassManager.currentGame.arrayOfDodgeballs[0].phonicClass = phonic1ArrayResultFromSplice[0];

    randomArrayOfPhonicsIndex = getRandomIntInclusive(0,this.temporaryArrayOfPhonics - 1);
    let phonic2ArrayResultFromSplice = this.temporaryArrayOfPhonics.splice(randomArrayOfPhonicsIndex,1);
    gameClassManager.currentGame.arrayOfDodgeballs[1].phonicClass = phonic2ArrayResultFromSplice[0];

    randomArrayOfPhonicsIndex = getRandomIntInclusive(0,this.temporaryArrayOfPhonics - 1);
    let phonic3ArrayResultFromSplice = this.temporaryArrayOfPhonics.splice(randomArrayOfPhonicsIndex,1);
    gameClassManager.currentGame.arrayOfDodgeballs[2].phonicClass = phonic3ArrayResultFromSplice[0];

    randomArrayOfPhonicsIndex = getRandomIntInclusive(0,this.temporaryArrayOfPhonics - 1);
    let phonic4ArrayResultFromSplice = this.temporaryArrayOfPhonics.splice(randomArrayOfPhonicsIndex,1);
    gameClassManager.currentGame.arrayOfDodgeballs[3].phonicClass = phonic4ArrayResultFromSplice[0];

  }

  this.setOrResetPhonicsOnDodgeballsAndPlayPromptAudio = function()
  {
    for (let i = 0; i < gameClassManager.currentGame.arrayOfDodgeballs.length; i++)
    {
      gameClassManager.currentGame.arrayOfDodgeballs[i].phonicClass.isTheCorrectChoice = false;
    }
    this.populateTemporaryArrayOfPhonics();
    this.chooseCorrectPhonic();
    this.assignPhonicsToDodgeballs();
    this.currentCorrectPhonic.promptAudio.sfx.play();
  }
}
