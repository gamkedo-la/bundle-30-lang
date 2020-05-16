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
        this.width  = FISH_SIZE_FACTOR * this.sprite.width;
        this.height = FISH_SIZE_FACTOR * this.sprite.height;

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
            gameCanvasContext.drawImage(
                this.sprite,
                -this.width/2, 
                -this.height/2,
                this.width, 
                this.height
            );
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