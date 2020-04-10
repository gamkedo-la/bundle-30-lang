SpaceShooterCollisionsManager = function() {
    CollisionsWithAnswersManager.call(this);

    this.resetAnswers = function()
    {
        CollisionsWithAnswersManager.prototype.resetAnswers();
        gameClassManager.currentGame.arrayOfBullets = [];
    }
}
SpaceShooterCollisionsManager.prototype = new CollisionsWithAnswersManager();
SpaceShooterCollisionsManager.prototype.constructor = SpaceShooterCollisionsManager;