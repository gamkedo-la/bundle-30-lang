fishingGameClass.prototype = new GameClass();

function fishingGameClass()
{
  this.name = 'fishingGame';
  this.playerCharacter = undefined;
  this.textAnswerFontSize = '30';
  this.textAnswerFontStyle = 'px Helvetica';
  this.titleScreenData = [{
	name: "Fishing",
	fontSize: 27,
	spacing: 15,
	 x: 520, y: 480
  }];

  this.background = undefined;
  this.playerCharacter = undefined;

  this.superInitialize = function()
  {
    this.background = new FishingBackground();
  }

  this.defineAndInitializePlayerCharacter = function()
  { 
    this.playerCharacter = new FishingCharacter();
    this.playerCharacter.initialize();
  }

  this.draw = function()
  {
    this.background.draw();
    this.playerCharacter.draw();
  }

  this.update = function()
  {
    
  }

  this.handleLeftArrowDown = function(){
    if (this.playerCharacter.isInitialized){
        this.playerCharacter.moveLeft();
    }
  }

  this.handleRightArrowDown = function(){
    if (this.playerCharacter.isInitialized){
        this.playerCharacter.moveRight();
    }
  }

}

const fishingGame = new fishingGameClass();
