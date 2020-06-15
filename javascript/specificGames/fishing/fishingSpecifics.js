FishingCollisionManager = function() {
    CollisionsWithAnswersManager.call(this);

    this.resetAnswers = function()
    {
        CollisionsWithAnswersManager.prototype.resetAnswers();
        gameClassManager.currentGame.reset();
    }
}
FishingCollisionManager.prototype = new CollisionsWithAnswersManager();
FishingCollisionManager.prototype.constructor = FishingCollisionManager;

var fishSprites = [
  "images\\sprites\\Fishing\\fish.png",
  "images\\sprites\\Fishing\\fish2.png",
  "images\\sprites\\Fishing\\fish3.png"
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

function FishingHook() {
    this.x = undefined;
    this.y = undefined;

    this.width = 10;
    this.height = 10;

    this.isThrown = false;
    this.isFalling = false;
    this.isEatenByFish = false;
    this.isPulledBack = false;

    this.speedX = 5;
    this.speedY = 2;

    this.fishCaught = undefined;

    this.outLocationX = undefined;
    this.outLocationY = undefined;

    this.fishingRodLocationX = undefined;
    this.fishingRodLocationY = undefined;

    this.bezierParameter = 0;
    this.bezierSpeed = 0.05;

    this.draw = function () {
        gameCanvasContext.save();
        gameCanvasContext.fillStyle = "red";
        gameCanvasContext.beginPath();
        gameCanvasContext.arc(
            this.x, this.y, 10, 0, 2*Math.PI, true
        );
        gameCanvasContext.fill();
        gameCanvasContext.restore();
    }

    this.reset = function () {
        this.isThrown = false;
        this.isFalling = false;
        this.isEatenByFish = false;
        this.isPulledBack = false;
        this.fishCaught = undefined;
        this.bezierParameter = 0;
        this.outLocationX = undefined;
        this.outLocationY = undefined;
        this.fishingRodLocationX = undefined;
        this.fishingRodLocationY = undefined;
    }

    this.update = function () {
        if (this.isFalling){
            if (
                this.fishingRodLocationX == undefined &&
                this.fishingRodLocationY == undefined
            ){
                this.fishingRodLocationX = this.x;
                this.fishingRodLocationY = this.y;
            }

            this.y += this.speedY;

            if(this.y > gameCanvas.height){
                this.isFalling = false;
            }
        }
        else if (this.isEatenByFish && this.y > WATER_HEIGHT){
            this.x = this.fishCaught.headX;
            this.y = this.fishCaught.y;
        }
        else if (this.isEatenByFish && this.bezierParameter < 1){
            if (
                this.outLocationX == undefined &&
                this.outLocationY == undefined
            ){
                this.outLocationX = this.x;
                this.outLocationY = this.y;
            }

            this.x = this.getCoordinateOnBezierCurve(
                this.outLocationX, this.outLocationX, this.fishingRodLocationX, this.fishingRodLocationX
            );
            this.y = this.getCoordinateOnBezierCurve(
                this.outLocationY, this.fishingRodLocationY, WATER_HEIGHT/2, this.fishingRodLocationY
            );
            this.bezierParameter += this.bezierSpeed;
        }
    }

    this.getCoordinateOnBezierCurve = function(
        originCoordinate,   // P0
        control1Coordinate, // P1
        control2Coordinate, // P2
        targetCoordinate    // P3
    ){
        //  (1-t)^3*P0 + 3(1-t)^2*t*P1 + 3(1-t)*t^2*P2 + t^3*P3
        var bezierCoordinate  =     (1 - this.bezierParameter)**3 * originCoordinate;
        bezierCoordinate     += 3 * (1 - this.bezierParameter)**2 * this.bezierParameter * control1Coordinate;
        bezierCoordinate     += 3 * (1 - this.bezierParameter)    * this.bezierParameter**2 * control2Coordinate;
        bezierCoordinate     += this.bezierParameter**3 * targetCoordinate;

        return bezierCoordinate;
    }

    this.moveLeft = function () {
        if (this.isFalling && !this.isEatenByFish){
            this.x -= this.speedX;
        }
    }

    this.moveRight = function () {
        if (this.isFalling && !this.isEatenByFish){
            this.x += this.speedX;
        }
    }
}



const FISHING_ROD_LENGTH = 70;

function FishingCharacter () {
    this.isInitialized = false;

    this.x = undefined;
    this.y = undefined;

    this.width = 70;
    this.height = 70;

    this.speedX = 5;

    this.fishingHook = undefined;

    this.fishingBucket = undefined;

    this.caughtFish = false;

    this.initialize = function() {
        this.x = gameCanvas.width / 2;
        this.y = WATER_HEIGHT - 30;
        this.isInitialized = true;

        this.fishingHook = new FishingHook();
        this.fishingHook.x = this.x + this.width/2;
        this.fishingHook.y = this.y + 5;

        this.fishingBucket = new FishingBucket();
        this.fishingBucket.initialize(this.x - this.width/2);

        this.caughtFish = false
    }

    this.resetHook = function() {
        this.fishingHook.x = this.x + this.width/2;;
        this.fishingHook.y = this.y + 5;
        this.fishingHook.reset();
    }

    this.update = function () {
        if (this.isInitialized){
            if (!this.fishingHook.isThrown){
                this.fishingHook.x = this.x + this.width/2;
                this.fishingBucket.updateXPosition(this.x - this.width/2);
            }
            this.fishingHook.update();
        }
    }

    this.draw = function () {

        this.drawCharacter();
        this.fishingBucket.draw();
        this.drawBoat();
        this.drawFishingLine();
        this.fishingHook.draw();
    }

    this.drawCharacter = function(){
        drawFromSheet('images\\sprites\\Fishing\\person.png',
        this.x - this.width/2,
        this.y - this.height/2,
        this.width, this.height)
        // gameCanvasContext.drawImage(
        //     fishingGameCharacter,
        //     this.x - this.width/2,
        //     this.y - this.height/2,
        //     this.width, this.height
        //)
    }

    this.drawBoat = function() {
      drawFromSheet('images\\sprites\\Fishing\\boat.png',
      this.x - 100,
      WATER_HEIGHT - 15,
      150, 30)
        // gameCanvasContext.drawImage(
        //     fishingGameBoat,
        //     this.x - 100,
        //     WATER_HEIGHT - 15,
        //     150, 30
        // )
    }

    this.drawFishingLine = function() {
        if (this.fishingHook.isThrown){
            gameCanvasContext.save();
            gameCanvasContext.strokeStyle = "black";
            gameCanvasContext.lineWidth = 2;
            gameCanvasContext.beginPath();
            gameCanvasContext.moveTo(this.x + this.width/2, this.y + 5)
            gameCanvasContext.bezierCurveTo(
                this.x + this.width/2, WATER_HEIGHT,
                this.fishingHook.x, WATER_HEIGHT,
                this.fishingHook.x, this.fishingHook.y
            );
            gameCanvasContext.stroke();
            gameCanvasContext.restore();
        }
    }

    this.throwHook = function () {
        if (!this.fishingHook.isThrown){
            this.fishingHook.isThrown = true;
            this.fishingHook.isFalling = true;
            gameAudio.rodCasting.play();
        }
        else if (this.fishingHook.isEatenByFish){
            this.fishingHook.isPulledBack = true;
            gameAudio.rodCasting.play();
        }
    }

    this.moveLeft = function(){
        if (!this.fishingHook.isThrown){
            this.x -= this.speedX;

            if (this.x  < this.width/2){
                this.x += this.speedX;
            }
        }
        else {
            this.fishingHook.moveLeft()
        }
    }

    this.moveRight = function(){
        if (!this.fishingHook.isThrown){
            this.x += this.speedX;

            if (this.x  > gameCanvas.width - this.width/2){
                this.x -= this.speedX;
            }
        }
        else {
            this.fishingHook.moveRight()
        }
    }
}

const BUCKET_SPACE_TO_CHAR = 10;

function FishingBucket() {

    this.x = undefined;
    this.y = undefined;

    this.width  = 40;
    this.height = 15;

    this.initialize = function(x){
        this.updateXPosition(x);
        this.y = WATER_HEIGHT - 20;
    }

    this.updateXPosition = function(x){
        this.x = x - this.width/2 - BUCKET_SPACE_TO_CHAR;
    }

    this.draw = function(){
        gameCanvasContext.save();
        gameCanvasContext.fillStyle = "green";
        gameCanvasContext.fillRect(
            this.x - this.width/2, this.y - this.height/2,
            this.width, this.height
        );
        gameCanvasContext.restore();
    }
}

const WATER_HEIGHT = 210;

function FishingBackground()
{
  this.waterImage = 'images\\Backgrounds\\underwater2.png';
  this.skyImage = "images\\Backgrounds\\Sky.png";
  this.draw = function()
  {
    drawFromSheet(this.skyImage, 0,0, gameCanvas.width,gameCanvas.height*0.3);
    drawFromSheet(this.waterImage, 0,gameCanvas.height*0.3, gameCanvas.width,gameCanvas.height*0.7);
    //gameCanvasContext.drawImage(this.skyImage, 0,0, gameCanvas.width,gameCanvas.height*0.3);
    //gameCanvasContext.drawImage(this.waterImage, 0,gameCanvas.height*0.3, gameCanvas.width,gameCanvas.height*0.7);
  }
}

const FISH_SIZE_FACTOR = 0.5;
const FISH_MIN_SPEED = 0.5;
const FISH_MAX_SPEED = 2.0;

const MIN_DISTANCE_BETWEEN_FISHES = 50;

const PROJECTION_TO_BUCKET_SPEED = 0.03;

const FISH_HEAD_X = 40;

function Fish() {
    this.x = undefined;
    this.y = undefined;

    this.headX = undefined;

    this.headWidth = undefined;

    this.speedX = undefined;
    this.speedY = 0.5;

    this.width = undefined;
    this.height = undefined;

    this.sprite = undefined;
    this.orientation = undefined;

    this.hasCorrectAnswer = false;
    this.hasIncorrectAnswer = false;

    this.fishingHook = undefined;

    this.hasEatenHook = false;

    this.oscillation = 0.0;
    this.oscillationSpeed = undefined;

    this.drawTrajectoryToBucket = false;

    this.bucketX = undefined;
    this.bucketY = undefined;
    this.caughtLocationX = undefined;
    this.caughtLocationY = undefined;

    this.bezierParameter = 0.0;
    this.isInBucket = false;

    this.initialize = function () {
        this.orientation = getRandomElementFromArray([-1, 1]);

        this.sprite = getRandomElementFromArray(fishSprites);
        this.width  = FISH_SIZE_FACTOR * 190; // pre-string this.sprite.width
        this.height = FISH_SIZE_FACTOR * 67; // pre-string this.sprite.height

        this.headWidth = this.width * 0.3;
        this.headXOffset = (this.width - this.headWidth) / 2;

        this.x = getRandomArbitrary(
            this.width/2, gameCanvas.width - this.width/2
        );

        while (this.scanForOtherFishesTooClose()){
            this.y = getRandomArbitrary(
                300 + this.height/2, gameCanvas.height - this.height/2
            );
        }

        this.speedX = getRandomArbitrary(FISH_MIN_SPEED, FISH_MAX_SPEED);

        this.hasCorrectAnswer = false;
        this.hasIncorrectAnswer = false;

        this.oscillation = 0.0;
        this.oscillationSpeed = 5 * Math.PI / gameClassManager.currentGame.FRAME_RATE;

        this.bezierParameter = 0.0;
    }

    this.update = function () {
        if (!this.isInBucket)
        {
            this.updatePosition();
            this.handleCollisionWithCanvasBorder();
            this.setAnswerPositionIfHasAnswer();
            this.handleCollisionWithFishingHook();
        }
    }

    this.updatePosition = function() {
        if (!this.hasEatenHook){
            this.x += this.orientation * this.speedX;
        }
        else{
            this.updatePositionWhenHasEatenHook();
        }

        this.headX = this.x + this.orientation * this.headXOffset;
    }

    this.updatePositionWhenHasEatenHook = function() {

        if (this.fishingHook.isPulledBack){
            this.setCaughtAndBucketLocationsIfUndefined();
            this.projectToBucket();
        }
        else {
            this.oscillateTryingToEscape();
        }
    }

    this.oscillateTryingToEscape = function() {
        this.x -= this.orientation * 1.0;
        this.y += 0.5 + 2*Math.sin(this.oscillation);
        this.oscillation += this.oscillationSpeed;
        if (this.oscillation >= Math.PI * 2){
            this.oscillation = 0.0;
        }
    }

    this.projectToBucket = function () {
        if (this.bezierParameter < 1 + PROJECTION_TO_BUCKET_SPEED){
            this.updatePositionOnProjectionTrajectory();
        }
        else{
            this.isInBucket = true;
            gameClassManager.currentGame.playerCharacter.resetHook();
        }
    }

    this.updatePositionOnProjectionTrajectory = function(){
        this.x = this.getCoordinateOnBezierCurve(
            this.caughtLocationX, this.caughtLocationX, this.bucketX, this.bucketX
        )

        this.y = this.getCoordinateOnBezierCurve(
            this.caughtLocationY, -WATER_HEIGHT, 0, this.bucketY
        )

        this.bezierParameter += PROJECTION_TO_BUCKET_SPEED;
    }

    this.getCoordinateOnBezierCurve = function(
        originCoordinate,   // P0
        control1Coordinate, // P1
        control2Coordinate, // P2
        targetCoordinate    // P3
    ){
        //  (1-t)^3*P0 + 3(1-t)^2*t*P1 + 3(1-t)*t^2*P2 + t^3*P3
        var bezierCoordinate  =     (1 - this.bezierParameter)**3 * originCoordinate;
        bezierCoordinate     += 3 * (1 - this.bezierParameter)**2 * this.bezierParameter * control1Coordinate;
        bezierCoordinate     += 3 * (1 - this.bezierParameter)    * this.bezierParameter**2 * control2Coordinate;
        bezierCoordinate     += this.bezierParameter**3 * targetCoordinate;

        return bezierCoordinate;
    }

    this.setCaughtAndBucketLocationsIfUndefined = function() {
        if (this.bucketX == undefined &&
            this.bucketY == undefined &&
            this.caughtLocationY == undefined &&
            this.caughtLocationY == undefined
        )
        {
            this.bucketX = gameClassManager.currentGame.playerCharacter.fishingBucket.x;
            this.bucketY = gameClassManager.currentGame.playerCharacter.fishingBucket.y;
            this.caughtLocationX = this.x;
            this.caughtLocationY = this.y
        }

        if (debugOn && !this.drawTrajectoryToBucket){
            this.drawTrajectoryToBucket = true;
        }
    }

    this.handleCollisionWithFishingHook = function() {
        if(
            this.x + this.width/2 > this.fishingHook.x - this.fishingHook.width &&
            this.x - this.width/2 < this.fishingHook.x + this.fishingHook.width &&
            this.y + this.height/2 > this.fishingHook.y - this.fishingHook.height &&
            this.y - this.height/2 < this.fishingHook.y + this.fishingHook.height &&
            !this.fishingHook.isEatenByFish
        )
        {
            this.fishingHook.isEatenByFish = true;
            this.fishingHook.isFalling = false;
            this.fishingHook.fishCaught = this;
            this.hasEatenHook = true;
        }
    }

    this.handleCollisionWithCanvasBorder = function() {
        if (this.x > gameCanvas.width - this.width / 2){
            this.orientation = -1;
        }
        else if (this.x < this.width / 2){
            this.orientation = 1;
        }
    }

    this.setAnswerPositionIfHasAnswer = function (){
        if (this.hasCorrectAnswer || this.hasIncorrectAnswer){
            var centeredPosition = this.centerAnswersCoordinate();

            if (this.hasCorrectAnswer){
                promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.xCoordinate = centeredPosition.x;
                promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.yCoordinate = centeredPosition.y;
            }
            else if (this.hasIncorrectAnswer){
                promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.xCoordinate = centeredPosition.x;
                promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.yCoordinate = centeredPosition.y;
            }
        }
    }

    this.centerAnswersCoordinate = function() {
        var centeredX = this.x;
        var centeredY = this.y;

        if (promptsAndAnswersManager.currentAnswerDataType === 'string'){
            var answerWidth;
            if (this.hasCorrectAnswer){
                answerWidth = promptsAndAnswersManager.getCorrectAnswerWidthFromFontStyle(
                    gameClassManager.currentGame.textAnswerFontStyle
                )
            }
            else if (this.hasIncorrectAnswer){
                answerWidth = promptsAndAnswersManager.getIncorrectAnswerWidthFromFontStyle(
                    gameClassManager.currentGame.textAnswerFontStyle
                )
            }

            centeredX -= answerWidth / 2;
            centeredY += gameClassManager.currentGame.textAnswerFontSize / 4;
        }
        else if (promptsAndAnswersManager.currentAnswerDataType === 'IMG'){
            centeredX -= gameClassManager.currentGame.imageAnswerWidth / 2;
            centeredY -= gameClassManager.currentGame.imageAnswerHeight / 2;
        }
        else if (promptsAndAnswersManager.currentAnswerDataType === 'AUDIO'){
            centeredX -= gameClassManager.currentGame.audioImageAnswerWidth / 2;
            centeredY -= gameClassManager.currentGame.audioImageAnswerHeight / 2;
        }

        return {
            x: centeredX,
            y: centeredY
        }
    }

    this.draw = function () {
        if (!this.isInBucket)
        {
            gameCanvasContext.save();
            gameCanvasContext.translate(this.x, this.y);
            gameCanvasContext.scale(this.orientation, 1);
            drawFromSheet(
              this.sprite,
            -this.width/2,
            -this.height/2,
            this.width,
            this.height);
            // gameCanvasContext.drawImage(
            //     this.sprite,
            //     -this.width/2,
            //     -this.height/2,
            //     this.width,
            //     this.height
            // );
            gameCanvasContext.restore();

            this.drawBoundingBoxesIfDebugMode();
            this.drawProjectionTrajectoryIfDebugMode();
        }
    }

    this.drawBoundingBoxesIfDebugMode = function() {
        if (debugOn){

            gameCanvasContext.save();
            gameCanvasContext.translate(this.x, this.y);
            gameCanvasContext.scale(this.orientation, 1);
            gameCanvasContext.strokeStyle = "purple";
            gameCanvasContext.lineWidth = 3;
            gameCanvasContext.strokeRect(
                -this.width/2,
                -this.height/2,
                this.width,
                this.height
            );
            gameCanvasContext.restore();

            gameCanvasContext.save();
            gameCanvasContext.translate(this.headX, this.y);
            gameCanvasContext.lineWidth = 2;
            gameCanvasContext.strokeStyle = "red";
            gameCanvasContext.strokeRect(
                -this.headWidth/2,
                -this.height/2,
                this.headWidth,
                this.height
            );
            gameCanvasContext.restore();
        }
    }

    this.drawProjectionTrajectoryIfDebugMode = function()
    {
        if (debugOn && this.drawTrajectoryToBucket)
        {
            gameCanvasContext.save();
            gameCanvasContext.strokeStyle = "red";
            gameCanvasContext.lineWidth = 2;
            gameCanvasContext.beginPath();
            gameCanvasContext.moveTo(this.caughtLocationX, this.caughtLocationY);
            gameCanvasContext.bezierCurveTo(
                this.caughtLocationX, -WATER_HEIGHT,
                this.bucketX, 0,
                this.bucketX, this.bucketY
            );
            gameCanvasContext.stroke();
            gameCanvasContext.restore();
        }
    }

    this.scanForOtherFishesTooClose = function() {

        if (this.y == undefined){
            return true;
        }

        var otherFishesInWater = gameClassManager.currentGame.fishes;

        for (var i=0 ; i < otherFishesInWater.length ; i++){
            if (Math.abs(this.y - otherFishesInWater[i].y) <
                MIN_DISTANCE_BETWEEN_FISHES
            ){
                return true;
            }
        }

        return false;
    }
}
