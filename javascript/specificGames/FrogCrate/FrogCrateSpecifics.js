frogCrateGameClass.prototype = new GameClass();
function frogCrateGameClass()
{
  this.name = 'frog crate game';
  this.playerCharacter = undefined;
  this.defineAndInitializePlayerCharacter = function()
  {
    this.playerCharacter = new FrogCratePlayer();
  }

  this.textAnswerFontSize = '15';
  this.textAnswerFontStyle = this.textAnswerFontSize + 'px Helvetica';
  this.LETTER_COLOR = "black";

  this.backgroundMusic = undefined;

  this.titleScreenData =
  [
    {name: "Frog", fontSize: 25, spacing: 15, x: 330, y: 465},
    {name: "Crate", fontSize: 25, spacing: 10, x: 330, y: 505}
  ]

  this.background = new FrogCrateBackground();

  this.intialize = function()
  {
    this.defineAndInitializePlayerCharacter();

  }

  this.update = function()
  {
    this.playerCharacter.move();
    this.playerCharacter.stretchTongue();
    this.playerCharacter.returnTongue();
    this.playerCharacter.updateTongueLength();
  }

  this.draw = function()
  {
    this.background.draw();
    this.playerCharacter.draw();
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
