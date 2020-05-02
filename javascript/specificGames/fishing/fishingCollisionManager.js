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