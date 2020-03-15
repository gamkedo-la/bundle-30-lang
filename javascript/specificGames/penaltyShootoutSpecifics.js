//penaltySpecifics
//2 stated game. 3 letters come to the screen; one on the left, one on the middle, one on the right. Player has to make the correct choice about where to shoot the ball. If player does get it correctly, she wins one po.nt

const penaltyBackButtonRectangleColor = 'yellow';
const penaltyBackButtonTextColor = 'red';
const penaltyLetterColor = 'BlueViolet';
const penaltyGameState = {
  DecisionState: 1,
  PenaltyShootingState: 2,
};

penaltyGameClass.prototype = new GameClass();
function penaltyGameClass(){
    this.name = 'penaltyGame';
    this.currentState = penaltyGameState.DecisionState;
    this.selectedSide;
    this.correctSide;
    this.frameRate = 30;
    this.sides = {
      left : {number : 1, isCorrect : false, drawX : 150, drawY : 300},
      middle : {number : 2, isCorrect : false, drawX : 350, drawY : 300},
      right : {number : 3, isCorrect : false, drawX : 550, drawY : 300}
    };
    this.intialize = function(){
        gameInterval.reset(this.frameRate);
        this.drawLettersAndCorrectSide();
    };


    this.handleLeftArrowDown = function(){
        if (this.currentState === penaltyGameState.DecisionState) {
          console.log("leftarrowpressed");
          this.selectedSide = this.sides.left;
          this.changeState();
        }
    };

    this.handleRightArrowDown = function(){
      if (this.currentState === penaltyGameState.DecisionState) {
        console.log("rightArrowPressed");
        this.selectedSide = this.sides.right;
        this.changeState();
      }
    };

    this.frameRate = 1000/30;
    this.letterSpawnInterval = 2000;

    this.initialize = function(){
      this.setCorrectSide();
      this.currentstate = penaltyGameState.DecisionState;
      this.correctSide = Math.floor(Math.random() * 3) + 1;
    };

    this.update = function(){
        this.draw();
        this.movePlayer();
    };

    this.movePlayer = function(){
      if (this.currentState === penaltyGameState.DecisionState){

      }
    };

    this.draw = function(){
        this.drawBackground();
        this.drawPlayer();
        this.drawLetters();
    };

    this.drawBackground = function(){
      gameCanvasContext.drawImage(snakeGrassBackground, 0,0, gameCanvas.width,gameCanvas.height);
    };

    this.drawPlayer = function(){
    };


    this.drawLetters = function(){
      //FIX ME:there is a better way to do this probably. Maybe storing the draw values in the "sides" object?
      if (this.currentState === penaltyGameState.DecisionState){
        debugger;
        for (var key of Object.keys(this.sides)) {
          gameCanvasContext.fillStyle = gameClassManager.currentGame.backButtonColor;
          gameCanvasContext.fillRect( this.sides[key].drawX, this.sides[key].drawY, 50, 50);
        }
      }
    };

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
    };

    this.setCorrectSide = function(){

    };

    this.ResetStrikerAndGoalKeeper = function(){
      // TODO: not implemented yet. Will be used for starting animation when decision is made.
    };

    this.ResetSelectionScreen = function(){
      // TODO: not implemented yet. Will be used for reseting selection when animation is finished.
    };
}

var penaltyGame = new penaltyGameClass();
