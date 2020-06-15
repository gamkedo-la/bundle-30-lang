const birdBackButtonRectangleColor = 'yellow';
const birdBackButtonTextColor = 'red';
const birdLetterColor = 'BlueViolet';

birdGameClass.prototype = new GameClass();
function birdGameClass() {
  this.name = 'birdGame';
  this.playerCharacter = undefined;
  this.defineAndInitializePlayerCharacter = function()
  {
    this.playerCharacter = new BirdClass();
    this.playerCharacter.initialize();
    this.collidingObject = this.playerCharacter;
  }
  this.backgroundMusic = new MusicTrack('audio/backgroundTracks/birdSong.mp3',52.8);
  this.collidingObject = undefined;
  this.titleScreenData = [{
	name: "Bird",
	fontSize: 27,
	spacing: 15,
	x: 138, y: 185
  }];
  const GRAVITY = 4;
  const LEFT_ARROW_DOWN_SPEED = -8;
  const RIGHT_ARROW_DOWN_SPEED = 8;
  const LEFT_ARROW_UP_SPEED = -4;
  const RIGHT_ARROW_UP_SPEED = 4;

  this.drawTransitionText = function()
  {
    customFontFillText(['Fly to the answers!', symbolExclamationPointImage], 60,30, 75,50);
    customFontFillText([rightArrowImage, ' ', symbolEqualsImage, ' Fly right'], 30,15, 350,350);
    customFontFillText(['Space bar', ' ', symbolEqualsImage, ' Fly up'], 30,15, 175,500);
    customFontFillText([leftArrowImage, ' ', symbolEqualsImage, ' Fly left'], 30,15, 50,350);
  }


  this.amountCorrect = 0;

  this.FRAME_RATE = 1000/30;
  this.letterSpawnInterval = 2000;

  this.imageAnswerWidth = undefined;
  this.imageAnswerHeight = undefined;
  this.imageAnswerHolderWidth = undefined;
  this.imageAnswerHolderHeight = undefined;

  this.audioImageAnswerWidth = undefined;
  this.audioImageAnswerHeight = undefined;
  this.audioImageAnswerHolderWidth = undefined;
  this.audioImageAnswerHolderHeight = undefined;

  this.correctTextAnswerHolderWidth = undefined;
  this.incorrectTextAnswerHolderWidth = undefined;

  this.LETTER_COLOR = 'lightCoral';
  this.textAnswerFontSize = '30';
  this.textAnswerFontStyle = this.textAnswerFontSize + 'px Helvetica';

  this.arrayOfAnswerHolders = [];
  this.skyRingAnswerHolder1 = new SkyRingAnswerHolder('images\\sprites\\Bird\\skyRing.png');
  this.skyRingAnswerHolder2 = new SkyRingAnswerHolder('images\\sprites\\Bird\\skyRing2.png');
  this.arrayOfAnswerHolders.push(this.skyRingAnswerHolder1);
  this.arrayOfAnswerHolders.push(this.skyRingAnswerHolder2);
  this.assignAnswerHolder = function()
  {
      let randomNumber = getRandomIntInclusive(0, this.arrayOfAnswerHolders.length - 1);
      return this.arrayOfAnswerHolders[randomNumber];
  }

  this.answersXSpeed = 4;

  this.pregameSpecialCode = function()
  {
    gameAudio = {};
    gameAudio.flap1 = new sfxOneShot("audio/flap01.mp3");
    gameAudio.flapIndex = 0;
    gameAudio.playFlap = function() {

        gameAudio.flap1.play();

    }

  };

  this.superInitialize = function()
  {
    // initializePromptAndAnswerObjects();
    // promptsAndAnswersManager.setOrResetPromptsAndAnswers();
    this.imageAnswerWidth = gameCanvas.width/7;
		this.imageAnswerHeight = gameCanvas.height/9;
		this.audioImageAnswerWidth = gameCanvas.width/6;
    this.audioImageAnswerHeight = gameCanvas.height/7;

    this.imageAnswerHolderWidth = gameCanvas.width/4;
		this.imageAnswerHolderHeight = gameCanvas.height/5;
		this.audioImageAnswerHolderWidth = gameCanvas.width/5;
    this.audioImageAnswerHolderHeight = gameCanvas.height/6;

    drawAnswersManager.initialize();

    this.plane = new Plane();
    cloudManager.initialize();
    promptersManager.loadAppropriatePrompterBasedOnCurrentPromptsDataType();
    this.assignLeftOrRightDirectionToAnswers();
	  //this.superInitialize();
  }

  this.applyGRAVITYToBird = function()
  {
	   this.playerCharacter.y += GRAVITY;
  }

  this.handleLeftArrowDown = function()
  {
    this.playerCharacter.xSpeed = LEFT_ARROW_DOWN_SPEED;
    this.playerCharacter.currentImage = this.playerCharacter.openFacingLeftImage;
  };

  this.handleRightArrowDown = function()
  {
    this.playerCharacter.xSpeed = RIGHT_ARROW_DOWN_SPEED;
    this.playerCharacter.currentImage = this.playerCharacter.openFacingRightImage;
  }

  this.handleLeftArrowUp = function()
  {
    this.playerCharacter.xSpeed = LEFT_ARROW_UP_SPEED;
  }

  this.handleRightArrowUp = function()
  {
    this.playerCharacter.xSpeed = RIGHT_ARROW_UP_SPEED;
  }

  this.update = function()
  {
    if (!promptersManager.shouldBeDrawingAPrompt &&
        fullGameStateMachine.currentState !== fullGameStateMachine.FULL_GAME_ENUMERABLE_STATES.pausedMiniGame)
    {
      this.playerCharacter.move();
      this.playerCharacter.handleOffScreen();
      this.moveAnswers();
      this.plane.move();
      this.plane.handleOffScreen();
      this.handleAnswersOffScreen();
      this.collisionsWithAnswersManager.handleCollisionsWithAnswers(this.collidingObject);
      cloudManager.update();
    }
  };

  this.assignLeftOrRightDirectionToAnswers = function()
  {
    let randomNumber = Math.random();
    if (randomNumber < 0.5)
    {
      promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.xDirection = 1;
      promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.xDirection = -1;
    }
    else
    {
      promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.xDirection = -1;
      promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.xDirection = 1;
    }
  }

  this.draw = function()
  {
    this.drawBackground();
    cloudManager.drawClouds();
    this.plane.draw();
    this.playerCharacter.draw();
    drawAnswersManager.draw();
    promptersManager.drawPromptsWhenAppropriate();
  };

  this.drawBackground = function()
  {
    let startingXOnCanvas = 0;
    let startingYOnCanvas = 0;
    let endingXOnCanvas = gameCanvas.width;
    let endingYOnCanvas = gameCanvas.height;
    drawFromSheet("images\\Backgrounds\\Sky.png", startingXOnCanvas,startingYOnCanvas,
                                               endingXOnCanvas, endingYOnCanvas);
  	// gameCanvasContext.drawImage(skyBackground, startingXOnCanvas,startingYOnCanvas,
    //                                            endingXOnCanvas, endingYOnCanvas);
  };

  this.handleSpaceBarDown = function()
  {
    if (!promptersManager.shouldBeDrawingAPrompt)
    {
      this.playerCharacter.flapUp();
      gameAudio.playFlap();
    }
  };

  this.moveAnswers = function()
  {
    promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.xCoordinate += this.answersXSpeed*promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.xDirection;
    promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.xCoordinate += this.answersXSpeed*promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.xDirection;
  }

  this.handleAnswersOffScreen = function()
  {
    if (promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.xCoordinate > gameCanvas.width)
    {
      promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.xCoordinate = -10;
    }
    else if (promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.xCoordinate < -10)
    {
      promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.xCoordinate = gameCanvas.width;
    }

    if (promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.xCoordinate > gameCanvas.width)
    {
      promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.xCoordinate = -10;
    }
    else if (promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.xCoordinate < -10)
    {
      promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.xCoordinate = gameCanvas.width;
    }
  }
}

