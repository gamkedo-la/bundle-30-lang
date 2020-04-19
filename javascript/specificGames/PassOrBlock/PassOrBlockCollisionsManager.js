function PassOrBlockCollisionsManager() {
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
        console.log('randomImageIndex: ' + randomImageIndex);
        console.log('gameClassManager.currentGame.arrayOfUpsideDownAnswerHolders[randomImageIndex]: ' +
                     gameClassManager.currentGame.arrayOfUpsideDownAnswerHolders[randomImageIndex]);
        promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.answerHolder.image =
        gameClassManager.currentGame.arrayOfUpsideDownAnswerHolders[randomImageIndex].image;
    }

    this.processCollisionWithIncorrectAnswer = function(){
        CollisionsWithAnswersManager.prototype.processCollisionWithIncorrectAnswer();
        gameClassManager.currentGame.incorrectAnswersYSpeed *= -1;
        console.log('randomImageIndex: ' + randomImageIndex);
        console.log('gameClassManager.currentGame.arrayOfUpsideDownAnswerHolders[randomImageIndex]: ' +
                     gameClassManager.currentGame.arrayOfUpsideDownAnswerHolders[randomImageIndex]);
        let randomImageIndex = getRandomIntInclusive(0, gameClassManager.currentGame.arrayOfUpsideDownAnswerHolders.length - 1);
        promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.answerHolder.image =
        gameClassManager.currentGame.arrayOfUpsideDownAnswerHolders[randomImageIndex].image;
    }
}

PassOrBlockCollisionsManager.prototype = new CollisionsWithAnswersManager();
PassOrBlockCollisionsManager.prototype.constructor = PassOrBlockCollisionsManager;
