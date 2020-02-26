//penaltySpecifics
//Two seeds (WORDS or LETTERS) fall from a tree.  Catching the correct seed in the pot makes a penalty, catching the wrong seed makes a weed.

const penaltyBackButtonRectangleColor = 'yellow';
const penaltyBackButtonTextColor = 'red';
const penaltyLetterColor = 'BlueViolet';
const penaltyGameState = {
  DecisionState: 1,
  PenaltyShootingState: 2,
};
const sides = {
  left : 1,
  middle : 2,
  right : 3,
}

penaltyGameClass.prototype = new GameClass();
function penaltyGameClass(){
    this.name = 'penaltyGame';
    this.currentState = penaltyGameState.PenaltyShootingState;
    this.selectedSide;
    this.correctSide;
    this.intialize = function(){
        gameInterval.reset(this.frameRate);
    };


    this.handleLeftArrowDown = function(){
        if (this.currentState === penaltyGameState.DecisionState) {
          this.selectedSide = sides.left;
          this.changeState();
        }
    };

    this.handleRightArrowDown = function(){
      if (this.currentState === penaltyGameState.DecisionState) {
        this.selectedSide = sides.right;
        this.changeState();
      }
    };

    this.frameRate = 1000/30;
    this.letterSpawnInterval = 2000;

    this.initialize = function(){
    };

    this.update = function(){


        this.movePlayer();

    };

    this.movePlayer = function(){
        playerXCoordiate += playerXSpeed;
    };

    this.draw = function(){
        this.drawBackground();
        this.drawPlayer();
    }

    this.drawBackground = function(){
    };

    this.drawPlayer = function(){
    }

    this.changeState = function(){
      switch (this.currentState) {
        case penaltyGameState.DecisionState:
          this.ResetStrikerAndGoalKeeper();
          this.currentState = penaltyGameState.PenaltyShootingState;
          break;
        case penaltyGameState.PenaltyShootingState:
          this.ResetSelectionScreen();
          this.UpdateScore();
          this.currentState = penaltyGameState.DecisionState;
          break;
        default:

      }
    }

    this.ResetStrikerAndGoalKeeper = function(){
      // TODO: not implemented yet. Will be used for starting animation when decision is made.
    }

    this.ResetSelectionScreen = function(){
      // TODO: not implemented yet. Will be used for reseting selection when animation is finished.
    }
}

var penaltyGame = new penaltyGameClass();