const birdGame = new birdGameClass();

function SkyRingAnswerHolder(image)
{
  this.image = image;
}

function BirdClass()
{
  this.name = 'bird player';
  this.openFacingLeftImage = 'images\\sprites\\Bird\\birdOpenFacingLeft.png';
  this.openFacingRightImage = 'images\\sprites\\Bird\\birdOpenFacingRight.png';
  this.currentImage = this.openFacingRightImage;
  this.x = undefined;
  this.y = undefined;
  const BIRD_STARTING_X = 100;
  const BIRD_STARTING_Y = 100;
  this.width = 75;
  this.height = 75;
  this.xSpeed = undefined;

  this.draw = function()
  {
	  // gameCanvasContext.fillStyle = 'lightCoral';
    // gameCanvasContext.fillRect(this.x, this.y, this.width,this.height);
    drawFromSheet(this.currentImage, this.x,this.y, this.width,this.height);
    //gameCanvasContext.drawImage(this.currentImage, this.x,this.y, this.width,this.height);
  };

  this.initialize = function()
  {
    this.x = BIRD_STARTING_X;
    this.y = BIRD_STARTING_Y;
    this.xSpeed = 0;
  }

  this.flapUp = function()
  {
	   this.y -= 50;
  }

  this.move = function()
  {
    birdGame.applyGRAVITYToBird();
    this.x += this.xSpeed;
  };

  this.handleOffScreen = function()
  {
	   if (this.y > gameCanvas.height - 10)
	{
      this.y = 5;
	}
  else if (this.y < 0)
  {
      this.y = 0;
	}
  else if (this.x > gameCanvas.width - 10)
	{
      this.x = -5;
	}
  else if (this.x < -5)
	{
      this.x = gameCanvas.width - 5;
	}
  };
}

