//penaltySpecifics
//2 stated game. 2 letters come to the screen; one on the left, one on the right. Player has to make the correct choice about where to shoot the ball. If player does get it correctly, she wins one point
let arrayOfBallImages = [];
let arrayOfBallImagesIndex = 0
let arrayOfGoalkeeperImages = [];
let arrayOfGoalkeeperImagesIndex = 0;

arrayOfGoalkeeperImages.push(penaltyGoalkeeper1);
arrayOfGoalkeeperImages.push(penaltyGoalkeeper2);
arrayOfGoalkeeperImages.push(penaltyGoalkeeper3);
arrayOfGoalkeeperImages.push(penaltyGoalkeeper4);
arrayOfGoalkeeperImages.push(penaltyGoalkeeper5);
arrayOfGoalkeeperImages.push(penaltyGoalkeeper6);
arrayOfGoalkeeperImages.push(penaltyGoalkeeper7);
arrayOfGoalkeeperImages.push(penaltyGoalkeeper8);
arrayOfGoalkeeperImages.push(penaltyGoalkeeper9);
arrayOfGoalkeeperImages.push(penaltyGoalkeeper10);
arrayOfGoalkeeperImages.push(penaltyGoalkeeper11);
arrayOfGoalkeeperImages.push(penaltyGoalkeeper12);
arrayOfGoalkeeperImages.push(penaltyGoalkeeper13);
arrayOfGoalkeeperImages.push(penaltyGoalkeeper14);

arrayOfBallImages.push(penaltyBall1);
arrayOfBallImages.push(penaltyBall2);
arrayOfBallImages.push(penaltyBall3);
arrayOfBallImages.push(penaltyBall4);
arrayOfBallImages.push(penaltyBall5);
arrayOfBallImages.push(penaltyBall6);
arrayOfBallImages.push(penaltyBall7);
arrayOfBallImages.push(penaltyBall8);
arrayOfBallImages.push(penaltyBall9);
arrayOfBallImages.push(penaltyBall10);
arrayOfBallImages.push(penaltyBall11);

const penaltyBackButtonRectangleColor = 'yellow';
const penaltyBackButtonTextColor = 'red';
const penaltyLetterColor = 'BlueViolet';
const penaltyGameState = {
  DecisionState: 1,
  PenaltyShootingState: 2,
};
const BALL_WIDTH = 100;
const BALL_HEIGHT = 100;
const GOAL_WIDTH = 600;
const GOAL_HEIGHT = 300;

const BALL_X = 295;
const BALL_Y = 500;
const GOAL_X = 15;
const GOAL_Y = 0;

const GOALKEEPER_WIDTH = 400;
const GOALKEEPER_HEIGHT = 240;

const GOALKEEPER_X = 200;
const GOALKEEPER_Y = 100;

