const FISH_SIZE_FACTOR = 0.5;
const FISH_MIN_SPEED = 0.5;
const FISH_MAX_SPEED = 2.0;

const MIN_DISTANCE_BETWEEN_FISHES = 50;

function Fish() {
    this.x = undefined;
    this.y = undefined;

    this.speedX = undefined;
    this.speedY = 0.5;

    this.width = undefined;
    this.height = undefined;

    this.sprite = undefined;
    this.orientation = undefined;

    this.hasCorrectAnswer = false;
    this.hasIncorrectAnswer = false;

    this.initialize = function () {
        this.orientation = getRandomElementFromArray([-1, 1]);

        this.sprite = getRandomElementFromArray(fishSprites);
        this.width  = FISH_SIZE_FACTOR * this.sprite.width;
        this.height = FISH_SIZE_FACTOR * this.sprite.height;

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
    }

    this.update = function () {
        this.x += this.orientation * this.speedX;
        this.handleCollisionWithCanvasBorder();
        this.setAnswerPositionIfHasAnswer();        
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