function Cloud(randomCloudImage)
{
  this.image = randomCloudImage;

  this.x = getRandomIntInclusive(0, gameCanvas.width);
  this.y = getRandomIntInclusive(0, gameCanvas.height);

  this.height = getRandomIntInclusive(gameCanvas.height/9, gameCanvas.height/4);
  this.width = getRandomIntInclusive(gameCanvas.width/9, gameCanvas.height/2);

  this.draw = function()
  {
    drawFromSheet(this.image, this.x,this.y, this.width,this.height);
    //gameCanvasContext.drawImage(this.image, this.x,this.y, this.width,this.height);
  }

  this.xSpeed = (getRandomIntInclusive(10,14))/10;
  this.move = function()
  {
    this.x -= this.xSpeed;
  }

  this.handleOffScreen = function()
  {
    if (this.x + this.width < 0)
    {
      this.x = gameCanvas.width + this.width;
      this.y = getRandomIntInclusive(0, gameCanvas.height);

      let randomCloudImageIndex = getRandomIntInclusive(0,cloudManager.arrayOfCloudImages.length - 1);
      let cloudImage = cloudManager.arrayOfCloudImages[randomCloudImageIndex];
      this.image = cloudImage;
      this.xSpeed = (getRandomIntInclusive(10,14))/10;

      this.height = getRandomIntInclusive(gameCanvas.height/9, gameCanvas.height/4);
      this.width = getRandomIntInclusive(gameCanvas.width/9, gameCanvas.height/2);
    }
  }
}

