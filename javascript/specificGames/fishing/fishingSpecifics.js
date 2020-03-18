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

  this.draw = function()
  {
    this.background.draw();
  }

  this.update = function()
  {
    
  }
}

const fishingGame = new fishingGameClass();
