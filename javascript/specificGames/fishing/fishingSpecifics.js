var fishSprites = [
  fishingGameFish1, fishingGameFish2, fishingGameFish3
]

const NUM_FISHES = 4;

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

  this.fishes = [];

  this.superInitialize = function()
  {
    this.background = new FishingBackground();

    for (var i = 0 ; i < NUM_FISHES ; ++i)
    {
      var fish = new Fish();
      fish.initialize();
      this.fishes.push(fish);
    }
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
    
    for(var i = 0 ; i < this.fishes.length ; i++){
      this.fishes[i].draw();
    }
  }

  this.update = function()
  {
    if (this.playerCharacter.isInitialized){
      this.playerCharacter.update();
    }

    for(var i = 0 ; i < this.fishes.length ; i++){
      this.fishes[i].update();
    }
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

  this.handleSpaceBarDown = function () {
    if (this.playerCharacter.isInitialized){
      this.playerCharacter.throwHook();
    }
  }

}

const fishingGame = new fishingGameClass();
