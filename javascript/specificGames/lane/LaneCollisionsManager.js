function LaneCollisionsManager() {
    CollisionsWithAnswersManager.call(this);

    this.insideBoxColliderForStringAnswer = function(
        collidingObject, targetPromptAndAnswerPairing, answerWidth)
    {
        return (targetPromptAndAnswerPairing.yCoordinate + answerWidth/2 > collidingObject.y)
    }
}

LaneCollisionsManager.prototype = new CollisionsWithAnswersManager();
LaneCollisionsManager.prototype.constructor = LaneCollisionsManager;