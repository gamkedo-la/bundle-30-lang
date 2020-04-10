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
    }

    this.processCollisionWithIncorrectAnswer = function(){
        CollisionsWithAnswersManager.prototype.processCollisionWithIncorrectAnswer();
        gameClassManager.currentGame.incorrectAnswersYSpeed *= -1;
    }
}

PassOrBlockCollisionsManager.prototype = new CollisionsWithAnswersManager();
PassOrBlockCollisionsManager.prototype.constructor = PassOrBlockCollisionsManager;