var fishSprites = [
  fishingGameFish1, fishingGameFish2, fishingGameFish3
]

const NUM_FISHES = 4;

fishingGameClass.prototype = new GameClass();
function fishingGameClass()
{
  this.name = 'fishingGame';
  this.playerCharacter = undefined;
  this.textAnswerFontSize = '15';
  this.textAnswerFontStyle = this.textAnswerFontSize + 'px Helvetica';
  this.LETTER_COLOR = "black";

  this.backgroundMusic = new MusicTrack('audio/backgroundTracks/fishingVillageMusic(3).mp3', 24);
  this.titleScreenData = [{
    name: "Fishing",
    fontSize: 27,
    spacing: 15,
    x: 520, y: 480
  }];

  this.background = undefined;
  this.playerCharacter = undefined;

  this.fishes = [];

  this.collisionsWithAnswersManager = new FishingCollisionManager();

  this.superInitialize = function()
  {
    this.background = new FishingBackground();
    this.initializeFishes();
    gameAudio.rodCasting = new sfxOneShot('audio/V/rodCasting.mp3');
  }

  this.initializeFishes = function() {
    this.fishes = [];
    for (var i = 0 ; i < NUM_FISHES ; ++i)
    {
      var oneFish = new Fish();
      oneFish.initialize();
      oneFish.fishingHook = this.playerCharacter.fishingHook;
      this.fishes.push(oneFish);
    }
    this.selectFishesForAnswers();
  }

  this.selectFishesForAnswers = function() {
    var correctFishIdx = getRandomIntInclusive(0, this.fishes.length-1);
    var incorrectFishIdx = getRandomIntInclusive(0, this.fishes.length-1);
    while (incorrectFishIdx == correctFishIdx){
      incorrectFishIdx = getRandomIntInclusive(0, this.fishes.length-1);
    }

    this.fishes[correctFishIdx].hasCorrectAnswer = true;
    this.fishes[incorrectFishIdx].hasIncorrectAnswer = true;
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

    drawAnswersManager.draw();
    promptersManager.drawPromptsWhenAppropriate();
  }

  this.update = function()
  {
    this.updateAllFishes();
    this.playerCharacter.update();
    this.collisionsWithAnswersManager.handleCollisionsWithAnswers(
      this.playerCharacter.fishingBucket
    );
  }

  this.reset = function() {
    this.playerCharacter.resetHook();
    this.playerCharacter.speedX = 5;
    this.resetFishes();
  }

  this.updateAllFishes = function(){
    for(var i = 0 ; i < this.fishes.length ; i++){
      this.fishes[i].update();
    }
  }

  this.resetFishes = function() {
    for (var i = 0 ; i < NUM_FISHES ; ++i)
    {
      this.fishes.pop();
    }
    this.initializeFishes();
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

  this.drawTransitionText = function()
  {
    customFontFillText(['Catch The Fishes', symbolExclamationPointImage], 60,30, 100,50);
    customFontFillText([rightArrowImage, ' ', symbolEqualsImage, ' move right'], 30,15, 350,350);
    customFontFillText(['Space bar', ' ', symbolEqualsImage, ' throw ', symbolCommaImage, ' lift line'], 30,15,80,500);
    customFontFillText([leftArrowImage, ' ', symbolEqualsImage, ' move left'], 30,15, 50,350);
  }

}

const fishingGame = new fishingGameClass();
