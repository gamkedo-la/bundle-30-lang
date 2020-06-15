const NO_COLLISION = 0
const COLLISION_WITH_CORRECT_ANSWER   = 1
const COLLISION_WITH_INCORRECT_ANSWER = 2

function CollisionsWithAnswersManager()
{
    this.currentCollidedAnswer = undefined;
    this.currentCollidingObjectX = undefined;
    this.currentCollidingObjectY = undefined;

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
            if (gameClassManager.currentGame.collisionVisualEffect)
            {
              gameClassManager.currentGame.collisionVisualEffect(
                drawAnswersManager.currentCorrectAnswerHolderX,
                drawAnswersManager.currentCorrectAnswerHolderY,
                drawAnswersManager.currentCorrectAnswerHolderWidth,
                drawAnswersManager.currentCorrectAnswerHolderHeight)
            }
            this.currentCollidedAnswer = promptsAndAnswersManager.correctTargetPromptAndAnswerPairing;
            this.currentCollidingObjectX = collidingObject.x;
            this.currentCollidingObjectY = collidingObject.y;
            return COLLISION_WITH_CORRECT_ANSWER;
        }

        // Collision with incorrect answer?
        else if (this.insideBoxColliderForStringAnswer(
            collidingObject,
            promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing,
            incorrectAnswerWidth
            )
        ){
          if (gameClassManager.currentGame.collisionVisualEffect)
          {
            gameClassManager.currentGame.collisionVisualEffect(
              drawAnswersManager.currentIncorrectAnswerHolderX,
              drawAnswersManager.currentIncorrectAnswerHolderY,
              drawAnswersManager.currentIncorrectAnswerHolderWidth,
              drawAnswersManager.currentIncorrectAnswerHolderHeight)
          }
          this.currentCollidedAnswer = promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing;
          this.currentCollidingObjectX = collidingObject.x;
          this.currentCollidingObjectY = collidingObject.y;
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
          if (gameClassManager.currentGame.collisionVisualEffect)
          {
            gameClassManager.currentGame.collisionVisualEffect(
              drawAnswersManager.currentCorrectAnswerHolderX,
              drawAnswersManager.currentCorrectAnswerHolderY,
              drawAnswersManager.currentCorrectAnswerHolderWidth,
              drawAnswersManager.currentCorrectAnswerHolderHeight)
          }
          this.currentCollidedAnswer = promptsAndAnswersManager.correctTargetPromptAndAnswerPairing;
          this.currentCollidingObjectX = collidingObject.x;
          this.currentCollidingObjectY = collidingObject.y;
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
          if (gameClassManager.currentGame.collisionVisualEffect)
          {
            gameClassManager.currentGame.collisionVisualEffect(
              drawAnswersManager.currentIncorrectAnswerHolderX,
              drawAnswersManager.currentIncorrectAnswerHolderY,
              drawAnswersManager.currentIncorrectAnswerHolderWidth,
              drawAnswersManager.currentIncorrectAnswerHolderHeight)
          }
          this.currentCollidedAnswer = promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing;
          this.currentCollidingObjectX = collidingObject.x;
          this.currentCollidingObjectY = collidingObject.y;
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
          if (gameClassManager.currentGame.collisionVisualEffect)
          {
            gameClassManager.currentGame.collisionVisualEffect(
              drawAnswersManager.currentCorrectAnswerHolderX,
              drawAnswersManager.currentCorrectAnswerHolderY,
              drawAnswersManager.currentCorrectAnswerHolderWidth,
              drawAnswersManager.currentCorrectAnswerHolderHeight)
          }
          this.currentCollidedAnswer = promptsAndAnswersManager.correctTargetPromptAndAnswerPairing;
          this.currentCollidingObjectX = collidingObject.x;
          this.currentCollidingObjectY = collidingObject.y;
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
          if (gameClassManager.currentGame.collisionVisualEffect)
          {
            gameClassManager.currentGame.collisionVisualEffect(
              drawAnswersManager.currentIncorrectAnswerHolderX,
              drawAnswersManager.currentIncorrectAnswerHolderY,
              drawAnswersManager.currentIncorrectAnswerHolderWidth,
              drawAnswersManager.currentIncorrectAnswerHolderHeight)
          }
          this.currentCollidedAnswer = promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing;
          this.currentCollidingObjectX = collidingObject.x;
          this.currentCollidingObjectY = collidingObject.y;
          return COLLISION_WITH_INCORRECT_ANSWER;
        }

        return NO_COLLISION;
    }

    this.handleCollisionsWithAnswers = function(collidingObject)
    {
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

        // If a collision happens
        if (collisionType != NO_COLLISION)
        {
          if (gameClassManager.currentGame.name === 'spaceShooter')
          {
            gameClassManager.currentGame.spaceRockParticleManager.createAGroupOfParticles();
            gameClassManager.currentGame.rocketExplosionsManager.createAnExplosion();
          }
          if (gameClassManager.currentGame.name === 'finder game')
          {
            if (collisionType === COLLISION_WITH_CORRECT_ANSWER)
            {
              gameClassManager.currentGame.playerCharacter.x = gameClassManager.currentGame.playerCharacter.startingX;
              gameClassManager.currentGame.playerCharacter.y = gameClassManager.currentGame.playerCharacter.startingY;
              gameClassManager.currentGame.playerCharacter.numberOfKeys++;
              console.log('gameClassManager.currentGame.playerCharacter.numberOfKeys++: ' + gameClassManager.currentGame.playerCharacter.numberOfKeys++);
            }
          }
          if (gameClassManager.currentGame.name === 'nighttime game')
          {
            if (collisionType === COLLISION_WITH_INCORRECT_ANSWER)
            {
              gameClassManager.currentGame.playerCharacter.laserShot.y =
              promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.yCoordinate + 75;
              gameClassManager.currentGame.playerCharacter.laserShot.height = gameCanvas.height -
              gameClassManager.currentGame.playerCharacter.laserShot.y - (gameCanvas.height - gameClassManager.currentGame.playerCharacter.ghostGunY);
            }
            else if (collisionType === COLLISION_WITH_CORRECT_ANSWER)
            {
              gameClassManager.currentGame.playerCharacter.laserShot.y =
              promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.yCoordinate + 75;
              gameClassManager.currentGame.playerCharacter.laserShot.height = gameCanvas.height -
              gameClassManager.currentGame.playerCharacter.laserShot.y - (gameCanvas.height - gameClassManager.currentGame.playerCharacter.ghostGunY);
            }
          }
          if (gameClassManager.currentGame.name === 'frog crate game')
          {
            let tongue = gameClassManager.currentGame.playerCharacter.tongue;
            let playerCharacter = gameClassManager.currentGame.playerCharacter;

            tongue.y = playerCharacter.y - 10;
            tongue.height = playerCharacter.y - tongue.y + 10;
            playerCharacter.tongueShouldBeStretchingOut = false;
            playerCharacter.tongueShouldBeReturningToMouth = false;
          }
          // if (gameClassManager.currentGame.collisionVisualEffect)
          // {
          //   gameClassManager.currentGame.collisionVisualEffect();
          // }
          if (gameClassManager.currentGame.collisionAudioEffect)
          {
            gameClassManager.currentGame.collisionAudioEffect(collisionType);
          }

          if (collisionType == COLLISION_WITH_CORRECT_ANSWER){
              this.processCollisionWithCorrectAnswer();
          }
          else if (collisionType == COLLISION_WITH_INCORRECT_ANSWER){
              this.processCollisionWithIncorrectAnswer();
          }

          this.processCollisionWithAnswer();
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
        if (gameClassManager.currentGame.name === 'birdGame')
        {
          if (gameClassManager.currentGame.amountCorrect <
              gameClassManager.currentGame.plane.bannerMessageCharacters.length)
              {
                gameClassManager.currentGame.amountCorrect++;
              }
        }
        if (gameClassManager.currentGame.name === 'laneGame')
        {
          if (gameClassManager.currentGame.amountCorrect <
              gameClassManager.currentGame.background.billboard.bannerMessageCharacters.length)
              {
                gameClassManager.currentGame.amountCorrect++;
              }
        }
    }

    this.processCollisionWithIncorrectAnswer = function(){
        promptsAndAnswersManager.recordWrongAnswer();
        genAudio.playNegative();
        amountIncorrect++;
    }

    this.resetAnswers = function()
    {
        //promptersManager.currentPrompter.currentWidth = 150;
        //promptersManager.currentPrompter.currentHeight = 150;
        promptsAndAnswersManager.setOrResetPromptsAndAnswers();
        promptersManager.loadAppropriatePrompterBasedOnCurrentPromptsDataType();
        promptersManager.promptThePlayer();
        if (gameClassManager.currentGame.playerCharacter != null) {
          gameClassManager.currentGame.playerCharacter.speedX = 0;
          gameClassManager.currentGame.playerCharacter.speedY = 0;
        }
    }
}
CollisionsWithAnswersManager.prototype = new CollisionsWithAnswersManager();
