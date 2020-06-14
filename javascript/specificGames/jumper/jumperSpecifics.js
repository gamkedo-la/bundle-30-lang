const jumperLetterColor = 'red';
const jumperBackButtonRectangleColor = 'yellow';
const jumperBackButtonTextColor = 'green';

jumperGameClass.prototype = new GameClass();
function jumperGameClass()
{
  this.name = 'jumperGame';
  this.playerCharacter = undefined;
  this.groundParticleManager = undefined;
  this.defineAndInitializePlayerCharacter = function()
  {
    this.playerCharacter = new JumperClass();
    this.collidingObject = this.playerCharacter;
  }

  this.imageAnswerHolderWidth = undefined;
  this.imageAnswerHolderHeight = undefined;

  this.audioImageAnswerHolderWidth = undefined;
  this.audioImageAnswerHolderHeight = undefined;

  this.correctTextAnswerHolderWidth = undefined;
  this.incorrectTextAnswerHolderWidth = undefined;

  this.treasureChestAnswerHolder = undefined;

  this.textAnswerFontSize = '30';
  this.textAnswerFontStyle = this.textAnswerFontSize + 'px Helvetica';

  this.drawTransitionText = function()
  {
    customFontFillText(['Dig to the answers', symbolExclamationPointImage], 55,30, 25,50);
    customFontFillText([upArrowImage, ' ', symbolEqualsImage, ' Float up'], 30,15, 210,200);
    customFontFillText([rightArrowImage, ' ', symbolEqualsImage, ' Roll right'], 30,15, 350,350);
    customFontFillText([downArrowImage, ' ', symbolEqualsImage, ' Dig down'], 30,15, 200,500);
    customFontFillText([leftArrowImage, ' ', symbolEqualsImage, ' Roll left'], 30,15, 50,350);
  }

  this.titleScreenData = [{
	name: "Digger",
	fontSize: 27,
	spacing: 15,
	x: 322, y: 185
  }];
  const MAX_PLATFORMS = 7;

  this.arrayOfJumperPlatforms = [...Array(MAX_PLATFORMS).keys()].map(function(i) {
	return {x:0, y:i*100};
  });

  this.FRAME_RATE = 1000/30;

  this.backgroundMusic = new MusicTrack('audio/backgroundTracks/200411.mp3', 71.11);

  this.pregameSpecialCode = function()
  {
    gameAudio = {};
    gameAudio.digging = new sfxOneShot('audio/dig1.mp3');
    gameAudio.quickPlatformDropSound = new sfxOneShot('audio/V/playerJump.mp3');
  };

  this.superInitialize = this.initialize;
  this.initialize = function()
  {
    this.playerCharacter = new JumperClass();
    this.collidingObject = this.playerCharacter;
    this.groundParticleManager = new GroundParticleManager();
    drawAnswersManager.draw();

    this.imageAnswerHolderWidth = gameCanvas.width/4;
		this.imageAnswerHolderHeight = gameCanvas.height/5;
		this.audioImageAnswerHolderWidth = gameCanvas.width/5;
    this.audioImageAnswerHolderHeight = gameCanvas.height/6;

    this.assignAnswerHolder();
	//this.superInitialize();
  };

  this.assignAnswerHolder = function()
  {
    console.log('called assign answer holder');
    this.treasureChestAnswerHolder = new TreasureChestAnswerHolder('images\\sprites\\Jumper\\treasureChest.png');
    return this.treasureChestAnswerHolder;
  }

  this.update = function()
  {
    if (!promptersManager.shouldBeDrawingAPrompt &&
        fullGameStateMachine.currentState === fullGameStateMachine.FULL_GAME_ENUMERABLE_STATES.playingMiniGame)
    {
      this.movePlayer();
      this.handlePlayerWrapping();
      this.groundParticleManager.updateParticles();
      this.groundParticleManager.moveParticles();

      this.collisionsWithAnswersManager.handleCollisionsWithAnswers(this.collidingObject);
    }
  };

  this.handleLeftArrowDown = function()
  {
    this.playerCharacter.xSpeed = this.playerCharacter.LEFT_ARROW_DOWN_SPEED;
    this.playerCharacter.currentImage = this.playerCharacter.facingLeftImage;
    this.playerCharacter.rotationAmount -= 0.2;
  }

  this.handleRightArrowDown = function()
  {
    this.playerCharacter.xSpeed = this.playerCharacter.RIGHT_ARROW_DOWN_SPEED;
    this.playerCharacter.currentImage = this.playerCharacter.facingRightImage;
    this.playerCharacter.rotationAmount += 0.2;
  }

  this.handleRightArrowUp = function()
  {
    this.playerCharacter.xSpeed = this.playerCharacter.LEFT_OR_RIGHT_ARROW_UP_SPEED;
  }

  this.handleSpaceBarDown = function()
  {
	   this.playerCharacter.jump();
  }

  this.handleLeftArrowUp = function()
  {
    this.playerCharacter.xSpeed = this.playerCharacter.LEFT_OR_RIGHT_ARROW_UP_SPEED;
  }

  this.handlePlayerWrapping = function()
  {
    if (this.playerCharacter.x < -10)//if the player goes off the left side of the screen
    {
      this.playerCharacter.x = gameCanvas.width - 5;//put them on the right side
    }

    if (this.playerCharacter.x > gameCanvas.width - 5)//if the player goes off the right side of the screen
    {
      this.playerCharacter.x = -5;//put them on the left side of the screen
    }
  }

  this.movePlayer = function()
  {
	if (!inputManager.upArrowIsBeingHeld &&
		this.playerCharacter.y !== 20 && this.playerCharacter.y !== 120 &&
		this.playerCharacter.y !== 220 && this.playerCharacter.y !== 320 && this.playerCharacter.y !== 420 &&
		this.playerCharacter.y !== 520 && this.playerCharacter.y !== 620) //if not jumping and not contacting a platform
    {
      this.playerCharacter.y += 5;//apply GRAVITY
    }
  this.playerCharacter.x += this.playerCharacter.xSpeed;
  };

  this.handleUpArrowDown = function()
  {
	   this.playerCharacter.jump();
  };

  this.handleDownArrowDown = function()
  {
      this.groundParticleManager.createAGroupOfParticles();
      gameAudio.digging.play();
      gameAudio.quickPlatformDropSound.play();
    this.playerCharacter.y += 100;
    if (this.playerCharacter.y > 700)//if the player goes below the screen
    {
      this.playerCharacter.y = 20;//put them at the top platform
    }

  }

  this.draw = function()
  {
    this.drawBackground();
    this.groundParticleManager.drawParticles();
    this.playerCharacter.draw();
    drawAnswersManager.draw();
		promptersManager.drawPromptsWhenAppropriate();
  };

  this.drawBackground = function()
  {
  	gameCanvasContext.fillStyle = 'blue';
  	gameCanvasContext.fillRect(0,0, gameCanvas.width,gameCanvas.height);
  	gameCanvasContext.fillStyle = 'gray';
  	for (let platformsIndex = 0; platformsIndex < this.arrayOfJumperPlatforms.length; platformsIndex++)
  	{
        gameCanvasContext.fillRect(this.arrayOfJumperPlatforms[platformsIndex].x, this.arrayOfJumperPlatforms[platformsIndex].y, gameCanvas.width, 50)
  	}
    drawFromSheet('images\\Backgrounds\\editedJumperBackground.png', 0,0, gameCanvas.width,gameCanvas.height);
    //gameCanvasContext.drawImage(jumperBackground, 0,0, gameCanvas.width,gameCanvas.height);
  };

  this.onSpaceBarKeyDown = function()
  {
  	this.playerCharacter.y += -7;
  };
}

const jumperGame = new jumperGameClass();

function TreasureChestAnswerHolder(image)
{
	this.image = image;
}