function CloudManager()
{
  this.numberOfClouds = 7;

  this.arrayOfCloudImages = [];

  this.initializeArrayOfCloudImages = function()
  {
    this.arrayOfCloudImages.push('images\\Backgrounds\\cloud1.png');
    this.arrayOfCloudImages.push('images\\Backgrounds\\cloud2.png');
    this.arrayOfCloudImages.push('images\\Backgrounds\\cloud3.png');
    this.arrayOfCloudImages.push('images\\Backgrounds\\cloud4.png');
  }

  this.arrayOfClouds = [];

  this.initializeClouds = function()
  {
    for (let cloudToInitializeIndex = 0; cloudToInitializeIndex < this.numberOfClouds; cloudToInitializeIndex++)
    {
      let randomCloudImageIndex = getRandomIntInclusive(0,this.arrayOfCloudImages.length - 1);
      let cloudImage = this.arrayOfCloudImages[randomCloudImageIndex];
      let cloud = new Cloud(cloudImage);
      this.arrayOfClouds.push(cloud);
    }
  }

  this.initialize = function()
  {
      this.initializeArrayOfCloudImages();
      this.initializeClouds();
  }

  this.drawClouds = function()
  {
    for (let arrayOfCloudsIndex = 0; arrayOfCloudsIndex < this.arrayOfClouds.length; arrayOfCloudsIndex++)
    {
      this.arrayOfClouds[arrayOfCloudsIndex].draw();
    }
  }

  this.moveClouds = function()
  {
    for (let arrayOfCloudsIndex = 0; arrayOfCloudsIndex < this.arrayOfClouds.length; arrayOfCloudsIndex++)
    {
      this.arrayOfClouds[arrayOfCloudsIndex].move();
    }
  }

  this.handleCloudsOffScreen = function()
  {
    for (let arrayOfCloudsIndex = 0; arrayOfCloudsIndex < this.arrayOfClouds.length; arrayOfCloudsIndex++)
    {
      this.arrayOfClouds[arrayOfCloudsIndex].handleOffScreen();
    }
  }

  this.update = function()
  {
    this.moveClouds();
    this.handleCloudsOffScreen();
  }
}

let cloudManager = new CloudManager();

function Plane()
{
  this.image = 'images\\sprites\\Bird\\plane.png';
  this.width = gameCanvas.width/2;
  this.height = gameCanvas.height/10;
  this.x = getRandomArbitrary(0,gameCanvas.width - this.width);
  this.y = getRandomArbitrary(0,gameCanvas.height - this.height);

  this.xVelocity = -3;
  this.yVelocity = 1;

  this.bannerMessageCharacters = ['G','o','o','d',' ','J','o','b','!'];

  this.draw = function()
  {
    drawFromSheet(this.image, this.x,this.y, this.width,this.height);
    //gameCanvasContext.drawImage(this.image, this.x,this.y, this.width,this.height);

    let arrayOfCharacterTypes = [];
    for (let bannerMessageIndex = 0; bannerMessageIndex < gameClassManager.currentGame.amountCorrect; bannerMessageIndex++)
             {
               arrayOfCharacterTypes.push(this.bannerMessageCharacters[bannerMessageIndex])
             }
             customFontFillText(arrayOfCharacterTypes, 30, 15, this.x + this.width/2 + 17,this.y + 10);


    // customFontFillText(this.bannerMessageCharacters, 30,15, this.x + this.width/2 + 17,this.y + 10);
  }

  this.targetY = getRandomArbitrary(0,gameCanvas.height - this.height);

  this.move = function()
  {
    this.x += this.xVelocity;

    if (this.y < this.targetY)
    {
      this.y += this.yVelocity;
      if (this.y >= this.targetY)
      {
        this.targetY = getRandomArbitrary(0,gameCanvas.height - this.height);
      }
    }
    else if (this.y > this.targetY)
    {
      this.y -= this.yVelocity;
      if (this.y <= this.targetY)
      {
        this.targetY = getRandomArbitrary(0,gameCanvas.height - this.height);
      }
    }
  }

  this.handleOffScreen = function()
  {
    if (this.x + this.width < 0)
    {
      this.x = gameCanvas.width;
    }
  }
}
