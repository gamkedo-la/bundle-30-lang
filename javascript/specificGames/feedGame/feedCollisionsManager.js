function feedCollisionsManager() {
    CollisionsWithAnswersManager.call(this);

    this.processCollisionWithAnswer = function (){
        if (nextGame === SINGLE_PLAYER_RANDOM ||
            nextGame === TWO_PLAYER_RANDOM)
        {
            cycleCount++;
        }
        calculateAccuracy();
    }

    this.processCollisionWithCorrectAnswer = function(){
        CollisionsWithAnswersManager.prototype.processCollisionWithCorrectAnswer();
        gameClassManager.currentGame.correctAnswersYSpeed *= -1;
        let randomImageIndex = getRandomIntInclusive(0, gameClassManager.currentGame.arrayOfUpsideDownAnswerHolders.length - 1);
        
        promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.answerHolder.image =
        gameClassManager.currentGame.arrayOfUpsideDownAnswerHolders[randomImageIndex].image;

        let arrayOfGemImages = gameClassManager.currentGame.playerCharacter.arrayOfGemImages;
        let randomIndexForArrayOfGemImages = getRandomIntInclusive(0,arrayOfGemImages.length - 1);
        let randomGemImage = arrayOfGemImages[randomIndexForArrayOfGemImages];
        let arrayOfGems = gameClassManager.currentGame.playerCharacter.arrayOfGems;
        let paddleX = gameClassManager.currentGame.playerCharacter.x;
        let gemBaseWidth = 10;
        let paddleWidth = gameClassManager.currentGame.playerCharacter.width;
        let paddleRightLimitXForGemToFitOnPaddle = paddleX + paddleWidth - gemBaseWidth;
        let randomGemX = getRandomArbitrary(paddleX,paddleRightLimitXForGemToFitOnPaddle);
        let gemY = gameClassManager.currentGame.playerCharacter.y;
        let gem = new Gem(randomGemImage, randomGemX,gemY);
        arrayOfGems.push(gem);
    }

    this.processCollisionWithIncorrectAnswer = function(){
        CollisionsWithAnswersManager.prototype.processCollisionWithIncorrectAnswer();
        gameClassManager.currentGame.incorrectAnswersYSpeed *= -1;
        let randomImageIndex = getRandomIntInclusive(0, gameClassManager.currentGame.arrayOfUpsideDownAnswerHolders.length - 1);
        promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.answerHolder.image =
        gameClassManager.currentGame.arrayOfUpsideDownAnswerHolders[randomImageIndex].image;
    }
}

feedCollisionsManager.prototype = new CollisionsWithAnswersManager();
feedCollisionsManager.prototype.constructor = feedCollisionsManager;
