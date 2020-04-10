MazeCollisionsManager = function() {
    CollisionsWithAnswersManager.call(this);

    this.resetAnswers = function()
    {
        CollisionsWithAnswersManager.prototype.resetAnswers();
        gameClassManager.currentGame.reset();
    }
}
MazeCollisionsManager.prototype = new CollisionsWithAnswersManager();
MazeCollisionsManager.prototype.constructor = MazeCollisionsManager;