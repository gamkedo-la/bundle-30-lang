//flowerSpecifics
//Two seeds (WORDS or LETTERS) fall from a tree.  Catching the correct seed in the pot makes a flower, catching the wrong seed makes a weed.

const flowerBackButtonRectangleColor = 'yellow';
const flowerBackButtonTextColor = 'red';
const flowerLetterColor = 'BlueViolet';

flowerGameClass.prototype = new GameClass();
function flowerGameClass(){
    this.name = 'flowerGame';

    this.FRAME_RATE = 1000/50;
    this.letterSpawnInterval = 2000;
	this.titleScreenData = [{
	  name: "Flower",
	  fontSize: 27,
	  spacing: 15,
	  x: 222, y: 385
	}];

  this.drawTransitionText = function()
  {
    customFontFillText(['Catch the answers!', symbolExclamationPointImage], 55,30, 25,50);
    customFontFillText([rightArrowImage, ' ', symbolEqualsImage, ' Move right'], 40,15, gameCanvas.width*0.225,250);
    customFontFillText([leftArrowImage, ' ', symbolEqualsImage, ' Move left'], 40,15, gameCanvas.width*0.225,450);
  };

    this.textAnswerFontSize = 30;
    this.textAnswerFontStyle = this.textAnswerFontSize + 'px Helvetica';

    this.playerCharacter = undefined;
    this.defineAndInitializePlayerCharacter = function()
    {
      this.playerCharacter = new FlowerClass();
      this.collidingObject = this.playerCharacter;
    }
    this.backgroundMusic = new MusicTrack('audio/backgroundTracks/flowerSong(2).mp3', 18);
    this.background = undefined;
    const SEED_ONE_STARTING_X = 100;
    const SEED_ONE_STARTING_Y = 10;
    const SEED_TWO_STARTING_X = 300;
    const SEED_TWO_STARTING_Y = 10;
    const SEED_flowerWidth = 15;
    const SEED_HEIGHT = 15;

    const GRAVITY = 3;

    this.seedOneXCoordinate = undefined;
    this.seedOneYCoordinate = undefined;
    this.seedTwoXCoordinate = undefined;
    this.seedTwoYCoordinate = undefined;

    this.flowerArray = new Array("images\\sprites\\Flower\\10 Second Flower.png", "images\\sprites\\Flower\\10 Second Flower.png", "images\\sprites\\Flower\\10 Second Flower.png", "images\\sprites\\Flower\\10 Second Flower.png", "images\\sprites\\Flower\\10 Second Flower.png");

    var amountCorrectThisGameSession = undefined;
    var amountCorrectAtStart = undefined;

    this.superInitialize = this.initialize;
    this.initialize = function()
    {

      this.collidingObject = this.playerCharacter;
      this.background = new FlowerBackgroundClass();
      amountCorrectAtStart = amountCorrect;
      amountCorrectThisGameSession = 0;
      //initialize seeds
      this.seedOneXCoordinate = SEED_ONE_STARTING_X;
      this.seedOneYCoordinate = SEED_ONE_STARTING_Y;
      this.seedTwoXCoordinate = SEED_TWO_STARTING_X;
      this.seedTwoYCoordinate = SEED_TWO_STARTING_Y;
      // initializePromptAndAnswerObjects();
      // promptsAndAnswersManager.setOrResetPromptsAndAnswers();
      promptersManager.loadAppropriatePrompterBasedOnCurrentPromptsDataType();
	  this.superInitialize();
    };

    this.startGameSpecialCode = function()
    {
      gameAudio.flowerPotLeft = new sfxOneShot('audio/V/flowerPotL.mp3');
      gameAudio.flowerPotRight = new sfxOneShot('audio/V/flowerPotR.mp3');
    }

    this.handleLeftArrowDown = function(){
        this.playerCharacter.xSpeed = this.playerCharacter.LEFT_ARROW_SPEED;
        gameAudio.flowerPotLeft.play();
    };

    this.handleRightArrowDown = function(){
        this.playerCharacter.xSpeed = this.playerCharacter.RIGHT_ARROW_SPEED;
        gameAudio.flowerPotRight.play();
    };

    this.update = function()
    {
      if (!promptersManager.shouldBeDrawingAPrompt &&
          fullGameStateMachine.currentState === fullGameStateMachine.FULL_GAME_ENUMERABLE_STATES.playingMiniGame)
      {
        this.movePlayer();
        this.moveAnswers();
        this.moveSeeds();
        this.handleAnswersOffScreen();
        this.collisionsWithAnswersManager.handleCollisionsWithAnswers(this.collidingObject);

      }
    };

    this.draw = function(){
        this.background.draw();
        this.playerCharacter.draw();
        drawAnswersManager.draw();
        promptersManager.drawPromptsWhenAppropriate();
        this.drawSeeds();
        this.sproutFlowers();
    }

    this.movePlayer = function(){
        this.playerCharacter.x += this.playerCharacter.xSpeed;
        this.handleBoundaries();
    };

    this.moveAnswers = function(){
        promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.yCoordinate += GRAVITY;
        promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.yCoordinate +=GRAVITY;
    }

    this.drawSeeds = function(){
        gameCanvasContext.fillStyle = 'brown';
        gameCanvasContext.fillRect(this.seedOneXCoordinate, this.seedOneYCoordinate, SEED_flowerWidth, SEED_HEIGHT);
        gameCanvasContext.fillRect(this.seedTwoXCoordinate, this.seedTwoYCoordinate, SEED_flowerWidth, SEED_HEIGHT);
    }

    this.moveSeeds = function()
    {
      this.seedOneYCoordinate += GRAVITY;
      this.seedTwoYCoordinate += GRAVITY;
    }

    this.handleBoundaries = function() {
        if (this.playerCharacter.x >= 600) {
            this.playerCharacter.x = 600;
        }
        if (this.playerCharacter.x <= 30) {
            this.playerCharacter.x = 30;
        }
    }

    this.handleAnswersOffScreen = function()
    {
      if (promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.yCoordinate > gameCanvas.height)
      {
        promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.yCoordinate = -10;
      }

      if (promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.yCoordinate > gameCanvas.height)
      {
        promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.yCoordinate = -10;
      }
    }

    this.sproutFlowers = function(){
      this.flowerWidth = 30;
      this.flowerHeight = 60;
      amountCorrectThisGameSession = amountCorrect - amountCorrectAtStart;
      for(i = 0; i < amountCorrectThisGameSession; i++){
        var LeftOrRight = Math.cos(Math.PI*i);
        var flowerLocationX = this.playerCharacter.x;
        if(i > 0){
        flowerLocationX = this.playerCharacter.x + (this.flowerWidth*LeftOrRight*(-1));
        }
        if(i > 2){
          flowerLocationX = this.playerCharacter.x + (this.flowerWidth*LeftOrRight*(-2));
        }

        drawFromSheet(this.flowerArray[i], (flowerLocationX),(this.playerCharacter.y - this.flowerHeight), this.flowerWidth, this.flowerHeight);
        //gameCanvasContext.drawImage(this.flowerArray[i], (flowerLocationX),(this.playerCharacter.y - this.flowerHeight), this.flowerWidth, this.flowerHeight);

      }

      if(amountCorrect > amountCorrectThisGameSession){
          amountCorrectThisGameSession = amountCorrect;
      }


    }
}

const flowerGame = new flowerGameClass();

function FlowerClass()
{
  this.x = gameCanvas.width/3;
  this.y = gameCanvas.height - gameCanvas.height/9;

  this.width = 20;
  this.height = 20;

  this.LEFT_ARROW_SPEED = -5;
  this.RIGHT_ARROW_SPEED = 5;

  this.xSpeed = 0;

  this.draw = function()
  {
      gameCanvasContext.fillStyle = 'red';
      gameCanvasContext.fillRect(this.x,this.y, this.width, this.height);
  }
}

function FlowerBackgroundClass()
{
  this.color = 'cyan';
  this.draw = function()
  {
    gameCanvasContext.fillStyle = this.color;
    gameCanvasContext.fillRect(0,0, gameCanvas.width,gameCanvas.height);
    drawFromSheet("images\\Backgrounds\\Flower2.png", 0,0, gameCanvas.width,gameCanvas.height);
    //gameCanvasContext.drawImage("images\\Backgrounds\\Flower2.png", 0,0, gameCanvas.width,gameCanvas.height);
  }
}
