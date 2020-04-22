const NO_COLLISION = 0
const COLLISION_WITH_CORRECT_ANSWER   = 1
const COLLISION_WITH_INCORRECT_ANSWER = 2

function CollisionsWithAnswersManager()
{
    this.initialize = function(game)
    {
        this.textAnswerFontSize  = game.textAnswerFontSize;
        this.textAnswerFontStyle = game.textAnswerFontStyle;
        this.imageAnswerWidth = game.imageAnswerWidth;
        this.imageAnswerHeight = game.imageAnswerHeight;
        this.audioImageAnswerWidth = game.audioImageAnswerWidth;
        this.audioImageAnswerHeight = game.audioImageAnswerHeight;
    }

    this.insideBoxColliderForStringAnswer = function(
        collidingObject, targetPromptAndAnswerPairing, answerWidth)
    {
        return (
            collidingObject.x < targetPromptAndAnswerPairing.xCoordinate - 5 + answerWidth &&
            collidingObject.x + collidingObject.width > targetPromptAndAnswerPairing.xCoordinate + 5  &&
            collidingObject.y < targetPromptAndAnswerPairing.yCoordinate + 10 &&
            collidingObject.y + collidingObject.height > targetPromptAndAnswerPairing.yCoordinate - 15
        );
    }

    this.insideBoxColliderForImageAnswers = function(
        collidingObject, targetPromptAndAnswerPairing, imageWidth, imageHeight)
    {
        let correctAnswerRightSide    = targetPromptAndAnswerPairing.xCoordinate + imageWidth;
        let correctAnswerLeftSide     = targetPromptAndAnswerPairing.xCoordinate;
        let correctAnswerBottomSide   = targetPromptAndAnswerPairing.yCoordinate + imageHeight;
        let correctAnswerTopSide      = targetPromptAndAnswerPairing.yCoordinate;
        let collidingObjectLeftSide   = collidingObject.x;
        let collidingObjectRightSide  = collidingObject.x + collidingObject.width;
        let collidingObjectTopSide    = collidingObject.y;
        let collidingObjectBottomSide = collidingObject.y + collidingObject.height;

        return (collidingObjectLeftSide < correctAnswerRightSide &&
                collidingObjectRightSide > correctAnswerLeftSide &&
                collidingObjectTopSide < correctAnswerBottomSide &&
                collidingObjectBottomSide > correctAnswerTopSide)
    }

    this.handleCollisionsWithStringAnswers = function(collidingObject)
    {
        // Get answers width
        correctAnswerWidth = promptsAndAnswersManager.getCorrectAnswerWidthFromFontStyle(
            this.textAnswerFontStyle
        );
        incorrectAnswerWidth = promptsAndAnswersManager.getIncorrectAnswerWidthFromFontStyle(
            this.textAnswerFontStyle
        );

        // Collision with correct answer?
        if (this.insideBoxColliderForStringAnswer(
            collidingObject,
            promptsAndAnswersManager.correctTargetPromptAndAnswerPairing,
            correctAnswerWidth
            )
        ){
            return COLLISION_WITH_CORRECT_ANSWER;
        }

        // Collision with incorrect answer?
        else if (this.insideBoxColliderForStringAnswer(
            collidingObject,
            promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing,
            incorrectAnswerWidth
            )
        ){
            return COLLISION_WITH_INCORRECT_ANSWER;
        }

        return NO_COLLISION;
    }

    this.handleCollisionsWithImageAnswers = function(collidingObject){

        // Collision with correct answer?
        if (this.insideBoxColliderForImageAnswers(
            collidingObject,
            promptsAndAnswersManager.correctTargetPromptAndAnswerPairing,
            this.imageAnswerWidth, this.imageAnswerHeight
            )
        )
        {
            return COLLISION_WITH_CORRECT_ANSWER;
        }

        // Collision with incorrect answer?
        else if (this.insideBoxColliderForImageAnswers(
            collidingObject,
            promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing,
            this.imageAnswerWidth, this.imageAnswerHeight
            )
        )
        {
            return COLLISION_WITH_INCORRECT_ANSWER;
        }

        return NO_COLLISION;
    }

    this.handleCollisionsWithAudioImageAnswers = function(collidingObject){

        // Collision with correct answer?
        if (this.insideBoxColliderForImageAnswers(
            collidingObject,
            promptsAndAnswersManager.correctTargetPromptAndAnswerPairing,
            this.audioImageAnswerWidth, this.audioImageAnswerHeight
            )
        )
        {
            return COLLISION_WITH_CORRECT_ANSWER;
        }

        // Collision with incorrect answer?
        else if (this.insideBoxColliderForImageAnswers(
            collidingObject,
            promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing,
            this.audioImageAnswerWidth, this.audioImageAnswerHeight
            )
        )
        {
            return COLLISION_WITH_INCORRECT_ANSWER;
        }

        return NO_COLLISION;
    }

    this.handleCollisionsWithAnswers = function(collidingObject)
    {
      console.log('handle collisions being called');
      console.log('collidingObject.x: ' + collidingObject.x);
      console.log('collidingObject.y: ' + collidingObject.y);

        // Verify if a collision with an answer happen
        if (promptsAndAnswersManager.currentAnswerDataType === 'string')
        {
            var collisionType = this.handleCollisionsWithStringAnswers(collidingObject);
        }
        else if (promptsAndAnswersManager.currentAnswerDataType === 'IMG')
        {
            var collisionType = this.handleCollisionsWithImageAnswers(collidingObject);
        }
        else if (promptsAndAnswersManager.currentAnswerDataType === 'AUDIO')
        {
            var collisionType = this.handleCollisionsWithAudioImageAnswers(collidingObject);
        }//end of else if for data type checks;

        console.log('collisionType: ' + collisionType);
        // If a collision happens
        if (collisionType != NO_COLLISION)
        {
            this.processCollisionWithAnswer();

            if (collisionType == COLLISION_WITH_CORRECT_ANSWER){
                this.processCollisionWithCorrectAnswer();
            }
            else if (collisionType == COLLISION_WITH_INCORRECT_ANSWER){
                this.processCollisionWithIncorrectAnswer();
            }
        }

        if ( (nextGame === SINGLE_PLAYER_RANDOM || nextGame === TWO_PLAYER_RANDOM) &&
                cycleCount === CYCLE_LIMIT_FOR_RANDOM_GAME_RELOAD )
        {
            loadRandomGame();
            cycleCount = 0;
        }
    }

    this.processCollisionWithAnswer = function (){
        if (nextGame === SINGLE_PLAYER_RANDOM ||
            nextGame === TWO_PLAYER_RANDOM)
        {
            cycleCount++;
        }

        this.resetAnswers();
        calculateAccuracy();
    }

    this.processCollisionWithCorrectAnswer = function(){
        genAudio.playPositive();
        amountCorrect++;
    }

    this.processCollisionWithIncorrectAnswer = function(){
        promptsAndAnswersManager.recordWrongAnswer();
        genAudio.playNegative();
        amountIncorrect++;
    }

    this.resetAnswers = function()
    {
        promptersManager.currentPrompter.currentWidth = 150;
        promptersManager.currentPrompter.currentHeight = 150;
        promptsAndAnswersManager.setOrResetPromptsAndAnswers();
        promptersManager.loadAppropriatePrompterBasedOnCurrentPromptsDataType();
        promptersManager.promptThePlayer();
        gameClassManager.currentGame.playerCharacter.speedX = 0;
        gameClassManager.currentGame.playerCharacter.speedY = 0;
    }
}
CollisionsWithAnswersManager.prototype = new CollisionsWithAnswersManager();
