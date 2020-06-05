frogCrateGameClass.prototype = new GameClass();
function frogCrateGameClass()
{
  this.name = 'frog crate game';
  this.playerCharacter = undefined;
  this.defineAndInitializePlayerCharacter = function()
  {
    this.playerCharacter = new FrogCratePlayer();
    this.playerCharacter.tongue = new Tongue();
    this.collidingObject = this.playerCharacter.tongue;

    let fly1OscillationVelocity = getRandomArbitrary(-0.035,0.035);
    let fly2OscillationVelocity = getRandomArbitrary(-0.035,0.035);

    this.fly1 = new Fly(flyImage1, 1,fly1OscillationVelocity);
    this.fly2 = new Fly(flyImage1, -1, fly2OscillationVelocity);
  }

  this.textAnswerFontSize = '15';
  this.textAnswerFontStyle = this.textAnswerFontSize + 'px Helvetica';
  this.LETTER_COLOR = "black";

  this.backgroundMusic = new MusicTrack('audio/backgroundTracks/200410.mp3', 73.46);

  this.titleScreenData =
  [
    {name: "Frog", fontSize: 25, spacing: 15, x: 330, y: 465},
    {name: "Crate", fontSize: 25, spacing: 10, x: 330, y: 505}
  ]

  this.background = new FrogCrateBackground();

  this.fly1 = undefined;
  this.fly2 = undefined;

  this.intialize = function()
  {
    this.defineAndInitializePlayerCharacter();

    this.imageAnswerWidth = gameCanvas.width*0.1;
		this.imageAnswerHeight = gameCanvas.height*0.1;
		this.audioImageAnswerWidth = gameCanvas.width*0.1;
    this.audioImageAnswerHeight = gameCanvas.height*0.1;

    this.imageAnswerHolderWidth = gameCanvas.width*0.15;
		this.imageAnswerHolderHeight = gameCanvas.height*0.15;
		this.audioImageAnswerHolderWidth = gameCanvas.width*0.15;
    this.audioImageAnswerHolderHeight = gameCanvas.height*0.15;


  }

  this.update = function()
  {
    if (!promptersManager.shouldBeDrawingAPrompt &&
        fullGameStateMachine.currentState !== fullGameStateMachine.FULL_GAME_ENUMERABLE_STATES.pausedMiniGame)
        {
          this.playerCharacter.move();
          this.playerCharacter.stretchTongue();
          this.playerCharacter.returnTongue();
          this.playerCharacter.updateTongueLength();

          this.moveFlys();
          this.handleFliesAtEdgesOfScreen();
          this.collisionsWithAnswersManager.handleCollisionsWithAnswers(this.collidingObject);
        }
  }

  this.moveFlys = function()
  {
    this.fly1.move();
    this.fly2.move();
  }

  this.handleFliesAtEdgesOfScreen = function()
  {
    this.fly1.handleEndOfScreenDirectionChanges();
    this.fly2.handleEndOfScreenDirectionChanges();
  }

  this.draw = function()
  {
    this.background.draw();
    this.playerCharacter.draw();

    this.fly1.draw();
    this.fly2.draw();

    drawAnswersManager.draw();
    promptersManager.drawPromptsWhenAppropriate();
  }

  this.handleRightArrowDown = function()
  {
    inputManager.rightArrowIsBeingHeld = true;
  }
  this.handleRightArrowUp = function()
  {
    inputManager.rightArrowIsBeingHeld = false;
  }

  this.handleLeftArrowDown = function()
  {
    inputManager.leftArrowIsBeingHeld = true;
  }
  this.handleLeftArrowUp = function()
  {
    inputManager.leftArrowIsBeingHeld = false;
  }

  this.handleSpaceBarDown = function()
  {
    console.log('space bar pressed');
    if (this.playerCharacter.tongueShouldBeStretchingOut === true || this.playerCharacter.tongueShouldBeReturningToMouth === true)
    {
      return;
    }

    this.playerCharacter.tongueShouldBeStretchingOut = true;
  }
}

const frogCrateGame = new frogCrateGameClass();

function FrogCrateBackground()
{
  this.waterImage = frogRiverBackgroundImage;
  this.skyImage = skyBackground;
  this.bathStoneImage = bathStoneImage;
  this.draw = function()
  {
    gameCanvasContext.drawImage(this.skyImage, 0,0, gameCanvas.width,gameCanvas.height*0.3);
    gameCanvasContext.drawImage(this.waterImage, 0,gameCanvas.height*0.3, gameCanvas.width,gameCanvas.height*0.7);
    gameCanvasContext.drawImage(this.bathStoneImage, 0,gameCanvas.height*0.9, gameCanvas.width,gameCanvas.height*0.15);
  }
}
