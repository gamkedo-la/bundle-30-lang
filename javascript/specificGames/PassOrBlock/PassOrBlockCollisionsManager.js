function PassOrBlockCollisionsManager() {
    // CollisionManager.call(this);

    this.processCollisionWithAnswer = function (){
        if (nextGame === SINGLE_PLAYER_RANDOM || 
            nextGame === TWO_PLAYER_RANDOM)
        {
            cycleCount++;
        }
        calculateAccuracy();
    }

    this.processCollisionWithCorrectAnswer = function(){
        CollisionManager.prototype.processCollisionWithCorrectAnswer();
        gameClassManager.currentGame.correctAnswersYSpeed *= -1;
    }

    this.processCollisionWithIncorrectAnswer = function(){
        CollisionManager.prototype.processCollisionWithIncorrectAnswer();
        gameClassManager.currentGame.incorrectAnswersYSpeed *= -1;
    }
}

PassOrBlockCollisionsManager.prototype = new CollisionManager();
PassOrBlockCollisionsManager.prototype.constructor = PassOrBlockCollisionsManager;