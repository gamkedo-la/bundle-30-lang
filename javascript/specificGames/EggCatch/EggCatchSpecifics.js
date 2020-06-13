eggCatchGameClass.prototype = new GameClass();
function eggCatchGameClass()
{
  this.name = 'egg catch game';

  this.playerCharacter = undefined;
  this.defineAndInitializePlayerCharacter = function()
  {

  }

  this.drawTransitionText = function()
  {
    customFontFillText(['Catch the answers!', symbolExclamationPointImage], 55,30, 35,50);
    customFontFillText([rightArrowImage, ' ', symbolEqualsImage, ' Move right'], 40,15, gameCanvas.width*0.25,250);
    customFontFillText([leftArrowImage, ' ', symbolEqualsImage, ' Move left'], 40,15, gameCanvas.width*0.25,450);
  }

  this.backgroundMusic = this.backgroundMusic = new MusicTrack('audio/backgroundTracks/eggCatchSong.mp3', 17.4);
  this.FRAME_RATE = 1000/30;
  this.background = new EggCatchBackground();

  this.titleScreenData =
  [
    {name: "Egg", fontSize: 25, spacing: 12, x: 45, y: 565},
    {name: "Catch", fontSize: 25, spacing: 10, x: 37, y: 605}
  ];

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

  this.LETTER_COLOR = 'black';
  this.textAnswerFontSize = '30';
  this.textAnswerFontStyle = this.textAnswerFontSize + 'px Helvetica';

  this.arrayOfAnswerHolders = [];
  this.eggAnswerHolder1 = new EggAnswerHolder('images\\sprites\\eggCatch\\egg.png');
  this.eggAnswerHolder2 = new EggAnswerHolder('images\\sprites\\eggCatch\\egg2.png');
  this.arrayOfAnswerHolders.push(this.eggAnswerHolder1);
  this.arrayOfAnswerHolders.push(this.eggAnswerHolder2);
  this.assignAnswerHolder = function()
  {
    let randomNumber = getRandomIntInclusive(0, this.arrayOfAnswerHolders.length - 1);
    return this.arrayOfAnswerHolders[randomNumber];
  }

  this.chicken1 = undefined;
  this.chicken2 = undefined;

  this.answersXSpeed = 4;

  this.arrayOfCluckSounds = ['audio/V/chickenCluck1.mp3','audio/V/chickenCluck2.mp3','audio/V/chickenCluck3.mp3'];
  this.pregameSpecialCode = function()
  {
    gameAudio.chickenCluck1 = new sfxOneShot('audio/V/chickenCluck1.mp3');
    gameAudio.chickenCluck2 = new sfxOneShot('audio/V/chickenCluck2.mp3');
    gameAudio.chickenCluck3 = new sfxOneShot('audio/V/chickenCluck3.mp3');

    gameAudio.eggBreaking1 = new sfxOneShot('audio/V/eggBreaking.mp3');
    gameAudio.eggBreaking2 = new sfxOneShot('audio/V/eggBreaking2.mp3');
  }

  this.playChickenClucks = function()
  {
    let cluckInterval1 = getRandomArbitrary(2000,5000);
    let cluckInterval2 = getRandomArbitrary(2000,5000);
    let cluckInterval3 = getRandomArbitrary(2000,5000);

    this.intervalCluck1 = setInterval(function(){
      gameAudio.chickenCluck1.play();
    },cluckInterval1);
    this.intervalCluck2 = setInterval(function(){
      gameAudio.chickenCluck2.play();
    },cluckInterval2);
    this.intervalCluck3 = setInterval(function(){
      gameAudio.chickenCluck3.play();
    },cluckInterval3);
  }

  this.collidingObject = undefined;
  this.superInitialize = function()
  {
    this.imageAnswerWidth = gameCanvas.width*0.1;
		this.imageAnswerHeight = gameCanvas.height*0.1;
		this.audioImageAnswerWidth = gameCanvas.width*0.1;
    this.audioImageAnswerHeight = gameCanvas.height*0.1;

    this.imageAnswerHolderWidth = gameCanvas.width*0.15;
		this.imageAnswerHolderHeight = gameCanvas.height*0.15;
		this.audioImageAnswerHolderWidth = gameCanvas.width*0.15;
    this.audioImageAnswerHolderHeight = gameCanvas.height*0.15;
    drawAnswersManager.initialize();

    promptersManager.loadAppropriatePrompterBasedOnCurrentPromptsDataType();

    this.playerCharacter = new BasketPlayerCharacter();
    this.chicken1 = new Chicken(gameCanvas.width*0.25,gameCanvas.height*0.22);
    this.chicken2 = new Chicken(gameCanvas.width*0.6,gameCanvas.height*0.22);
    this.collidingObject = this.playerCharacter;
    this.playChickenClucks();
  }

  this.handleLeftArrowDown = function()
  {
    this.playerCharacter.x -= 5;
  }

  this.handleRightArrowDown = function()
  {
    this.playerCharacter.x  += 5;
  }


  this.update = function()
  {
    if (!promptersManager.shouldBeDrawingAPrompt &&
        fullGameStateMachine.currentState !== fullGameStateMachine.FULL_GAME_ENUMERABLE_STATES.pausedMiniGame)
    {

      this.moveAnswers();
      this.handleAnswersOffScreen();
      this.collisionsWithAnswersManager.handleCollisionsWithAnswers(this.collidingObject);
    }
   }

   this.collisionAudioEffect = function(collisionType)
   {
     if (collisionType === COLLISION_WITH_INCORRECT_ANSWER)
     {
       let fiftyFiftyResult = Math.random();
       if (fiftyFiftyResult < 0.5)
       {
         gameAudio.eggBreaking1.play();
       }
       else {
         gameAudio.eggBreaking2.play();
       }
     }
   }

   this.draw = function()
   {
     this.background.draw();
     this.playerCharacter.draw();
     this.chicken1.draw();
     this.chicken2.draw();
     drawAnswersManager.draw();
     promptersManager.drawPromptsWhenAppropriate();
   }

   this.moveAnswers = function()
   {
     promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.yCoordinate += 3;
     promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.yCoordinate += 3;
   }

   this.handleAnswersOffScreen = function()
   {
     if (promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.yCoordinate > gameCanvas.height - 50)
     {
       this.collisionsWithAnswersManager.processCollisionWithIncorrectAnswer();
       promptsAndAnswersManager.setOrResetPromptsAndAnswers();
       let fiftyFiftyResult = Math.random();
       if (fiftyFiftyResult < 0.5)
       {
         gameAudio.eggBreaking1.play();
       }
       else {
         gameAudio.eggBreaking2.play();
       }
     }
   }


}

const eggCatchGame = new eggCatchGameClass();

function EggCatchBackground()
{
  this.image = 'images\\Backgrounds\\Barn.png';
  this.draw = function()
  {
    drawFromSheet("images\\Backgrounds\\daytimeBackground.png", 0,0, gameCanvas.width,gameCanvas.height);
    drawFromSheet(this.image, 0,0, gameCanvas.width,gameCanvas.height);
    // gameCanvasContext.drawImage("images\\Backgrounds\\daytimeBackground.png", 0,0, gameCanvas.width,gameCanvas.height);
    // gameCanvasContext.drawImage(this.image, 0,0, gameCanvas.width,gameCanvas.height);
  }
}

function EggAnswerHolder(image)
{
  this.image = image;
}