penaltyGameClass.prototype = new GameClass();
function penaltyGameClass(){
    this.name = 'penaltyGame';
    this.currentState = penaltyGameState.DecisionState;
    this.selectedSide;
    this.correctSide;
    //this.totalFrameCountToChangeState = 30;
    //this.currentFrame = 0;
    this.frameRate = 30;
    this.ballWidth = BALL_WIDTH;
    this.ballHeight = BALL_HEIGHT;
    this.ballX = BALL_X;
    this.ballY = BALL_Y;
    this.goalkeeperX = GOALKEEPER_X;
    this.goalkeeperY = GOALKEEPER_Y;
    this.goalkeeperWidth = GOALKEEPER_WIDTH;
    this.goalkeeperHeight = GOALKEEPER_HEIGHT;
    this.ArrayOfGoalkeeperImages = [];
    this.ArrayOfGoalkeeperImagesIndex = 0;
    this.ArrayOfBallImages = [];
    this.ArrayOfBallImagesIndex = 0;
    this.sides = {
      left : {number : 1, isCorrect : false, drawX : 50, drawY : 125},
      right : {number : 2, isCorrect : false, drawX : 500, drawY : 125}
    };
    this.titleScreenData = [{
    name: "Penalty",
    fontSize: 17,
    spacing: 12,
    x: 324, y: 405
    }];
    this.superInitialize = this.initialize;
    this.initialize = function(){
        gameInterval.reset(this.frameRate);
        this.drawLettersAndCorrectSide();
        this.superInitialize();
    };
    this.defineAndInitializePlayerCharacter = function () {

    };

    this.handleLeftArrowDown = function(){
        if (this.currentState === penaltyGameState.DecisionState) {
          console.log("leftarrowpressed");
          this.selectedSide = this.sides.left;
          this.changeState();
          this.currentFrame = 0;
        }
    };

    this.handleRightArrowDown = function(){
      if (this.currentState === penaltyGameState.DecisionState) {
        console.log("rightArrowPressed");
        this.selectedSide = this.sides.right;
        this.changeState();
        this.currentFrame = 0;
      }
    };

    this.frameRate = 1000/30;
    this.letterSpawnInterval = 2000;

    this.initialize = function(){
      this.setCorrectSide();
      this.currentstate = penaltyGameState.DecisionState;
    };

    this.update = function(){
        this.draw();
        // if (this.currentState === penaltyGameState.PenaltyShootingState){
        //   this.handleFrameCountToChangeState();
        // }
        //collisionsWithAnswersManager.handleCollisionsWithAnswers();
    };

    this.handleFrameCountToChangeState = function(){
      if (arrayOfGoalkeeperImagesIndex >= arrayOfGoalkeeperImages.length) {
        this.changeState();
        promptersManager.promptThePlayer();
      }
    }

    this.draw = function(){
        this.drawBackground();
        this.drawBall();
        this.drawGoal();
        this.drawGoalKeeper();
      if (this.currentState === penaltyGameState.DecisionState) {
        this.drawLetters();
        drawAnswersManager.draw();
        promptersManager.drawPromptsWhenAppropriate();
      }
      else if (this.currentState === penaltyGameState.PenaltyShootingState){
        this.drawShootingAnimation();
      }
    };

    this.drawBackground = function(){
      gameCanvasContext.drawImage(snakeGrassBackground, 0, 0, gameCanvas.width, gameCanvas.height);
    };

    this.drawBall = function(){
      if (this.currentState === penaltyGameState.DecisionState) {
        arrayOfBallImagesIndex = 0;
      }
      else {
        arrayOfBallImagesIndex++;
        if (arrayOfBallImagesIndex >= arrayOfBallImages.length) {
          arrayOfBallImagesIndex = 0;
        }
      }
      gameCanvasContext.drawImage(arrayOfBallImages[arrayOfBallImagesIndex], this.ballX, this.ballY, this.ballWidth, this.ballHeight);
    };

    this.drawGoal = function(){
      gameCanvasContext.drawImage(penaltyGoal, GOAL_X,GOAL_Y, GOAL_WIDTH,GOAL_HEIGHT);
    };

    this.drawGoalKeeper = function(){
      if (this.currentState === penaltyGameState.DecisionState) {
        arrayOfGoalkeeperImagesIndex = 0;
      }
      else {
        arrayOfGoalkeeperImagesIndex++;
        if (arrayOfGoalkeeperImagesIndex >= arrayOfGoalkeeperImages.length) {
          this.changeState();
          promptersManager.promptThePlayer();
          arrayOfGoalkeeperImagesIndex = 0;
        }
      }
      gameCanvasContext.drawImage(arrayOfGoalkeeperImages[arrayOfGoalkeeperImagesIndex], this.goalkeeperX, this.goalkeeperY, this.goalkeeperWidth, this.goalkeeperHeight);
    };


    this.drawLetters = function(){
      for (var key of Object.keys(this.sides)) {
        // gameCanvasContext.fillStyle = gameClassManager.currentGame.backButtonColor;// FIXME: There will be drawing of the letters here.
        // gameCanvasContext.fillRect( this.sides[key].drawX, this.sides[key].drawY, 50, 50);
        if (this.correctSide === this.sides[key].number) {
          promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.yCoordinate = this.sides[key].drawY;
          promptsAndAnswersManager.correctTargetPromptAndAnswerPairing.xCoordinate = this.sides[key].drawX;
        }
        else {
          promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.yCoordinate = this.sides[key].drawY;
          promptsAndAnswersManager.incorrectTargetPromptAndAnswerPairing.xCoordinate = this.sides[key].drawX;
        }
      }
    };

    this.changeState = function(){
      switch (this.currentState) {
        case penaltyGameState.DecisionState:
          if (this.correctSide === this.selectedSide.number) {
            genAudio.playPositive();
            amountCorrect++;
            this.collisionsWithAnswersManager.processCollisionWithAnswer();
            console.log("Right Choice");
          }
          else {
            genAudio.playNegative();
            amountIncorrect++;
            this.collisionsWithAnswersManager.processCollisionWithAnswer();
            console.log("Wrong Choice");
          }
          this.selectedSide == null;
          this.ResetStrikerAndGoalKeeper();
          this.currentState = penaltyGameState.PenaltyShootingState;
          this.setCorrectSide();
          //penaltyGame.changeState();
          break;
        case penaltyGameState.PenaltyShootingState:
          this.ResetSelectionScreen();
          // this.UpdateScore();
          this.currentState = penaltyGameState.DecisionState;
          break;
        default:

      }
    };

    this.setCorrectSide = function(){
      this.correctSide = Math.floor(Math.random() * 2) + 1;
    };

    this.ResetStrikerAndGoalKeeper = function(){
      // TODO: not implemented yet. Will be used for starting animation when decision is made.
    };

    this.ResetSelectionScreen = function(){
      // TODO: not implemented yet. Will be used for reseting selection when animation is finished.
    };

    this.drawShootingAnimation = function(){
     // TODO: animation drawing not implemented yet. So this function only switches to the other state at the moment.
    }
}
function stateChanger(objWhoseStateShouldChange) {
    penaltyGame.changeState();
}
var penaltyGame = new penaltyGameClass();
